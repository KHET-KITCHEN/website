# Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: ERR_CONNECTION_REFUSED / Failed to Fetch

**Error Message:**
```
Failed to load resource: net::ERR_CONNECTION_REFUSED
Payment error: TypeError: Failed to fetch
```

**Cause:** Backend server is not running.

**Solution:**
1. **Open a terminal/command prompt**
2. **Navigate to server directory:**
   ```powershell
   cd server
   ```
3. **Start the server:**
   ```powershell
   npm start
   ```
4. **Verify server is running:**
   - You should see: `Server running on port 5000`
   - You should see: `✅ Email service configured successfully`

5. **Keep this terminal open** - the server must stay running

6. **Try the payment again** in your browser

---

### Issue 2: Backend Server Not Starting

**Possible Causes:**
- Port 5000 is already in use
- Dependencies not installed
- `.env` file missing or incorrect

**Solutions:**

**Check if port is in use:**
```powershell
# Windows PowerShell
netstat -ano | findstr :5000
```

**Install dependencies:**
```powershell
cd server
npm install
```

**Check `.env` file exists:**
- File should be at: `server/.env`
- Should contain: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `EMAIL_USER`, `EMAIL_PASS`

---

### Issue 3: Frontend Can't Connect to Backend

**Check 1: Verify Backend URL**
- Frontend uses: `http://localhost:5000`
- Check `khet2kitchen/.env` file (if exists):
  ```env
  VITE_API_BASE_URL=http://localhost:5000
  ```

**Check 2: Verify Backend is Running**
- Open browser and go to: `http://localhost:5000`
- You should see a response or error (not connection refused)

**Check 3: CORS Issues**
- Backend has CORS enabled
- If still having issues, check browser console for CORS errors

---

### Issue 4: Email Not Sending

**Check 1: Verify Email Configuration**
- Check server console for: `✅ Email service configured successfully`
- If you see: `⚠️ Email service not properly configured`, check `.env` file

**Check 2: Gmail App Password**
- Must use App Password, not regular password
- App Password should be 16 characters (no spaces)
- 2-Step Verification must be enabled

**Check 3: Check Server Logs**
- After payment, look for: `Confirmation email sent to: customer@email.com`
- If you see errors, check the error message

---

### Issue 5: Payment Modal Not Opening

**Check 1: Razorpay Script Loading**
- Check browser console for script errors
- Verify internet connection

**Check 2: Razorpay Keys**
- Check `RAZORPAY_KEY_ID` in `server/.env`
- Verify keys are correct from Razorpay dashboard

**Check 3: Backend Order Creation**
- Check backend console for errors when clicking "Pay"
- Verify order is created successfully

---

### Issue 6: Payment Verification Failed

**Check 1: Razorpay Key Secret**
- Verify `RAZORPAY_KEY_SECRET` in `server/.env`
- Must match the Key ID from same Razorpay account

**Check 2: Test vs Live Keys**
- If using test keys, use test card: `4111 1111 1111 1111`
- If using live keys, use real payment method

---

## Quick Fixes

### Restart Both Servers

**Terminal 1 - Backend:**
```powershell
cd server
npm start
```

**Terminal 2 - Frontend:**
```powershell
cd khet2kitchen
npm run dev
```

### Clear Browser Cache
- Press `Ctrl + Shift + Delete`
- Clear cache and cookies
- Refresh page (`F5`)

### Check Environment Variables

**Backend (`server/.env`):**
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5000
```

**Frontend (`khet2kitchen/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## Verification Steps

### 1. Check Backend is Running
```powershell
# Should show server running
cd server
npm start
```

### 2. Check Frontend is Running
```powershell
# Should show Vite server
cd khet2kitchen
npm run dev
```

### 3. Test Backend Directly
- Open browser: `http://localhost:5000`
- Should see response or error (not connection refused)

### 4. Test API Endpoint
- Open browser: `http://localhost:5000/api/create-order`
- Should see error (method not allowed) but NOT connection refused

---

## Still Having Issues?

1. **Check all error messages** in browser console (F12)
2. **Check server logs** in backend terminal
3. **Verify all environment variables** are set correctly
4. **Ensure both servers are running**
5. **Check firewall** isn't blocking port 5000

---

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `ERR_CONNECTION_REFUSED` | Backend not running | Start backend server |
| `Failed to fetch` | Backend not accessible | Check backend is running |
| `Email configuration error` | Email not configured | Check `.env` email settings |
| `Invalid payment signature` | Wrong Razorpay keys | Verify keys in `.env` |
| `Payment verification failed` | Backend error | Check server logs |

---

**Need more help? Check the server logs and browser console for detailed error messages!**

