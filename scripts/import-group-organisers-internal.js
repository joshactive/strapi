const fs = require('fs');
const csv = require('csv-parser');
const phpUnserialize = require('php-unserialize');

const CSV_PATH = '/Users/joshuathompson/Desktop/content-types/group-organiser-export.csv';

// Helper to parse PHP serialized data
function parsePhpSerialized(value) {
  if (!value || value === '') return null;
  try {
    return phpUnserialize.unserialize(value);
  } catch (e) {
    return null;
  }
}

// Map CSV row to Strapi data structure
function mapRowToStrapi(row) {
  const data = {
    wordpressId: row['wordpress-id'] ? parseInt(row['wordpress-id']) : null,
    title: row['Title'] || '',
    venueMaster: row['venue_master'] || '',
    shortLocationNameMaster: row['short_location_name_master'] || '',
    airportMaster: row['airport_master'] || '',
    countryMaster: row['country_master'] || '',
    lengthOfTrip: row['length_of_trip'] || '',
    internalFeedbackRating10: row['internal_feedback_rating_10'] ? parseFloat(row['internal_feedback_rating_10']) : null,
    uniqueValueMaster: row['unique_value_master'] || '',
    mainHeaderMaster: row['main_header_master'] || '',
    headingTextMaster: row['heading_text_master'] || '',
    singleOccupancyRangeMaster: row['single_occupancy_range_master'] || '',
    belowHeadingTextMaster: row['below_heading_text_master'] || '',
    whyWeLoveThisVenue1: row['why_we_love_this_venue_1'] || '',
    whyWeLoveThisVenue2: row['why_we_love_this_venue_2'] || '',
    whyWeLoveThisVenue3: row['why_we_love_this_venue_3'] || '',
    whyWeLoveThisVenue4: row['why_we_love_this_venue_4'] || '',
    ourRatingMaster: row['our_rating_master'] ? parseInt(row['our_rating_master']) : null,
    tennisCourtSurfaceMaster: row['tennis_court_surface_master'] || '',
    airportTransferMaster: row['airport_transfer_master'] || '',
    guestRating110Master: row['guest_rating_1-10_master'] ? parseFloat(row['guest_rating_1-10_master']) : null,
    tennisCourts110Master: row['tennis-courts-1-10-master'] ? parseFloat(row['tennis-courts-1-10-master']) : null,
    diningExperience110Master: row['dining-experience-1-10-master'] ? parseFloat(row['dining-experience-1-10-master']) : null,
    whatsIncludedMaster: parsePhpSerialized(row['what039s_included-master']),
    whatsNotIncludedMaster: parsePhpSerialized(row['what039s_not_included-master']),
    settingMasterV2: row['setting_master_v2'] || '',
    boardBasisMasterv2: row['board_basis_masterv2'] || '',
    restaurantsV2Master: row['restaurants_v2_master'] || '',
    barsMasterV2: row['bars_master_v2'] || '',
    tennisCourtsMasterV2: row['tennis_courts_master_v2'] || '',
    topTipsMasterV2: row['top_tips_master_v2'] || '',
    facilitiesMasterV2: parsePhpSerialized(row['facilities_master_v2']),
    facilitiesExtraInformationMaster: row['facilities_extra_information_master'] || '',
    itineraryMaster: parsePhpSerialized(row['itinerary_master']),
    faqMaster: parsePhpSerialized(row['faq_master']),
    otherFaqsUrlMaster: row['other_faqs_url_master'] || '',
    gettingThere: row['getting_there'] || '',
    googleMapsSearchTerm: row['google_maps_search_term'] || '',
    itineraryDownloadUrl: row['itinerary_download_url'] || '',
    itineraryDownloadUrl2: row['itinerary_download_url_2'] || '',
    cafeInformationClinicsMaster: row['cafe_information_clinics_master'] || '',
    carParkingInformationMaster: row['car_parking_information_master'] || '',
    maximumGroupSizeMasterClinic: row['maximum_group_size_master_clinic'] ? parseInt(row['maximum_group_size_master_clinic']) : null,
    residentialOrNonResidentialCamp: row['residential_or_non-residential_camp'] || null,
    padelCourtsInfo: row['padel_courts_info'] || '',
    theEventInformationPlayWatch: row['the_event_information_play_amp_watch'] || '',
    whereDoWeStayPlayWatch: row['where_do_we_stay_play_amp_watch'] || '',
    howDoWeGetAroundPlayWatch: row['how_do_we_get_around_play_amp_watch'] || '',
    groupOrganiserNameMaster: row['group_organiser_name_master'] || '',
    groupOrganiserProductMaster: row['group_organiser_product_master'] || '',
    groupOrganiserNameMaster2: row['group_organiser_name_master_2'] || '',
    groupOrganiserWhatsappUrlMaster: row['group_organiser_whatsapp_url_master'] || '',
    groupOrganiserOtherUrl: row['group_organiser_other_url'] || '',
    schoolToursLengthOfTrip: row['school_tours_length_of_trip'] || '',
    schoolToursAvailableMonths: row['school_tours_available_months'] || '',
    lunchJuniorTennisCamps: row['lunch_-_junior_tennis_camps'] || '',
    typicalGroupSizeMaster: row['typical_group_size_master'] ? parseInt(row['typical_group_size_master']) : null,
    fullScreenVideoToShow: row['full_screen_video_to_show'] || '',
    emailAddressForAcademy: row['email_address_for_academy'] || '',
    bookCourtsInfo: row['book_courts_info'] || '',
    bookCourtsLink: row['book_courts_link'] || '',
    bookLessonsInfo: row['book_lessons_info'] || '',
    bookLessonsLink: row['book_lessons_link'] || '',
    bookRacketsInfo: row['book_rackets_info'] || '',
    bookRacketsLink: row['book_rackets_link'] || '',
    bookCardioInfo: row['book_cardio_info'] || '',
    bookCardioLink: row['book_cardio_link'] || '',
    tennisCoachName1: row['tennis_coach_name_1'] || '',
    tennisCoachWhatsappUrl: row['tennis_coach_whatsapp_url'] || '',
    tennisCoachInfo: row['tennis_coach_info'] || '',
    hostedHolidaysInfo1Title: row['hosted_holidays_info_1_title'] || '',
    hostedHolidaysInfo1Info: row['hosted_holidays_info_1_info'] || '',
    holidaysHolidays1Link: row['holidays_holidays_1_link'] || '',
    hostedHolidaysInfo2Title: row['hosted_holidays_info_2_title'] || '',
    hostedHolidaysInfo2Info: row['hosted_holidays_info_2_info'] || '',
    holidaysHolidays2Link: row['holidays_holidays_2_link'] || '',
    holidaysHolidays2LinkCopy: row['holidays_holidays_2_link_copy'] || '',
    excerpt: row['Excerpt'] || '',
    postType: row['Post Type'] || 'group-organiser',
    permalink: row['Permalink'] || '',
    wpOldSlug: row['_wp_old_slug'] || '',
    countryLg: row['country-lg'] || '',
    boardBasisLg: row['board-basis-lg'] || '',
    priceFromLg: row['price-from-lg'] ? parseFloat(row['price-from-lg']) : null,
    displayOnFrontEnd: row['display-on-front-end'] !== 'false',
    productTypeLg: row['product_type_lg'] || '',
    singleOccupancyFromLg: row['single_occupancy_from_lg'] ? parseFloat(row['single_occupancy_from_lg']) : null,
    publishedAt: new Date(), // Auto-publish
  };

  // Clean up - remove empty strings and nulls for optional fields
  Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] === null) {
      delete data[key];
    }
  });

  return data;
}

