// Import additional fields (FAQs, Itinerary, What's Included/Not Included) from CSV
// This script updates existing Strapi records without overwriting other data

const fs = require('fs');
const path = require('path');

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
  'school-tennis-tour': 'school-tennis-tours',
  'ski-holiday': 'ski-holidays',
  'tennis-clinic': 'tennis-clinics',
  'group-organiser': 'group-organisers'
};

/**
 * Parse PHP serialized array format
 * Handles both formats:
 * - Associative: a:6:{s:6:item-0;a:2:{...}}
 * - Indexed: a:8:{i:0;a:3:{...}}
 */
function parsePhpSerializedArray(str) {
  if (!str || str === '' || str === 'a:0:{}') {
    return [];
  }
  
  const items = [];
  
  // Try associative array format first: s:6:item-N
  let matches = [...str.matchAll(/s:6:item-(\d+);a:(\d+):\{/g)];
  
  // If no matches, try indexed array format: i:N;a:M:{
  if (matches.length === 0) {
    matches = [...str.matchAll(/i:(\d+);a:(\d+):\{/g)];
  }
  
  if (matches.length === 0) {
    console.log(`   ⚠️  Could not parse PHP array format`);
    return [];
  }
  
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const startPos = match.index + match[0].length;
    
    // Find the end of this item
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
    
    if (!endPos) {
      endPos = str.length;
    }
    
    const itemContent = str.substring(startPos, endPos);
    const item = {};
    
    // Extract all s:LENGTH:VALUE patterns
    let pos = 0;
    let currentKey = null;
    
    while (pos < itemContent.length) {
      const match = itemContent.slice(pos).match(/^s:(\d+):([^;]*);/);
      if (!match) {
        pos++;
        continue;
      }
      
      const length = parseInt(match[1]);
      const valueStart = match[0].indexOf(':') + 1;
      const valueEnd = valueStart + match[0].lastIndexOf(':') - valueStart;
      
      // Extract exact value by length from original position
      const actualStart = pos + match[0].lastIndexOf(':') + 1;
      let value = itemContent.substring(actualStart, actualStart + length);
      
      // Clean HTML entities
      value = value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&');
      
      if (!currentKey) {
        currentKey = value;
      } else {
        item[currentKey] = value;
        currentKey = null;
      }
      
      pos += match[0].length + length;
    }
    
    if (Object.keys(item).length > 0) {
      items.push(item);
    }
  }
  
  console.log(`   📋 Parsed ${items.length} items from PHP array`);
  
  return items;
}

/**
 * Convert FAQ data to Strapi format
 */
function convertFaqs(phpArray) {
  const items = parsePhpSerializedArray(phpArray);
  return items.map(item => ({
    question: item.faq_heading_master_v2 || '',
    answer: item.faq_content_master_v2 || ''
  }));
}

/**
 * Convert Itinerary data to Strapi format
 */
function convertItinerary(phpArray) {
  const items = parsePhpSerializedArray(phpArray);
  return items.map(item => ({
    day: item.itinerary_heading_master_v2 || '',
    content: item.itinerary_content_master_v2 || ''
  }));
}

/**
 * Convert What's Included/Not Included to Strapi format
 */
function convertInclusions(phpArray) {
  const items = parsePhpSerializedArray(phpArray);
  return items.map(item => ({
    item: item.inclusion_master_v2 || item.item || '',
    included: true
  }));
}

/**
 * Parse CSV file with proper quote handling
 */
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = [];
  
  // Split content into lines, handling multi-line fields
  let currentLine = '';
  let inQuotes = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentLine += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === '\n' && !inQuotes) {
      // End of line (not inside quotes)
      if (currentLine.trim()) {
        lines.push(currentLine);
      }
      currentLine = '';
    } else {
      currentLine += char;
    }
  }
  
  // Add last line
  if (currentLine.trim()) {
    lines.push(currentLine);
  }
  
  // Parse header
  const headers = parseCSVLine(lines[0]);
  
  const records = [];
  
  // Parse data lines
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    
    records.push(record);
  }
  
  return records;
}

/**
 * Parse a single CSV line with proper quote handling
 */
function parseCSVLine(line) {
  const values = [];
  let currentValue = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote - add one quote
        currentValue += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // Field separator
      values.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  // Add last value
  values.push(currentValue);
  
  return values;
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
    console.error(`❌ Error updating ${documentId}:`, error.message);
    throw error;
  }
}

/**
 * Main import function
 */
async function importFields() {
  console.log('📦 Starting import of additional fields...\n');
  
  const csvPath = '/Users/joshuathompson/Desktop/import fields.csv';
  
  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found:', csvPath);
    process.exit(1);
  }
  
  const records = parseCSV(csvPath);
  console.log(`📊 Found ${records.length} records in CSV\n`);
  
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  
  for (const record of records) {
    const postType = record['Post Type'];
    const documentId = record['document-id'];
    const title = record['Title'];
    
    if (!postType || !documentId) {
      console.log(`⏭️  Skipping: ${title} (missing post type or document ID)`);
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
      console.log(`   🔍 FAQ data length: ${record.faq_master.length} chars`);
      console.log(`   🔍 FAQ data preview: ${record.faq_master.substring(0, 200)}...`);
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
      console.log(`   ⏭️  No data to import for this record`);
      skippedCount++;
      continue;
    }
    
    try {
      await updateStrapiRecord(collectionType, documentId, updateData);
      console.log(`   ✅ Successfully updated`);
      successCount++;
      
      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));
      
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

