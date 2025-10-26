/**
 * Sync Featured Locations based on displayOnFrontEnd field
 * Creates/removes Featured Location entries when holidays have displayOnFrontEnd: true
 */

const fetch = require('node-fetch');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Holiday types configuration
const HOLIDAY_TYPES = [
  { type: 'tennis-holiday', endpoint: '/tennis-holidays', relation: 'tennis_holiday' },
  { type: 'pickleball-holiday', endpoint: '/pickleball-holidays', relation: 'pickleball_holiday' },
  { type: 'junior-tennis-camp', endpoint: '/junior-tennis-camps', relation: 'junior_tennis_camp' },
  { type: 'padel-tennis-holiday', endpoint: '/padel-tennis-holidays', relation: 'padel_tennis_holiday' },
  { type: 'play-and-watch', endpoint: '/play-and-watches', relation: 'play_and_watch' },
  { type: 'ski-holiday', endpoint: '/ski-holidays', relation: 'ski_holiday' },
  { type: 'tennis-clinic', endpoint: '/tennis-clinics', relation: 'tennis_clinic' }
];

// Helper: Fetch from Strapi API
async function fetchAPI(endpoint) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}\n${text}`);
  }

  return response.json();
}

// Helper: Create entry in Strapi
async function createEntry(endpoint, data) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Strapi API error: ${response.status}\n${text}`);
  }

  return response.json();
}

// Helper: Delete entry from Strapi
async function deleteEntry(endpoint, id) {
  const url = `${STRAPI_URL}/api${endpoint}/${id}`;
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Strapi API error: ${response.status}\n${text}`);
  }

  return response.json();
}

async function syncFeaturedLocations() {
  console.log('🔄 Starting Featured Locations sync...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}\n`);

  try {
    // Step 1: Fetch all existing Featured Locations
    console.log('📋 Fetching existing Featured Locations...');
    const existingResponse = await fetchAPI(
      '/featured-locations?' +
      'populate[tennis_holiday][fields][0]=id&' +
      'populate[pickleball_holiday][fields][0]=id&' +
      'populate[junior_tennis_camp][fields][0]=id&' +
      'populate[padel_tennis_holiday][fields][0]=id&' +
      'populate[play_and_watch][fields][0]=id&' +
      'populate[ski_holiday][fields][0]=id&' +
      'pagination[limit]=200'
    );

    const existingFeatured = existingResponse.data || [];
    console.log(`   Found ${existingFeatured.length} existing featured locations\n`);

    // Build map of existing: "relation:holidayId" -> featuredLocationId
    const existingMap = new Map();
    existingFeatured.forEach(featured => {
      HOLIDAY_TYPES.forEach(({ relation }) => {
        if (featured[relation]?.id) {
          existingMap.set(`${relation}:${featured[relation].id}`, featured.id);
        }
      });
    });

    let totalCreated = 0;
    let totalDeleted = 0;
    let totalKept = 0;
    let currentOrder = 1;

    // Step 2: Process each holiday type
    for (const { type, endpoint, relation } of HOLIDAY_TYPES) {
      console.log(`\n📦 Processing ${type}...`);
      
      try {
        // Fetch holidays with displayOnFrontEnd: true
        const response = await fetchAPI(
          `${endpoint}?` +
          'filters[displayOnFrontEnd][$eq]=true&' +
          'sort=ordering:asc&' +
          'pagination[limit]=100'
        );

        const holidays = response.data || [];
        console.log(`   Found ${holidays.length} holidays with displayOnFrontEnd=true`);

        // Track which holidays should be featured
        const shouldBeFeatured = new Set();

        // Create Featured Location for each holiday
        for (const holiday of holidays) {
          const mapKey = `${relation}:${holiday.id}`;
          shouldBeFeatured.add(mapKey);

          if (existingMap.has(mapKey)) {
            // Already exists, keep it
            console.log(`   ✓ Keeping: ${holiday.title || holiday.id}`);
            totalKept++;
          } else {
            // Doesn't exist, create it
            try {
              const data = {
                order: holiday.ordering || currentOrder,
                active: true,
                holiday_type: type,
                [relation]: holiday.id
              };

              await createEntry('/featured-locations', data);
              console.log(`   ✅ Created: ${holiday.title || holiday.id}`);
              totalCreated++;
              currentOrder++;
            } catch (error) {
              console.error(`   ❌ Error creating: ${error.message}`);
            }
          }
        }

        // Remove Featured Locations for holidays that no longer have displayOnFrontEnd=true
        for (const [mapKey, featuredId] of existingMap.entries()) {
          if (mapKey.startsWith(`${relation}:`) && !shouldBeFeatured.has(mapKey)) {
            try {
              await deleteEntry('/featured-locations', featuredId);
              console.log(`   🗑️  Removed featured location (displayOnFrontEnd=false)`);
              totalDeleted++;
              existingMap.delete(mapKey);
            } catch (error) {
              console.error(`   ❌ Error deleting: ${error.message}`);
            }
          }
        }

      } catch (error) {
        console.error(`   ❌ Error processing ${type}:`, error.message);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SYNC SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Created: ${totalCreated}`);
    console.log(`✓  Kept (unchanged): ${totalKept}`);
    console.log(`🗑️  Deleted: ${totalDeleted}`);
    console.log(`📦 Total featured locations: ${totalCreated + totalKept}`);
    console.log('='.repeat(60));
    console.log('\n✨ Sync complete!\n');

  } catch (error) {
    console.error('❌ Sync failed:', error);
    throw error;
  }
}

// Run the sync
syncFeaturedLocations()
  .then(() => {
    console.log('✅ Script finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });

