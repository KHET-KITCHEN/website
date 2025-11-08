# Razorpay Domain Registration - Fix for Localhost Testing

## Problem

Razorpay is blocking payments from `127.0.0.1` because it's not registered in your Razorpay account.

**Error:** "attempt(s) have been made to accept payment from the website domain: 127.0.0.1 which is not registered with Razorpay"

## Solution: Add Localhost Domain to Razorpay

### Step 1: Log in to Razorpay Dashboard

1. Go to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Log in with your account credentials

### Step 2: Add Localhost Domain

1. **Go to Settings**
   - Click on **Settings** in the left sidebar
   - Or go directly to: https://dashboard.razorpay.com/app/settings

2. **Find "Additional Business Website/App" Section**
   - Scroll down to find this section
   - You'll see your main domain listed

3. **Add Localhost Domain**
   - Click the **"+"** (plus) button or **"Add Website"** button
   - Enter one of these:
     - `http://127.0.0.1:5173` (exact match)
     - `http://localhost:5173` (alternative)
     - `127.0.0.1` (just the IP)
     - `localhost` (just the hostname)

4. **Save the Changes**
   - Click **"Save"** or **"Add"**
   - The domain will be added to your allowed list

### Step 3: Alternative - Use localhost Instead

If you prefer, you can use `localhost` instead of `127.0.0.1`:

1. **Update Frontend URL**
   - Open your browser
   - Instead of `http://127.0.0.1:5173`
   - Use `http://localhost:5173`

2. **Add to Razorpay**
   - Add `http://localhost:5173` to Razorpay dashboard
   - Or add just `localhost`

## Recommended Solution: Add Both

For maximum compatibility, add both:

1. **Add to Razorpay Dashboard:**
   - `http://127.0.0.1:5173`
   - `http://localhost:5173`
   - `127.0.0.1`
   - `localhost`

This ensures it works regardless of which URL you use.

## Step-by-Step Screenshot Guide

### In Razorpay Dashboard:

1. **Settings → Account & Settings**
2. **Scroll to "Additional Business Website/App"**
3. **Click "+" or "Add Website"**
4. **Enter:** `http://127.0.0.1:5173`
5. **Click "Save"**

## Quick Fix: Use localhost

The easiest solution is to use `localhost` instead of `127.0.0.1`:

1. **In your browser, change:**
   - From: `http://127.0.0.1:5173`
   - To: `http://localhost:5173`

2. **Add to Razorpay:**
   - Add `http://localhost:5173` or just `localhost`

## For Production

When you deploy to production:

1. **Add your production domain** to Razorpay:
   - Example: `https://khet2kitchen.com`
   - Example: `https://www.khet2kitchen.com`

2. **Remove localhost domains** (optional, for security)

## Verification

After adding the domain:

1. **Wait a few minutes** for changes to propagate
2. **Try payment again** from your localhost
3. **Check if it works** - payment should go through

## Common Issues

### Domain Not Working After Adding

1. **Wait 5-10 minutes** - Changes may take time to propagate
2. **Clear browser cache** - Press Ctrl+Shift+Delete
3. **Try incognito/private mode** - To rule out cache issues
4. **Check exact URL** - Must match exactly what you added

### Still Getting Error

1. **Verify domain is added** - Check Razorpay dashboard
2. **Check URL matches exactly** - No trailing slashes, exact match
3. **Try different format** - Try with/without http://, with/without port
4. **Contact Razorpay Support** - If still not working

## Important Notes

- ✅ **For Testing:** Adding localhost is fine
- ✅ **For Production:** Add your actual domain
- ⚠️ **Security:** Remove localhost domains in production (optional)
- ⚠️ **Multiple Domains:** You can add multiple domains

## Alternative: Test Mode

If you're in **Test Mode**:
- Some restrictions may be relaxed
- But it's still recommended to add the domain
- Test mode uses test keys (starts with `rzp_test_`)

## Summary

**Quick Fix:**
1. Go to Razorpay Dashboard → Settings
2. Find "Additional Business Website/App"
3. Click "+" and add `http://127.0.0.1:5173` or `http://localhost:5173`
4. Save
5. Wait a few minutes
6. Try payment again

**Or simply use:**
- `http://localhost:5173` instead of `http://127.0.0.1:5173`
- Add `localhost` to Razorpay dashboard

---

**After adding the domain, wait a few minutes and try the payment again!**

