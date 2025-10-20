# Cloudflare R2 Setup for Strapi

Your Strapi application is now configured to use Cloudflare R2 for media storage.

## Required Environment Variables

Add these environment variables to your Railway project:

### R2 Credentials
```
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
```

### R2 Configuration
```
R2_ENDPOINT=https://ACCOUNT_ID.r2.cloudflarestorage.com
R2_BUCKET=your_bucket_name
R2_PUBLIC_URL=https://your-domain.com
```

### Optional Variables
```
R2_ROOT_PATH=
R2_ACL=private
R2_SIGNED_URL_EXPIRES=900
```

## Setup Steps

### 1. Create an R2 Bucket
1. Go to your Cloudflare Dashboard
2. Navigate to **R2** > **Create bucket**
3. Choose a bucket name (e.g., `strapi-media`)
4. Note your bucket name for the `R2_BUCKET` variable

### 2. Generate R2 API Tokens
1. In Cloudflare Dashboard, go to **R2** > **Manage R2 API Tokens**
2. Click **Create API Token**
3. Give it a name (e.g., `strapi-upload`)
4. Set permissions: **Object Read & Write**
5. Choose the bucket you created
6. Click **Create API Token**
7. Copy the **Access Key ID** → `R2_ACCESS_KEY_ID`
8. Copy the **Secret Access Key** → `R2_SECRET_ACCESS_KEY`

### 3. Get Your R2 Endpoint
1. Your endpoint URL format is: `https://ACCOUNT_ID.r2.cloudflarestorage.com`
2. Find your Account ID:
   - In Cloudflare Dashboard
   - Right sidebar shows **Account ID**
3. Set `R2_ENDPOINT` with your account ID

### 4. Configure Public Access

#### Option A: Use R2 Public Bucket (Recommended for simplicity)
1. Go to your bucket settings
2. Navigate to **Settings** > **Public access**
3. Enable public access
4. You'll get a URL like: `https://pub-xxx.r2.dev`
5. Set this as `R2_PUBLIC_URL`

#### Option B: Use Custom Domain (Recommended for production)
1. Go to your bucket settings
2. Navigate to **Settings** > **Custom Domains**
3. Add your domain (e.g., `cdn.yourdomain.com`)
4. Add a CNAME record in your DNS settings
5. Set your custom domain as `R2_PUBLIC_URL`

### 5. Add Environment Variables to Railway
1. Go to your Railway project
2. Navigate to **Variables** tab
3. Add all the required environment variables listed above
4. Click **Deploy** to restart your application

## Testing

After deployment:
1. Log into your Strapi admin panel
2. Go to **Content Manager**
3. Try uploading an image
4. Verify the file is uploaded to R2
5. Check that the image displays correctly

## Troubleshooting

### Images not uploading
- Verify your R2 credentials are correct
- Check that the bucket name matches exactly
- Ensure the API token has read/write permissions

### Images upload but don't display
- Verify `R2_PUBLIC_URL` is correct
- Check that public access is enabled on your bucket (or custom domain is configured)
- Test the image URL directly in your browser

### CORS errors
If you see CORS errors in the browser console:
1. Go to your R2 bucket settings
2. Navigate to **Settings** > **CORS policy**
3. Add a CORS rule:
```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3000
  }
]
```

## Migration from Local Storage

If you have existing media in local storage, you'll need to:
1. Download all files from your Railway volume
2. Upload them to R2 manually or via script
3. Update the database references to point to the new R2 URLs

Contact your development team if you need help with migration.

