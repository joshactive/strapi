# Navigation Menu Import Guide

This guide shows you how to import navigation menu data into Strapi using the automated script.

## 📋 What Gets Imported

The script imports the following data into your Navigation Menu:

### 1. Dates Find Your Next (8 items)
- Tennis Holiday
- UK Tennis Clinic
- Padel Holiday
- Pickleball Holiday
- Play & Watch Event
- School Tennis Tour
- Ski Holiday
- View All Destinations

### 2. About Mega Menu Items (3 items)
- **Meet Active Away** - Company introduction
- **Jamie Murray** - Brand ambassador
- **Dragons' Den** - Peter Jones investor

### 3. Destinations Categories (7 categories, 42 destinations total)
- **Tennis Holidays** (16 destinations)
- **Tennis Clinics** (11 destinations)
- **Junior Tennis Camps** (2 destinations)
- **Pickleball** (2 destinations)
- **Play & Watch** (1 destination)
- **School Tennis Tours** (8 destinations)
- **Ski Holidays** (2 destinations)

---

## 🚀 How to Run the Import

### Step 1: Navigate to Strapi Directory
```bash
cd /Users/joshuathompson/strapi/strapi
```

### Step 2: Make Sure Strapi Dependencies are Installed
```bash
npm install
```

### Step 3: Run the Import Script
```bash
node scripts/import-navigation-menu.js
```

### Step 4: Wait for Completion
You'll see output like:
```
🚀 Starting navigation menu data import...

📝 Creating new navigation menu...
✅ Navigation menu created successfully!

📊 Summary:
   • Dates Find Your Next: 8 items
   • About Mega Menu Items: 3 items
   • Destination Categories: 7 categories
     - Tennis Holidays: 16 destinations
     - Tennis Clinics: 11 destinations
     - Junior Tennis Camps: 2 destinations
     - Pickleball: 2 destinations
     - Play & Watch: 1 destination
     - School Tennis Tours: 8 destinations
     - Ski Holidays: 2 destinations
   • Total Destinations: 42

🎉 Import complete! Navigation menu is now published and ready to use.
```

---

## 🔄 Re-running the Script

If you run the script again, it will **UPDATE** the existing navigation menu rather than create a duplicate. This is safe and allows you to modify the data in `scripts/import-navigation-menu.js` and re-import.

---

## 📝 Editing the Data

To modify the imported data:

1. Open `scripts/import-navigation-menu.js`
2. Edit the `navigationData` object at the top of the file
3. Save the file
4. Re-run the script: `node scripts/import-navigation-menu.js`

### Example: Adding a New Destination

```javascript
{
  label: 'Tennis Holidays',
  destinations: [
    { name: 'Cyprus, 5* Aphrodite Hills - Adult', href: '#' },
    // Add your new destination here:
    { name: 'Spain, 5* My New Resort - Adult', href: '#new-resort' },
  ],
},
```

---

## ✅ Verify the Import

After running the script:

1. Start Strapi (if not running):
   ```bash
   npm run develop
   ```

2. Open Strapi Admin: http://localhost:1337/admin

3. Navigate to: **Content Manager → Navigation Menu**

4. You should see all the imported data

5. If it's not published, click **Publish**

---

## 🖼️ Adding Images for About Menu

The script creates the text content, but you'll need to upload images manually:

1. Go to **Content Manager → Navigation Menu**
2. Scroll to **About Mega Menu Items**
3. For each item (Meet Active Away, Jamie Murray, Dragons' Den):
   - Click on the item
   - Click the **+** button in the `image` field
   - Upload or select an image
   - Recommended size: **600×400px** or **16:9 aspect ratio**
4. Click **Save** and **Publish**

---

## 🎯 Image Recommendations

| Item | Image Suggestion | Size |
|------|-----------------|------|
| Meet Active Away | Company photo, team photo, or logo | 600×400px |
| Jamie Murray | Action shot or portrait of Jamie Murray | 600×400px |
| Dragons' Den | Dragons' Den logo or photo with Peter Jones | 600×400px |

---

## 🐛 Troubleshooting

### Error: "Cannot find module"
**Solution**: Make sure you're in the correct directory and dependencies are installed:
```bash
cd /Users/joshuathompson/strapi/strapi
npm install
```

### Error: "Connection refused" or "ECONNREFUSED"
**Solution**: Make sure your database is running. If using SQLite, this shouldn't be an issue. If using PostgreSQL or MySQL, ensure the database server is running.

### Navigation menu not showing on website
**Solution**: 
1. Make sure the navigation menu is **Published** in Strapi
2. Check that your frontend is fetching from the correct API endpoint
3. Clear your browser cache
4. Rebuild your frontend: `npm run build`

### Script runs but no data appears
**Solution**: 
1. Check Strapi admin to see if data was created
2. Look at the script output for any error messages
3. Try running with more verbose logging by modifying the script

---

## 📊 What Happens When You Run the Script

1. ✅ Connects to your Strapi database
2. ✅ Checks if a navigation menu already exists
3. ✅ If exists: Updates the existing menu
4. ✅ If not exists: Creates a new navigation menu
5. ✅ Adds all text links (Dates Find Your Next)
6. ✅ Adds all About menu items (without images)
7. ✅ Adds all destination categories and destinations
8. ✅ Automatically publishes the content
9. ✅ Shows a summary of what was imported

---

## 🔧 Advanced: Modifying the Script

The script is structured as follows:

```javascript
const navigationData = {
  datesFindYourNext: [...],  // Dates menu links
  aboutMegaMenuItems: [...],  // About menu cards
  destinationsCategories: [...],  // All destinations
};

async function main() {
  // 1. Start Strapi
  // 2. Find existing navigation menu
  // 3. Update or create navigation menu
  // 4. Publish the content
  // 5. Show summary
}
```

You can modify the `navigationData` object to change what gets imported.

---

## ✨ Next Steps

After importing:

1. ✅ Add images to the 3 About menu items
2. ✅ Test the navigation on your website
3. ✅ Update any `href: '#'` values to real URLs
4. ✅ Customize the content as needed

---

## 🎉 You're Done!

Your navigation menu is now populated with all the data and ready to use on your website!

For questions or issues, check the main Strapi logs or the script output for error messages.

