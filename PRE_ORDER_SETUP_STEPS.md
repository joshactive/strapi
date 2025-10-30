# Pre-Order Setup - Quick Start

## ✅ Schema Updated!

The Pre-Order collection type has been updated with all the new fields you need.

## 📋 Next Steps

### 1. Restart Strapi (REQUIRED)

```bash
# Stop your Strapi server (Ctrl+C) and restart it
npm run develop
```

Strapi needs to restart to load the new schema fields.

### 2. Set Up Webhook (2-3 minutes)

**Option A: Zapier**
1. Go to https://zapier.com/app/zaps
2. Create a new Zap
3. Choose **Webhooks by Zapier** as trigger
4. Select **Catch Hook**
5. Copy the webhook URL (looks like: `https://hooks.zapier.com/hooks/catch/12345/abcde`)

**Option B: Make (formerly Integromat)**
1. Go to https://www.make.com/
2. Create a new scenario
3. Add **Webhooks** → **Custom webhook**
4. Copy the webhook URL

### 3. Create Your First Pre-Order Entry (5 minutes)

1. **Go to Strapi Admin** → Content Manager → Pre-Orders → Create new entry

2. **Fill in basic info:**
   - Title: `IKOS ARIA PRE-ORDER`
   - Slug: Auto-generated from title (or customize)
   - Excerpt: `Secure your spot for an exclusive dining experience at Ikos Aria`
   - Description: Add a longer description about the experience

3. **Hero Section:**
   - Hero Title: `IKOS ARIA PRE-ORDER`
   - Hero Subtitle: `Secure your spot for an exclusive dining experience at Ikos Aria`
   - Hero Kicker: `EXCLUSIVE OPPORTUNITY`
   - Hero Background Image: Upload a nice resort/beach image (1920x1080px recommended)

4. **Upload Menu Files:**
   - Click "Add files" in menuFiles field
   - Upload your restaurant menu PDFs:
     - Anaya Menu.pdf
     - Fresco Menu.pdf
     - Kos Menu.pdf
     - etc.

5. **Form Configuration:**
   
   **Form Webhook URL:** Paste your Zapier/Make webhook URL
   
   **Form Fields:** Copy and paste this JSON:
   
   ```json
   {
     "fields": [
       {
         "name": "firstName",
         "label": "First Name",
         "type": "text",
         "required": true,
         "placeholder": "e.g Michael"
       },
       {
         "name": "surname",
         "label": "Surname",
         "type": "text",
         "required": true,
         "placeholder": "e.g Cole"
       },
       {
         "name": "email",
         "label": "Email",
         "type": "email",
         "required": true,
         "placeholder": "e.g michaelcole@gmail.com"
       },
       {
         "name": "dateOfAttendance",
         "label": "Date of Attendance",
         "type": "date",
         "required": true
       },
       {
         "name": "restaurant",
         "label": "Restaurant",
         "type": "select",
         "required": true,
         "options": [
           "Anaya Restaurant",
           "Fresco Restaurant",
           "Kos Restaurant",
           "Oliva Restaurant",
           "Ouzo Restaurant",
           "Provence Restaurant",
           "Seasons Restaurant"
         ]
       },
       {
         "name": "starter",
         "label": "Starter",
         "type": "text",
         "required": false,
         "placeholder": "e.g Spicy Garlic & Paprika Shrimp"
       },
       {
         "name": "mainCourse",
         "label": "Main Course",
         "type": "text",
         "required": false,
         "placeholder": "e.g Medium Rare Steak"
       },
       {
         "name": "dessert",
         "label": "Dessert",
         "type": "text",
         "required": false,
         "placeholder": "e.g Chocolate Brownie"
       },
       {
         "name": "dietaryRequirements",
         "label": "Dietary Requirements",
         "type": "textarea",
         "required": false,
         "placeholder": "e.g None"
       },
       {
         "name": "otherInformation",
         "label": "Other Information",
         "type": "textarea",
         "required": false,
         "placeholder": "Any special requests"
       }
     ]
   }
   ```

6. **SEO (Optional but recommended):**
   - Meta Title: `IKOS ARIA Pre-Order - Active Away`
   - Meta Description: `Secure your dining reservations for Ikos Aria...`
   - Keywords: `ikos aria, pre-order, dining, tennis holiday`
   - Upload Meta Image for social sharing
   - Canonical URL: `https://activeaway.com/pre-orders/ikos-aria-pre-order`

7. **Save and Publish**

### 4. Test the Website (2 minutes)

1. **In your Astro project**, rebuild:
   ```bash
   npm run build
   # or if in dev mode
   npm run dev
   ```

2. **Visit the pages:**
   - Go to: http://localhost:4321/pre-orders
   - You should see your pre-order card
   - Click it to visit: http://localhost:4321/pre-orders/ikos-aria-pre-order

3. **Test the form:**
   - Fill out all required fields
   - Click Submit
   - Check your Zapier/Make webhook to see if the data arrived

## 🎯 New Fields Added

Here's what was added to your Pre-Order schema:

| Field Name | Type | Description |
|------------|------|-------------|
| `slug` | UID | Auto-generated from title, used in URL |
| `description` | Text | Longer description for the page |
| `heroTitle` | String | Hero section title |
| `heroSubtitle` | Text | Hero section subtitle |
| `heroKicker` | String | Small text above title |
| `heroBackgroundImage` | Media (Single) | Hero background image |
| `menuFiles` | Media (Multiple) | Upload PDF menus |
| `formWebhookUrl` | Text | Zapier/Make webhook URL |
| `formFields` | JSON | Dynamic form configuration |

**Note:** The `seo` component was already in your schema, so I kept it as-is.

## 📄 Files Created for Reference

- `PRE_ORDER_EXAMPLE_DATA.json` - Example data structure
- This file - Quick setup guide

## 🐛 Troubleshooting

**Fields not showing after restart?**
- Clear browser cache and refresh Strapi admin
- Check the console for errors
- Verify schema.json was saved correctly

**Can't upload files?**
- Check upload provider is configured
- Verify file permissions
- Check file size limits

**Form not working on website?**
- Verify webhook URL is correct and active
- Check browser console for errors
- Test webhook URL with Postman

## ✅ Checklist

- [ ] Restart Strapi
- [ ] Create webhook in Zapier/Make
- [ ] Create first pre-order entry
- [ ] Upload hero image
- [ ] Upload menu PDFs
- [ ] Add webhook URL
- [ ] Copy formFields JSON
- [ ] Save and publish
- [ ] Rebuild Astro site
- [ ] Test the page
- [ ] Submit test form
- [ ] Verify webhook receives data

## 🎉 You're Done!

Once you complete these steps, your pre-order pages will be live and working. Users can download menus and submit their dining preferences through the dynamic form.

