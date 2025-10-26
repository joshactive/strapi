# Featured Locations Auto-Sync

## 🎯 Overview

Your homepage carousel now **automatically syncs** with the `displayOnFrontEnd` field across all holiday types!

**Toggle `displayOnFrontEnd` = Featured Location is created/deleted automatically**

---

## ✨ What Was Created

### 1. **Sync Script** (One-time Setup)
**File:** `/scripts/sync-featured-locations.js`

Syncs all existing holidays with `displayOnFrontEnd: true` to Featured Locations.

**Run once:**
```bash
cd /Users/joshuathompson/strapi/strapi
STRAPI_URL=https://strapi-production-b96d.up.railway.app \
STRAPI_API_TOKEN=your_token \
node scripts/sync-featured-locations.js
```

**What it does:**
- ✅ Creates Featured Locations for holidays with `displayOnFrontEnd: true`
- 🗑️ Deletes Featured Locations for holidays with `displayOnFrontEnd: false`
- ✓ Keeps existing Featured Locations unchanged
- 🔄 Safe to re-run anytime

---

### 2. **Lifecycle Hooks** (Automatic)
**Files:**
- `/src/api/tennis-holiday/content-types/tennis-holiday/lifecycles.js`
- `/src/api/pickleball-holiday/content-types/pickleball-holiday/lifecycles.js`
- `/src/api/junior-tennis-camp/content-types/junior-tennis-camp/lifecycles.js`
- `/src/api/padel-tennis-holiday/content-types/padel-tennis-holiday/lifecycles.js`
- `/src/api/play-and-watch/content-types/play-and-watch/lifecycles.js`
- `/src/api/ski-holiday/content-types/ski-holiday/lifecycles.js`

**What they do:**
- 🎯 **Auto-create** Featured Location when `displayOnFrontEnd` toggled to `true`
- 🗑️ **Auto-delete** Featured Location when `displayOnFrontEnd` toggled to `false`
- 🔄 **Auto-cleanup** when holiday is deleted

---

### 3. **Shared Utility**
**File:** `/src/api/utils/featured-location-sync.js`

Helper functions used by all lifecycle hooks.

---

## 🚀 How to Use

### Initial Setup (Do This Once)

1. **Delete broken Featured Location entries:**
   ```
   Strapi Admin → Content Manager → Featured Location
   → Select All → Delete
   ```

2. **Run sync script:**
   ```bash
   cd /Users/joshuathompson/strapi/strapi
   STRAPI_URL=https://strapi-production-b96d.up.railway.app \
   STRAPI_API_TOKEN=your_token \
   node scripts/sync-featured-locations.js
   ```

3. **Restart Strapi:**
   ```bash
   npm run develop
   ```

---

### Daily Usage (Fully Automatic!)

#### To Feature a Holiday on Homepage:

1. Open any holiday (Tennis, Pickleball, etc.)
2. Toggle `displayOnFrontEnd` → **TRUE**
3. Save & Publish
4. ✅ **Automatically creates** Featured Location entry
5. 🎉 Holiday appears on homepage carousel immediately!

#### To Remove a Holiday from Homepage:

1. Open the holiday
2. Toggle `displayOnFrontEnd` → **FALSE**
3. Save & Publish
4. 🗑️ **Automatically deletes** Featured Location entry
5. 🎉 Holiday removed from homepage carousel!

#### To Delete a Holiday:

1. Delete the holiday
2. 🗑️ **Automatically deletes** its Featured Location entry
3. No orphaned entries!

---

## 📊 Example Workflow

### Scenario: Feature a New Tennis Holiday

**Before:**
- Homepage: Shows 24 holidays

**Steps:**
1. Go to: **Content Manager** → **Tennis Holiday**
2. Create new: "Summer Tennis Camp in France"
3. Set `displayOnFrontEnd: true`
4. Set `ordering: 1` (to show first)
5. Save & **Publish**

**After:**
- ✅ Featured Location automatically created
- 🎉 Homepage: Shows 25 holidays
- 🥇 "Summer Tennis Camp in France" shows first (order: 1)

---

### Scenario: Seasonal Promotion (Hide Summer, Show Ski)

**Before:**
- Homepage: Shows 13 tennis + 2 pickleball + 5 padel = 20 holidays

**Steps:**
1. **Hide summer holidays:**
   - Open each Tennis Holiday
   - Toggle `displayOnFrontEnd: false`
   - Save & Publish
   - 🗑️ Featured Locations auto-deleted

2. **Show ski holidays:**
   - Open each Ski Holiday
   - Toggle `displayOnFrontEnd: true`
   - Save & Publish
   - ✅ Featured Locations auto-created

**After:**
- Homepage: Shows 2 pickleball + 5 padel + 1 ski = 8 holidays
- 🎉 Seasonal content updated!

---

## 🔍 Verification

### Check Strapi Logs

When you toggle `displayOnFrontEnd`, you'll see in Strapi console:

**Toggled ON:**
```
✅ Created Featured Location for tennis_holiday:123
```

**Toggled OFF:**
```
🗑️  Deleted Featured Location for tennis_holiday:123
```

### Check Homepage

1. Refresh: http://localhost:4323
2. Check console: `📍 Featured Locations loaded: X`
3. Carousel updates immediately!

---

## 🛠️ Troubleshooting

### "Featured Location already exists" Error

**Normal!** The lifecycle hook checks before creating. If it exists, it just activates it.

### Holiday not showing on homepage after toggle

**Check:**
1. Did you **Publish** (not just Save)?
2. Refresh your Astro site
3. Check Strapi logs for errors
4. Check: Content Manager → Featured Location (should see entry)

### Sync script shows "0 created"

**This means:**
- No holidays have `displayOnFrontEnd: true`
- Or they're already synced
- ✅ This is OK!

### Re-run sync if needed

Safe to re-run anytime:
```bash
node scripts/sync-featured-locations.js
```

It won't duplicate entries.

---

## 📈 Benefits

### Before (Manual Management):
❌ Go to Featured Location collection
❌ Create new entry
❌ Select holiday type
❌ Select specific holiday
❌ Set order, active, etc.
❌ Save & Publish
❌ Remember to delete when holiday changes

### After (Automatic):
✅ Toggle `displayOnFrontEnd` in the holiday itself
✅ Everything else happens automatically
✅ No orphaned entries
✅ No manual Featured Location management
✅ Single source of truth: the holiday's `displayOnFrontEnd` field

---

## 🎯 Summary

**You now have:**
1. ✅ Automatic Featured Location creation/deletion
2. ✅ Single toggle: `displayOnFrontEnd`
3. ✅ No manual Featured Location management
4. ✅ Clean, no orphaned entries
5. ✅ Immediate homepage updates

**To feature a holiday:** Toggle `displayOnFrontEnd: true`
**To remove a holiday:** Toggle `displayOnFrontEnd: false`

**That's it!** 🎉

---

## 📝 Next Steps

After running the sync script:

1. ✅ Test: Toggle `displayOnFrontEnd` on a tennis holiday
2. ✅ Check: Featured Location automatically created
3. ✅ Verify: Homepage carousel updates
4. ✅ Test: Toggle `displayOnFrontEnd` off
5. ✅ Check: Featured Location automatically deleted
6. ✅ Deploy: Push changes to production

---

## 🚀 Deployment

These lifecycle hooks work in production too!

**Just:**
1. Push code to Git
2. Railway auto-deploys
3. Lifecycle hooks run automatically
4. Toggle `displayOnFrontEnd` in production Strapi
5. 🎉 Homepage updates!

No script needed in production - it's all automatic!

