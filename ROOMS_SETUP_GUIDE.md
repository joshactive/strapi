# Rooms Component Setup Guide

## Overview

A new `shared.room` component has been added to manage accommodation options across multiple holiday types.

## Collection Types Updated

The following collection types now have rooms fields:
- Tennis Holiday
- Padel Tennis Holiday
- Pickleball Holiday
- Play & Watch
- School Tennis Tour
- Ski Holiday
- Group Organiser

## Fields Added

### Parent-Level Field:
- **`roomsSubheading`** (Text) - Description text below "ROOMS" heading

### Repeatable Component: `rooms` (shared.room)

Each room entry contains:

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `roomGallery` | Media (Multiple) | No | Room photos (multiple images) |
| `roomTitle` | Text | Yes | Room name/type |
| `roomSize` | Text | No | Room size (e.g., "28m²", "42m²") |
| `roomBedConfig` | Text | No | Bed configuration (e.g., "Twin or Double", "King Size Bed") |
| `roomText` | Text | No | Room description |

## How to Use in Strapi

### 1. Restart Strapi

```bash
npm run develop
```

The new `shared.room` component needs to load.

### 2. Edit a Tennis Holiday Entry

1. Go to Content Manager → Tennis Holidays
2. Select an entry
3. Scroll to **roomsSubheading** field
4. Enter description text (e.g., "Choose from our selection of beautifully appointed rooms...")

### 3. Add Rooms

1. Click **Add component** under **Rooms**
2. Fill in the fields for each room:

**Example Room 1:**
```
roomTitle: Deluxe Garden View Room
roomSize: 28m²
roomBedConfig: Twin or Double
roomText: Spacious rooms with garden views and modern amenities for the perfect stay.
roomGallery: [Upload multiple room images]
```

**Example Room 2:**
```
roomTitle: Superior Sea View Suite
roomSize: 42m²
roomBedConfig: King Size Bed
roomText: Elegant suites with stunning sea views and premium amenities.
roomGallery: [Upload multiple room images]
```

**Example Room 3:**
```
roomTitle: Premium Pool Villa
roomSize: 55m²
roomBedConfig: Super King Bed
roomText: Luxury villa with private pool and stunning resort views.
roomGallery: [Upload multiple room images]
```

### 4. Upload Images

For each room, upload multiple images to roomGallery:
- First image shows in carousel
- "More images" button appears if more than 1 image
- Recommended size: 800x600px (4:3 ratio)

### 5. Save and Publish

## Frontend Display

### Room Carousel Features:
- Shows 2 rooms at a time on desktop
- Horizontal scroll on mobile
- Navigation arrows (gold, desktop only)
- Pagination dots (gold active indicator)
- "More images" button if room has multiple images
- First room card disappears when scrolling

### Room Card Contents:
- Room image (from roomGallery[0])
- Room title (uppercase, bold)
- Room size + bed config (gray text, separated by •)
- Room description text

## Example Data Structure

```json
{
  "roomsSubheading": "Choose from our selection of beautifully appointed rooms...",
  "rooms": [
    {
      "roomTitle": "Deluxe Garden View Room",
      "roomSize": "28m²",
      "roomBedConfig": "Twin or Double",
      "roomText": "Spacious rooms with garden views...",
      "roomGallery": [
        { "url": "...", "alt": "Room view 1" },
        { "url": "...", "alt": "Room view 2" }
      ]
    }
  ]
}
```

## Notes

- If no rooms are added, shows fallback static content
- Pagination dots dynamically adjust to number of rooms
- All images use Cloudflare optimization
- Fully responsive on all devices

---

**Status:** ✅ Ready to use
**Created:** October 30, 2025


















