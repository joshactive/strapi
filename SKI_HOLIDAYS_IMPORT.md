# Ski Holidays Import Guide

This guide explains how to import Ski Holidays from the WordPress CSV export into Strapi.

## Overview

The import script (`scripts/import-ski-holidays.js`) reads data from a CSV export and creates Ski Holiday entries in Strapi, including:
- Basic holiday information (title, content, dates)
- Ski-specific details (pistes, skiing level, holiday type)
- Accommodation information (rooms, board basis, facilities)
- Itinerary items (daily schedule)
- FAQs
- Inclusions/exclusions
- SEO metadata (from AIOSEO fields)

## Prerequisites

1. **Strapi is running**: `npm run develop`
2. **CSV file location**: `/Users/joshuathompson/Desktop/content-types/ski-holidays-export.csv`
3. **API permissions enabled** (see below)

## Schema Structure

The Ski Holiday content type includes these main fields:

### Basic Fields
- `wpId`: Original WordPress ID (unique)
- `title`: Holiday name
- `slug`: URL-friendly identifier
- `content`: Main content (richtext)
- `excerpt`: Short description

### Ski-Specific Details
- `skiHolidayType`: Type of ski holiday (e.g., "Adult Hosted")
- `pistes`: Piste information (e.g., "180km of Pistes")
- `levelOfSkiing`: Required skiing level (e.g., "Improver - Advanced")
- `averageGroupSize`: Typical group size

### Location & Dates
- `venueName`: Venue/resort name
- `country`: Destination country
- `airport`: Nearest airport
- `distanceFromAirport`: Distance from airport
- `lengthOfTrip`: Duration (e.g., "7 days")
- `departureMonth`: Month of departure
- `arrivalDepartureDay`: Travel days

### Pricing & Details
- `priceFrom`: Starting price
- `singleOccupancy`: Single room pricing
- `singleOccupancyShort`: Short pricing description
- `perfectFor`: Target audience
- `boardBasis`: Meal plan included
- `starRating`: Resort/hotel rating

### Descriptive Content
- `mainHeader`: Main heading
- `headingText`: Subheading
- `mainInformation`: Main description
- `settingDescription`: Resort setting
- `boardBasisIncluded`: What's included in meals
- `restaurantInformation`: Dining details
- `barInformation`: Bar/après-ski info
- `roomsInformation`: Room details
- `topTips`: Tips for guests
- `locationAddress`: Resort location

### Display Settings
- `displayOnFrontEnd`: Show on website
- `ordering`: Display order (1=first, 99=last)
- `ourRating`: Internal rating (0-10)
- `whyWeLoveVenue1-4`: Highlight points

### Repeatable Components
- `itinerary`: Daily schedule (shared.itinerary-item)
- `faqs`: Frequently asked questions (shared.faq)
- `inclusions`: What's included/excluded (shared.inclusion-item)
- `facilities`: Resort facilities (shared.inclusion-item)

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
| `ski-length-of-trip` | `lengthOfTrip` | string |
| `ski-holiday-type` | `skiHolidayType` | string |
| `pistes` | `pistes` | string |
| `level-of-skiing` | `levelOfSkiing` | string |
| `ski-average-group-size` | `averageGroupSize` | string |
| `ski-price` | `priceFrom` | decimal |
| `ski-board-basis` | `boardBasis` | string |
| `ski-star-rating` | `starRating` | string |
| `ski-departure-month` | `departureMonth` | string |
| `ski-arrival-amp-departure-day` | `arrivalDepartureDay` | string |
| `ski-distance-from-airport` | `distanceFromAirport` | string |
| `ski-single-occupancy` | `singleOccupancy` | text |
| `ski-single-occupancy_short` | `singleOccupancyShort` | text |
| `ski-perfect-for` | `perfectFor` | string |
| `main-information` | `mainInformation` | richtext |
| `ski-rooms` | `roomsInformation` | richtext |
| `ski-what-does-my-board-basis-include` | `boardBasisIncluded` | richtext |
| `skirestaurant-information` | `restaurantInformation` | richtext |
| `ski-bar-information` | `barInformation` | richtext |
| `ski-location-address` | `locationAddress` | text |
| `google-maps-ski` | `googleMapsUrl` | text |
| `ski-download-itinerary` | `itineraryDownloadUrl` | text |
| `new-itinerary-ski` | `itinerary` | component (repeatable) |
| `ski-what039s-included` | `inclusions` | component (repeatable) |
| `ski-included-facilities` | `facilities` | component (repeatable) |
| `_aioseo_title` | `seo.metaTitle` | string |
| `_aioseo_description` | `seo.metaDescription` | text |
| `_aioseo_keywords` | `seo.keywords` | text |

## Enable API Permissions

Before running the import:

1. Go to: http://localhost:1337/admin
2. Navigate to: **Settings → Roles → Public**
3. Find **Ski Holiday** permissions
4. Check these permissions:
   - ✅ `find`
   - ✅ `findOne`
   - ✅ `create`
5. Click **Save**

## Running the Import

```bash
# From the Strapi root directory
node scripts/import-ski-holidays.js
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
   - Uncheck `create` for Ski Holiday
   - Save

2. **Verify the data**:
   - Go to Content Manager → Ski Holiday
   - Check a few entries for completeness
   - Test the API: http://localhost:1337/api/ski-holidays

## Data Processing Notes

### PHP Serialized Arrays
The script automatically deserializes PHP arrays from these fields:
- Itinerary items
- FAQ items
- Inclusion/exclusion items
- Facility items

### String Truncation
String fields are automatically truncated to 255 characters to fit database constraints. Text/richtext fields have no length limit.

### Duplicate Detection
Entries are identified by `wpId`. If a ski holiday with the same `wpId` already exists, it will be skipped.

### Auto-publishing
All imported entries are automatically published (`publishedAt` is set to current timestamp).

## Troubleshooting

### "API Access Denied"
- Enable the required permissions (see above)
- Make sure you saved the permission changes

### "Cannot connect to Strapi API"
- Ensure Strapi is running: `npm run develop`
- Wait for Strapi to fully start before running the import

### "value too long for type character varying(255)"
- String fields are automatically truncated
- If this error occurs, restart Strapi to pick up schema changes

### Import fails after schema changes
- Always restart Strapi after modifying the schema
- Clear `.cache` folder if issues persist: `rm -rf .cache`

## Example Output

```
🚀 Starting Ski Holidays Import...

📖 Reading CSV file...
✅ Parsed 5 ski holidays from CSV

🔍 Checking Strapi API access...
✅ API is accessible

📤 Importing ski holidays into Strapi...

✅ [1/5] Created: Adult Ski Holiday - 3* Hotel Monterosa (ID: 12357)
✅ [2/5] Created: Val d'Isere Ski Holiday (ID: 12456)
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

