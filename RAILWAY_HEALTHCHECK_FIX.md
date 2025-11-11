# Railway Healthcheck Fix

## Problem
Railway was failing healthchecks because there was no `/healthcheck` endpoint configured.

## Solution
Added a simple healthcheck API endpoint that returns the app status.

## Healthcheck Endpoint

**URL:** `/api/healthcheck`  
**Method:** GET  
**Auth:** None required

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-11-11T11:00:00.000Z",
  "uptime": 12345.67
}
```

## Railway Configuration

### Option 1: Configure in Railway Dashboard

1. Go to your Railway project
2. Click on your Strapi service
3. Go to Settings → Health Check
4. Set the healthcheck path to: `/api/healthcheck`
5. Set healthcheck timeout: 60 seconds (recommended)
6. Save changes

### Option 2: Configure in railway.json

Update your `railway.json` file:

```json
{
  "$schema": "https://backboard.railway.app/railway.schema.json",
  "build": {
    "builder": "RAILPACK"
  },
  "deploy": {
    "healthcheckPath": "/api/healthcheck",
    "healthcheckTimeout": 60
  }
}
```

## How It Works

- The endpoint is publicly accessible (no auth required)
- Returns HTTP 200 when Strapi is running properly
- Returns HTTP 500 if there's an error
- Railway polls this endpoint every few seconds
- If it gets a 200 response, the deployment is considered healthy

## Testing Locally

```bash
# Start Strapi
npm run develop

# In another terminal, test the healthcheck
curl http://localhost:1337/api/healthcheck

# Should return:
# {"status":"ok","timestamp":"...","uptime":123.45}
```

## Testing on Railway

After deployment, test with:

```bash
curl https://your-railway-domain.railway.app/api/healthcheck
```

## Deployment Steps

1. Commit and push the healthcheck endpoint (already done)
2. Configure the healthcheck path in Railway
3. Railway will automatically redeploy
4. Healthcheck should now pass ✅

## Common Issues

### Issue: Still failing after adding endpoint
**Solution:** Make sure the healthcheck path in Railway is exactly `/api/healthcheck` (with `/api` prefix)

### Issue: Timeout errors
**Solution:** Increase healthcheck timeout to 60-120 seconds in Railway settings

### Issue: Database connection errors
**Solution:** Verify your `DATABASE_URL` environment variable is correctly set in Railway

## Files Created

- `src/api/healthcheck/controllers/healthcheck.js` - Controller logic
- `src/api/healthcheck/routes/healthcheck.js` - Route configuration

## Next Steps

1. ✅ Healthcheck endpoint created
2. ⏳ Push changes to GitHub
3. ⏳ Configure healthcheck path in Railway
4. ⏳ Verify deployment succeeds

```bash
# Push to GitHub
git push origin main
```

Railway will automatically redeploy and use the new healthcheck endpoint!

