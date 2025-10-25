const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_FILE_PATH = '/Users/joshuathompson/Desktop/content-types/products-export.csv';
const STRAPI_API_URL = 'http://localhost:1337/api/products';

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

// Map CSV row to Strapi data structure
function mapCsvToStrapi(row) {
  const wpId = parseInt(row['id']);
  const title = row['Title'] || row['title-product'] || '';
  
  // Extract slug and sanitize it
  let slug = extractSlug(row['Permalink']) || row['unique_value_master'] || '';
  
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
    slug = `product-${wpId}` || '';
  }

  // Parse ordering
  const ordering = parseInt(row['products_order_1__first__99__last'] || row['ordering---1--first--99--last'] || 50);
  
  // Parse price
  const priceFrom = parseFloat(row['from_price_product'] || 0);

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
    productTitle: truncateString(row['title-product'] || title, 255),
    productDescription: row['description_product'] || '',
    productUrl: truncateString(row['url_product'] || '', 255),
    priceFrom: isNaN(priceFrom) ? null : priceFrom,
    displayOnFrontEnd: true,
    ordering: isNaN(ordering) ? 50 : ordering,
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

// Create product in Strapi
async function createProduct(productData) {
  try {
    const response = await fetch(STRAPI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: productData }),
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
async function importProducts() {
  console.log('🚀 Starting Products Import...\n');

  try {
    // Read CSV
    console.log('📖 Reading CSV file...');
    const csvData = await readCsvData();
    console.log(`✅ Parsed ${csvData.length} products from CSV\n`);

    // Check API access
    console.log('🔍 Checking Strapi API access...');
    const testResponse = await fetch(STRAPI_API_URL);
    
    if (testResponse.status === 403) {
      console.log('❌ API Access Denied!\n');
      console.log('📋 Please enable API permissions:');
      console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
      console.log('   2. Go to Settings → Roles → Public');
      console.log('   3. Scroll to "Product" permissions');
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

    // Import products
    console.log('📤 Importing products into Strapi...\n');
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const row of csvData) {
      try {
        const productData = mapCsvToStrapi(row);
        await createProduct(productData);
        console.log(`✅ Imported product ${productData.wpId} - ${productData.title.substring(0, 60)}...`);
        successCount++;
      } catch (error) {
        console.log(`❌ Error importing product ${row['id']}: ${error.message}`);
        errorCount++;
      }
    }

    // Summary
    console.log('\n============================================================');
    console.log('📊 IMPORT SUMMARY');
    console.log('============================================================');
    console.log(`Total products in CSV: ${csvData.length}`);
    console.log(`Successfully imported: ${successCount}`);
    console.log(`Skipped (already exist): ${skipCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log('============================================================\n');

    console.log('💡 TIP: You can now disable the "create" permission for Public role');
    console.log('   Settings → Roles → Public → Product → Uncheck "create"\n');

    console.log('🎉 Import complete!\n');

  } catch (error) {
    console.error('❌ Import failed:', error.message);
    process.exit(1);
  }
}

// Run import
importProducts();

