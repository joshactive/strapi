const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_FILE_PATH = '/Users/joshuathompson/Desktop/content-types/pickleball-holidays-export.csv';
const STRAPI_API_URL = 'http://localhost:1337/api/pickleball-holidays';

// PHP unserialize helper
function phpUnserialize(serializedString) {
  if (!serializedString || serializedString.trim() === '') {
    return null;
  }

  try {
    // Handle serialized arrays: a:N:{...}
    const arrayMatch = serializedString.match(/^a:(\d+):\{(.+)\}$/s);
    if (arrayMatch) {
      const result = {};
      const content = arrayMatch[2];
      
      // Simple key-value extraction for serialized PHP arrays
      const itemRegex = /s:\d+:"([^"]+)";s:\d+:"([^"]*)"/g;
      let match;
      
      while ((match = itemRegex.exec(content)) !== null) {
        const key = match[1];
        const value = match[2];
        result[key] = value;
      }
      
      return result;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing PHP serialized data:', error.message);
    return null;
  }
}

// Helper to parse itinerary items
function parseItineraryItems(serializedData) {
  if (!serializedData || serializedData.trim() === '') {
    return [];
  }

  try {
    const items = [];
    const itemRegex = /s:6:"item-(\d+)";a:2:\{s:\d+:"([^"]+)";s:\d+:"([^"]*)";s:\d+:"([^"]+)";s:\d+:"([^"]*)";?\}/g;
    let match;

    while ((match = itemRegex.exec(serializedData)) !== null) {
      const item = {
        day: match[3],
        content: match[5]
      };
      items.push(item);
    }

    return items;
  } catch (error) {
    console.error('Error parsing itinerary items:', error.message);
    return [];
  }
}

// Helper to parse FAQ items
function parseFaqItems(serializedData) {
  if (!serializedData || serializedData.trim() === '') {
    return [];
  }

  try {
    const items = [];
    const itemRegex = /s:6:"item-(\d+)";a:2:\{s:\d+:"([^"]+)";s:\d+:"([^"]*)";s:\d+:"([^"]+)";s:\d+:"([^"]*)";?\}/g;
    let match;

    while ((match = itemRegex.exec(serializedData)) !== null) {
      const item = {
        question: match[3],
        answer: match[5]
      };
      items.push(item);
    }

    return items;
  } catch (error) {
    console.error('Error parsing FAQ items:', error.message);
    return [];
  }
}

// Helper to parse inclusion items (what's included/not included, facilities)
function parseInclusionItems(serializedData, includedByDefault = true) {
  if (!serializedData || serializedData.trim() === '') {
    return [];
  }

  try {
    const phpData = phpUnserialize(serializedData);
    if (!phpData) return [];

    const items = [];
    for (const [key, value] of Object.entries(phpData)) {
      const included = value === 'true';
      // Only include items that match the includedByDefault parameter
      if (includedByDefault ? included : !included) {
        items.push({
          item: key,
          included: included
        });
      }
    }

    return items;
  } catch (error) {
    console.error('Error parsing inclusion items:', error.message);
    return [];
  }
}

// Extract slug from permalink
function extractSlug(permalink) {
  if (!permalink) return '';
  const match = permalink.match(/\/([^\/]+)\/?$/);
  const slug = match ? match[1] : '';
  // Truncate slug to 240 characters to be safe with UID field limits
  return slug.length > 240 ? slug.substring(0, 240) : slug;
}

// Helper to truncate string fields to max length
function truncateString(value, maxLength = 255) {
  if (!value) return value;
  return value.length > maxLength ? value.substring(0, maxLength) : value;
}

// Map CSV row to Strapi data structure
function mapCsvToStrapi(row) {
  const firstKey = Object.keys(row)[0];
  const wpId = parseInt(row[firstKey] || row['id']);

  // Parse AIOSEO data for SEO component
  const seoComponent = {
    metaTitle: row['_aioseo_title'] || row['Title'] || '',
    metaDescription: row['_aioseo_description'] || '',
    keywords: row['_aioseo_keywords'] || ''
  };

  // Parse itinerary
  const itinerary = parseItineraryItems(row['itinerary---padel'] || row['itinerary_master'] || '');

  // Parse FAQs
  const faqs = parseFaqItems(row['faq---padel'] || row['faq_master'] || '');

  // Parse inclusions (what's included)
  const inclusionsData = parseInclusionItems(row['what039s-included-pt'] || row['what039s_included-master'] || '', true);
  const exclusionsData = parseInclusionItems(row['what039s-not-included-pt'] || row['what039s_not_included-master'] || '', false);
  const inclusions = [...inclusionsData, ...exclusionsData];

  // Parse facilities
  const facilities = parseInclusionItems(row['included-facilities-pt'] || row['facilities_master_v2'] || '', true);

  // Extract slug
  const slug = extractSlug(row['Permalink']) || row['unique_value_master'] || '';

  // Parse price
  const priceFrom = parseFloat(row['price-pt'] || row['price-pt_869'] || row['price-from-lg'] || 0);

  // Parse ordering
  const ordering = parseInt(row['ordering---1--first--99--last'] || 50);

  // Determine display status
  const displayOnFrontEnd = row['display-on-front-end'] === 'Yes';

  const strapiData = {
    wpId: isNaN(wpId) ? null : wpId,
    title: truncateString(row['Title'] || '', 255),
    slug: slug,
    content: row['Content'] || '',
    excerpt: row['Excerpt'] || '',
    venueName: truncateString(row['venue_master'] || row['venue-name'] || row['venue'] || '', 255),
    shortLocationName: truncateString(row['short_location_name_master'] || '', 255),
    airport: truncateString(row['airport_master'] || row['arrival-airport-pt'] || '', 255),
    country: truncateString(row['country_master'] || row['country-pt'] || row['country-lg'] || '', 255),
    lengthOfTrip: truncateString(row['length_of_trip'] || '', 255),
    mainHeader: truncateString(row['main_header_master'] || '', 255),
    headingText: row['heading_text_master'] || '',
    belowHeadingText: row['below_heading_text_master'] || '',
    mainInformation: row['main-information-pt'] || row['main-information-tf'] || '',
    pickleballStandard: truncateString(row['padel-tennis-standard'] || '', 255),
    perfectFor: truncateString(row['perfect-for-pt'] || '', 255),
    singleOccupancy: row['single-occupancy-pt'] || row['single_occupancy_range_master'] || '',
    singleOccupancyShort: row['single-occupancy-short-pt'] || '',
    priceFrom: isNaN(priceFrom) ? null : priceFrom,
    boardBasis: truncateString(row['board-basis-pt'] || row['board_basis_masterv2'] || row['board-basis-lg'] || '', 255),
    starRating: truncateString(row['star-rating-pt'] || row['star-rating-tf'] || '', 255),
    departureMonth: truncateString(row['departure-month-pt'] || '', 255),
    arrivalDepartureDay: truncateString(row['arrival-amp-departure-day-pt'] || '', 255),
    displayOnFrontEnd: displayOnFrontEnd,
    ordering: isNaN(ordering) ? 50 : ordering,
    productType: truncateString(row['product_type_lg'] || '', 255),
    uniqueValue: row['unique_value_master'] || row['unique_value_for_listing_grid'] || '',
    whyWeLoveVenue1: truncateString(row['why_we_love_this_venue_1'] || '', 255),
    whyWeLoveVenue2: truncateString(row['why_we_love_this_venue_2'] || '', 255),
    whyWeLoveVenue3: truncateString(row['why_we_love_this_venue_3'] || '', 255),
    whyWeLoveVenue4: truncateString(row['why_we_love_this_venue_4'] || '', 255),
    ourRating: parseFloat(row['our_rating_master'] || 0) || null,
    pickleballCourtSurface: truncateString(row['tennis_court_surface_master'] || row['court-surface-tf'] || '', 255),
    numberOfPickleballCourts: truncateString(row['number-of-padel-court'] || row['number-of-courts-tf'] || '', 255),
    distanceFromAirport: truncateString(row['distance-from-airport-pt'] || row['distance-from-airport-tf'] || '', 255),
    pickleballCourtsInfo: row['padel_courts_info'] || row['tennis_courts_master_v2'] || '',
    settingDescription: row['setting_master_v2'] || '',
    boardBasisIncluded: row['what-does-my-board-basis-include-pt'] || '',
    restaurantInformation: row['restaurant-information-pt'] || row['restaurants_v2_master'] || '',
    barInformation: row['bar-information-pt'] || row['bars_master_v2'] || '',
    roomsInformation: row['rooms-pt'] || row['rooms-tf'] || '',
    topTips: row['top_tips_master_v2'] || '',
    moreInformation: row['more-information-padel'] || '',
    gettingThere: row['getting_there'] || '',
    googleMapsSearchTerm: row['google_maps_search_term'] || '',
    googleMapsUrl: row['google-maps-padel'] || row['google-maps-ta'] || '',
    itineraryDownloadUrl: row['download-itinerary-pt'] || row['itinerary_download_url'] || '',
    otherFaqsUrl: row['other_faqs_url_master'] || '',
    typicalGroupSize: truncateString(row['typical-group-size-padel'] || row['typical_group_size_master'] || '', 255),
    emailAddress: row['email_address_for_academy'] && row['email_address_for_academy'].trim() !== '' 
      ? row['email_address_for_academy'] 
      : null,
    itinerary: itinerary,
    faqs: faqs,
    inclusions: inclusions,
    facilities: facilities,
    seo: seoComponent,
    publishedAt: new Date().toISOString()
  };

  return strapiData;
}

// Main import function
async function importPickleballHolidays() {
  console.log('🚀 Starting Pickleball Holidays Import...\n');

  const holidays = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (row) => {
        holidays.push(row);
      })
      .on('end', async () => {
        console.log(`📖 Reading CSV file...`);
        console.log(`✅ Parsed ${holidays.length} pickleball holidays from CSV\n`);

        // Check API access first
        console.log('🔍 Checking Strapi API access...\n');
        try {
          const testResponse = await fetch(STRAPI_API_URL);
          if (testResponse.status === 403) {
            console.log('❌ API Access Denied!\n');
            console.log('📋 Please enable API permissions:');
            console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
            console.log('   2. Go to Settings → Roles → Public');
            console.log('   3. Scroll to "Pickleball Holiday" permissions');
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

        // Import each holiday
        console.log('📤 Importing pickleball holidays into Strapi...\n');
        
        let successCount = 0;
        let errorCount = 0;
        let skippedCount = 0;

        for (const holidayData of holidays) {
          const strapiData = mapCsvToStrapi(holidayData);
          
          try {
            const response = await fetch(STRAPI_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: strapiData }),
            });

            if (response.ok) {
              console.log(`✅ Imported holiday ${strapiData.wpId} - ${strapiData.title}...`);
              successCount++;
            } else {
              const errorData = await response.text();
              
              // Check if it's a duplicate
              if (errorData.includes('unique') || errorData.includes('already exists')) {
                console.log(`⏭️  Skipped holiday ${strapiData.wpId} - ${strapiData.title} (already exists)...`);
                skippedCount++;
              } else {
                console.log(`❌ Error importing holiday ${strapiData.wpId}: Failed to create: ${response.statusText} - ${errorData}`);
                errorCount++;
              }
            }
          } catch (error) {
            console.log(`❌ Error importing holiday ${strapiData.wpId}: ${error.message}`);
            errorCount++;
          }
        }

        console.log('\n============================================================');
        console.log('📊 IMPORT SUMMARY');
        console.log('============================================================');
        console.log(`Total holidays in CSV: ${holidays.length}`);
        console.log(`Successfully imported: ${successCount}`);
        console.log(`Skipped (already exist): ${skippedCount}`);
        console.log(`Errors: ${errorCount}`);
        console.log('============================================================\n');

        if (successCount > 0) {
          console.log('💡 TIP: You can now disable the "create" permission for Public role');
          console.log('   Settings → Roles → Public → Pickleball Holiday → Uncheck "create"\n');
        }

        console.log('🎉 Import complete!\n');
        resolve();
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV file:', error);
        reject(error);
      });
  });
}

// Run the import
importPickleballHolidays().catch(console.error);

