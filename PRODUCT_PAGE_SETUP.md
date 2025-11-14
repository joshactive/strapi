# Product Page Schema Setup Guide

## ✅ Files Created

The complete Strapi schema for the Product Page system has been created!

### Component Files Created (9 files)

Located in `src/components/sections/`:

1. ✅ `schedule-row.json` - Single day schedule row
2. ✅ `achievement-item.json` - Achievement/credential item
3. ✅ `product-hero.json` - Hero section component
4. ✅ `quote-section.json` - Quote section component
5. ✅ `jamie-murray-programme.json` - Jamie Murray programme section
6. ✅ `schedule-table.json` - Schedule/itinerary table
7. ✅ `discount-cta.json` - Discount call-to-action section
8. ✅ `faq-section.json` - FAQ section (uses existing `shared.faq` for items)
9. ✅ `destinations-config.json` - Destinations section configuration

### Content Type Files Created (4 files)

Located in `src/api/product-page/`:

1. ✅ `content-types/product-page/schema.json` - Main schema
2. ✅ `controllers/product-page.js` - Controller
3. ✅ `services/product-page.js` - Service
4. ✅ `routes/product-page.js` - Routes

---

## 🚀 Next Steps

### Step 1: Restart Strapi

The schema files have been created, but Strapi needs to be restarted to recognize them:

```bash
cd /Users/joshuathompson/strapi/strapi
npm run develop
```

### Step 2: Access Strapi Admin

Once Strapi starts, navigate to:

```
http://localhost:1337/admin
```

### Step 3: Set Permissions

1. Go to **Settings** → **Roles** → **Public**
2. Find **Product-page** in the permissions list
3. Enable the following permissions:
   - ✅ `find` - Allows fetching all product pages
   - ✅ `findOne` - Allows fetching a single product page by ID

This allows your Astro frontend to fetch product page data via the API.

### Step 4: Create Your First Product Page

1. Go to **Content Manager** → **Product Page** → **Create new entry**
2. Fill in the basic fields:
   - **Title**: `Tennis Holidays for Adults.`
   - **Slug**: `adult-only-tennis-holidays` (will auto-generate from title)
   - **Category**: Select `adult-tennis`
   - **Display on Front End**: Toggle to `true`

3. Fill in the **Hero** section:
   - **Kicker**: `ADULT ONLY TENNIS HOLIDAYS`
   - **Heading**: `Tennis Holidays for Adults`
   - **Subheading**: `Unique Racket Experiences that unite like-minded individuals, through impeccable service delivered by truly knowledgeable hosts in excellent locations.`
   - **Background Image**: Upload your hero background image

4. Fill in the **Quote** section:
   - **Eyebrow**: `SINCE 2006`
   - **Quote Text**: `"I'm delighted to design the Tennis Programme on all Active Away Adult Tennis Holidays."`
   - **Author Name**: `JAMIE MURRAY`
   - **Author Images**: Upload 2-3 small circular profile images
   - **Decorative Icon**: Upload quote icon (optional)

5. Fill in the **Jamie Murray** section:
   - **Title**: `THE JAMIE MURRAY TENNIS PROGRAMME`
   - **Description**: Add the programme description
   - **Button Text**: `Learn More`
   - **Image**: Upload programme image (or add YouTube URL for video)
   - **Achievements**: Add items like:
     - `7 Grand Slam Wins`
     - `Davis Cup Champion`
     - `Former world no.1`
     - `Team BBC Sports Personality Winner`

6. Fill in the **Schedule** section:
   - **Heading**: Leave blank or add a heading
   - **Schedule Rows**: Add rows for each day:
     - **Day**: `Sunday`
     - **Morning**: `09:30 - 09:45 - Welcome Meeting - At the Tennis Centre...`
     - **Afternoon**: `13:00 - Lunch - Join the Group at the Main Restaurant...`
     - **Evening**: `20:00 - Meet - in the Sentida Bar...`
     - Repeat for Monday, Tuesday, Wednesday, etc.

7. Fill in the **Discount** section:
   - **Eyebrow**: `DISCOUNT`
   - **Heading**: `Access an Instant Adult Tennis Holiday Discount`
   - **Description**: `Sign up today and receive an exclusive discount code for instant savings on any Adult Tennis Holiday! Register now and start planning your perfect tennis getaway!`
   - **Button Text**: `Access Discount`
   - **Button Link**: `/newsletter` or your newsletter signup page
   - **Background Image**: Upload background image for the CTA

8. Fill in the **FAQ** section:
   - **Eyebrow**: `OTHER INFORMATION`
   - **Heading**: `Adult Tennis Holidays in 2025`
   - **FAQs**: Add FAQ items:
     - **Question**: `What is a hosted Adult Tennis Holiday?`
     - **Answer**: `A hosted Adult Tennis Holiday is...` (add full answer)
     - Repeat for each FAQ

