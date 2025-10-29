# Venues Page Import Guide

This directory contains files to automatically set up the Venues Page content type in Strapi.

## Files

1. **`schema-venues-page.json`** - Content type schema definition
2. **`data-venues-page.json`** - Sample/default data
3. **`import-venues-page.js`** - Automated import script
4. **`README-VENUES-IMPORT.md`** - This file

## Quick Start

### Automated Setup (Recommended)

```bash
# Make sure you're in the Strapi root directory
cd /Users/joshuathompson/strapi/strapi

# Run the import script
node import-venues-page.js

# Restart Strapi
npm run develop
```

The script will:
- ✅ Create the `venues-page` content type
- ✅ Set up all required files (schema, controller, service, routes)
- ✅ Provide next steps for adding content and permissions

### Manual Setup (Alternative)

If you prefer to set up manually, follow the instructions in:
`/Users/joshuathompson/active-away-astro/VENUES_PAGE_STRAPI_SETUP.md`

## After Running the Import

### 1. Add Content

1. Go to **Content Manager** → **Venues Page**
2. Upload a hero background image (1920x1080px recommended)
3. Fill in the fields (defaults are pre-filled):
   - **Hero Title:** "Explore All Venues"
   - **Hero Subtitle:** "Discover our complete collection..."
   - **Hero Kicker:** "ALL DESTINATIONS"
   - **Page Title:** "All Venues - Active Away"
   - **Meta Description:** "Explore all our tennis..."
4. Click **Save** → **Publish**

### 2. Set Permissions

1. Go to **Settings** → **Roles** → **Public**
2. Scroll to **Venues-page**
3. Check the **find** checkbox
4. Click **Save**

### 3. Test the API

```bash
# Test the API endpoint
curl http://localhost:1337/api/venues-page?populate=*

# You should see a JSON response with your content
```

### 4. Verify in Frontend

```bash
# In your Astro project
cd /Users/joshuathompson/active-away-astro

# Build and preview
npm run build
npm run preview

# Visit http://localhost:4321/venues
# You should see your custom content from Strapi
```

## Schema Structure

```json
{
  "heroBackgroundImage": "Media (Single, Required)",
  "heroTitle": "Text (Required)",
  "heroSubtitle": "Long Text (Required)",
  "heroKicker": "Text (Optional)",
  "pageTitle": "Text (Required)",
  "metaDescription": "Long Text (Required, Max 160)",
  "featuredSectionTitle": "Text (Optional)",
  "featuredSectionDescription": "Long Text (Optional)"
}
```

## Troubleshooting

### Issue: Script fails with "package.json not found"

**Solution:** Make sure you're running the script from the Strapi root directory:
```bash
cd /Users/joshuathompson/strapi/strapi
node import-venues-page.js
```

### Issue: Strapi doesn't show the new content type

**Solution:** 
1. Make sure Strapi has restarted
2. Check that files were created in `src/api/venues-page/`
3. Clear Strapi cache: `npm run strapi build --clean`

### Issue: Getting 403 when fetching API

**Solution:** Set public permissions (see "Set Permissions" above)

### Issue: heroBackgroundImage is null in API

**Solution:** 
1. Upload an image in Strapi admin
2. Make sure to use `?populate=*` in your API call

## Recommended Hero Images

- **Size:** 1920x1080px or larger
- **Format:** JPEG or WebP
- **Subject:** Tennis courts, resort views, sports action
- **Tip:** Image should work well with dark overlay

## File Locations After Import

```
src/api/venues-page/
├── content-types/
│   └── venues-page/
│       └── schema.json
├── controllers/
│   └── venues-page.js
├── services/
│   └── venues-page.js
└── routes/
    └── venues-page.js
```

## Need Help?

- Full setup guide: `/Users/joshuathompson/active-away-astro/VENUES_PAGE_STRAPI_SETUP.md`
- Complete implementation guide: `/Users/joshuathompson/active-away-astro/VENUES_PAGE_COMPLETE_GUIDE.md`
- Strapi docs: https://docs.strapi.io/

## Cleanup

If you need to start over:

```bash
# Remove the content type
rm -rf src/api/venues-page

# Restart Strapi
npm run develop
```

---

**Created:** October 29, 2025  
**Last Updated:** October 29, 2025

