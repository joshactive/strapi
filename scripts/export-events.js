const fs = require('fs');
const path = require('path');

const EXPORT_PATH = path.join(process.cwd(), 'events-export.json');

// Bootstrap Strapi
async function bootstrapStrapi() {
  const strapiLib = require('@strapi/strapi');
  console.log('Strapi Lib:', Object.keys(strapiLib));
  
  if (strapiLib.createStrapi) {
     return await strapiLib.createStrapi({
       autoReload: false,
     }).load();
  }

  // Fallback/original attempt
  const app = await strapiLib.default({
    autoReload: false,
  }).load();
  return app;
}

async function exportEvents() {
  console.log('🚀 Starting Events Export...');
  console.log('📦 Bootstrapping Strapi...');
  
  let strapi;
  try {
    strapi = await bootstrapStrapi();
    
    console.log('🔍 Fetching events...');
    
    // Using entity service to get all fields and relations if possible
    // We'll fetch all without pagination limit if possible, or loop.
    // findMany usually defaults to a limit (often 100), so we explicitly set a high limit or loop.
    
    const count = await strapi.documents('api::events.event').count();
    console.log(`📊 Total events found in DB: ${count}`);
    
    const entries = await strapi.documents('api::events.event').findMany({
      populate: '*', 
      limit: 10000, // Set high limit to ensure we get all 551+
      status: 'published', // Adjust if you need drafts too, e.g. status: undefined or 'draft'
    });
    
    console.log(`✅ Retrieved ${entries.length} events`);
    
    console.log('💾 Writing to file...');
    fs.writeFileSync(EXPORT_PATH, JSON.stringify(entries, null, 2));
    
    console.log(`✅ Successfully exported to ${EXPORT_PATH}`);
    
  } catch (error) {
    console.error('💥 Export failed:', error);
  } finally {
    if (strapi) {
      await strapi.destroy();
    }
  }
}

exportEvents()
  .then(() => {
    console.log('🎉 Export process finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Process failed:', error);
    process.exit(1);
  });



