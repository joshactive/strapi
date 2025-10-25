# Tennis Academies Import Guide

This guide explains how to import Tennis Academies from the WordPress CSV export into Strapi.

## Overview

The import script (`scripts/import-tennis-academies.js`) reads data from a CSV export and creates Tennis Academy entries in Strapi, including:
- Basic academy information (title, content, location)
- Tennis facility details (courts, coaching, programs)
- Accommodation information (rooms, board basis)
- Booking information (lessons, equipment rental, hitting partners)
- Itinerary items (daily schedule)
- FAQs
- Inclusions/exclusions
- SEO metadata (from AIOSEO fields)

## Prerequisites

1. **Strapi is running**: `npm run develop`
2. **CSV file location**: `/Users/joshuathompson/Desktop/content-types/tennis-academies-export.csv`
3. **API permissions enabled** (see below)

## Schema Structure

The Tennis Academy content type includes these main fields:

### Basic Fields
- `wpId`: Original WordPress ID (unique)
- `title`: Academy name
- `slug`: URL-friendly identifier
- `content`: Main content (richtext)
- `excerpt`: Short description

### Location & Venue
- `venueName`: Academy/venue name
- `shortLocationName`: Short location
- `airport`: Nearest airport
- `country`: Destination country
- `distanceFromAirport`: Distance from airport

### Tennis Facilities
- `tennisCourtSurface`: Court surface type
- `numberOfCourts`: Number of courts
- `kidsAndAdults`: Kids/adults information
- `courtRental`: Court rental information
- `tennisFacilities`: Detailed facilities info

### Tennis Programs
- `theHotel`: Hotel information
- `theTennis`: Tennis program overview
- `tennisAvailability`: When tennis is available
- `aboutTennisProgramme`: About the program
- `bookingTheHotel`: How to book hotel
- `bookingTheTennis`: How to book tennis

### Lessons & Services
- `individualLessons`: Individual lesson availability
- `individualLessonsUrl`: Booking URL for individual lessons
- `individualLessonInfo`: Details about individual lessons
- `adultGroupLessonInfo`: Adult group lesson details
- `kidsGroupLessonInfo`: Kids group lesson details
- `racketRental`: Racket rental availability
- `racketRentalUrl`: Racket rental booking URL
- `racketRentalInfo`: Racket rental details
- `hittingPartner`: Hitting partner availability
- `hittingPartnerUrl`: Hitting partner booking URL
- `hittingPartnerInfo`: Hitting partner details

### Accommodation & Pricing
- `priceFrom`: Starting price
- `boardBasis`: Meal plan included
- `starRating`: Accommodation rating
- `roomsInformation`: Room details

### Descriptive Content
- `mainHeader`: Main heading
- `headingText`: Subheading
- `mainInformation`: Main description
- `settingDescription`: Venue setting
- `restaurantInformation`: Dining details
- `barInformation`: Bar/refreshments
- `cafeInformation`: Cafe information
- `carParkingInformation`: Parking details
- `topTips`: Tips for guests
- `gettingThere`: Travel information

### Display Settings
- `displayOnFrontEnd`: Show on website
- `ordering`: Display order (1=first, 99=last)
- `ourRating`: Internal rating (0-10)
- `whyWeLoveVenue1-4`: Highlight points

### Repeatable Components
- `itinerary`: Daily schedule (shared.itinerary-item)
- `faqs`: Frequently asked questions (shared.faq)
- `inclusions`: What's included/excluded (shared.inclusion-item)
- `facilities`: Academy facilities (shared.inclusion-item)

### SEO
- `seo`: SEO component with title, description, keywords

## CSV Field Mapping

Key CSV columns mapped to Strapi fields:

