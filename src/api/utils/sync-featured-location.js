/**
 * Utility to automatically sync Featured Locations when holidays are created/updated/deleted
 * Uses Strapi v5 Document Service API
 * 
 * NOTE: This is the automatic/real-time version.
 * For manual bulk sync, use: scripts/sync-featured-locations.js
 */

// Flag to prevent infinite loops when syncing
const syncingInProgress = new Set();

/**
 * Sync Featured Location for a holiday
 * @param {Object} params
 * @param {string} params.holidayType - e.g., 'tennis-holiday', 'pickleball-holiday'
 * @param {string} params.relationField - e.g., 'tennis_holiday', 'pickleball_holiday'
 * @param {string} params.documentId - The documentId of the holiday
 * @param {boolean} params.displayOnFrontEnd - Whether to display on frontend
 * @param {number} params.ordering - The order value
 * @param {string} params.title - Holiday title (for logging)
 */
async function syncFeaturedLocation({ 
  holidayType, 
  relationField, 
  documentId, 
  displayOnFrontEnd, 
  ordering = 99,
  title 
}) {
  // Prevent infinite loops - check if we're already syncing this holiday
  const syncKey = `${relationField}:${documentId}`;
  if (syncingInProgress.has(syncKey)) {
    console.log(`⏭️  Skipping sync (already in progress): ${syncKey}`);
    return;
  }
  
  syncingInProgress.add(syncKey);
  
  try {
    console.log(`🔍 Syncing Featured Location: ${holidayType} | ${title} | displayOnFrontEnd: ${displayOnFrontEnd}`);
    
    // Get the holiday to find its numeric ID (needed for database relations)
    const apiName = holidayType.replace(/-/g, '_');
    const holidayDoc = await strapi.documents(`api::${holidayType}.${holidayType}`).findOne({
      documentId: documentId
    });
    
    if (!holidayDoc) {
      console.error(`   ❌ Could not find holiday with documentId: ${documentId}`);
      return;
    }
    
    const holidayId = holidayDoc.id;
    console.log(`   Found holiday ID: ${holidayId}`);
    
    // Find existing Featured Location for this holiday (search by ID not documentId)
    const existingFeaturedLocations = await strapi.db.query('api::featured-location.featured-location').findMany({
      where: {
        [relationField]: holidayId
      }
    });

    console.log(`   Found ${existingFeaturedLocations?.length || 0} existing featured locations`);
    const existingFeaturedLocation = existingFeaturedLocations?.[0];

    // Logic: If displayOnFrontEnd is true
    if (displayOnFrontEnd) {
      if (!existingFeaturedLocation) {
        // Create new Featured Location using entityService (respects Draft & Publish)
        console.log(`✨ Creating Featured Location for ${holidayType}: ${title}`);
        
        const newFeaturedLocation = await strapi.entityService.create('api::featured-location.featured-location', {
          data: {
            order: ordering,
            active: true,
            holiday_type: holidayType,
            [relationField]: holidayId,  // Use numeric ID
            publishedAt: new Date()
          }
        });
        
        console.log(`✅ Featured Location created and published for: ${title}`);
      } else {
        // Update existing Featured Location (in case order changed)
        console.log(`🔄 Updating Featured Location for ${holidayType}: ${title}`);
        
        await strapi.entityService.update('api::featured-location.featured-location', existingFeaturedLocation.id, {
          data: {
            order: ordering,
            active: true,
            holiday_type: holidayType,  // Required field must be included in updates
            [relationField]: holidayId,
            publishedAt: new Date()
          }
        });
        
        console.log(`✅ Featured Location updated and published for: ${title}`);
      }
    } 
    // Logic: If displayOnFrontEnd is false
    else {
      if (existingFeaturedLocation && existingFeaturedLocation.active) {
        // Delete the Featured Location
        console.log(`🗑️  Deleting Featured Location for ${holidayType}: ${title}`);
        
        await strapi.entityService.delete('api::featured-location.featured-location', existingFeaturedLocation.id);
        
        console.log(`✅ Featured Location deleted for: ${title}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error syncing Featured Location for ${holidayType} (${title}):`, error.message);
    console.error(`   Full error:`, error);
    throw error; // Re-throw to see full stack trace
  } finally {
    // Always remove the sync lock
    syncingInProgress.delete(syncKey);
  }
}

/**
 * Delete Featured Location when holiday is deleted
 */
async function deleteFeaturedLocation({ relationField, documentId, title, holidayType }) {
  // Prevent infinite loops
  const syncKey = `${relationField}:${documentId}`;
  if (syncingInProgress.has(syncKey)) {
    console.log(`⏭️  Skipping delete (sync in progress): ${syncKey}`);
    return;
  }
  
  syncingInProgress.add(syncKey);
  
  try {
    // Get the holiday to find its numeric ID
    const holidayDoc = await strapi.documents(`api::${holidayType}.${holidayType}`).findOne({
      documentId: documentId
    });
    
    if (!holidayDoc) {
      console.log(`   ℹ️  Holiday already deleted, checking for orphaned Featured Location`);
      // Try to find by documentId anyway
      const orphaned = await strapi.db.query('api::featured-location.featured-location').findMany({
        where: {
          holiday_type: holidayType
        },
        limit: 100
      });
      // Can't easily match without the holiday, so just log and return
      console.log(`   Found ${orphaned.length} featured locations of type ${holidayType}`);
      return;
    }
    
    const holidayId = holidayDoc.id;
    
    // Find existing Featured Location for this holiday
    const existingFeaturedLocations = await strapi.db.query('api::featured-location.featured-location').findMany({
      where: {
        [relationField]: holidayId
      }
    });

    const existingFeaturedLocation = existingFeaturedLocations?.[0];

    if (existingFeaturedLocation) {
      console.log(`🗑️  Deleting Featured Location for deleted ${holidayType}: ${title}`);
      
      await strapi.entityService.delete('api::featured-location.featured-location', existingFeaturedLocation.id);
      
      console.log(`✅ Featured Location deleted for: ${title}`);
    }
  } catch (error) {
    console.error(`❌ Error deleting Featured Location for ${holidayType} (${title}):`, error.message);
  } finally {
    // Always remove the sync lock
    syncingInProgress.delete(syncKey);
  }
}

module.exports = {
  syncFeaturedLocation,
  deleteFeaturedLocation
};

