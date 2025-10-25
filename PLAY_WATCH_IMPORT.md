# Play & Watch Import Guide

This guide explains how to import Play & Watch events from the WordPress CSV export into Strapi.

## Overview

The import script (`scripts/import-play-watch.js`) reads data from a CSV export and creates Play & Watch entries in Strapi, including:
- Basic event information (title, content, dates)
- Event details (tennis event, tickets, venue)
- Accommodation information (rooms, board basis, facilities)
- Itinerary items (daily schedule)
- FAQs
- Inclusions/exclusions
- SEO metadata (from AIOSEO fields)

## Prerequisites

1. **Strapi is running**: `npm run develop`
2. **CSV file location**: `/Users/joshuathompson/Desktop/content-types/play-watch-export.csv`
3. **API permissions enabled** (see below)

## Schema Structure

The Play & Watch content type includes these main fields:

### Basic Fields
- `wpId`: Original WordPress ID (unique)
- `title`: Event name
- `slug`: URL-friendly identifier
- `content`: Main content (richtext)
- `excerpt`: Short description

### Event Details
- `tennisEvent`: The specific tennis event (e.g., "Barcelona Open")
- `tickets`: Ticket information
- `tennisStandard`: Required tennis level
- `perfectFor`: Target audience
- `tennisCourts`: Court information

### Location & Dates
- `venueName`: Venue/hotel name
- `country`: Destination country
- `destinationAirport`: Arrival airport
- `arrivalDepartureDay`: Travel days
- `lengthOfTrip`: Duration

### Pricing & Details
- `priceFrom`: Starting price
- `singleOccupancy`: Single room pricing
- `boardBasis`: Meal plan included
- `starRating`: Hotel rating

### Descriptive Content
- `theEvent`: About the tennis event
- `whereWeStay`: Accommodation details
- `howWeGetAround`: Transportation info
- `boardBasisIncluded`: What's included in meals
- `roomsInformation`: Room details
- `nonPlayerInformation`: Info for non-playing guests
- `importantInfoAboutFlights`: Flight requirements
- `flightSearching`: How to find flights

### Repeatable Components
- `itinerary`: Daily schedule (shared.itinerary-item)
- `faqs`: Frequently asked questions (shared.faq)
- `inclusions`: What's included/excluded (shared.inclusion-item)
- `facilities`: Hotel facilities (shared.inclusion-item)

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
| `tennis-event-pw` | `tennisEvent` | string |
| `tickets-pw` | `tickets` | text |
| `venue_master` | `venueName` | string |
| `country-pw` | `country` | string |
| `destination-airport-pw` | `destinationAirport` | string |
| `price-pw` | `priceFrom` | decimal |
| `board-basis-pw` | `boardBasis` | string |
| `star-rating-pw` | `starRating` | string |
| `the-event-pw` | `theEvent` | richtext |
| `where-do-we-stay-pw` | `whereWeStay` | richtext |
| `how-do-we-get-around-pw` | `howWeGetAround` | richtext |
| `rooms-pw` | `roomsInformation` | richtext |
| `non-player-information` | `nonPlayerInformation` | richtext |
| `important-info-about-flights` | `importantInfoAboutFlights` | richtext |
| `flight-searching-pw` | `flightSearching` | richtext |
| `itinerary-pw-new` | `itinerary` | component (repeatable) |
| `faq-pw` | `faqs` | component (repeatable) |
| `what039s-included-pw` | `inclusions` | component (repeatable) |
| `hotel-facilities-pw` | `facilities` | component (repeatable) |
| `_aioseo_title` | `seo.metaTitle` | string |
| `_aioseo_description` | `seo.metaDescription` | text |
| `_aioseo_keywords` | `seo.keywords` | text |

## Enable API Permissions

Before running the import:

1. Go to: http://localhost:1337/admin
2. Navigate to: **Settings → Roles → Public**
3. Find **Play And Watch** permissions
4. Check these permissions:
   - ✅ `find`
   - ✅ `findOne`
   - ✅ `create`
5. Click **Save**

## Running the Import

```bash
# From the Strapi root directory
node scripts/import-play-watch.js
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
   - Uncheck `create` for Play And Watch
   - Save

2. **Verify the data**:
   - Go to Content Manager → Play And Watch
   - Check a few entries for completeness
   - Test the API: http://localhost:1337/api/play-and-watches

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
Entries are identified by `wpId`. If a Play & Watch event with the same `wpId` already exists, it will be skipped.

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
🚀 Starting Play & Watch Import...

📖 Reading CSV file...
✅ Parsed 9 Play & Watch events from CSV

🔍 Checking Strapi API access...
✅ API is accessible

📤 Importing Play & Watch events into Strapi...

✅ [1/9] Created: Barcelona Tennis Play & Watch (ID: 18128)
✅ [2/9] Created: Roland Garros Play & Watch (ID: 18456)
...

============================================================
Import Summary:
Successfully imported: 9
Skipped (already exist): 0
Errors: 0
============================================================

💡 TIP: You can now disable the "create" permission for Public role

🎉 Import complete!
```

