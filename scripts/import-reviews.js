const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_FILE_PATH = '/Users/joshuathompson/Desktop/content-types/reviews-export.csv';
const STRAPI_API_URL = 'http://localhost:1337/api/reviews';

// Helper: Extract slug from permalink
function extractSlug(permalink) {
  if (!permalink) return '';
  const match = permalink.match(/\/([^\/]+)\/?$/);
  return match ? match[1] : '';
}

// Helper: Truncate string to max length
function truncateString(value, maxLength = 255) {
  if (!value) return value;
  return value.length > maxLength ? value.substring(0, maxLength) : value;
}

// Helper: Parse date
function parseDate(dateString) {
  if (!dateString || dateString.trim() === '') return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.toISOString();
}

// Map CSV row to Strapi data structure
function mapCsvToStrapi(row) {
  const wpId = parseInt(row['id']);
  const title = row['Title'] || row['review_name'] || '';
  
  // Extract slug and sanitize it
  let slug = extractSlug(row['Permalink']) || row['review_unique_id'] || '';
  
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
    slug = row['review_unique_id'] || `review-${wpId}` || '';
  }

  // SEO Component
  const seoComponent = {
    metaTitle: truncateString(row['_aioseo_title'] || title, 255),
    metaDescription: row['_aioseo_description'] || row['Excerpt'] || '',
    keywords: row['_aioseo_keywords'] || ''
  };

  return {
    wpId: isNaN(wpId) ? null : wpId,
    title: truncateString(title, 255),
    slug: truncateString(slug, 255),
    content: row['Content'] || '',
    excerpt: row['Excerpt'] || '',
    reviewName: truncateString(row['review_name'] || '', 255),
    reviewerText: row['reviewer_text'] || '',
    reviewDate: parseDate(row['review_date']),
    reviewApplyTo: row['review_apply_to'] || '',
    reviewUrl: truncateString(row['review_url'] || '', 255),
    reviewUniqueId: truncateString(row['review_unique_id'] || '', 255),
    displayOnFrontEnd: true,
    ordering: 50,
    seo: seoComponent,
    publishedAt: new Date().toISOString()
  };
}

// Read CSV and parse data
async function readCsvData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// Create review in Strapi
async function createReview(reviewData) {
  try {
    const response = await fetch(STRAPI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: reviewData }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// Main import function
async function importReviews() {
  console.log('🚀 Starting Reviews Import...\n');

  try {
    // Read CSV
    console.log('📖 Reading CSV file...');
    const csvData = await readCsvData();
    console.log(`✅ Parsed ${csvData.length} reviews from CSV\n`);

    // Check API access
    console.log('🔍 Checking Strapi API access...');
    const testResponse = await fetch(STRAPI_API_URL);
    
    if (testResponse.status === 403) {
      console.log('❌ API Access Denied!\n');
      console.log('📋 Please enable API permissions:');
      console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
      console.log('   2. Go to Settings → Roles → Public');
      console.log('   3. Scroll to "Review" permissions');
      console.log('   4. Check: find, findOne, and create');
      console.log('   5. Click Save');
      console.log('   6. Run this script again\n');
      return;
    }

    if (!testResponse.ok && testResponse.status !== 404) {
      console.log('❌ Cannot connect to Strapi API');
      console.log('   Make sure Strapi is running: npm run develop\n');
      return;
    }

    console.log('✅ API access confirmed\n');

    // Import reviews
    console.log('📤 Importing reviews into Strapi...\n');
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const row of csvData) {
      try {
        const reviewData = mapCsvToStrapi(row);
        await createReview(reviewData);
        console.log(`✅ Imported review ${reviewData.wpId} - ${reviewData.title.substring(0, 60)}...`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error importing review ${row['id']}: ${error.message}`);
        errorCount++;
      }
    }

    // Summary
    console.log('\n============================================================');
    console.log('📊 IMPORT SUMMARY');
    console.log('============================================================');
    console.log(`Total reviews in CSV: ${csvData.length}`);
    console.log(`Successfully imported: ${successCount}`);
    console.log(`Skipped (already exist): ${skipCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log('============================================================\n');

    console.log('💡 TIP: You can now disable the "create" permission for Public role');
    console.log('   Settings → Roles → Public → Review → Uncheck "create"\n');

    console.log('🎉 Import complete!\n');

  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run import
importReviews();