| CSV Column | Strapi Field | Type |
|------------|--------------|------|
| `id` | `wpId` | integer |
| `Title` | `title` | string |
| `Content` | `content` | richtext |
| `Excerpt` | `excerpt` | text |
| `venue_master` | `venueName` | string |
| `country_master` | `country` | string |
| `airport_master` | `airport` | string |
| `distance-from-airport-tf` | `distanceFromAirport` | string |
| `court-surface-tf` | `tennisCourtSurface` | string |
| `number-of-courts-tf` | `numberOfCourts` | string |
| `kids-amp-adults` | `kidsAndAdults` | string |
| `court-rental-tf` | `courtRental` | string |
| `main-information-tf` | `mainInformation` | richtext |
| `the-hotel-tf` | `theHotel` | richtext |
| `the-tennis-tf` | `theTennis` | richtext |
| `tennis-availabilty-tf` | `tennisAvailability` | richtext |
| `booking-the-hotel` | `bookingTheHotel` | richtext |
| `booking-the-tennis` | `bookingTheTennis` | richtext |
| `individual-lessons` | `individualLessons` | string |
| `individual-lessons_url` | `individualLessonsUrl` | string |
| `individual-lesson-info` | `individualLessonInfo` | richtext |
| `adult-group-lesson-info` | `adultGroupLessonInfo` | richtext |
| `kids-group-lesson-info` | `kidsGroupLessonInfo` | richtext |
| `racket-rental` | `racketRental` | string |
| `racket-rental_url` | `racketRentalUrl` | string |
| `racket-rental-info` | `racketRentalInfo` | richtext |
| `hitting-partner` | `hittingPartner` | string |
| `hitting-partner_url` | `hittingPartnerUrl` | string |
| `hitting-partner-info` | `hittingPartnerInfo` | richtext |
| `about-the-tennis-programme` | `aboutTennisProgramme` | richtext |
| `rooms-tf` | `roomsInformation` | richtext |
| `tennis-facilities-tf` | `tennisFacilities` | richtext |
| `restaurant-information-tf` | `restaurantInformation` | richtext |
| `bar-information-tf` | `barInformation` | richtext |
| `board-basis-available-tf` | `boardBasis` | string |
| `star-rating-tf` | `starRating` | string |
| `location-for-map-tf` | `locationForMap` | string |
| `google-maps-ta` | `googleMapsUrl` | string |
| `itinerary_master` | `itinerary` | component (repeatable) |
| `faq_master` | `faqs` | component (repeatable) |
| `what039s_included-master` | `inclusions` | component (repeatable) |
| `facilities_master_v2` | `facilities` | component (repeatable) |
| `_aioseo_title` | `seo.metaTitle` | string |
| `_aioseo_description` | `seo.metaDescription` | text |
| `_aioseo_keywords` | `seo.keywords` | text |

## Enable API Permissions

Before running the import:

1. Go to: http://localhost:1337/admin
2. Navigate to: **Settings → Roles → Public**
3. Find **Tennis Academy** permissions
4. Check these permissions:
   - ✅ `find`
   - ✅ `findOne`
   - ✅ `create`
5. Click **Save**

## Running the Import

```bash
# From the Strapi root directory
node scripts/import-tennis-academies.js
```

The script will:
1. Check API access
2. Parse the CSV file
3. Check for existing entries (by wpId)
4. Import new entries
5. Show a summary of successes/errors/skips

## After Import

1. **Disable create permission** for security:
   - Settings → Roles → Public
   - Uncheck `create` for Tennis Academy
   - Save

2. **Verify the data**:
   - Go to Content Manager → Tennis Academy
   - Check a few entries for completeness
   - Test the API: http://localhost:1337/api/tennis-academies

## Data Processing Notes

### PHP Serialized Arrays
The script automatically deserializes PHP arrays from these fields:
- Itinerary items
- FAQ items
- Inclusion/exclusion items
- Facility items

### Duplicate Detection
Entries are identified by `wpId`. If a tennis academy with the same `wpId` already exists, it will be skipped.

### Auto-publishing
All imported entries are automatically published (`publishedAt` is set to current timestamp).

## Troubleshooting

### "API Access Denied"
- Enable the required permissions (see above)
- Make sure you saved the permission changes

### "Cannot connect to Strapi API"
- Ensure Strapi is running: `npm run develop`
- Wait for Strapi to fully start before running the import

### Import fails after schema changes
- Always restart Strapi after modifying the schema
- Clear `.cache` folder if issues persist: `rm -rf .cache`

## Example Output

```
🚀 Starting Tennis Academies Import...

📖 Reading CSV file...
✅ Parsed 5 tennis academies from CSV

🔍 Checking Strapi API access...
✅ API is accessible

📤 Importing tennis academies into Strapi...

✅ [1/5] Created: 5* MarBella Resort, Corfu (ID: 16284)
✅ [2/5] Created: Tennis Academy, Spain (ID: 16456)
...

============================================================
Import Summary:
Successfully imported: 5
Skipped (already exist): 0
Errors: 0
============================================================

💡 TIP: You can now disable the "create" permission for Public role

🎉 Import complete!
```