9. Fill in the **Destinations** section:
   - **Show Destinations**: Toggle to `true`
   - **Heading**: `Explore our Locations` (optional)
   - **Eyebrow**: `DESTINATIONS` (optional)
   - **Featured Location Slugs**: Leave empty to show all (or add JSON array of slugs)

10. Fill in the **SEO** section:
    - **Meta Title**: `Adult Tennis Holidays | Active Away`
    - **Meta Description**: Add SEO description
    - **Keywords**: Add relevant keywords
    - **Canonical URL**: `https://activeaway.com/adult-only-tennis-holidays`
    - **Meta Image**: Upload social share image

11. Click **Save** and then **Publish**

### Step 5: Test the Frontend

1. In your Astro project, build and preview:

```bash
cd /Users/joshuathompson/active-away-astro
npm run build
npm run preview
```

2. Navigate to: `http://localhost:4321/adult-only-tennis-holidays`

3. You should see your product page with all sections rendered!

---

## 📋 Content Type Structure

### Product Page Fields

```
product-page
├── slug (UID, required, unique)
├── title (String, required)
├── category (Enumeration, required)
│   └── Options: adult-tennis, padel, pickleball, junior-camp, ski, play-and-watch, school-tour, tennis-clinic, tennis-academy
├── displayOnFrontEnd (Boolean, default: true)
├── hero (Component: sections.product-hero)
│   ├── kicker (String)
│   ├── heading (String)
│   ├── subheading (Rich Text)
│   ├── backgroundImage (Media)
│   └── heroImages (Media, multiple)
├── quote (Component: sections.quote-section)
│   ├── eyebrow (String)
│   ├── quoteText (Rich Text)
│   ├── authorName (String)
│   ├── authorImages (Media, multiple)
│   └── decorativeIcon (Media)
├── jamieMurray (Component: sections.jamie-murray-programme)
│   ├── title (String)
│   ├── description (Rich Text)
│   ├── buttonText (String)
│   ├── videoUrl (String)
│   ├── image (Media)
│   └── achievements (Repeatable: sections.achievement-item)
│       ├── text (String)
│       └── icon (String)
├── schedule (Component: sections.schedule-table)
│   ├── heading (String)
│   └── scheduleRows (Repeatable: sections.schedule-row)
│       ├── day (String)
│       ├── morning (Rich Text)
│       ├── afternoon (Rich Text)
│       └── evening (Rich Text)
├── discount (Component: sections.discount-cta)
│   ├── eyebrow (String)
│   ├── heading (String)
│   ├── description (Rich Text)
│   ├── buttonText (String)
│   ├── buttonLink (String)
│   └── backgroundImage (Media)
├── faq (Component: sections.faq-section)
│   ├── eyebrow (String)
│   ├── heading (String)
│   └── faqs (Repeatable: shared.faq)
│       ├── question (String)
│       └── answer (Rich Text)
├── destinations (Component: sections.destinations-config)
│   ├── showDestinations (Boolean)
│   ├── heading (String)
│   ├── eyebrow (String)
│   └── featuredLocationSlugs (JSON)
└── seo (Component: shared.seo)
    ├── metaTitle (String)
    ├── metaDescription (String)
    ├── metaImage (Media)
    ├── keywords (Text)
    └── canonicalURL (String)
```

---

## 🔍 API Endpoints

Once set up, the following API endpoints will be available:

```
GET /api/product-pages
GET /api/product-pages/:id
GET /api/product-pages/:id?populate=*
```

The Astro frontend uses these endpoints to fetch product page data.

---

## 🎨 Optional Sections

All sections except `slug`, `title`, and `category` are optional. This means you can:

- Create different product pages with different sections
- Skip sections that aren't relevant for a particular product category
- Add sections incrementally as you build out content

For example:
- Tennis pages might have all sections
- Ski pages might skip the "Jamie Murray" section
- Clinic pages might only have Hero, FAQ, and Partners

---

## 🐛 Troubleshooting

**Schema not appearing in Strapi admin**
- Make sure you restarted Strapi after adding the files
- Check the console for any syntax errors in JSON files
- Verify file structure matches: `src/api/product-page/content-types/product-page/schema.json`

**Components not available**
- Check that component files are in `src/components/sections/`
- Verify JSON syntax is valid
- Restart Strapi

**API returns empty data**
- Check that "Display on Front End" is set to `true`
- Verify the entry is published (not draft)
- Check API permissions are set correctly

**Frontend not fetching data**
- Verify Strapi is running
- Check the API endpoint works: `http://localhost:1337/api/product-pages`
- Check browser console for errors
- Verify the slug matches exactly

---

## ✨ Success!

Your Product Page schema is now ready to use. After restarting Strapi and creating your first product page, it will automatically appear on your frontend at the specified slug!

For reference content, see: https://activeaway.com/adult-only-tennis-holidays/

