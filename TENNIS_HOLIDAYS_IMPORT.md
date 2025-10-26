# Tennis Holidays Import Guide

## ✅ What Has Been Created

### 1. Shared Components (Reusable across all content types)

Created 4 new components in `/src/components/shared/`:

- **FAQ** (`faq.json`) - Question and Answer pairs
- **Itinerary Item** (`itinerary-item.json`) - Daily itinerary entries
- **Key Information** (`key-information.json`) - Info blocks with title, content, image, and link
- **Inclusion Item** (`inclusion-item.json`) - What's included/not included items

### 2. Tennis Holiday Schema

Updated `/src/api/tennis-holiday/content-types/tennis-holiday/schema.json` with **~80 fields** including:

#### Basic Information
- wpId (WordPress ID)
- title, slug, excerpt
- SEO component (mapped from AIOSEO fields)

#### Venue & Location
- venue, shortLocationName, airport, country
- lengthOfTrip, googleMapsSearchTerm
- Ratings (internal, guest, tennis courts, dining)

#### Content Areas (Rich Text)
- belowHeadingText
- setting, boardBasis, restaurants, bars
- tennisCourts, topTips, gettingThere
- Various info fields (cafe, parking, coach, etc.)

#### Repeatable Components
- **whatsIncluded** - List of inclusions
- **whatsNotIncluded** - List of exclusions
- **facilities** - Available facilities
- **itinerary** - Day-by-day schedule
- **faqs** - Frequently asked questions
- **keyInformation** - Info blocks with images

#### Media Fields
- headerImage
- mainGallery
- featuredImageLg
- Various booking images (courts, lessons, rackets, cardio)
- Group organiser images
- Tennis coach image

#### Pricing & Booking
- priceFrom, singleOccupancyFrom, singleOccupancyRange
- displayOnFrontEnd, ordering, featured
- Various URLs (itinerary downloads, booking links)

### 3. Import Script

Created `/scripts/import-tennis-holidays.js` that:

- ✅ Reads CSV with PHP serialized data
- ✅ Parses complex PHP arrays into Strapi components
- ✅ Maps AIOSEO fields to SEO component
- ✅ Handles BOM (Byte Order Mark) in CSV
- ✅ Converts repeatable data (FAQs, Itinerary, Inclusions)
- ✅ Checks for duplicates before importing
- ✅ Provides detailed progress reporting

## 🚀 How to Import

### Step 1: Restart Strapi
```bash
# Restart to load new components and schema
# Ctrl+C to stop, then restart
npm run develop
```

### Step 2: Enable API Permissions
1. Go to **http://localhost:1337/admin**
2. Navigate to **Settings** → **Roles** → **Public**
3. Scroll to **Tennis Holiday** permissions
4. Check: ✅ `find`, ✅ `findOne`, ✅ `create`
5. Click **Save**

### Step 3: Run the Import
```bash
node scripts/import-tennis-holidays.js
```

### Step 4: Disable Create Permission (Security)
After import completes:
1. Go to **Settings** → **Roles** → **Public**
2. Find **Tennis Holiday** permissions
3. **Uncheck** `create` (leave `find` and `findOne` checked)
4. Click **Save**

## 📊 Field Mapping

### SEO Fields
- `_aioseo_title` → `seo.metaTitle`
- `_aioseo_description` → `seo.metaDescription`
- `_aioseo_keywords` → `seo.keywords`
- `Permalink` → `seo.canonicalURL`

### PHP Serialized Arrays → Components

#### What's Included/Not Included
PHP: `a:63:{s:40:"Double Room";s:5:"true";...}`
Converts to: `[{item: "Double Room", included: true}, ...]`

#### Itinerary
PHP: `a:8:{s:6:"item-0";a:2:{s:27:"itinerary_heading_master_v2";s:8:"Saturday";...}}`
Converts to: `[{day: "Saturday", content: "Your tennis holiday begins!..."}]`

#### FAQs
PHP: `a:9:{s:6:"item-0";a:2:{s:21:"faq_heading_master_v2";s:54:"How much is...";...}}`
Converts to: `[{question: "How much is...", answer: "The impeccable..."}]`

## 🎯 Expected Results

After import, you should see:
- All Tennis Holiday entries in Content Manager
- Fully populated fields (text, rich text, media references)
- SEO data properly structured
- Repeatable components (FAQs, Itinerary, etc.) as nested data
- All entries published and ready for API consumption

## 🔧 Troubleshooting

### "API Access Denied" Error
- Make sure you enabled `find`, `findOne`, and `create` permissions

### "Failed to parse PHP serialized data"
- This is normal for some fields - the script will continue
- Check console for which fields had issues

### Duplicate Slugs Error
- Some holidays may have identical titles
- The script will report these as errors but continue

### Missing Media
- Media fields will be empty (need separate media import)
- Media IDs from WordPress won't exist in Strapi yet

## 📝 Notes

- **Media files are not imported** - Only references are stored
- You'll need to manually upload featured images later or create a separate media import
- The script handles ~557 rows based on the Events import pattern
- Estimated import time: 5-10 minutes depending on data volume
- Each record is checked for duplicates before creation

## 🔄 Re-running the Import

The script is idempotent:
- It checks `wpId` before creating
- Existing records are skipped
- You can safely re-run if it fails partway through

## 📞 API Endpoints

After import, available at:
- `GET /api/tennis-holidays` - List all holidays
- `GET /api/tennis-holidays?populate=*` - With all relations
- `GET /api/tennis-holidays/:id` - Single holiday
- `GET /api/tennis-holidays?filters[venue][$eq]=Sani Beach` - Filter by venue

---

✨ **Ready to import!** Follow the steps above to get your Tennis Holidays into Strapi.


