# Tennis Clinics Import Guide

Import Tennis Clinics from WordPress CSV export into Strapi.

## Prerequisites
1. Strapi running: `npm run develop`
2. CSV: `/Users/joshuathompson/Desktop/content-types/tennis-clinics-export.csv`
3. API permissions enabled (see below)

## Enable Permissions
1. Go to: http://localhost:1337/admin
2. Settings → Roles → Public
3. Find **Tennis Clinic** permissions
4. Check: `find`, `findOne`, `create`
5. Save

## Run Import
```bash
node scripts/import-tennis-clinics.js
```

## After Import
Disable create permission for security.

## Schema Highlights
- Venue & location details (country, county, address)
- Court information (surface, number of courts)
- Clinic specifics (available months, days, 1-day vs 2-day)
- Sessions & dates
- Pricing, group sizes
- Venue facilities, parking, cafe
- Itineraries (including Saturday/Sunday specific)
- FAQs, inclusions/exclusions
- SEO component

## CSV Mappings (Key Fields)
- `clinic-from-price` → `priceFrom`
- `tennis-courts-clinic` → `numberOfCourts`
- `court-surface-clinic` → `tennisCourtSurface`
- `maximum-group-size` → `maximumGroupSize`
- `available-months-clinic` → `availableMonths`
- `clinic-days-available` → `daysAvailable`
- `tennis-standard-clinic` → `tennisStandard`
- `perfect-for-clinic` → `perfectFor`
- `new-itinerary-tc` → `itinerary` (repeatable)
- `faqs-tc` → `faqs` (repeatable)
- `what039s-included-clinic` → `inclusions`
- `venue-facilities` → `facilities`
- `clinic-county` → `county`
- `clinic-address` → `address`
- `google-maps-clinic` → `googleMapsUrl`
- `date-clinic` → `dateClinic`

API: http://localhost:1337/api/tennis-clinics