// Bootstrap Strapi
async function bootstrapStrapi() {
  const strapi = require('@strapi/strapi');
  const app = await strapi.default({
    distDir: './dist',
    autoReload: false,
  }).load();
  return app;
}

// Main import function
async function importGroupOrganisers() {
  console.log('🚀 Starting Group Organiser Import...');
  console.log('📦 Bootstrapping Strapi...');
  
  const strapi = await bootstrapStrapi();
  
  const rows = [];
  
  console.log('📖 Reading CSV file...');
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(CSV_PATH)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', async () => {
        console.log(`✅ Found ${rows.length} rows in CSV`);
        console.log('');
        
        let successCount = 0;
        let errorCount = 0;
        
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          
          try {
            const data = mapRowToStrapi(row);
            
            // Skip empty rows
            if (!data.title) {
              console.log(`⏭️  Skipping row ${i + 1} (no title)`);
              continue;
            }
            
            // Create entry using Strapi service
            await strapi.documents('api::group-organiser.group-organiser').create({
              data: data,
            });
            
            successCount++;
            console.log(`✅ [${successCount}/${rows.length}] Imported: ${data.title}`);
            
          } catch (error) {
            errorCount++;
            console.error(`❌ [${i + 1}] Error: ${error.message}`);
          }
        }
        
        console.log('');
        console.log('='.repeat(50));
        console.log(`✅ Successfully imported: ${successCount}`);
        console.log(`❌ Failed: ${errorCount}`);
        console.log('='.repeat(50));
        
        await strapi.destroy();
        resolve();
      })
      .on('error', reject);
  });
}

// Run the import
importGroupOrganisers()
  .then(() => {
    console.log('');
    console.log('🎉 Import complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Import failed:', error);
    process.exit(1);
  });

