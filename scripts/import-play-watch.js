const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_FILE_PATH = '/Users/joshuathompson/Desktop/content-types/play-watch-export.csv';
const STRAPI_API_URL = 'http://localhost:1337/api/play-and-watches';

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
  const itinerary = parseItineraryItems(row['itinerary-pw-new'] || row['itinerary_master'] || '');

  // Parse FAQs
  const faqs = parseFaqItems(row['faq-pw'] || row['faq_master'] || '');

  // Parse inclusions (what's included)
  const inclusionsData = parseInclusionItems(row['what039s-included-pw'] || row['what039s_included-master'] || '', true);
  const exclusionsData = parseInclusionItems(row['what039s-not-included-pw'] || row['what039s_not_included-master'] || '', false);
  const inclusions = [...inclusionsData, ...exclusionsData];

  // Parse facilities
  const facilities = parseInclusionItems(row['hotel-facilities-pw'] || row['facilities_master_v2'] || '', true);

  // Extract slug
  const slug = extractSlug(row['Permalink']) || row['unique_value_master'] || '';

  // Parse price
  const priceFrom = parseFloat(row['price-pw'] || row['price-from-lg'] || 0);

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
    destinationAirport: truncateString(row['destination-airport-pw'] || row['airport_master'] || '', 255),
    country: truncateString(row['country-pw'] || row['country-pw-2'] || row['country_master'] || row['country-lg'] || '', 255),
    lengthOfTrip: truncateString(row['length_of_trip'] || '', 255),
    mainHeader: truncateString(row['main_header_master'] || '', 255),
    headingText: row['heading_text_master'] || '',
    belowHeadingText: row['below_heading_text_master'] || '',
    mainInformation: row['main-information-pw'] || row['main-information-tf'] || '',
    tennisEvent: truncateString(row['tennis-event-pw'] || '', 255),
    tennisStandard: truncateString(row['tennis-standard-pw'] || '', 255),
    perfectFor: truncateString(row['perfect-for-pw'] || '', 255),
    singleOccupancy: row['single-occupancy-pw'] || row['single_occupancy_range_master'] || '',
    singleOccupancyShort: row['single-occupancy-pw_short'] || '',
    priceFrom: isNaN(priceFrom) ? null : priceFrom,
    tickets: row['tickets-pw'] || '',
    boardBasis: truncateString(row['board-basis-pw'] || row['board_basis_masterv2'] || row['board-basis-lg'] || '', 255),
    starRating: truncateString(row['star-rating-pw'] || row['star-rating-tf'] || '', 255),
    arrivalDepartureDay: truncateString(row['arrival-amp-departure-day-pw'] || '', 255),
    displayOnFrontEnd: displayOnFrontEnd,
    ordering: isNaN(ordering) ? 50 : ordering,
    productType: truncateString(row['product_type_lg'] || '', 255),
    uniqueValue: row['unique_value_master'] || row['unique_value_for_listing_grid'] || '',
    whyWeLoveVenue1: truncateString(row['why_we_love_this_venue_1'] || '', 255),
    whyWeLoveVenue2: truncateString(row['why_we_love_this_venue_2'] || '', 255),
    whyWeLoveVenue3: truncateString(row['why_we_love_this_venue_3'] || '', 255),
    whyWeLoveVenue4: truncateString(row['why_we_love_this_venue_4'] || '', 255),
    ourRating: parseFloat(row['our_rating_master'] || 0) || null,
    tennisCourts: truncateString(row['tennis-courts-pw'] || row['number-of-courts-tf'] || '', 255),
    theEvent: row['the-event-pw'] || row['the_event_information_play_amp_watch'] || '',
    whereWeStay: row['where-do-we-stay-pw'] || row['where_do_we_stay_play_amp_watch'] || '',
    howWeGetAround: row['how-do-we-get-around-pw'] || row['how_do_we_get_around_play_amp_watch'] || '',
    settingDescription: row['setting_master_v2'] || '',
    boardBasisIncluded: row['what-does-my-board-basis-include-pw'] || '',
    roomsInformation: row['rooms-pw'] || row['rooms-tf'] || '',
    topTips: row['top_tips_master_v2'] || '',
    moreInformation: row['more-information-padel'] || '',
    nonPlayerInformation: row['non-player-information'] || '',
    importantInfoAboutFlights: row['important-info-about-flights'] || '',
    flightSearching: row['flight-searching-pw'] || '',
    gettingThere: row['getting_there'] || '',
    googleMapsUrl: row['google-maps-pw'] || row['google-maps-ta'] || '',
    mapsAddress: row['maps-address-pw'] || '',
    itineraryDownloadUrl: row['download-itinerary-pw'] || row['itinerary_download_url'] || '',
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
async function importPlayAndWatch() {
  console.log('🚀 Starting Play & Watch Import...\n');

  const holidays = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (row) => {
        holidays.push(row);
      })
      .on('end', async () => {
        console.log(`📖 Reading CSV file...`);
        console.log(`✅ Parsed ${holidays.length} Play & Watch events from CSV\n`);

        // Check API access first
        console.log('🔍 Checking Strapi API access...\n');
        try {
          const testResponse = await fetch(STRAPI_API_URL);
          if (testResponse.status === 403) {
            console.log('❌ API Access Denied!\n');
            console.log('📋 Please enable API permissions:');
            console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
            console.log('   2. Go to Settings → Roles → Public');
            console.log('   3. Scroll to "Play And Watch" permissions');
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

        // Import each event
        console.log('📤 Importing Play & Watch events into Strapi...\n');
        
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
          console.log('   Settings → Roles → Public → Play And Watch → Uncheck "create"\n');
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
importPlayAndWatch().catch(console.error);

