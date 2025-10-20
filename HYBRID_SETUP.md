# Hybrid Cloudflare Setup (Images + R2)

Your Strapi application is now configured to use:
- **Cloudflare Images** for image files (jpg, png, gif, webp, etc.)
- **Cloudflare R2** for other media (PDFs, documents, videos, etc.)

## Benefits

✅ **Images via Cloudflare Images**:
- Automatic optimization and compression
- Multiple size variants on-the-fly
- Global CDN delivery
- Built-in transformations

✅ **Other files via R2**:
- Cost-effective storage
- S3-compatible API
- Perfect for PDFs, docs, videos

## Required Environment Variables

Add these to your Railway project:

### Cloudflare Images Configuration
```
CF_ACCOUNT_ID=your_cloudflare_account_id
CF_IMAGES_TOKEN=your_cloudflare_images_api_token
```

### R2 Configuration (for non-image files)
```
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_ENDPOINT=https://5da451ea4290f2abb8eefa1ccf322041.r2.cloudflarestorage.com
R2_BUCKET=active-away
R2_PUBLIC_URL=https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev
```

### Optional R2 Variables
```
R2_ROOT_PATH=
R2_ACL=private
```

## Setup Steps

### 1. Get Cloudflare Account ID

1. Go to your Cloudflare Dashboard
2. Look at the right sidebar - you'll see **Account ID**
3. Copy this for `CF_ACCOUNT_ID`

### 2. Create Cloudflare Images API Token

1. In Cloudflare Dashboard, go to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Click **Use template** next to **Edit Cloudflare Images**
4. Or create a custom token with these permissions:
   - **Account** → **Cloudflare Images** → **Edit**
5. Click **Continue to summary**
6. Click **Create Token**
7. Copy the token for `CF_IMAGES_TOKEN`

### 3. Find Your R2 Credentials

You already have your R2 bucket set up. You just need the API token:

1. In Cloudflare Dashboard, go to **R2** → **Manage R2 API Tokens**
2. Click **Create API Token**
3. Give it a name (e.g., `strapi-r2-upload`)
4. Set permissions: **Object Read & Write**
5. Select your bucket: `active-away`
6. Click **Create API Token**
7. Copy:
   - **Access Key ID** → `R2_ACCESS_KEY_ID`
   - **Secret Access Key** → `R2_SECRET_ACCESS_KEY`

Your R2 endpoint and public URL are:
```
R2_ENDPOINT=https://5da451ea4290f2abb8eefa1ccf322041.r2.cloudflarestorage.com
R2_BUCKET=active-away
R2_PUBLIC_URL=https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev
```

### 4. Add Environment Variables to Railway

1. Go to your Railway project
2. Navigate to **Variables** tab
3. Add ALL the environment variables:

```
CF_ACCOUNT_ID=your_account_id
CF_IMAGES_TOKEN=your_images_api_token
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_ENDPOINT=https://5da451ea4290f2abb8eefa1ccf322041.r2.cloudflarestorage.com
R2_BUCKET=active-away
R2_PUBLIC_URL=https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev
```

4. Click **Deploy** to restart your application

## How It Works

The custom upload provider automatically routes files based on their MIME type:

### Images → Cloudflare Images
- `image/jpeg`, `image/jpg`, `image/png`
- `image/gif`, `image/webp`, `image/svg+xml`
- `image/bmp`, `image/tiff`

**Benefits:**
- Served via: `https://imagedelivery.net/{account_hash}/{image_id}/{variant}`
- Multiple variants available (thumbnail, medium, large, etc.)
- Automatic optimization and compression
- Global CDN delivery

### All Other Files → R2
- PDFs (`.pdf`)
- Documents (`.doc`, `.docx`, `.xls`, `.xlsx`)
- Videos (`.mp4`, `.mov`, `.avi`)
- Audio files (`.mp3`, `.wav`)
- Archives (`.zip`, `.tar`, `.gz`)
- Any other file types

**Benefits:**
- Served via: `https://pub-xxx.r2.dev/filename`
- Cost-effective storage
- Good for large files

## Testing

After deployment:

1. Log into your Strapi admin panel
2. Go to **Content Manager**
3. **Test Image Upload**:
   - Upload a JPG or PNG image
   - Verify the URL starts with `https://imagedelivery.net/`
4. **Test PDF Upload**:
   - Upload a PDF file
   - Verify the URL starts with `https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev/`
5. Check that all files display/download correctly

## Using Image Variants

Cloudflare Images automatically creates variants. You can access different sizes:

```
https://imagedelivery.net/{account_hash}/{image_id}/public    (original or default)
https://imagedelivery.net/{account_hash}/{image_id}/thumbnail (small)
https://imagedelivery.net/{account_hash}/{image_id}/medium    (medium)
https://imagedelivery.net/{account_hash}/{image_id}/large     (large)
```

You can also create custom variants in Cloudflare Dashboard under **Images** → **Variants**.

## Troubleshooting

### Images not uploading
- Verify `CF_ACCOUNT_ID` is correct
- Check that `CF_IMAGES_TOKEN` has Images Edit permissions
- Check Strapi logs for error messages

### PDFs/files not uploading
- Verify R2 credentials are correct
- Check that the bucket name matches exactly
- Ensure the API token has read/write permissions

### Images upload but don't display
- Test the Cloudflare Images URL directly in your browser
- Check that Cloudflare Images is enabled in your account
- Verify you're not hitting Cloudflare Images limits

### Files upload but don't download
- Verify `R2_PUBLIC_URL` is correct
- Check that public access is enabled on your bucket
- Test the R2 URL directly in your browser

## Pricing Notes

### Cloudflare Images
- $5/month for up to 100,000 images stored
- $1 per 100,000 images delivered
- Includes unlimited variants and transformations

### Cloudflare R2
- $0.015 per GB stored per month
- Free egress (no bandwidth costs)
- Very cheap for PDFs and documents

## Migration

If you have existing files in local storage or plain R2:
1. Images will need to be re-uploaded to benefit from Cloudflare Images
2. Non-image files can remain in R2
3. Consider a migration script if you have many files

Need help? Check the Strapi and Cloudflare documentation or contact your development team.

