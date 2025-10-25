const fs = require('fs');
const csv = require('csv-parser');
const fetch = require('node-fetch');
const phpUnserialize = require('php-unserialize');

const CSV_PATH = '/Users/joshuathompson/strapi/strapi/csv/tennis-holidays-export.csv';
const STRAPI_URL = 'http://localhost:1337';

// Helper to parse PHP serialized data
function parsePhpSerialized(value) {
  if (!value || value === '') return null;
  try {
    return phpUnserialize.unserialize(value);
  } catch (e) {
    console.warn('Failed to parse PHP serialized data:', value.substring(0, 50));
    return null;
  }
}

// Helper to convert PHP array to inclusion items
function parseInclusionItems(phpArray) {
  if (!phpArray) return [];
  
  const items = [];
  for (const [key, value] of Object.entries(phpArray)) {
    if (key && value === 'true') {
      items.push({
        item: key,
        included: true
      });
    } else if (key && value === 'false') {
      items.push({
        item: key,
        included: false
      });
    }
  }
  return items;
}

// Helper to parse itinerary
function parseItinerary(phpArray) {
  if (!phpArray) return [];
  
  const items = [];
  for (const [, item] of Object.entries(phpArray)) {
    if (item && typeof item === 'object' && item.itinerary_heading_master_v2) {
      items.push({
        day: item.itinerary_heading_master_v2 || '',
        content: item.itinerary_content_master_v2 || ''
      });
    }
  }
  return items;
}

// Helper to parse FAQs
function parseFaqs(phpArray) {
  if (!phpArray) return [];
  
  const items = [];
  for (const [, item] of Object.entries(phpArray)) {
    if (item && typeof item === 'object' && item.faq_heading_master_v2) {
      items.push({
        question: item.faq_heading_master_v2 || '',
        answer: item.faq_content_master_v2 || ''
      });
    }
  }
  return items;
}

// Helper to parse key information
function parseKeyInformation(phpArray) {
  if (!phpArray) return [];
  
  const items = [];
  for (const [, item] of Object.entries(phpArray)) {
    if (item && typeof item === 'object') {
      const keyInfo = {
        title: item.hosted_holidays_info_1_title || item.hosted_holidays_info_2_title || '',
        info: item.hosted_holidays_info_1_info || item.hosted_holidays_info_2_info || '',
        link: item.holidays_holidays_1_link || item.holidays_holidays_2_link || ''
      };
      if (keyInfo.title) {
        items.push(keyInfo);
      }
    }
  }
  return items;
}

