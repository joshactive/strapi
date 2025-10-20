# Local Development Guide

Follow these steps to develop Strapi locally and use the Content-Type Builder.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy your Railway variables into `.env`:

1. Go to Railway → Your Strapi service → **Variables** tab
2. Copy all the values into `.env` file
3. **Important variables to copy:**
   - `JWT_SECRET`
   - `APP_KEYS`
   - `API_TOKEN_SALT`
   - `ADMIN_JWT_SECRET`
   - `TRANSFER_TOKEN_SALT`
   - `DATABASE_PUBLIC_URL` (use the public URL for local dev)
   - All Cloudflare credentials (`CF_ACCOUNT_ID`, `CF_IMAGES_TOKEN`, `R2_*`)

Your `.env` file should look like:

```env
JWT_SECRET=abc123...
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=xyz789...
ADMIN_JWT_SECRET=def456...
TRANSFER_TOKEN_SALT=ghi012...
DATABASE_PUBLIC_URL=postgresql://postgres:pass@host:5432/railway
CF_ACCOUNT_ID=your_account_id
CF_IMAGES_TOKEN=your_token
R2_ACCESS_KEY_ID=your_key
R2_SECRET_ACCESS_KEY=your_secret
R2_ENDPOINT=https://5da451ea4290f2abb8eefa1ccf322041.r2.cloudflarestorage.com
R2_BUCKET=active-away
R2_PUBLIC_URL=https://pub-772c960acfd44198ad0fdfb6089dd4c8.r2.dev
```

### 3. Start Development Server

**Option A: Using local .env file**
```bash
npm run develop
```

**Option B: Using Railway CLI (recommended)**
```bash
# Install Railway CLI if you haven't
npm install -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Run with Railway environment
railway run npm run develop
```

### 4. Access Strapi Admin

Open your browser to: **http://127.0.0.1:1337/admin**

## Using Content-Type Builder

1. **Access the Builder**:
   - Go to http://127.0.0.1:1337/admin
   - Click **Content-Type Builder** in the left sidebar

2. **Create/Edit Content Types**:
   - Create new content types
   - Add fields
   - Configure relationships
   - Strapi will automatically generate files in `src/api/`

3. **Files Generated**:
   - Content types → `src/api/{content-type-name}/content-types/{name}/schema.json`
   - Components → `src/components/{category}/{name}.json`

4. **Commit Changes**:
   ```bash
   git add src/api/
   git add src/components/
   git commit -m "Add new content types"
   git push origin main
   ```

5. **Deploy to Railway**:
   - Railway will automatically detect the push and redeploy
   - Your production service will pick up the schema changes

## Development Workflow

1. ✅ Start local dev server: `npm run develop`
2. ✅ Make changes in Content-Type Builder
3. ✅ Test locally
4. ✅ Commit generated schema files
5. ✅ Push to GitHub
6. ✅ Railway auto-deploys

## Troubleshooting

### Connection Issues

If you can't connect to the database:
- Make sure you're using `DATABASE_PUBLIC_URL` (not `DATABASE_URL`)
- Check that your IP is allowed in Railway (Railway typically allows all IPs)

### Upload Issues Locally

If uploads don't work locally:
- Verify all Cloudflare credentials are set in `.env`
- Check Railway logs to ensure credentials work there first

### Content Type Changes Not Applying

- Restart the dev server after schema changes
- Check `src/api/` for generated files
- Ensure files are committed and pushed

## Building for Production

Before deploying significant changes:

```bash
# Build the admin panel
npm run build

# Test in production mode locally
npm start
```

## Notes

- **Development mode** (`npm run develop`): Enables Content-Type Builder, auto-reload
- **Production mode** (`npm start`): Disables Content-Type Builder, optimized for performance
- Always use development mode locally for schema changes
- Railway runs in production mode, so you can't use Content-Type Builder there

## Useful Commands

```bash
# Development with auto-reload
npm run develop

# Build admin panel
npm run build

# Start in production mode
npm start

# Using Railway CLI
railway run npm run develop
railway logs
railway vars
```

