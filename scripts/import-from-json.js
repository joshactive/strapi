// Import FAQs, Itinerary, What's Included/Not Included from JSON file
// This script updates existing Strapi records without overwriting other data

const fs = require('fs');

// Strapi configuration
const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-b96d.up.railway.app';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_TOKEN) {
  console.error('❌ STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Collection type mapping
const COLLECTION_MAP = {
  'pickleball-holiday': 'pickleball-holidays',
  'padel-tennis-holiday': 'padel-tennis-holidays',
  'tennis-holiday': 'tennis-holidays',
  'junior-tennis-camp': 'junior-tennis-camps',
  'play-and-watch': 'play-and-watches',
  'play-and-watche': 'play-and-watches', // Handle typo
  'school-tennis-tour': 'school-tennis-tours',
  'ski-holiday': 'ski-holidays',
  'tennis-clinic': 'tennis-clinics',
  'group-organiser': 'group-organisers'
};

/**
 * Parse PHP serialized string format
 */
function parsePhpSerialized(str) {
  if (!str || str === '' || str === 'a:0:{}') {
    return [];
  }
  
  const items = [];
  
  // Match both associative (s:6:"item-N") and indexed (i:N) array formats
  const itemMatches = [...str.matchAll(/(?:s:6:"item-\d+"|i:\d+);a:\d+:\{/g)];
  
  for (let i = 0; i < itemMatches.length; i++) {
    const match = itemMatches[i];
    const startPos = match.index + match[0].length;
    
    // Find matching closing brace
    let endPos;
    let bracketCount = 1;
    for (let j = startPos; j < str.length; j++) {
      if (str[j] === '{') bracketCount++;
      if (str[j] === '}') {
        bracketCount--;
        if (bracketCount === 0) {
          endPos = j;
          break;
        }
      }
    }
    
    const itemContent = str.substring(startPos, endPos);
    const item = {};
    
    // Extract key-value pairs using string length
    const kvRegex = /s:(\d+):"([^"]+)";s:(\d+):"((?:[^"\\]|\\"|\\\\)*)"/g;
    let kvMatch;
    
    while ((kvMatch = kvRegex.exec(itemContent)) !== null) {
      const key = kvMatch[2];
      let value = kvMatch[4];
      
      // Unescape
      value = value
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '');
      
      item[key] = value;
    }
    
    if (Object.keys(item).length > 0) {
      items.push(item);
    }
  }
  
  return items;
}

/**
 * Strip ALL HTML tags from text - comprehensive cleaning
 */
function stripHTML(html) {
  if (!html) return '';
  
  let text = html;
  
  // Remove ALL HTML tags including those with attributes, newlines, etc.
  // This regex handles tags that span multiple lines
  text = text.replace(/<[^>]*>/g, '');
  
  // Also handle malformed tags that might have broken across lines
  text = text.replace(/<[^>]*/g, ''); // Unclosed tags
  text = text.replace(/[^<]*>/g, ''); // Tags without opening
  
  // Decode ALL HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…')
    .replace(/&euro;/g, '€')
    .replace(/&pound;/g, '£')
    .replace(/&copy;/g, '©')
    .replace(/&reg;/g, '®')
    .replace(/&trade;/g, '™')
    // Decode numeric entities
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9A-Fa-f]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
  
  // Clean up whitespace
  text = text
    .replace(/\n\n\n+/g, '\n\n') // Max 2 newlines
    .replace(/[ \t]+/g, ' ') // Multiple spaces to single
    .replace(/^\s+|\s+$/gm, '') // Trim each line
    .trim();
  
  return text;
}

/**
 * Convert FAQ data to Strapi format (with HTML stripped)
 */
function convertFaqs(phpString) {
  const items = parsePhpSerialized(phpString);
  return items.map(item => ({
    question: stripHTML(item.faq_heading_master_v2 || ''),
    answer: stripHTML(item.faq_content_master_v2 || '')
  })).filter(faq => faq.question && faq.answer);
}

/**
 * Convert Itinerary data to Strapi format (with HTML stripped)
 */
