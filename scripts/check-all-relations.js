#!/usr/bin/env node

const { Client } = require('pg');

const DATABASE_URL = 'postgresql://postgres:IIOLnmYvrhhsjNutQVnZGloKyCKYOkgm@caboose.proxy.rlwy.net:13340/railway';

async function checkAllRelations() {
  const client = new Client({ connectionString: DATABASE_URL });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL\n');

    // Get all published featured locations
    const flResult = await client.query(`
      SELECT id, document_id, "order", holiday_type, published_at
      FROM featured_locations
      WHERE published_at IS NOT NULL
      ORDER BY "order", id
    `);

    console.log(`📍 Found ${flResult.rows.length} PUBLISHED Featured Locations:\n`);

    for (const fl of flResult.rows) {
      console.log(`\n🔍 Featured Location ID: ${fl.id} (${fl.holiday_type})`);
      console.log(`   DocumentID: ${fl.document_id}`);
      console.log(`   Order: ${fl.order}`);

      // Check the corresponding link table
      const holidayTypeUnderscore = fl.holiday_type.replace(/-/g, '_');
      const linkTable = `featured_locations_${holidayTypeUnderscore}_lnk`;
      const holidayTable = `${holidayTypeUnderscore}s`;
      const holidayIdColumn = `${holidayTypeUnderscore}_id`;

      try {
        const linkResult = await client.query(`
          SELECT * FROM ${linkTable}
          WHERE featured_location_id = $1
        `, [fl.id]);

        if (linkResult.rows.length === 0) {
          console.log(`   ❌ NO RELATION in ${linkTable}`);
        } else {
          const link = linkResult.rows[0];
          const holidayId = link[holidayIdColumn];
          console.log(`   ✅ Relation found: ${holidayIdColumn} = ${holidayId}`);

          // Check if the holiday is published
          const holidayResult = await client.query(`
            SELECT id, title, published_at FROM ${holidayTable}
            WHERE id = $1
          `, [holidayId]);

          if (holidayResult.rows.length > 0) {
            const holiday = holidayResult.rows[0];
            console.log(`   → Holiday: "${holiday.title}"`);
            console.log(`   → Published: ${holiday.published_at ? '✅ YES' : '❌ NO (DRAFT)'}`);
          } else {
            console.log(`   ❌ Holiday not found in ${holidayTable}`);
          }
        }
      } catch (error) {
        console.log(`   ❌ Error checking relation: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

checkAllRelations();

