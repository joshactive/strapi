const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const CSV_FILE_PATH = '/Users/joshuathompson/Desktop/content-types/tennis-academies-export.csv';
const STRAPI_API_URL = 'http://localhost:1337/api/tennis-academies';

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
  return match ? match[1] : '';
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
  const itinerary = parseItineraryItems(row['itinerary_master'] || '');

  // Parse FAQs
  const faqs = parseFaqItems(row['faq_master'] || row['faqs-juniorcamps'] || '');

  // Parse inclusions (what's included)
  const inclusionsData = parseInclusionItems(row['what039s_included-master'] || '', true);
  const exclusionsData = parseInclusionItems(row['what039s_not_included-master'] || '', false);
  const inclusions = [...inclusionsData, ...exclusionsData];

  // Parse facilities
  const facilities = parseInclusionItems(row['facilities_master_v2'] || row['facilities-junior-camps'] || '', true);

  // Extract slug and sanitize it
  let slug = extractSlug(row['Permalink']) || row['unique_value_master'] || '';
  
  // If slug is invalid (contains query params), create a fallback
  if (slug.includes('?') || slug.includes('&') || slug.includes('=')) {
    slug = row['unique_value_master'] || `academy-${wpId}` || '';
  }

  // Parse price
  const priceFrom = parseFloat(row['price-from-lg'] || row['from-price-juniors'] || 0);

  // Parse ordering
  const ordering = parseInt(row['ordering---1--first--99--last'] || 50);

  // Determine display status
  const displayOnFrontEnd = row['display-on-front-end'] === 'Yes';

  const strapiData = {
    wpId: isNaN(wpId) ? null : wpId,
    title: row['Title'] || '',
    slug: slug,
    content: row['Content'] || '',
    excerpt: row['Excerpt'] || '',
    venueName: row['venue_master'] || row['venue-name'] || row['venue'] || '',
    shortLocationName: row['short_location_name_master'] || '',
    airport: row['airport_master'] || '',
    country: row['country_master'] || row['country-jcamps'] || row['country-juniours'] || row['country-lg'] || '',
    lengthOfTrip: row['length_of_trip'] || row['length-of-event-juniors'] || '',
    mainHeader: row['main_header_master'] || row['title-juniors'] || '',
    headingText: row['heading_text_master'] || '',
    belowHeadingText: row['below_heading_text_master'] || '',
    mainInformation: row['main-information-tf'] || '',
    theHotel: row['the-hotel-tf'] || '',
    theTennis: row['the-tennis-tf'] || '',
    tennisAvailability: row['tennis-availabilty-tf'] || '',
    tennisCourtSurface: row['court-surface-tf'] || row['tennis_court_surface_master'] || '',
    numberOfCourts: row['number-of-courts-tf'] || '',
    kidsAndAdults: row['kids-amp-adults'] || '',
    distanceFromAirport: row['distance-from-airport-tf'] || '',
    courtRental: row['court-rental-tf'] || '',
    bookingTheHotel: row['booking-the-hotel'] || '',
    bookingTheTennis: row['booking-the-tennis'] || '',
    individualLessons: row['individual-lessons'] || '',
    individualLessonsUrl: row['individual-lessons_url'] || '',
    individualLessonInfo: row['individual-lesson-info'] || '',
    adultGroupLessonInfo: row['adult-group-lesson-info'] || '',
    kidsGroupLessonInfo: row['kids-group-lesson-info'] || '',
    racketRental: row['racket-rental'] || '',
    racketRentalUrl: row['racket-rental_url'] || '',
    racketRentalInfo: row['racket-rental-info'] || '',
    hittingPartner: row['hitting-partner'] || '',
    hittingPartnerUrl: row['hitting-partner_url'] || '',
    hittingPartnerInfo: row['hitting-partner-info'] || '',
    aboutTennisProgramme: row['about-the-tennis-programme'] || '',
    priceFrom: isNaN(priceFrom) ? null : priceFrom,
    boardBasis: row['board-basis-available-tf'] || row['board-basis-lg'] || row['board_basis_masterv2'] || '',
    starRating: row['star-rating-tf'] || '',
    displayOnFrontEnd: displayOnFrontEnd,
    ordering: isNaN(ordering) ? 50 : ordering,
    productType: row['product_type_lg'] || '',
    uniqueValue: row['unique_value_master'] || row['unique_value_for_listing_grid'] || '',
    whyWeLoveVenue1: row['why_we_love_this_venue_1'] || '',
    whyWeLoveVenue2: row['why_we_love_this_venue_2'] || '',
    whyWeLoveVenue3: row['why_we_love_this_venue_3'] || '',
    whyWeLoveVenue4: row['why_we_love_this_venue_4'] || '',
    ourRating: parseFloat(row['our_rating_master'] || 0) || null,
    settingDescription: row['setting_master_v2'] || '',
    restaurantInformation: row['restaurant-information-tf'] || row['restaurants_v2_master'] || '',
    barInformation: row['bar-information-tf'] || row['bars_master_v2'] || '',
    tennisFacilities: row['tennis-facilities-tf'] || row['tennis_courts_master_v2'] || '',
    roomsInformation: row['rooms-tf'] || '',
    topTips: row['top_tips_master_v2'] || '',
    cafeInformation: row['cafe_information_clinics_master'] || '',
    carParkingInformation: row['car_parking_information_master'] || '',
    gettingThere: row['getting_there'] || '',
    googleMapsSearchTerm: row['google_maps_search_term'] || '',
    googleMapsUrl: row['google-maps-ta'] || '',
    locationForMap: row['location-for-map-tf'] || '',
    itineraryDownloadUrl: row['itinerary_download_url'] || '',
    otherFaqsUrl: row['other_faqs_url_master'] || '',
    maximumGroupSize: parseInt(row['maximum_group_size_master_clinic']) || null,
    typicalGroupSize: row['typical_group_size_master'] || '',
    emailAddress: row['email_address_for_academy'] && 
                  row['email_address_for_academy'].trim() !== '' && 
                  row['email_address_for_academy'].toLowerCase() !== 'n/a' &&
                  row['email_address_for_academy'].includes('@')
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
async function importTennisAcademies() {
  console.log('🚀 Starting Tennis Academies Import...\n');

  const camps = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_FILE_PATH)
      .pipe(csv())
      .on('data', (row) => {
        camps.push(row);
      })
      .on('end', async () => {
        console.log(`📖 Reading CSV file...`);
        console.log(`✅ Parsed ${camps.length} tennis academies from CSV\n`);

        // Check API access first
        console.log('🔍 Checking Strapi API access...\n');
        try {
          const testResponse = await fetch(STRAPI_API_URL);
          if (testResponse.status === 403) {
            console.log('❌ API Access Denied!\n');
            console.log('📋 Please enable API permissions:');
            console.log('   1. Go to Strapi Admin: http://localhost:1337/admin');
            console.log('   2. Go to Settings → Roles → Public');
            console.log('   3. Scroll to "Tennis Academy" permissions');
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

        // Import each academy
        console.log('📤 Importing tennis academies into Strapi...\n');
        
        let successCount = 0;
        let errorCount = 0;
        let skippedCount = 0;

        for (const campData of camps) {
          const strapiData = mapCsvToStrapi(campData);
          
          try {
            const response = await fetch(STRAPI_API_URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: strapiData }),
            });

            if (response.ok) {
              console.log(`✅ Imported camp ${strapiData.wpId} - ${strapiData.title}...`);
              successCount++;
            } else {
              const errorData = await response.text();
              
              // Check if it's a duplicate
              if (errorData.includes('unique') || errorData.includes('already exists')) {
                console.log(`⏭️  Skipped camp ${strapiData.wpId} - ${strapiData.title} (already exists)...`);
                skippedCount++;
              } else {
                console.log(`❌ Error importing camp ${strapiData.wpId}: Failed to create: ${response.statusText} - ${errorData}`);
                errorCount++;
              }
            }
          } catch (error) {
            console.log(`❌ Error importing camp ${strapiData.wpId}: ${error.message}`);
            errorCount++;
          }
        }

        console.log('\n============================================================');
        console.log('📊 IMPORT SUMMARY');
        console.log('============================================================');
        console.log(`Total camps in CSV: ${camps.length}`);
        console.log(`Successfully imported: ${successCount}`);
        console.log(`Skipped (already exist): ${skippedCount}`);
        console.log(`Errors: ${errorCount}`);
        console.log('============================================================\n');

        if (successCount > 0) {
          console.log('💡 TIP: You can now disable the "create" permission for Public role');
          console.log('   Settings → Roles → Public → Tennis Academy → Uncheck "create"\n');
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
importTennisAcademies().catch(console.error);

