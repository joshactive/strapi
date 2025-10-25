const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_FILE_PATH = '/Users/joshuathompson/Desktop/content-types/videos-export.csv';
const STRAPI_API_URL = 'http://localhost:1337/api/videos';

// Extract slug from permalink
function extractSlug(permalink) {
  if (!permalink) return '';
  const match = permalink.match(/\/([^\/]+)\/?$/);
  return match ? match[1] : '';
}

// Map CSV row to Strapi data structure
function mapCsvToStrapi(row) {
  const wpId = parseInt(row['id']);
  
  // SEO component
  const seoComponent = {
    metaTitle: row['_aioseo_title'] || row['Title'] || '',
    metaDescription: row['_aioseo_description'] || row['Excerpt'] || '',
    keywords: row['_aioseo_keywords'] || ''
  };

  // Extract slug and sanitize it
  let slug = extractSlug(row['Permalink']) || row['video_title'] || '';
  
  // Sanitize slug: remove URL-encoded characters, emojis, and special chars
  slug = slug
    .replace(/%[0-9a-f]{2}/gi, '') // Remove URL-encoded characters
    .replace(/[^\w\s-]/gi, '') // Remove non-alphanumeric except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .toLowerCase();
  
  // If slug is invalid or empty, create a fallback
  if (!slug || slug.includes('?') || slug.includes('&') || slug.includes('=')) {
    slug = `video-${wpId}` || '';
  }

  // Parse ordering
  const ordering = parseInt(row['video_order_1_99'] || row['ordering---1--first--99--last'] || 50);

  // Determine display status
  const displayValue = row['display-on-front-end'] || '';
  const displayOnFrontEnd = displayValue.toLowerCase() !== 'no' && displayValue.toLowerCase() !== 'false';

  const strapiData = {
    data: {
      wpId: isNaN(wpId) ? null : wpId,
      title: row['Title'] || '',
      slug: slug,
      content: row['Content'] || '',
      excerpt: row['Excerpt'] || '',
      videoTitle: row['video_title'] || row['Title'] || '',
      videoDescription: row['video_description'] || row['Content'] || row['Excerpt'] || '',
      youtubeUrl: row['youtube_url'] || '',
      videoCategory: row['video_category'] || '',
      ordering: isNaN(ordering) ? 50 : ordering,
      displayOnFrontEnd: displayOnFrontEnd,
      seo: seoComponent,
      publishedAt: new Date().toISOString()
    }
  };

  return strapiData;
}

// Main import function
async function importVideos() {
  console.log('🚀 Starting Videos Import...\n');

  const videos = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (row) => {
        videos.push(row);
      })
      .on('end', async () => {
        console.log(`📖 Reading CSV file...`);
        console.log(`✅ Parsed ${videos.length} videos from CSV\n`);

        // Check API access first
        console.log('🔍 Checking Strapi API access...\n');
        try {
          const testResponse = await fetch(STRAPI_API_URL);
          
          if (testResponse.status === 403) {
            console.log('❌ API Access Denied!\n');
            console.log('📋 Please enable API permissions:');
            console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
            console.log('   2. Go to Settings → Roles → Public');
            console.log('   3. Scroll to "Video" permissions');
            console.log('   4. Check: find, findOne, and create');
            console.log('   5. Click Save');
            console.log('   6. Run this script again\n');
            return;
          }

          console.log('✅ API access confirmed\n');
        } catch (error) {
          console.log('❌ Cannot connect to Strapi API');
          console.log('   Make sure Strapi is running: npm run develop\n');
          return;
        }

        // Import each video
        console.log('📤 Importing videos into Strapi...\n');
        
        let successCount = 0;
        let errorCount = 0;
        let skippedCount = 0;

        for (const row of videos) {
          try {
            const wpId = parseInt(row['id']);
            const title = row['Title'] || 'Untitled Video';

            // Check if video already exists
            const checkUrl = `${STRAPI_API_URL}?filters[wpId][$eq]=${wpId}`;
            const checkResponse = await fetch(checkUrl);
            const checkData = await checkResponse.json();

            if (checkData.data && checkData.data.length > 0) {
              console.log(`⏭️  Skipped video ${wpId} - ${title} (already exists)...`);
              skippedCount++;
              continue;
            }

            // Create video
            const strapiData = mapCsvToStrapi(row);
            const response = await fetch(STRAPI_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(strapiData),
            });

            if (response.ok) {
              console.log(`✅ Imported video ${wpId} - ${title}...`);
              successCount++;
            } else {
              const errorData = await response.text();
              console.log(`❌ Error importing video ${wpId}: Failed to create: ${response.status} - ${errorData}`);
              errorCount++;
            }
          } catch (error) {
            console.log(`❌ Error importing video ${row['id']}: ${error.message}`);
            errorCount++;
          }
        }

        console.log('\n============================================================');
        console.log('📊 IMPORT SUMMARY');
        console.log('============================================================');
        console.log(`Total videos in CSV: ${videos.length}`);
        console.log(`Successfully imported: ${successCount}`);
        console.log(`Skipped (already exist): ${skippedCount}`);
        console.log(`Errors: ${errorCount}`);
        console.log('============================================================\n');

        if (successCount > 0) {
          console.log('💡 TIP: You can now disable the "create" permission for Public role');
          console.log('   Settings → Roles → Public → Video → Uncheck "create"\n');
        }

        console.log('🎉 Import complete!\n');
        resolve();
      })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        reject(error);
      });
  });
}

// Run the import
importVideos().catch(console.error);

