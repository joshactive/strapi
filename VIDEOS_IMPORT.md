# Videos Import Guide

Import Videos from WordPress CSV export into Strapi.

## Prerequisites
1. Strapi running: `npm run develop`
2. CSV: `/Users/joshuathompson/Desktop/content-types/videos-export.csv`
3. API permissions enabled (see below)

## Enable Permissions
1. Go to: http://localhost:1337/admin
2. Settings → Roles → Public
3. Find **Video** permissions
4. Check: `find`, `findOne`, `create`
5. Save

## Run Import
```bash
node scripts/import-videos.js
```

## After Import
Disable create permission for security.

## Schema Fields
- `wpId`: WordPress ID (unique)
- `title`: Video title
- `slug`: URL-friendly identifier
- `content`: Description (richtext)
- `excerpt`: Short description
- `videoTitle`: Display title for video
- `videoDescription`: Video-specific description
- `youtubeUrl`: YouTube video URL
- `videoCategory`: Category (e.g., "Promo Video")
- `ordering`: Display order (1-99)
- `displayOnFrontEnd`: Show on website
- `seo`: SEO component

## CSV Mappings
- `id` → `wpId`
- `Title` → `title`
- `Content` → `content`
- `Excerpt` → `excerpt`
- `video_title` → `videoTitle`
- `video_description` → `videoDescription`
- `youtube_url` → `youtubeUrl`
- `video_category` → `videoCategory`
- `video_order_1_99` → `ordering`

API: http://localhost:1337/api/videos
