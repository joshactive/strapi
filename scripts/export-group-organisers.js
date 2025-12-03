const fs = require('fs');
const path = require('path');

const EXPORT_PATH = path.join(process.cwd(), 'group-organisers-export.json');

// Bootstrap Strapi
async function bootstrapStrapi() {
  const strapiLib = require('@strapi/strapi');
  console.log('Strapi Lib:', Object.keys(strapiLib));
  
  if (strapiLib.createStrapi) {
     return await strapiLib.createStrapi({
       // distDir: './dist', // Removed distDir
       autoReload: false,
     }).load();
  }

  // Fallback/original attempt
  const app = await strapiLib.default({
    // distDir: './dist', // Removed distDir
    autoReload: false,
  }).load();
  return app;
}

async function exportGroupOrganisers() {
  console.log('🚀 Starting Group Organiser Export...');
  console.log('📦 Bootstrapping Strapi...');
  
  let strapi;
  try {
    strapi = await bootstrapStrapi();
    
    console.log('🔍 Fetching group organisers...');
    
    const entries = await strapi.documents('api::group-organiser.group-organiser').findMany({
      populate: '*',
      status: 'published', // or 'draft' if you want drafts too
    });
    
    console.log(`✅ Found ${entries.length} group organisers`);
    
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

exportGroupOrganisers()
  .then(() => {
    console.log('🎉 Export process finished!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Process failed:', error);
    process.exit(1);
  });

