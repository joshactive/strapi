# Import All Holidays to Featured Locations

## Overview

This script automatically creates **Featured Location** entries for all existing holidays across all 6 holiday types. This gives you:

✅ **Performance**: 1 API call (not 6)
✅ **Completeness**: All holidays available
✅ **Control**: Enable/disable/reorder in Strapi Admin

---

## What It Does

1. Fetches all holidays from:
   - Tennis Holidays
   - Pickleball Holidays
   - Junior Tennis Camps
   - Padel Tennis Holidays
   - Play & Watch
   - Ski Holidays

2. Creates a **Featured Location** entry for each holiday

3. Sets:
   - `order`: From existing `ordering` field
   - `active`: `true` (all enabled)
   - `holiday_type`: Correct type
   - Relation: Links to the actual holiday
   - **Publishes** each entry automatically

4. **Skips duplicates**: Won't recreate existing featured locations

---

## How to Run

### Step 1: Make Sure Strapi is NOT Running

```bash
# Stop Strapi if it's running (Ctrl+C)
```

### Step 2: Run the Import Script

```bash
cd /Users/joshuathompson/strapi/strapi
node scripts/import-featured-locations.js
```

### Step 3: Wait for Completion

You'll see output like:
```
🚀 Starting Featured Locations import...

📋 Found 0 existing featured location entries
🔍 Processing 6 holiday types...

📦 Processing tennis-holiday...
   Found 25 tennis-holiday entries
   ✅ Created: 25 | ⏭️  Skipped (already exists): 0

📦 Processing pickleball-holiday...
   Found 12 pickleball-holiday entries
   ✅ Created: 12 | ⏭️  Skipped (already exists): 0

... (etc)

============================================================
📊 IMPORT SUMMARY
============================================================
✅ Total created: 87
⏭️  Total skipped: 0
📦 Total featured locations: 87
============================================================

✨ Import complete! Check Strapi Admin → Featured Locations
```

### Step 4: Restart Strapi

```bash
npm run develop
```

### Step 5: Verify in Strapi Admin

1. Go to **Content Manager** → **Featured Locations**
2. You should see all your holidays as featured location entries
3. All are **published** and `active: true`

---

## Expected Results

### Before Running Script:
- 0 Featured Locations
- Homepage carousel shows fallback data

### After Running Script:
- 87+ Featured Locations (varies by your data)
- All published and active
- Homepage carousel shows first 5 (by order)
- Sorted by `ordering` field from original holidays

---

## Customizing After Import

### Disable Specific Holidays

1. Open Featured Location entry in Strapi
2. Set `active: false`
3. Save & Publish
4. Won't appear on homepage

### Reorder Carousel

1. Change `order` field values
2. Lower numbers = appear first
3. Example: Set best holidays to `1, 2, 3, 4, 5`

### Feature Different Holidays by Season

1. Disable summer holidays in winter (`active: false`)
2. Enable ski holidays in winter (`active: true`)
3. No code changes needed!

---

## Re-Running the Script

**Safe to re-run!** The script:
- ✅ Checks for existing featured locations
- ✅ Skips duplicates (based on holiday ID)
- ✅ Only creates new entries for new holidays
- ✅ Won't duplicate existing entries

**When to re-run:**
- Added new holidays in Strapi
- Want to import new content
- Accidentally deleted featured locations

---

## Troubleshooting

### Error: "Cannot find module '@strapi/strapi'"

**Solution:**
```bash
cd /Users/joshuathompson/strapi/strapi
npm install
node scripts/import-featured-locations.js
```

### Error: "connect ECONNREFUSED"

**Solution:** Make sure Strapi is NOT running when you run the script.
```bash
# Stop Strapi first, then run script
node scripts/import-featured-locations.js
```

### Script runs but no entries created

**Check:**
1. Do holidays have `displayOnFrontEnd: true`?
2. Are holidays published?
3. Check script output for errors

**Debug:**
```bash
# Check tennis holidays count
node -e "
const strapi = require('@strapi/strapi');
(async () => {
  const app = await strapi({ distDir: './dist' }).load();
  const holidays = await strapi.entityService.findMany('api::tennis-holiday.tennis-holiday', { 
    filters: { displayOnFrontEnd: true } 
  });
  console.log('Tennis Holidays:', holidays.length);
  await app.destroy();
})();
"
```

### Featured Locations created but not showing on homepage

**Check:**
1. Featured Locations are **published** (not just saved)
2. `active` is set to `true`
3. Restart Astro dev server: `npm run dev`
4. Check console for: `📍 Featured Locations loaded: X`

---

## Performance Impact

### Before (Fallback Data):
- 0 API calls to Strapi for locations
- Hardcoded 3 tennis holidays

### After (All Holidays):
- **1 API call** to fetch featured locations
- Shows up to 5 on homepage carousel
- ~350ms load time
- All 87+ holidays available

### Future Pages:
Same Featured Locations API can power:
- `/locations` listing page (all featured)
- Category pages (filtered by type)
- Search results
- Related holidays sections

---

## Next Steps

After import, you can:

1. **Test Homepage**:
   ```bash
   cd /Users/joshuathompson/active-away-astro
   npm run dev
   ```
   Check console: `📍 Featured Locations loaded: X`

2. **Customize Order**:
   - Edit `order` field in Strapi
   - Best holidays: 1-5 (show on homepage)
   - Others: 10, 20, 30, etc.

3. **Create Listing Page** (Next task):
   - Show all active featured locations
   - Grid layout
   - Filters by type
   - Pagination

4. **Deploy**:
   - Push changes to Git
   - Cloudflare Pages auto-builds
   - Featured locations live!

---

## Reverting (If Needed)

If you want to start over:

1. **Delete All Featured Locations**:
   - Strapi Admin → Featured Locations
   - Select all → Delete
   
2. **Re-run Import**:
   ```bash
   node scripts/import-featured-locations.js
   ```

Or use SQL (faster for many entries):
```sql
-- In Railway/Postgres
TRUNCATE TABLE featured_locations CASCADE;
```

---

## File Reference

**Script Location:**
```
/Users/joshuathompson/strapi/strapi/scripts/import-featured-locations.js
```

**Created Entries:**
- Content Type: `api::featured-location.featured-location`
- Collection: `featured_locations` (database)
- Strapi Admin: Content Manager → Featured Locations

**Related Code:**
- Astro: `src/utils/strapi.js` → `getFeaturedLocations()`
- Component: `src/components/LocationsTailwind.astro`

---

## Support

**Console Output:**
- `✅ Created: X` - Successfully created entries
- `⏭️  Skipped: X` - Already existed (duplicates)
- `❌ Error:` - Check error message

**Verification:**
1. Strapi Admin → Content Manager → Featured Locations
2. Should see entries for all holidays
3. All published (green indicator)
4. All `active: true`

**Expected Counts** (approximate):
- Tennis Holidays: ~25
- Pickleball: ~12
- Junior Camps: ~15
- Padel: ~8
- Play & Watch: ~10
- Ski: ~6
- **Total: ~75-100 entries**

---

Ready to run! 🚀

```bash
cd /Users/joshuathompson/strapi/strapi
node scripts/import-featured-locations.js
```

