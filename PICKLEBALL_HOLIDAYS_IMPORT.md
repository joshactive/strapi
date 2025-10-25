# Pickleball Tennis Holidays Import Documentation

## Overview
This document outlines the process used to import Pickleball Tennis Holiday data from the WordPress CSV export into Strapi.

## Source Data
- **CSV File**: `/Users/joshuathompson/Desktop/content-types/pickleball-tennis-holidays-export.csv`
- **Total Records**: 567 pickleball tennis holidays
- **Content Type**: `pickleball-tennis-holiday`

## Schema Structure

### Collection Type: Pickleball Tennis Holiday
Location: `/src/api/pickleball-tennis-holiday/content-types/pickleball-tennis-holiday/schema.json`

### Fields Mapped:

#### Basic Information
- `wpId` - WordPress post ID (unique identifier)
- `title` - Holiday name
- `slug` - URL-friendly identifier
- `content` - Main content (richtext)
- `excerpt` - Short description

#### Location & Venue
- `venueName` - Name of the venue/hotel
- `shortLocationName` - Short location identifier
- `airport` - Nearest airport
- `country` - Country location
- `distanceFromAirport` - Distance from airport
- `googleMapsSearchTerm` - Search term for maps
- `googleMapsUrl` - Direct Google Maps link
- `gettingThere` - Travel instructions

#### Holiday Details
- `pickleballStandard` - Skill level required
- `perfectFor` - Who the holiday is perfect for
- `singleOccupancy` - Single room pricing details
- `singleOccupancyShort` - Short single occupancy info
- `priceFrom` - Starting price
- `lengthOfTrip` - Duration of holiday
- `boardBasis` - Meal plan type
- `boardBasisIncluded` - What's included in board basis
- `starRating` - Hotel star rating
- `departureMonth` - Available departure months
- `arrivalDepartureDay` - Arrival and departure days

#### Content Sections
- `mainHeader` - Main heading
- `headingText` - Subheading text
- `belowHeadingText` - Description below heading
- `mainInformation` - Main information content
- `moreInformation` - Additional information
- `restaurantInformation` - Restaurant details
- `barInformation` - Bar details
- `roomsInformation` - Room details

#### Venue Information
- `whyWeLoveVenue1-4` - Four reasons highlighting the venue
- `ourRating` - Internal rating (0-10)
- `pickleballCourtSurface` - Court surface type
- `numberOfPickleballCourts` - Number of pickleball courts
- `pickleballCourtsInfo` - Detailed pickleball court information
- `settingDescription` - Venue setting description
- `topTips` - Tips for participants

#### Display & Organization
- `displayOnFrontEnd` - Whether to show publicly
- `ordering` - Sort order (1-99)
- `productType` - Product category
- `uniqueValue` - Unique identifier for listings

#### Media
- `featuredImage` - Main listing image
- `headerImage` - Header banner image
- `gallery` - Image gallery (multiple)

#### Contact
- `emailAddress` - Contact email for the holiday
- `itineraryDownloadUrl` - PDF download link
- `otherFaqsUrl` - Link to additional FAQs
- `typicalGroupSize` - Typical group size

#### Repeatable Components

##### Itinerary (shared.itinerary-item)
- `day` - Day/session name
- `content` - Schedule details
- **Sources**: 
  - `itinerary---pickleball` (PHP serialized)
  - `itinerary_master` (PHP serialized, fallback)

##### FAQs (shared.faq)
- `question` - FAQ question
- `answer` - FAQ answer (richtext)
- **Sources**: 
  - `faq---pickleball` (PHP serialized)
  - `faq_master` (PHP serialized, fallback)

##### Inclusions (shared.inclusion-item)
- `item` - What's included/excluded
- `included` - Boolean flag
- **Sources**: 
  - `what039s-included-pt` (PHP serialized, included=true)
  - `what039s-not-included-pt` (PHP serialized, included=false)
  - Fallback to `what039s_included-master` and `what039s_not_included-master`

##### Facilities (shared.inclusion-item)
- `item` - Facility name
- `included` - Boolean flag (true for available)
- **Sources**: 
  - `included-facilities-pt` (PHP serialized)
  - `facilities_master_v2` (PHP serialized, fallback)

