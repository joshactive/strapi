const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');

const CSV_PATH = '/Users/joshuathompson/Desktop/Events.csv';
const STRAPI_URL = 'http://localhost:1337';

async function importEvents() {
  const events = [];
  
  console.log('📖 Reading CSV file...');
  
  // Read and parse CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        // Handle BOM in column names - get the actual ID key
        const idKey = Object.keys(row)[0]; // First column is ID (with or without BOM)
        
        // Map CSV columns to Strapi fields
        const event = {
          wpId: parseInt(row[idKey]),
          title: row.Title,
          slug: row.Title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''),
          dateFrom: new Date(parseInt(row['date-from']) * 1000).toISOString().split('T')[0],
          dateUntil: new Date(parseInt(row['date-until']) * 1000).toISOString().split('T')[0],
          price: row.price ? parseFloat(row.price) : null,
          singleOccupancyPriceEvent: row['single-occupancy-price-event'] ? parseFloat(row['single-occupancy-price-event']) : null,
          productLink: row['product-link'] || null,
          venueLink: row['venue-link'] || null,
          bookingLink: row['booking-link'] || null,
          boardBasisEvent: row['board-basis-event'] || null,
          dateText: row['date-text'] || null,
          product: row.product || null,
          countryEvents: row['country-events'] || null,
          buttonColour: row['button-colour'] || null,
          isSoldOut: row['is-sold-out'] === 'Sold Out',
          buttonText: row['button-text'] || null,
          featured: false
        };
        
        events.push(event);
      })
      .on('end', resolve)
      .on('error', reject);
  });
  
  console.log(`✅ Parsed ${events.length} events from CSV\n`);
  
  // Check if API is accessible
  console.log('🔍 Checking Strapi API access...');
  const testResponse = await fetch(`${STRAPI_URL}/api/events`);
  
  if (testResponse.status === 403) {
    console.error('\n❌ API Access Denied!');
    console.error('\n📋 Please enable API permissions:');
    console.error('   1. Go to Strapi Admin: http://localhost:1337/admin');
    console.error('   2. Go to Settings → Roles → Public');
    console.error('   3. Scroll to "Event" permissions');
    console.error('   4. Check: find, findOne, and create');
    console.error('   5. Click Save');
    console.error('   6. Run this script again');
    console.error('   7. After import, you can disable "create" permission\n');
    process.exit(1);
  }
  
  if (!testResponse.ok) {
    throw new Error(`Strapi API error: ${testResponse.statusText}`);
  }
  
  console.log('✅ API access confirmed\n');
  console.log('📤 Importing events into Strapi...\n');
  
  let imported = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const event of events) {
    try {
      // Check if event already exists
      const checkUrl = `${STRAPI_URL}/api/events?filters[wpId][$eq]=${event.wpId}`;
      const checkResponse = await fetch(checkUrl);
      
      if (!checkResponse.ok) {
        throw new Error(`Failed to check existing event: ${checkResponse.statusText}`);
      }
      
      const checkData = await checkResponse.json();
      
      if (checkData.data && checkData.data.length > 0) {
        console.log(`⏭️  Skipping event ${event.wpId} - ${event.title.substring(0, 50)}... (already exists)`);
        skipped++;
        continue;
      }
      
      // Create the event
      const createUrl = `${STRAPI_URL}/api/events`;
      const createResponse = await fetch(createUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: event })
      });
      
      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create: ${createResponse.statusText} - ${errorText}`);
      }
      
      imported++;
      console.log(`✅ Imported event ${event.wpId} - ${event.title.substring(0, 50)}...`);
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 50));
      
    } catch (error) {
      errors++;
      console.error(`❌ Error importing event ${event.wpId}: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total events in CSV: ${events.length}`);
  console.log(`Successfully imported: ${imported}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log('='.repeat(60));
  
  if (imported > 0) {
    console.log('\n💡 TIP: You can now disable the "create" permission for Public role');
    console.log('   Settings → Roles → Public → Event → Uncheck "create"');
  }
}

// Run the import
console.log('🚀 Starting Events Import...');
console.log('');

importEvents()
  .then(() => {
    console.log('');
    console.log('🎉 Import complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  });
