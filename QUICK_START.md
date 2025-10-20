# Quick Start - Cloudflare Images + R2

## What You Need

### 1. Cloudflare Account ID
- **Where**: Cloudflare Dashboard → Right sidebar
- **Variable**: `CF_ACCOUNT_ID`

### 2. Cloudflare Images API Token
- **Where**: Cloudflare Dashboard → My Profile → API Tokens → Create Token
- **Permission**: Edit Cloudflare Images
- **Variable**: `CF_IMAGES_TOKEN`

### 3. R2 API Token
- **Where**: Cloudflare Dashboard → R2 → Manage R2 API Tokens
- **Permission**: Object Read & Write on bucket `active-away`
- **Variables**: `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`

### 4. Your R2 Bucket Info (Already Set Up!)
```
R2_ENDPOINT=https://5da451ea4290f2abb8eefa1ccf322041.r2.cloudflarestorage.com
R2_BUCKET=active-away
R2_PUBLIC_URL=https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev
```

## Add to Railway

Go to your Railway project → **Variables** tab and add:

```
CF_ACCOUNT_ID=your_account_id_here
CF_IMAGES_TOKEN=your_token_here
R2_ACCESS_KEY_ID=your_key_here
R2_SECRET_ACCESS_KEY=your_secret_here
R2_ENDPOINT=https://5da451ea4290f2abb8eefa1ccf322041.r2.cloudflarestorage.com
R2_BUCKET=active-away
R2_PUBLIC_URL=https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev
```

Then **Deploy/Restart** your application.

## How It Works

✅ Upload a `.jpg`, `.png`, or `.webp` → Goes to **Cloudflare Images**
✅ Upload a `.pdf`, `.doc`, or other file → Goes to **R2**

All automatic - no extra configuration needed!

## Testing

1. Log into Strapi admin
2. Upload an image → Check URL starts with `imagedelivery.net`
3. Upload a PDF → Check URL starts with `pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev`

See [HYBRID_SETUP.md](HYBRID_SETUP.md) for detailed instructions.

