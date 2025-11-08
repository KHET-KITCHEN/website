# Fix: Razorpay Localhost Domain Registration Issue

## Problem

Razorpay is not accepting `http://127.0.0.1:5173` because it's not HTTP compliant or doesn't meet their domain requirements.

## Solution: Use localhost Instead

### Option 1: Use localhost (Recommended)

I've updated your Vite config to use `localhost` instead of `127.0.0.1`.

**What Changed:**
- Frontend will now run on `http://localhost:5173` instead of `http://127.0.0.1:5173`
- This is more compatible with Razorpay's domain requirements

**Steps:**

1. **Restart your frontend server:**
   ```powershell
   # Stop the current server (Ctrl+C)
   # Then restart:
   cd khet2kitchen
   npm run dev
   ```

2. **Access your website:**
   - Use: `http://localhost:5173` (instead of `http://127.0.0.1:5173`)

3. **Add to Razorpay Dashboard:**
   - Go to Razorpay Dashboard → Settings
   - Find "Additional Business Website/App"
   - Click "+" and add: `localhost` or `http://localhost:5173`
   - Save

### Option 2: Add Domain Without Protocol

Try adding just the hostname without `http://`:

1. **In Razorpay Dashboard:**
   - Add: `localhost` (without http://)
   - Or: `127.0.0.1` (without http://)
   - Or: `localhost:5173` (without http://)

### Option 3: Use Test Mode (If Available)

If you're in **Test Mode**, Razorpay might be more lenient:

1. **Check if you're in Test Mode:**
   - Your keys should start with `rzp_test_`
   - Test mode might allow localhost without registration

2. **Try payment without adding domain** (if in test mode)

## Updated Configuration

I've updated `vite.config.js` to use `localhost`:

```javascript
server: {
  host: 'localhost', // Changed from default
  port: 5173,
  open: true,
}
```

## Steps to Fix

### Step 1: Restart Frontend Server

```powershell
# Stop current server (Ctrl+C)
cd khet2kitchen
npm run dev
```

### Step 2: Access via localhost

- Open browser: `http://localhost:5173`
- (Instead of `http://127.0.0.1:5173`)

### Step 3: Add to Razorpay

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Settings → Account & Settings
3. Find "Additional Business Website/App"
4. Click "+"
5. Try adding:
   - `localhost` (just the hostname)
   - Or `localhost:5173`
   - Or `http://localhost:5173`

### Step 4: Test Payment

1. Wait 5-10 minutes for changes to propagate
2. Try payment from `http://localhost:5173`
3. Should work now!

## Alternative: Contact Razorpay Support

If none of the above works:

1. **Contact Razorpay Support:**
   - Email: support@razorpay.com
   - Or use their support chat in dashboard

2. **Ask them:**
   - "How do I register localhost for testing?"
   - "What format should I use for localhost domain?"
   - "Can I test payments on localhost without domain registration?"

## For Production

When you deploy to production:

1. **Use HTTPS domain:**
   - Example: `https://khet2kitchen.com`
   - HTTPS is required for production

2. **Add production domain to Razorpay:**
   - Add your actual domain
   - Must be HTTPS

## Quick Summary

**What to do:**
1. ✅ Restart frontend server (uses localhost now)
2. ✅ Access via `http://localhost:5173`
3. ✅ Add `localhost` to Razorpay dashboard
4. ✅ Wait a few minutes
5. ✅ Try payment again

**If still not working:**
- Try adding just `localhost` (no http://, no port)
- Contact Razorpay support
- Check if test mode allows localhost

---

**After restarting the frontend server, use `http://localhost:5173` and add `localhost` to Razorpay!**

