# Reviews Import Guide

Import Reviews from WordPress CSV export into Strapi.

## Prerequisites
1. Strapi running: `npm run develop`
2. CSV: `/Users/joshuathompson/Desktop/content-types/reviews-export.csv`
3. API permissions enabled (see below)

## Enable Permissions
1. Go to: http://localhost:1337/admin
2. Settings → Roles → Public
3. Find **Review** permissions
4. Check: `find`, `findOne`, `create`
5. Save

## Run Import
```bash
node scripts/import-reviews.js
```

## After Import
Disable create permission for security.

## Schema Fields
- `wpId`: WordPress ID (unique)
- `title`: Review title
- `slug`: URL-friendly identifier
- `content`: Full review content (richtext)
- `excerpt`: Short description
- `reviewName`: Reviewer's name
- `reviewerText`: Review text/testimonial (richtext)
- `reviewDate`: Date of review
- `reviewApplyTo`: What the review applies to (e.g., product/holiday)
- `reviewUrl`: URL associated with review
- `reviewUniqueId`: Unique identifier for review
- `ordering`: Display order (1-99)
- `displayOnFrontEnd`: Show on website
- `seo`: SEO component

## CSV Mappings
- `id` → `wpId`
- `Title` → `title`
- `Content` → `content`
- `Excerpt` → `excerpt`
- `review_name` → `reviewName`
- `reviewer_text` → `reviewerText`
- `review_date` → `reviewDate`
- `review_apply_to` → `reviewApplyTo`
- `review_url` → `reviewUrl`
- `review_unique_id` → `reviewUniqueId`

API: http://localhost:1337/api/reviews

