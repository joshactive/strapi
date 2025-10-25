const fs = require('fs');
const csv = require('csv-parser');
const { Client } = require('pg');

const CSV_PATH = '/Users/joshuathompson/Desktop/Events.csv';

async function importEvents() {
  // Connect to PostgreSQL using the same connection string as Strapi
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? {
      rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false'
    } : false
  });
  
  await client.connect();
  console.log('✅ Connected to PostgreSQL database\n');
  
  const events = [];
  
  console.log('📖 Reading CSV file...');
  
  // Read and parse CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        // Map CSV columns to Strapi fields
        const event = {
          wpId: parseInt(row.ID),
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
  console.log('📤 Importing events into database...\n');
  
  let imported = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const event of events) {
    try {
      // Check if event already exists
      const checkResult = await client.query(
        'SELECT id FROM events WHERE wp_id = $1',
        [event.wpId]
      );
      
      if (checkResult.rows.length > 0) {
        console.log(`⏭️  Skipping event ${event.wpId} - ${event.title} (already exists)`);
        skipped++;
        continue;
      }
      
      // Insert the event
      const now = new Date();
      await client.query(`
        INSERT INTO events (
          wp_id, title, slug, date_from, date_until,
          price, single_occupancy_price_event,
          product_link, venue_link, booking_link,
          board_basis_event, date_text, product, country_events,
          button_colour, is_sold_out, button_text, featured,
          created_at, updated_at, published_at,
          created_by_id, updated_by_id
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, $7,
          $8, $9, $10,
          $11, $12, $13, $14,
          $15, $16, $17, $18,
          $19, $20, $21,
          NULL, NULL
        )
      `, [
        event.wpId, event.title, event.slug, event.dateFrom, event.dateUntil,
        event.price, event.singleOccupancyPriceEvent,
        event.productLink, event.venueLink, event.bookingLink,
        event.boardBasisEvent, event.dateText, event.product, event.countryEvents,
        event.buttonColour, event.isSoldOut, event.buttonText, event.featured,
        now, now, now
      ]);
      
      imported++;
      console.log(`✅ Imported event ${event.wpId} - ${event.title}`);
      
    } catch (error) {
      errors++;
      console.error(`❌ Error importing event ${event.wpId}: ${error.message}`);
    }
  }
  
  await client.end();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total events in CSV: ${events.length}`);
  console.log(`Successfully imported: ${imported}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log('='.repeat(50));
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
    console.error('💥 Import failed:', error);
    console.error(error.stack);
    process.exit(1);
  });