async function importTennisHolidays() {
  const holidays = [];
  
  console.log('📖 Reading CSV file...');
  
  // Read and parse CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        // Get the actual ID key (handling BOM)
        const idKey = Object.keys(row)[0];
        
        // Skip empty rows
        if (!row[idKey] || !row.Title) return;
        
        // Parse serialized PHP data
        const whatsIncluded = parsePhpSerialized(row['what039s_included-master']);
        const whatsNotIncluded = parsePhpSerialized(row['what039s_not_included-master']);
        const itinerary = parsePhpSerialized(row.itinerary_master);
        const faqs = parsePhpSerialized(row.faq_master);
        const facilities = parsePhpSerialized(row.facilities_master_v2);
        const keyInfo = parsePhpSerialized(row.key_information_repeater);
        
        // Map CSV columns to Strapi fields
        const holiday = {
          wpId: parseInt(row[idKey]),
          title: row.Title,
          slug: row.Title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, ''),
          excerpt: row.Excerpt || '',
          
          // SEO data
          seo: {
            metaTitle: row._aioseo_title || row.Title,
            metaDescription: row._aioseo_description || '',
            keywords: row._aioseo_keywords || '',
            canonicalURL: row.Permalink || ''
          },
          
          // Venue information
          venue: row.venue_master || '',
          shortLocationName: row.short_location_name_master || '',
          airport: row.airport_master || '',
          country: row.country_master || '',
          lengthOfTrip: row.length_of_trip || '',
          internalRating: row.internal_feedback_rating_10 ? parseFloat(row.internal_feedback_rating_10) : null,
          uniqueValue: row.unique_value_master || '',
          
          // Headers and content
          mainHeader: row.main_header_master || '',
          headingText: row.heading_text_master || '',
          singleOccupancyRange: row.single_occupancy_range_master || '',
          belowHeadingText: row.below_heading_text_master || '',
          
          // Why we love this venue
          whyWeLoveVenue1: row.why_we_love_this_venue_1 || '',
          whyWeLoveVenue2: row.why_we_love_this_venue_2 || '',
          whyWeLoveVenue3: row.why_we_love_this_venue_3 || '',
          whyWeLoveVenue4: row.why_we_love_this_venue_4 || '',
          
          // Ratings
          ourRating: row.our_rating_master ? parseInt(row.our_rating_master) : null,
          guestRating: row['guest_rating_1-10_master'] ? parseInt(row['guest_rating_1-10_master']) : null,
          tennisCourtRating: row['tennis-courts-1-10-master'] ? parseInt(row['tennis-courts-1-10-master']) : null,
          diningRating: row['dining-experience-1-10-master'] ? parseInt(row['dining-experience-1-10-master']) : null,
          
          // Tennis information
          tennisCourtSurface: row.tennis_court_surface_master || '',
          airportTransfer: row.airport_transfer_master || '',
          
          // Rich text content
          setting: row.setting_master_v2 || '',
          boardBasis: row.board_basis_masterv2 || '',
          restaurants: row.restaurants_v2_master || '',
          bars: row.bars_master_v2 || '',
          tennisCourts: row.tennis_courts_master_v2 || '',
          topTips: row.top_tips_master_v2 || '',
          gettingThere: row.getting_there || '',
          
          // Repeatable components
          whatsIncluded: parseInclusionItems(whatsIncluded),
          whatsNotIncluded: parseInclusionItems(whatsNotIncluded),
          facilities: parseInclusionItems(facilities),
          itinerary: parseItinerary(itinerary),
          faqs: parseFaqs(faqs),
          keyInformation: parseKeyInformation(keyInfo),
          
          // Additional information
          facilitiesExtraInfo: row.facilities_extra_information_master || '',
          otherFaqsUrl: row.other_faqs_url_master || '',
          googleMapsSearchTerm: row.google_maps_search_term || '',
          itineraryDownloadUrl: row.itinerary_download_url || '',
          itineraryDownloadUrl2: row.itinerary_download_url_2 || '',
          
          // Additional fields
          cafeInformation: row.cafe_information_clinics_master || '',
          carParkingInformation: row.car_parking_information_master || '',
          maximumGroupSize: row.maximum_group_size_master_clinic ? parseInt(row.maximum_group_size_master_clinic) : null,
          residentialType: row['residential_or_non-residential_camp'] || '',
          padelCourtsInfo: row.padel_courts_info || '',
          eventInformation: row.the_event_information_play_amp_watch || '',
          whereWeStay: row.where_do_we_stay_play_amp_watch || '',
          howWeGetAround: row.how_do_we_get_around_play_amp_watch || '',
          
          // Group organiser info
          groupOrganiserName: row.group_organiser_name_master || '',
          groupOrganiserProduct: row.group_organiser_product_master || '',
          groupOrganiserName2: row.group_organiser_name_master_2 || '',
          groupOrganiserWhatsappUrl: row.group_organiser_whatsapp_url_master || '',
          groupOrganiserOtherUrl: row.group_organiser_other_url || '',
          
          // School tours
          schoolToursLengthOfTrip: row.school_tours_length_of_trip || '',
          schoolToursAvailableMonths: row.school_tours_available_months || '',
          lunchInfo: row['lunch_-_junior_tennis_camps'] || '',
          typicalGroupSize: row.typical_group_size_master ? parseInt(row.typical_group_size_master) : null,
          
          // Booking information
          fullScreenVideo: row.full_screen_video_to_show || '',
          emailAddress: row.email_address_for_academy || null,
          
          // Tennis coach
          tennisCoachName: row.tennis_coach_name_1 || '',
          tennisCoachWhatsappUrl: row.tennis_coach_whatsapp_url || '',
          tennisCoachInfo: row.tennis_coach_info || '',
          
          // Listing grid data
          countryLg: row['country-lg'] || '',
          boardBasisLg: row['board-basis-lg'] || '',
          priceFrom: row['price-from-lg'] ? parseFloat(row['price-from-lg']) : null,
          displayOnFrontEnd: row['display-on-front-end'] === 'Yes',
          ordering: row['ordering---1--first--99--last'] ? parseInt(row['ordering---1--first--99--last']) : 99,
          uniqueValueForGrid: row.unique_value_for_listing_grid || '',
          productType: row.product_type_lg || '',
          singleOccupancyFrom: row.single_occupancy_from_lg ? parseFloat(row.single_occupancy_from_lg) : null,
          
          publishedAt: new Date() // Auto-publish
        };
        
        holidays.push(holiday);
      })
      .on('end', resolve)
      .on('error', reject);
  });
  
  console.log(`✅ Parsed ${holidays.length} tennis holidays from CSV\n`);
  
  // Check if API is accessible
  console.log('🔍 Checking Strapi API access...');
  const testResponse = await fetch(`${STRAPI_URL}/api/tennis-holidays`);
  
  if (testResponse.status === 403) {
    console.error('\n❌ API Access Denied!');
    console.error('\n📋 Please enable API permissions:');
    console.error('   1. Go to Strapi Admin: http://localhost:1337/admin');
    console.error('   2. Go to Settings → Roles → Public');
    console.error('   3. Scroll to "Tennis Holiday" permissions');
    console.error('   4. Check: find, findOne, and create');
    console.error('   5. Click Save');
    console.error('   6. Run this script again\n');
    process.exit(1);
  }
  
  if (!testResponse.ok) {
    throw new Error(`Strapi API error: ${testResponse.statusText}`);
  }
  
  console.log('✅ API access confirmed\n');
  console.log('📤 Importing tennis holidays into Strapi...\n');
  
  let imported = 0;
  let skipped = 0;
  let errors = 0;
  
  for (const holiday of holidays) {
    try {
      // Check if holiday already exists
      const checkUrl = `${STRAPI_URL}/api/tennis-holidays?filters[wpId][$eq]=${holiday.wpId}`;
      const checkResponse = await fetch(checkUrl);
      
      if (!checkResponse.ok) {
        throw new Error(`Failed to check existing holiday: ${checkResponse.statusText}`);
      }
      
      const checkData = await checkResponse.json();
      
      if (checkData.data && checkData.data.length > 0) {
        console.log(`⏭️  Skipping holiday ${holiday.wpId} - ${holiday.title.substring(0, 50)}... (already exists)`);
        skipped++;
        continue;
      }
      
      // Create the holiday
      const createUrl = `${STRAPI_URL}/api/tennis-holidays`;
      const createResponse = await fetch(createUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: holiday })
      });
      
      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        throw new Error(`Failed to create: ${createResponse.statusText} - ${errorText}`);
      }
      
      imported++;
      console.log(`✅ Imported holiday ${holiday.wpId} - ${holiday.title.substring(0, 50)}...`);
      
      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
      
    } catch (error) {
      errors++;
      console.error(`❌ Error importing holiday ${holiday.wpId}: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total holidays in CSV: ${holidays.length}`);
  console.log(`Successfully imported: ${imported}`);
  console.log(`Skipped (already exist): ${skipped}`);
  console.log(`Errors: ${errors}`);
  console.log('='.repeat(60));
  
  if (imported > 0) {
    console.log('\n💡 TIP: You can now disable the "create" permission for Public role');
    console.log('   Settings → Roles → Public → Tennis Holiday → Uncheck "create"');
  }
}

// Run the import
console.log('🚀 Starting Tennis Holidays Import...');
console.log('');

importTennisHolidays()
  .then(() => {
    console.log('');
    console.log('🎉 Import complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Import failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  });

