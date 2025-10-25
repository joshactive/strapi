# Junior Tennis Camps Import Documentation

## Overview
This document outlines the process used to import Junior Tennis Camp data from the WordPress CSV export into Strapi.

## Source Data
- **CSV File**: `/Users/joshuathompson/Desktop/content-types/junior-tennis-camps-export.csv`
- **Total Records**: 3 junior tennis camps
- **Content Type**: `junior-tennis-camp`

## Schema Structure

### Collection Type: Junior Tennis Camp
Location: `/src/api/junior-tennis-camp/content-types/junior-tennis-camp/schema.json`

### Fields Mapped:

#### Basic Information
- `wpId` - WordPress post ID (unique identifier)
- `title` - Camp name
- `slug` - URL-friendly identifier
- `content` - Main content (richtext)
- `excerpt` - Short description

#### Location & Venue
- `venueName` - Name of the venue
- `shortLocationName` - Short location identifier
- `airport` - Nearest airport
- `country` - Country location
- `googleMapsSearchTerm` - Search term for maps
- `googleMapsUrl` - Direct Google Maps link
- `gettingThere` - Travel instructions

#### Camp Details
- `ageGroups` - Age range (e.g., "8-17 Year Olds")
- `tennisStandard` - Skill level required
- `residentialOrNonResidential` - Camp type
- `priceFrom` - Starting price
- `lengthOfTrip` - Duration of camp
- `boardBasis` - Meal plan type
- `maximumGroupSize` - Max participants
- `typicalGroupSize` - Average group size

#### Content Sections
- `mainHeader` - Main heading
- `headingText` - Subheading text
- `belowHeadingText` - Description below heading
- `introductionText` - Introduction section
- `mainInformation` - Main information content
- `diningInformation` - Dining details
- `lunchInformation` - Lunch arrangements
- `cafeInformation` - Café information
- `carParkingInformation` - Parking details

#### Venue Information
- `whyWeLoveVenue1-4` - Four reasons highlighting the venue
- `ourRating` - Internal rating (0-10)
- `tennisCourtSurface` - Court surface type
- `numberOfCourts` - Number of courts available
- `settingDescription` - Venue setting description
- `restaurantInformation` - Restaurant details
- `barInformation` - Bar details
- `tennisCourtsInfo` - Court facilities information
- `topTips` - Tips for attendees

#### Display & Organization
- `displayOnFrontEnd` - Whether to show publicly
- `ordering` - Sort order (1-99)
- `productType` - Product category
- `monthAvailable` - Available months
- `uniqueValue` - Unique identifier for listings

#### Media
- `featuredImage` - Main listing image
- `headerImage` - Header banner image
- `gallery` - Image gallery (multiple)

#### Contact
- `emailAddress` - Contact email for the camp
- `itineraryDownloadUrl` - PDF download link
- `otherFaqsUrl` - Link to additional FAQs

#### Repeatable Components

##### Itinerary (shared.itinerary-item)
- `heading` - Day/session name
- `content` - Schedule details
- **Source**: `itinerary_master` field (PHP serialized)

##### FAQs (shared.faq)
- `question` - FAQ question
- `answer` - FAQ answer (richtext)
- **Source**: `faq_master` or `faqs-juniorcamps` fields (PHP serialized)

##### Inclusions (shared.inclusion-item)
- `item` - What's included/excluded
- `included` - Boolean flag
- **Sources**: 
  - `what039s_included-master` (PHP serialized, included=true)
  - `what039s_not_included-master` (PHP serialized, included=false)

##### Facilities (shared.inclusion-item)
- `item` - Facility name
- `included` - Boolean flag (true for available)
- **Source**: `facilities_master_v2` or `facilities-junior-camps` (PHP serialized)

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
The schema was updated to include all necessary fields for junior tennis camps, including camp-specific fields like age groups, residential status, and lunch information.

### Step 2: Enable API Permissions
Before running the import:
1. Navigate to Strapi Admin: http://localhost:1337/admin
2. Go to Settings → Roles → Public
3. Find "Junior Tennis Camp" permissions
4. Enable: `find`, `findOne`, and `create`
5. Save changes

### Step 3: Run Import Script
```bash
node scripts/import-junior-camps.js
```

### Step 4: Disable Create Permission
After successful import:
1. Return to Settings → Roles → Public
2. Find "Junior Tennis Camp" permissions
3. Disable: `create`
4. Save changes

## Data Transformations

### PHP Serialized Arrays
The script handles PHP serialized data from WordPress:
- **Itinerary items**: Extracted heading and content pairs
- **FAQ items**: Extracted question and answer pairs
- **Inclusion items**: Converted to boolean flags
- **Facility items**: Converted to boolean availability flags

### Slug Generation
Slugs are extracted from the WordPress permalink or generated from the `unique_value_master` field.

### Price Conversion
Prices are parsed from various fields and converted to decimal format:
- `price-from-lg`
- `from-price-juniors`

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
- Various other WordPress metadata fields

## Import Results
The import script provides a summary including:
- Total camps processed
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
- Check console output for specific camp IDs

**Empty Email Validation Error**
- The schema has `required: false` for email
- Empty emails are converted to `null`

**Slug Conflicts**
- Slugs must be unique
- The script will report conflicts in the error summary

## Maintenance

### Adding New Camps
To add new camps from a CSV update:
1. Ensure Strapi is running
2. Enable `create` permission temporarily
3. Run the import script
4. Review the summary for any errors
5. Disable `create` permission

### Schema Updates
If new fields are needed:
1. Update `/src/api/junior-tennis-camp/content-types/junior-tennis-camp/schema.json`
2. Update the `mapCsvToStrapi()` function in `scripts/import-junior-camps.js`
3. Restart Strapi to apply schema changes
4. Re-run the import script

## Related Files
- Schema: `/src/api/junior-tennis-camp/content-types/junior-tennis-camp/schema.json`
- Import Script: `/scripts/import-junior-camps.js`
- CSV Source: `/Users/joshuathompson/Desktop/content-types/junior-tennis-camps-export.csv`

## Notes
- All camps are set to `publishedAt` on import (published state)
- Draft/publish workflow is enabled for the content type
- The import preserves WordPress post IDs for reference
- Rich text content is preserved as-is from WordPress HTML
- All repeatable components use the shared component definitions

