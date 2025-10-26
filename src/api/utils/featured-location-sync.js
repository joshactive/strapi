/**
 * Shared utility for syncing Featured Locations
 * Used by lifecycle hooks across all holiday types
 */

module.exports = {
  /**
   * Create or update Featured Location when displayOnFrontEnd is toggled ON
   * @param {Object} params - { holidayId, holidayType, relation, ordering }
   */
  async createFeaturedLocation({ holidayId, holidayType, relation, ordering = 999 }) {
    try {
      // Check if Featured Location already exists for this holiday
      const existing = await strapi.entityService.findMany(
        'api::featured-location.featured-location',
        {
          filters: {
            [relation]: holidayId
          },
          limit: 1
        }
      );

      if (existing && existing.length > 0) {
        console.log(`✓ Featured Location already exists for ${relation}:${holidayId}`);
        
        // Update it to be active if it was disabled
        await strapi.entityService.update(
          'api::featured-location.featured-location',
          existing[0].id,
          {
            data: {
              active: true,
              publishedAt: new Date()
            }
          }
        );
        
        return existing[0];
      }

      // Create new Featured Location
      const featuredLocation = await strapi.entityService.create(
        'api::featured-location.featured-location',
        {
          data: {
            order: ordering || 999,
            active: true,
            holiday_type: holidayType,
            [relation]: holidayId,
            publishedAt: new Date()
          }
        }
      );

      console.log(`✅ Created Featured Location for ${relation}:${holidayId}`);
      return featuredLocation;
      
    } catch (error) {
      console.error(`❌ Error creating Featured Location for ${relation}:${holidayId}:`, error.message);
      throw error;
    }
  },

  /**
   * Remove Featured Location when displayOnFrontEnd is toggled OFF
   * @param {Object} params - { holidayId, relation }
   */
  async removeFeaturedLocation({ holidayId, relation }) {
    try {
      // Find Featured Location for this holiday
      const existing = await strapi.entityService.findMany(
        'api::featured-location.featured-location',
        {
          filters: {
            [relation]: holidayId
          },
          limit: 1
        }
      );

      if (!existing || existing.length === 0) {
        console.log(`ℹ️  No Featured Location found for ${relation}:${holidayId}`);
        return;
      }

      // Delete the Featured Location
      await strapi.entityService.delete(
        'api::featured-location.featured-location',
        existing[0].id
      );

      console.log(`🗑️  Deleted Featured Location for ${relation}:${holidayId}`);
      
    } catch (error) {
      console.error(`❌ Error deleting Featured Location for ${relation}:${holidayId}:`, error.message);
      throw error;
    }
  }
};

