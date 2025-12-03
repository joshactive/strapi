const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(process.cwd(), 'group-organisers-export.json');
const CSV_PATH = path.join(process.cwd(), 'group-organisers-export.csv');

function escapeCsvField(field) {
  if (field === null || field === undefined) {
    return '';
  }
  
  let stringValue;
  if (typeof field === 'object') {
    stringValue = JSON.stringify(field);
  } else {
    stringValue = String(field);
  }

  // Escape quotes and wrap in quotes if it contains comma, quote or newline
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

try {
  console.log('📖 Reading JSON file...');
  const rawData = fs.readFileSync(JSON_PATH, 'utf8');
  const data = JSON.parse(rawData);
  
  console.log(`✅ Loaded ${data.length} records.`);

  if (data.length === 0) {
    console.log('No records to convert.');
    process.exit(0);
  }

  // Collect all unique keys from all objects to ensure we have all columns
  const headers = new Set();
  data.forEach(row => {
    Object.keys(row).forEach(key => headers.add(key));
  });
  
  const headerArray = Array.from(headers);
  
  console.log(`📊 Found ${headerArray.length} columns.`);

  // Create CSV content
  console.log('🔄 Converting to CSV...');
  const csvRows = [];
  
  // Add header row
  csvRows.push(headerArray.map(h => escapeCsvField(h)).join(','));
  
  // Add data rows
  data.forEach(row => {
    const values = headerArray.map(header => {
      return escapeCsvField(row[header]);
    });
    csvRows.push(values.join(','));
  });

  console.log('💾 Writing CSV file...');
  fs.writeFileSync(CSV_PATH, csvRows.join('\n'));
  
  console.log(`🎉 Successfully wrote ${data.length} records to ${CSV_PATH}`);

} catch (error) {
  console.error('💥 Error converting to CSV:', error);
  process.exit(1);
}

