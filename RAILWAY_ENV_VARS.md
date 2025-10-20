# Railway Environment Variables - Hybrid Cloudflare Setup

Add these environment variables to your Railway project's Variables section:

## Cloudflare Images (for image files)

```
CF_ACCOUNT_ID=your_cloudflare_account_id
CF_IMAGES_TOKEN=your_cloudflare_images_api_token
```

## Cloudflare R2 (for PDFs and other files)

```
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_ENDPOINT=https://5da451ea4290f2abb8eefa1ccf322041.r2.cloudflarestorage.com
R2_BUCKET=active-away
R2_PUBLIC_URL=https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev
```

## Optional Variables (with defaults)

```
R2_ROOT_PATH=
R2_ACL=private
```

## Quick Setup Checklist

1. ✅ Get Cloudflare Account ID
2. ✅ Create Cloudflare Images API Token
3. ✅ Create R2 API token with Read & Write permissions
4. ✅ Add all environment variables to Railway
5. ✅ Deploy/restart your Railway application

## How It Works

- **Images** (jpg, png, gif, webp, etc.) → Cloudflare Images
- **Other files** (pdf, doc, zip, etc.) → Cloudflare R2

See [HYBRID_SETUP.md](HYBRID_SETUP.md) for detailed setup instructions.

