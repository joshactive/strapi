/**
 * Import all holidays into Featured Locations collection
 * Uses Strapi REST API (works with v5)
 */

const fetch = require('node-fetch');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  console.log('💡 Create a token in Strapi Admin → Settings → API Tokens');
  console.log('💡 Or run: STRAPI_API_TOKEN=your_token node scripts/import-featured-locations.js');
  process.exit(1);
}

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
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}\n${text}`);
  }

  return response.json();
}

async function importFeaturedLocations() {
  console.log('🚀 Starting Featured Locations import...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}\n`);

  try {
    // Define holiday types and their collection names
    const holidayTypes = [
      { type: 'tennis-holiday', endpoint: '/tennis-holidays', relation: 'tennis_holiday' },
      { type: 'pickleball-holiday', endpoint: '/pickleball-holidays', relation: 'pickleball_holiday' },
      { type: 'junior-tennis-camp', endpoint: '/junior-tennis-camps', relation: 'junior_tennis_camp' },
      { type: 'padel-tennis-holiday', endpoint: '/padel-tennis-holidays', relation: 'padel_tennis_holiday' },
      { type: 'play-and-watch', endpoint: '/play-and-watches', relation: 'play_and_watch' },
      { type: 'ski-holiday', endpoint: '/ski-holidays', relation: 'ski_holiday' }
    ];

    let totalCreated = 0;
    let totalSkipped = 0;
    let currentOrder = 1;

    // Get existing featured locations to avoid duplicates
    console.log('🔍 Checking existing featured locations...');
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

    // Build a Set of existing holiday IDs for quick lookup
    const existingHolidayIds = new Set();
    existingFeatured.forEach(featured => {
      if (featured.tennis_holiday?.id) {
        existingHolidayIds.add(`tennis_holiday:${featured.tennis_holiday.id}`);
      }
      if (featured.pickleball_holiday?.id) {
        existingHolidayIds.add(`pickleball_holiday:${featured.pickleball_holiday.id}`);
      }
      if (featured.junior_tennis_camp?.id) {
        existingHolidayIds.add(`junior_tennis_camp:${featured.junior_tennis_camp.id}`);
      }
      if (featured.padel_tennis_holiday?.id) {
        existingHolidayIds.add(`padel_tennis_holiday:${featured.padel_tennis_holiday.id}`);
      }
      if (featured.play_and_watch?.id) {
        existingHolidayIds.add(`play_and_watch:${featured.play_and_watch.id}`);
      }
      if (featured.ski_holiday?.id) {
        existingHolidayIds.add(`ski_holiday:${featured.ski_holiday.id}`);
      }
    });

    console.log(`📋 Found ${existingFeatured.length} existing featured location entries`);
    console.log(`🔍 Processing ${holidayTypes.length} holiday types...\n`);

    // Process each holiday type
    for (const { type, endpoint, relation } of holidayTypes) {
      console.log(`\n📦 Processing ${type}...`);
      
      try {
        // Fetch all holidays of this type (filter by displayOnFrontEnd if field exists)
        const response = await fetchAPI(
          `${endpoint}?` +
          'filters[displayOnFrontEnd]=true&' +
          'sort=ordering:asc&' +
          'pagination[limit]=100'
        );

        const holidays = response.data || [];
        console.log(`   Found ${holidays.length} ${type} entries`);

        let created = 0;
        let skipped = 0;

        // Create featured location for each holiday
        for (const holiday of holidays) {
          const checkId = `${relation}:${holiday.id}`;
          
          // Skip if already exists
          if (existingHolidayIds.has(checkId)) {
            skipped++;
            continue;
          }

          try {
            // Prepare the data object with the correct relation field
            const data = {
              order: holiday.ordering || currentOrder,
              active: true,
              holiday_type: type,
              [relation]: holiday.id, // Set the specific relation field
              publishedAt: new Date().toISOString()
            };

            // Create the featured location entry
            await createEntry('/featured-locations', data);

            created++;
            currentOrder++;
            
            if (created % 10 === 0) {
              console.log(`   ✅ Created ${created} featured locations...`);
            }
          } catch (error) {
            console.error(`   ❌ Error creating featured location for ${holiday.title || holiday.id}:`, error.message);
          }
        }

        console.log(`   ✅ Created: ${created} | ⏭️  Skipped (already exists): ${skipped}`);
        totalCreated += created;
        totalSkipped += skipped;
      } catch (error) {
        console.error(`   ❌ Error fetching ${type}:`, error.message);
        console.log(`   ℹ️  This might be OK if the collection doesn't have displayOnFrontEnd field`);
        
        // Try without the filter
        try {
          const response = await fetchAPI(
            `${endpoint}?` +
            'sort=ordering:asc&' +
            'pagination[limit]=100'
          );

          const holidays = response.data || [];
          console.log(`   Found ${holidays.length} ${type} entries (without filter)`);

          let created = 0;
          let skipped = 0;

          for (const holiday of holidays) {
            const checkId = `${relation}:${holiday.id}`;
            
            if (existingHolidayIds.has(checkId)) {
              skipped++;
              continue;
            }

            try {
              const data = {
                order: holiday.ordering || currentOrder,
                active: true,
                holiday_type: type,
                [relation]: holiday.id,
                publishedAt: new Date().toISOString()
              };

              await createEntry('/featured-locations', data);

              created++;
              currentOrder++;
              
              if (created % 10 === 0) {
                console.log(`   ✅ Created ${created} featured locations...`);
              }
            } catch (error) {
              console.error(`   ❌ Error creating featured location:`, error.message);
            }
          }

          console.log(`   ✅ Created: ${created} | ⏭️  Skipped (already exists): ${skipped}`);
          totalCreated += created;
          totalSkipped += skipped;
        } catch (retryError) {
          console.error(`   ❌ Could not fetch ${type}:`, retryError.message);
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total created: ${totalCreated}`);
    console.log(`⏭️  Total skipped: ${totalSkipped}`);
    console.log(`📦 Total featured locations: ${totalCreated + existingFeatured.length}`);
    console.log('='.repeat(60));
    console.log('\n✨ Import complete! Check Strapi Admin → Featured Locations\n');

  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

// Run the import
importFeaturedLocations()
  .then(() => {
    console.log('✅ Script finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
