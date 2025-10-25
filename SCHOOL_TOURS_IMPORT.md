# School Tennis Tours Import Guide

This guide explains how to import School Tennis Tours from the WordPress CSV export into Strapi.

## Overview

The import script (`scripts/import-school-tours.js`) reads data from a CSV export and creates School Tennis Tour entries in Strapi, including:
- Basic tour information (title, content, dates)
- Venue details (accommodation, facilities, rating)
- Tennis information (courts, standards, coaching)
- Itinerary items (daily schedule)
- FAQs
- Inclusions/exclusions
- SEO metadata (from AIOSEO fields)

## Prerequisites

1. **Strapi is running**: `npm run develop`
2. **CSV file location**: `/Users/joshuathompson/Desktop/content-types/school-tennis-tours-export.csv`
3. **API permissions enabled** (see below)

## Schema Structure

The School Tennis Tour content type includes these main fields:

### Basic Fields
- `wpId`: Original WordPress ID (unique)
- `title`: Tour name
- `slug`: URL-friendly identifier
- `content`: Main content (richtext)
- `excerpt`: Short description

### Venue & Location
- `venueName`: Venue/facility name
- `shortLocationName`: Short location
- `airport`: Nearest airport
- `country`: Destination country
- `distanceFromAirport`: Distance from airport

### Tour Details
- `lengthOfTrip`: Duration (e.g., "5 days")
- `availableMonths`: When tours are available
- `ageGroups`: Age range for participants
- `tennisStandard`: Required tennis level
- `residentialOrNonResidential`: Accommodation type
- `maximumGroupSize`: Max group size
- `typicalGroupSize`: Typical group size

### Pricing & Accommodation
- `priceFrom`: Starting price
- `boardBasis`: Meal plan included
- `starRating`: Accommodation rating
- `roomsInformation`: Room details

### Tennis Facilities
- `tennisCourtSurface`: Court type (e.g., "Clay")
- `numberOfCourts`: Number of courts
- `tennisCourtsInfo`: Detailed court information

### Descriptive Content
- `mainHeader`: Main heading
- `headingText`: Subheading
- `introductionText`: Introduction
- `mainInformation`: Main description
- `settingDescription`: Venue setting
- `restaurantInformation`: Dining details
- `barInformation`: Bar/refreshments
- `diningInformation`: Meal arrangements
- `lunchInformation`: Lunch details
- `cafeInformation`: Cafe information
- `carParkingInformation`: Parking details
- `topTips`: Tips for visitors
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
- `facilities`: Venue facilities (shared.inclusion-item)

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
| `school_tours_length_of_trip` | `lengthOfTrip` | string |
| `school_tours_available_months` | `availableMonths` | string |
| `age-groups-junior-camps` | `ageGroups` | string |
| `tennis-standard-junior-camps` | `tennisStandard` | string |
| `residential-or-non-residential-junior-camps` | `residentialOrNonResidential` | string |
| `price-from-lg` | `priceFrom` | decimal |
| `board-basis-lg` | `boardBasis` | string |
| `star-rating-tf` | `starRating` | string |
| `court-surface-tf` | `tennisCourtSurface` | string |
| `number-of-courts-tf` | `numberOfCourts` | string |
| `distance-from-airport-tf` | `distanceFromAirport` | string |
| `main-information-junior-camps` | `mainInformation` | richtext |
| `introduction-text-junior-camps` | `introductionText` | richtext |
| `rooms-tf` | `roomsInformation` | richtext |
| `itinerary_master` | `itinerary` | component (repeatable) |
| `faqs-juniorcamps` | `faqs` | component (repeatable) |
| `what039s-included-junior-camps` | `inclusions` | component (repeatable) |
| `facilities-junior-camps` | `facilities` | component (repeatable) |
| `_aioseo_title` | `seo.metaTitle` | string |
| `_aioseo_description` | `seo.metaDescription` | text |
| `_aioseo_keywords` | `seo.keywords` | text |

## Enable API Permissions

Before running the import:

1. Go to: http://localhost:1337/admin
2. Navigate to: **Settings → Roles → Public**
3. Find **School Tennis Tour** permissions
4. Check these permissions:
   - ✅ `find`
   - ✅ `findOne`
   - ✅ `create`
5. Click **Save**

## Running the Import

```bash
# From the Strapi root directory
node scripts/import-school-tours.js
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
   - Uncheck `create` for School Tennis Tour
   - Save

2. **Verify the data**:
   - Go to Content Manager → School Tennis Tour
   - Check a few entries for completeness
   - Test the API: http://localhost:1337/api/school-tennis-tours

## Data Processing Notes

### PHP Serialized Arrays
The script automatically deserializes PHP arrays from these fields:
- Itinerary items
- FAQ items
- Inclusion/exclusion items
- Facility items

### Duplicate Detection
Entries are identified by `wpId`. If a school tour with the same `wpId` already exists, it will be skipped.

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
🚀 Starting School Tennis Tours Import...

📖 Reading CSV file...
✅ Parsed 15 school tennis tours from CSV

🔍 Checking Strapi API access...
✅ API is accessible

📤 Importing school tennis tours into Strapi...

✅ [1/15] Created: Beach Club, Mallorca (ID: 45510)
✅ [2/15] Created: Tennis Academy, Spain (ID: 45623)
...

============================================================
Import Summary:
Successfully imported: 15
Skipped (already exist): 0
Errors: 0
============================================================

💡 TIP: You can now disable the "create" permission for Public role

🎉 Import complete!
```

