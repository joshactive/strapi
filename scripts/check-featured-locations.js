#!/usr/bin/env node

/**
 * Check all Featured Location entries in the database
 */

const STRAPI_URL = 'https://strapi-production-b96d.up.railway.app';
const STRAPI_TOKEN = 'eefa701cf9f771a8825d61d29bd6b31ce72ef83549d9c7f56e5e1f52ac208aef3e644a61772ba13cfc6ddffd201d662342f1ac04e02f4bf448bd2804aefaea0003efd6e75b2cd3cfcfdab8c2077656d2c0eda3f161630ee00d59935e818bfb1e1835165fbfdb4b38224d54a221346cbcfcfff174f228e0b94e403f571e6355a0';

async function fetchAPI(path) {
  const url = `${STRAPI_URL}/api${path}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function checkFeaturedLocations() {
  try {
    console.log('🔍 Fetching ALL Featured Locations from database...\n');
    
    // Fetch ALL featured locations (no filters)
    const response = await fetchAPI(
      '/featured-locations?' +
      'pagination[pageSize]=100&' +
      'sort=id:asc&' +
      'populate[tennis_holiday][populate]=headerImage&' +
      'populate[pickleball_holiday][populate]=headerImage&' +
      'populate[junior_tennis_camp][populate]=headerImage&' +
      'populate[padel_tennis_holiday][populate]=headerImage&' +
      'populate[play_and_watch][populate]=headerImage&' +
      'populate[ski_holiday][populate]=headerImage&' +
      'populate[tennis_clinic][populate]=headerImage'
    );
    
    if (!response?.data || response.data.length === 0) {
      console.log('❌ No Featured Locations found in database');
      return;
    }
    
    console.log(`✅ Found ${response.data.length} Featured Location entries:\n`);
    console.log('─'.repeat(100));
    
    response.data.forEach((item) => {
      const holidayType = item.holiday_type;
      const holiday = item[holidayType?.replace('-', '_')];
      
      console.log(`ID: ${item.id}`);
      console.log(`  documentId: ${item.documentId}`);
      console.log(`  Order: ${item.order}`);
      console.log(`  Active: ${item.active}`);
      console.log(`  Holiday Type: ${holidayType}`);
      console.log(`  Relation Connected: ${holiday ? '✅ YES' : '❌ NO'}`);
      
      if (holiday) {
        console.log(`  → Holiday ID: ${holiday.id}`);
        console.log(`  → Title: "${holiday.title || 'MISSING'}"`);
        console.log(`  → Country: ${holiday.country || 'MISSING'}`);
        console.log(`  → Has headerImage: ${holiday.headerImage ? '✅' : '❌'}`);
      }
      
      console.log('─'.repeat(100));
    });
    
    // Summary
    const activeCount = response.data.filter(item => item.active === true).length;
    const withRelations = response.data.filter(item => {
      const holidayType = item.holiday_type;
      return !!item[holidayType?.replace('-', '_')];
    }).length;
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total entries: ${response.data.length}`);
    console.log(`   Active entries: ${activeCount}`);
    console.log(`   With relations connected: ${withRelations}`);
    console.log(`   Missing relations: ${response.data.length - withRelations}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  }
}

// Run the script
checkFeaturedLocations();

