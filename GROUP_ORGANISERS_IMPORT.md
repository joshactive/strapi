# Group Organisers Import Guide

## ✅ What Has Been Created

### 1. Group Organiser Schema

Updated `/src/api/group-organiser/content-types/group-organiser/schema.json` with **~80 fields** including:

#### Basic Information
- wpId (WordPress ID)
- title, slug, excerpt
- SEO component

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

#### Media Fields
- headerImage
- mainGallery
- Various booking images (courts, lessons, rackets, cardio)
- Group organiser images
- Tennis coach image

### 2. Import Script

Created `/scripts/import-group-organisers.js` that:

- ✅ Reads CSV with PHP serialized data
- ✅ Parses complex PHP arrays into Strapi components
- ✅ Handles BOM in CSV files
- ✅ Checks for duplicates (by wpId)
- ✅ Provides detailed progress reporting

---

## 🚀 How to Import

### Step 1: Restart Strapi
The schema has been updated, so Strapi needs to restart:

```bash
# Stop Strapi (Ctrl+C)
# Then restart:
npm run develop
```

### Step 2: Enable API Permissions
1. Go to **http://localhost:1337/admin**
2. Navigate to **Settings** → **Roles** → **Public**
3. Scroll to **Group Organiser** permissions
4. Check: ✅ `find`, ✅ `findOne`, ✅ `create`
5. Click **Save**

### Step 3: Run the Import
```bash
node scripts/import-group-organisers.js
```

The script will:
- Parse the CSV file
- Convert PHP serialized data to components
- Import all group organisers
- Show progress for each entry

### Step 4: Disable Create Permission (Security)
After import completes:
1. Go to **Settings** → **Roles** → **Public**
2. Find **Group Organiser** permissions
3. **Uncheck** `create` (leave `find` and `findOne` checked)
4. Click **Save**

---

## 📊 Expected Results

The script found **3,839 group organiser records** in the CSV.

After import, you should see:
- All Group Organiser entries in Content Manager
- Fully populated fields (text, rich text, media references)
- Repeatable components (FAQs, Itinerary, etc.) as nested data
- All entries published and ready for API consumption

---

## 📞 API Endpoints

After import, available at:
- `GET /api/group-organisers` - List all organisers
- `GET /api/group-organisers?populate=*` - With all relations
- `GET /api/group-organisers/:id` - Single organiser
- `GET /api/group-organisers?filters[venue][$eq]=Ikos Aria` - Filter by venue

---

✨ **Ready to import!** Follow the steps above to get your Group Organisers into Strapi.

