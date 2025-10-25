# Products Import Guide

Import Products from WordPress CSV export into Strapi.

## Prerequisites
1. Strapi running: `npm run develop`
2. CSV: `/Users/joshuathompson/Desktop/content-types/products-export.csv`
3. API permissions enabled (see below)

## Enable Permissions
1. Go to: http://localhost:1337/admin
2. Settings → Roles → Public
3. Find **Product** permissions
4. Check: `find`, `findOne`, `create`
5. Save

## Run Import
```bash
node scripts/import-products.js
```

## After Import
Disable create permission for security.

## Schema Fields
- `wpId`: WordPress ID (unique)
- `title`: Product title
- `slug`: URL-friendly identifier
- `content`: Full product content (richtext)
- `excerpt`: Short description
- `productTitle`: Display title for product
- `productDescription`: Detailed product description (richtext)
- `productUrl`: URL to product page
- `productImage`: Product image
- `priceFrom`: Starting price
- `ordering`: Display order (1-99)
- `displayOnFrontEnd`: Show on website
- `seo`: SEO component

## CSV Mappings
- `id` → `wpId`
- `Title` → `title`
- `Content` → `content`
- `Excerpt` → `excerpt`
- `title-product` → `productTitle`
- `description_product` → `productDescription`
- `url_product` → `productUrl`
- `from_price_product` → `priceFrom`
- `products_order_1__first__99__last` → `ordering`

API: http://localhost:1337/api/products