function convertItinerary(phpString) {
  const items = parsePhpSerialized(phpString);
  return items.map(item => ({
    day: stripHTML(item.itinerary_heading_master_v2 || ''),
    content: stripHTML(item.itinerary_content_master_v2 || '')
  })).filter(it => it.day && it.content);
}

/**
 * Convert What's Included/Not Included to Strapi format
 */
function convertInclusions(phpString) {
  if (!phpString || phpString === 'a:0:{}') {
    return [];
  }
  
  const items = [];
  
  // Match pattern: s:LENGTH:"ITEM_NAME";s:1:"true/false"
  const regex = /s:(\d+):"([^"]+)";s:\d+:"(true|false)"/g;
  let match;
  
  while ((match = regex.exec(phpString)) !== null) {
    const item = match[2];
    const included = match[3] === 'true';
    
    if (item && included) {
      items.push({
        item: item,
        included: true
      });
    }
  }
  
  return items;
}

/**
 * Update Strapi record with new fields
 */
async function updateStrapiRecord(collectionType, documentId, data) {
  try {
    const endpoint = `${STRAPI_URL}/api/${collectionType}/${documentId}`;
    
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`
      },
      body: JSON.stringify({ data })
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Main import function
 */
async function importFields() {
  console.log('📦 Starting import from JSON file...\n');
  
  const jsonPath = '/Users/joshuathompson/Desktop/import.json';
  
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ JSON file not found:', jsonPath);
    process.exit(1);
  }
  
  const records = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`📊 Found ${records.length} records in JSON\n`);
  
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  
  for (const record of records) {
    const postType = record['Post Type'];
    const documentId = record['document-id'];
    const title = record['Title'];
    
    if (!postType || !documentId) {
      skippedCount++;
      continue;
    }
    
    const collectionType = COLLECTION_MAP[postType];
    
    if (!collectionType) {
      console.log(`⏭️  Skipping: ${title} (unknown post type: ${postType})`);
      skippedCount++;
      continue;
    }
    
    console.log(`\n📝 Processing: ${title}`);
    console.log(`   Type: ${postType} → ${collectionType}`);
    console.log(`   Document ID: ${documentId}`);
    
    const updateData = {};
    
    // Parse and add FAQs
    if (record.faq_master && record.faq_master !== 'a:0:{}') {
      const faqs = convertFaqs(record.faq_master);
      if (faqs.length > 0) {
        updateData.faqs = faqs;
        console.log(`   ✅ FAQs: ${faqs.length} items`);
      }
    }
    
    // Parse and add Itinerary
    if (record.itinerary_master && record.itinerary_master !== 'a:0:{}') {
      const itinerary = convertItinerary(record.itinerary_master);
      if (itinerary.length > 0) {
        updateData.itinerary = itinerary;
        console.log(`   ✅ Itinerary: ${itinerary.length} items`);
      }
    }
    
    // Parse and add What's Included
    if (record['what039s_included-master'] && record['what039s_included-master'] !== 'a:0:{}') {
      const included = convertInclusions(record['what039s_included-master']);
      if (included.length > 0) {
        updateData.whatsIncluded = included;
        console.log(`   ✅ What's Included: ${included.length} items`);
      }
    }
    
    // Parse and add What's Not Included
    if (record['what039s_not_included-master'] && record['what039s_not_included-master'] !== 'a:0:{}') {
      const notIncluded = convertInclusions(record['what039s_not_included-master']);
      if (notIncluded.length > 0) {
        updateData.whatsNotIncluded = notIncluded;
        console.log(`   ✅ What's Not Included: ${notIncluded.length} items`);
      }
    }
    
    // Only update if we have data to add
    if (Object.keys(updateData).length === 0) {
      console.log(`   ⏭️  No data to import`);
      skippedCount++;
      continue;
    }
    
    try {
      await updateStrapiRecord(collectionType, documentId, updateData);
      console.log(`   ✅ Successfully updated`);
      successCount++;
      
      // Rate limiting - wait 200ms between requests
      await new Promise(resolve => setTimeout(resolve, 200));
      
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Import Summary:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   📦 Total: ${records.length}`);
  console.log('='.repeat(60));
}

// Run the import
importFields().catch(error => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});

