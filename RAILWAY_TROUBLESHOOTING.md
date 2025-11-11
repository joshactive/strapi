# Railway Deployment Troubleshooting - Service Unavailable

## Issue: "Service unavailable" during healthcheck

### What's Happening

Railway is trying to check if your Strapi app is healthy, but it's getting "service unavailable" errors. This typically means:

1. **Strapi is still starting up** - Database connection and initialization takes time
2. **Database connection failing** - Missing credentials or connection timeout
3. **Memory/resource limits** - Railway container running out of resources

## Fixes Applied

### 1. Increased Healthcheck Timeout (300 seconds)
```json
"healthcheckTimeout": 300
```
This gives Strapi 5 minutes to fully start up before failing.

### 2. Enhanced Healthcheck Endpoint
The `/api/healthcheck` endpoint now:
- ✅ Checks if Strapi is fully loaded (`strapi.isLoaded`)
- ✅ Verifies database connectivity (`SELECT 1`)
- ✅ Returns appropriate HTTP status codes:
  - `200` = Healthy and ready
  - `503` = Still starting or database issues
  - `500` = Fatal error

### 3. Explicit Start Command
```json
"startCommand": "npm run start"
```

## Check These in Railway Dashboard

### 1. Environment Variables (Most Common Issue)

**Required Variables:**
```
DATABASE_URL=postgresql://...
NODE_ENV=production
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
```

**Optional (for uploads):**
```
CF_ACCOUNT_ID=...
CF_IMAGES_TOKEN=...
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
R2_ENDPOINT=...
R2_BUCKET=...
R2_PUBLIC_URL=...
```

### 2. Database Connection

Go to Railway Dashboard → Your Postgres Service → Connect

Verify `DATABASE_URL` format:
```
postgresql://user:pass@host:port/database
```

### 3. Resource Limits

Check Railway dashboard for:
- **Memory usage** - Strapi needs at least 512MB, recommended 1GB+
- **CPU usage** - Should be under 80% during startup

## Testing the Fix

### After deployment, check Railway logs for:

**✅ Good signs:**
```
Server started on port 1337
[INFO] Database connected
[INFO] Strapi is running
```

**❌ Bad signs:**
```
Error: connect ETIMEDOUT
Error: password authentication failed
FATAL: out of memory
```

## Manual Testing

Once deployed, test the healthcheck:

```bash
# Should return 503 during startup
curl https://your-app.railway.app/api/healthcheck
# {"status":"starting","message":"Strapi is still initializing"}

# Should return 200 when ready (after 30-60 seconds)
curl https://your-app.railway.app/api/healthcheck
# {"status":"ok","timestamp":"...","uptime":123.45}
```

## Common Solutions

### Solution 1: Database Connection Issues

**Check DATABASE_URL is set correctly in Railway**

Railway should auto-set this if you have a Postgres service connected.
If not, manually copy it from your Postgres service.

### Solution 2: Missing APP_KEYS

**Generate and add APP_KEYS:**

```bash
# Generate 4 random keys
node -e "console.log(Array.from({length:4},()=>require('crypto').randomBytes(32).toString('hex')).join(','))"
```

Add to Railway environment variables:
```
APP_KEYS=key1,key2,key3,key4
```

### Solution 3: Insufficient Memory

**Increase Railway plan or optimize:**

In Railway dashboard → Settings → Resources
- Increase memory allocation to 1GB or more

### Solution 4: Slow Database Connection

**Add connection pool settings as environment variables:**

```
DATABASE_POOL_MIN=0
DATABASE_POOL_MAX=7
DATABASE_CONNECTION_TIMEOUT=60000
DATABASE_SSL=false
```

## Schema Changes & Migrations

The recent group-organiser schema changes require database migrations.
Strapi handles this automatically on startup, but it adds ~10-30 seconds.

**This is why we increased healthcheck timeout to 300 seconds.**

## Debugging Steps

1. **Check Railway Deployment Logs**
   - Go to Railway → Your Service → Deployments
   - Click latest deployment
   - View logs in real-time

2. **Look for specific errors:**
   - `ECONNREFUSED` = Database not reachable
   - `password authentication failed` = Wrong DATABASE_URL
   - `ENOMEM` = Out of memory
   - `timeout` = Taking too long to start

3. **Test healthcheck endpoint:**
   ```bash
   # Wait 2-3 minutes after deployment
   curl -v https://your-app.railway.app/api/healthcheck
   ```

4. **Check Railway Metrics:**
   - Memory usage graph
   - CPU usage graph
   - Network activity

## Quick Checklist

- [ ] All environment variables are set (especially DATABASE_URL)
- [ ] Database service is running and connected
- [ ] Memory allocation is at least 512MB (1GB recommended)
- [ ] Latest code is pushed to GitHub
- [ ] Railway auto-deployed the changes
- [ ] Waited 2-3 minutes for Strapi to fully start
- [ ] Checked deployment logs for errors

## Expected Deployment Timeline

1. **0-30s:** Build phase (npm install, npm run build)
2. **30-60s:** Start phase (Strapi initializing)
3. **60-90s:** Database connection and migration
4. **90-120s:** Healthcheck succeeds, service marked as "Active"

With the new 300-second timeout, Railway will wait up to 5 minutes before giving up.

## If Still Failing

Share the Railway deployment logs (especially any error messages) so we can diagnose further.

Most common fixes:
1. Add missing environment variables
2. Increase memory allocation
3. Check DATABASE_URL is correct
4. Wait longer (first deployment can take 3-5 minutes)

