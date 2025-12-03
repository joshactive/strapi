const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(process.cwd(), 'group-organisers-export.csv');
const CSV_OUTPUT_PATH = path.join(process.cwd(), 'group-organisers-export-with-image-id.csv');

// Helper to handle CSV parsing (basic implementation to handle quoted fields)
function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (i + 1 < line.length && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i++;
      } else {
        // Toggle quotes
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function escapeCsvField(field) {
  if (field === null || field === undefined) {
    return '';
  }
  const stringValue = String(field);
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

try {
  console.log('📖 Reading CSV file...');
  const fileContent = fs.readFileSync(CSV_PATH, 'utf8');
  const lines = fileContent.split('\n');
  
  if (lines.length === 0) {
    console.log('Empty CSV file.');
    process.exit(0);
  }

  const headers = parseCsvLine(lines[0]);
  const imageIndex = headers.indexOf('groupOrganiserImage');
  
  if (imageIndex === -1) {
    console.error('❌ "groupOrganiserImage" column not found.');
    process.exit(1);
  }

  // Add new header
  headers.push('groupOrganiserImageId');
  
  const newRows = [headers.map(escapeCsvField).join(',')];
  
  console.log('🔄 Processing rows...');
  let processed = 0;
  let foundImages = 0;

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const row = parseCsvLine(lines[i]);
    const imageJson = row[imageIndex];
    let imageId = '';

    if (imageJson) {
      try {
        // The CSV parser might have unescaped quotes, but the content is a JSON string
        // If it was wrapped in quotes in CSV, it's now a string representation of JSON
        const imageData = JSON.parse(imageJson);
        if (imageData && imageData.id) {
            imageId = imageData.id;
            foundImages++;
        }
      } catch (e) {
        // Ignore parse errors (empty or invalid JSON)
      }
    }

    row.push(imageId);
    newRows.push(row.map(escapeCsvField).join(','));
    processed++;
  }

  console.log(`💾 Writing updated CSV to ${CSV_OUTPUT_PATH}...`);
  fs.writeFileSync(CSV_OUTPUT_PATH, newRows.join('\n'));
  
  console.log(`🎉 Processed ${processed} rows.`);
  console.log(`✅ Found image IDs for ${foundImages} records.`);

} catch (error) {
  console.error('💥 Error processing CSV:', error);
  process.exit(1);
}