#### SEO Component (shared.seo)
- `metaTitle` - SEO title
- `metaDescription` - SEO description
- `keywords` - SEO keywords
- **Sources**: 
  - `_aioseo_title`
  - `_aioseo_description`
  - `_aioseo_keywords`

## Import Process

### Step 1: Update Schema
The schema was updated to include all necessary fields for pickleball tennis holidays, including pickleball-specific fields like court information, pickleball standard, and holiday-specific details.

### Step 2: Enable API Permissions
Before running the import:
1. Navigate to Strapi Admin: http://localhost:1337/admin
2. Go to Settings → Roles → Public
3. Find "Pickleball Tennis Holiday" permissions
4. Enable: `find`, `findOne`, and `create`
5. Save changes

### Step 3: Run Import Script
```bash
node scripts/import-pickleball-holidays.js
```

### Step 4: Disable Create Permission
After successful import:
1. Return to Settings → Roles → Public
2. Find "Pickleball Tennis Holiday" permissions
3. Disable: `create`
4. Save changes

## Data Transformations

### PHP Serialized Arrays
The script handles PHP serialized data from WordPress:
- **Itinerary items**: Extracted day and content pairs
- **FAQ items**: Extracted question and answer pairs
- **Inclusion items**: Converted to boolean flags
- **Facility items**: Converted to boolean availability flags

### Slug Generation
Slugs are extracted from the WordPress permalink or generated from the `unique_value_master` field.

### Price Conversion
Prices are parsed from various fields and converted to decimal format:
- `price-pt`
- `price-pt_869`
- `price-from-lg` (fallback)

### Email Handling
Empty email addresses are converted to `null` instead of empty strings to pass validation.

### Display Status
The `display-on-front-end` field is converted from "Yes"/"No" to boolean.

## Fields Excluded from Import
The following CSV fields were not imported as they are WordPress-specific or not relevant to Strapi:
- All `_elementor_*` fields (page builder data)
- All `aux_*` fields (theme-specific settings)
- `ekit_post_views_count`
- `tp_widgets`
- Checkfront booking fields (`pickleball-holiday-1-checkfront`, etc.)
- Various other WordPress metadata fields

## Import Results
The import script provides a summary including:
- Total holidays processed
- Successfully imported
- Skipped (duplicates based on unique wpId)
- Errors encountered

## Troubleshooting

### Common Issues

**API Access Denied (403)**
- Solution: Enable API permissions as outlined in Step 2

**Strapi Not Running**
- Solution: Start Strapi with `npm run develop`

**Duplicate Entries**
- The `wpId` field is unique - duplicates will be skipped
- Check console output for specific holiday IDs

**Empty Email Validation Error**
- The schema has `required: false` for email
- Empty emails are converted to `null`

**Slug Conflicts**
- Slugs must be unique
- The script will report conflicts in the error summary

## Maintenance

### Adding New Holidays
To add new holidays from a CSV update:
1. Ensure Strapi is running
2. Enable `create` permission temporarily
3. Run the import script
4. Review the summary for any errors
5. Disable `create` permission

### Schema Updates
If new fields are needed:
1. Update `/src/api/pickleball-tennis-holiday/content-types/pickleball-tennis-holiday/schema.json`
2. Update the `mapCsvToStrapi()` function in `scripts/import-pickleball-holidays.js`
3. Restart Strapi to apply schema changes
4. Re-run the import script

## Related Files
- Schema: `/src/api/pickleball-tennis-holiday/content-types/pickleball-tennis-holiday/schema.json`
- Import Script: `/scripts/import-pickleball-holidays.js`
- CSV Source: `/Users/joshuathompson/Desktop/content-types/pickleball-tennis-holidays-export.csv`

## Notes
- All holidays are set to `publishedAt` on import (published state)
- Draft/publish workflow is enabled for the content type
- The import preserves WordPress post IDs for reference
- Rich text content is preserved as-is from WordPress HTML
- All repeatable components use the shared component definitions
- Pickleball-specific fields differentiate this from regular tennis holidays

