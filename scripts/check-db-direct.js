#!/usr/bin/env node

/**
 * Query PostgreSQL directly to check Featured Location entries
 */

const { Client } = require('pg');

const DATABASE_URL = 'postgresql://postgres:IIOLnmYvrhhsjNutQVnZGloKyCKYOkgm@caboose.proxy.rlwy.net:13340/railway';

async function queryDatabase() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL database\n');
    
    // First, check what columns exist
    const columnsResult = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'featured_locations'
      ORDER BY ordinal_position
    `);
    
    console.log('📋 Columns in featured_locations table:');
    columnsResult.rows.forEach(row => console.log(`  - ${row.column_name}`));
    console.log('\n');
    
    // Query all data from the table
    const result = await client.query(`
      SELECT * FROM featured_locations ORDER BY id
    `);
    
    console.log(`Found ${result.rows.length} entries in featured_locations table:\n`);
    console.log('─'.repeat(120));
    
    result.rows.forEach(row => {
      console.log(`ID: ${row.id} | DocumentID: ${row.document_id}`);
      console.log(`  Order: ${row.order} | Active: ${row.active} | Holiday Type: ${row.holiday_type}`);
      
      // Show all fields
      console.log(`  All fields:`, JSON.stringify(row, null, 2));
      console.log('─'.repeat(120));
    });
    
  } catch (error) {
    console.error('❌ Database error:', error.message);
    throw error;
  } finally {
    await client.end();
  }
}

queryDatabase();

