# Navigation Menu - Strapi Setup

✅ **Navigation Menu content type has been created!**

## 📁 Files Created

The following files have been added to your Strapi project:

### Components:
- `/src/components/navigation/menu-item.json`
- `/src/components/navigation/mega-menu-item.json`

### API:
- `/src/api/navigation-menu/content-types/navigation-menu/schema.json`
- `/src/api/navigation-menu/controllers/navigation-menu.js`
- `/src/api/navigation-menu/routes/navigation-menu.js`
- `/src/api/navigation-menu/services/navigation-menu.js`

---

## 🚀 Next Steps

### 1. Restart Strapi

```bash
cd /Users/joshuathompson/strapi/strapi
npm run develop
```

### 2. Access the Navigation Menu

1. Go to Strapi Admin: `http://localhost:1337/admin`
2. Look for **"Navigation Menu"** in the left sidebar under "Single Types"
3. Click to open it

### 3. Add Your Menu Items

**Main Menu Items** (Component: Menu Item)

Add 6 items with these details:

| Label | href | isActive | hasMegaMenu |
|-------|------|----------|-------------|
| Home | #home | ✓ | ✗ |
| Dates | #dates | ✗ | ✓ |
| Rackets | #rackets | ✗ | ✗ |
| About Us | #about | ✗ | ✗ |
| Destinations | #destinations | ✗ | ✗ |
| Blog | #blogs | ✗ | ✗ |

**Mega Menu Items** (Component: Mega Menu Item)

Add 3 items for the dropdown:

**Item 1: Tennis Holidays**
- Title: `Tennis Holidays`
- Description: `Premium tennis coaching holidays`
- href: `#tennis-dates`
- gradient: `from-purple-500 to-purple-600`
- image: Upload a tennis image

**Item 2: Padel Holidays**
- Title: `Padel Holidays`
- Description: `Exciting padel experiences abroad`
- href: `#padel-dates`
- gradient: `from-blue-500 to-blue-600`
- image: Upload a padel image

**Item 3: Pickleball Holidays**
- Title: `Pickleball Holidays`
- Description: `Fun pickleball getaways`
- href: `#pickleball-dates`
- gradient: `from-green-500 to-green-600`
- image: Upload a pickleball image

**Mega Menu Settings**
- megaMenuTitle: `Explore all our amazing holiday dates`
- megaMenuCTA: `Browse All Dates`
- megaMenuCTAUrl: `#all-dates`

### 4. Set Permissions

1. Go to **Settings** → **Roles** → **Public**
2. Find **Navigation-menu**
3. Check the **find** permission
4. Click **Save**

### 5. Publish

Click the **Publish** button in the top right corner!

---

## 🎨 Gradient Options

Choose from these Tailwind gradient classes:

- `from-purple-500 to-purple-600`
- `from-blue-500 to-blue-600`
- `from-green-500 to-green-600`
- `from-red-500 to-red-600`
- `from-yellow-500 to-yellow-600`
- `from-pink-500 to-pink-600`
- `from-indigo-500 to-indigo-600`
- `from-teal-500 to-teal-600`
- `from-orange-500 to-orange-600`

---

## 🔍 Testing

After publishing, you can test the API:

```
GET http://localhost:1337/api/navigation-menu?populate[menuItems][populate]=*&populate[megaMenuItems][populate]=image
```

---

## 🌐 Frontend Integration

The frontend automatically fetches this data:
- **File**: `src/utils/strapi.js` → `getNavigationMenu()`
- **Used in**: `src/components/HeroTailwind.astro`

The website will:
- ✅ Use Strapi data if available
- ✅ Fall back to defaults if Strapi is unreachable
- ✅ Update automatically when you publish changes

---

## 📝 Notes

- **Single Type**: Only one navigation menu configuration exists
- **Components**: Reusable for menu items and mega menu cards
- **Images**: Upload images in Strapi admin (recommended: 400x300px)
- **Gradients**: Use Tailwind CSS gradient classes
- **Draft/Publish**: Changes only go live when published

---

## 🐛 Troubleshooting

**Content type not showing up?**
1. Restart Strapi
2. Clear browser cache
3. Check console for errors

**Can't save?**
1. Make sure all required fields are filled
2. Check that images are uploaded
3. Verify permissions are set

**Frontend not updating?**
1. Verify content is published
2. Check API permissions (Public role → find)
3. Test the API endpoint directly

---

## 📖 Related Documentation

See `/Users/joshuathompson/active-away-astro/NAVIGATION_MENU_STRAPI_GUIDE.md` for frontend integration details.

