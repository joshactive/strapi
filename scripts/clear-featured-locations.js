/**
 * Clear all Featured Locations
 * Uses Strapi REST API (works with v5)
 */

const fetch = require('node-fetch');

// Configuration
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  console.log('💡 Create a token in Strapi Admin → Settings → API Tokens');
  console.log('💡 Or run: STRAPI_API_TOKEN=your_token node scripts/clear-featured-locations.js');
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

// Helper: Delete entry from Strapi
async function deleteEntry(endpoint) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}\n${text}`);
  }

  // DELETE might return empty response (204 No Content)
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

async function clearFeaturedLocations() {
  console.log('🗑️  Starting Featured Locations cleanup...');
  console.log(`📍 Strapi URL: ${STRAPI_URL}\n`);

  try {
    // Fetch all featured locations
    console.log('🔍 Fetching all featured locations...');
    
    let allFeaturedLocations = [];
    let page = 1;
    let hasMore = true;
    
    // Fetch all pages
    while (hasMore) {
      const response = await fetchAPI(
        `/featured-locations?pagination[page]=${page}&pagination[pageSize]=100`
      );
      
      const entries = response.data || [];
      allFeaturedLocations = allFeaturedLocations.concat(entries);
      
      const pagination = response.meta?.pagination;
      hasMore = pagination && pagination.page < pagination.pageCount;
      page++;
      
      console.log(`   📄 Fetched page ${pagination?.page || 1} of ${pagination?.pageCount || 1}`);
    }

    const totalCount = allFeaturedLocations.length;
    console.log(`\n📊 Found ${totalCount} featured location entries to delete\n`);

    if (totalCount === 0) {
      console.log('✨ No featured locations to delete. Collection is already empty.');
      return;
    }

    // Delete each entry
    let deleted = 0;
    let failed = 0;

    for (const entry of allFeaturedLocations) {
      try {
        await deleteEntry(`/featured-locations/${entry.id}`);
        deleted++;
        
        if (deleted % 10 === 0) {
          console.log(`   🗑️  Deleted ${deleted}/${totalCount}...`);
        }
      } catch (error) {
        console.error(`   ❌ Error deleting entry ${entry.id}:`, error.message);
        failed++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 CLEANUP SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Total deleted: ${deleted}`);
    console.log(`❌ Failed: ${failed}`);
    console.log('='.repeat(60));
    console.log('\n✨ Cleanup complete! You can now reimport featured locations.\n');

  } catch (error) {
    console.error('❌ Cleanup failed:', error);
    throw error;
  }
}

// Run the cleanup
clearFeaturedLocations()
  .then(() => {
    console.log('✅ Script finished successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });

