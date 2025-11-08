# Razorpay Setup Guide - Step by Step

Follow these steps after starting your Razorpay registration to complete the integration.

## Step 1: Complete Razorpay Registration

1. **Complete your Razorpay account setup**
   - Fill in all required business details
   - Verify your email and phone number
   - Complete KYC (Know Your Customer) verification if required

2. **Access the Dashboard**
   - Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
   - Navigate to your account

## Step 2: Get Your API Keys

### For Testing (Development)

1. **Go to Settings → API Keys**
   - In the Razorpay Dashboard, click on **Settings** in the left sidebar
   - Click on **API Keys** from the settings menu

2. **Generate Test Keys**
   - You'll see a section for **Test Mode** keys
   - Click on **Generate Test Keys** if you haven't already
   - You'll get:
     - **Key ID** (starts with `rzp_test_...`)
     - **Key Secret** (starts with `rzp_test_...`)

3. **Copy Your Keys**
   - Copy the **Key ID** and **Key Secret**
   - ⚠️ **Important**: The Key Secret is shown only once. Save it securely!

### For Production (Live)

1. **Switch to Live Mode**
   - In the API Keys section, switch to **Live Mode**
   - Complete all business verification requirements
   - Generate Live Keys (starts with `rzp_live_...`)

## Step 3: Configure Backend Environment Variables

1. **Navigate to Server Directory**
   ```bash
   cd server
   ```

2. **Create `.env` File**
   - Copy the example file:
     ```bash
     # On Windows PowerShell
     Copy-Item .env.example .env
     
     # On Mac/Linux
     cp .env.example .env
     ```
   - Or create a new `.env` file manually

3. **Edit `.env` File**
   Open `.env` and add your Razorpay credentials:
   ```env
   # Razorpay Configuration
   RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=your_key_secret_here
   
   # Email Configuration
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   
   # Server Configuration
   PORT=5000
   ```

4. **Replace the Values**
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID (from Step 2)
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret (from Step 2)
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Gmail App Password (see Step 4)

## Step 4: Setup Gmail for Email Notifications

### Option A: Using Gmail (Recommended for Testing)

1. **Enable 2-Step Verification**
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Click on **Security**
   - Enable **2-Step Verification** if not already enabled

2. **Generate App Password**
   - In Security settings, find **App passwords**
   - Click on **App passwords**
   - Select **Mail** as the app
   - Select **Other (Custom name)** as device
   - Enter "Khet2Kitchen" as the name
   - Click **Generate**
   - Copy the 16-character password (no spaces)

3. **Add to `.env` File**
   ```env
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx
   ```
   ⚠️ **Note**: Remove spaces from the app password when adding to `.env`

### Option B: Using Other Email Services

If using a different email service, update the `EMAIL_SERVICE` in `.env`:
- For Outlook: `EMAIL_SERVICE=hotmail`
- For Yahoo: `EMAIL_SERVICE=yahoo`
- For Custom SMTP: Configure in `server.js` with SMTP settings

## Step 5: Install Backend Dependencies

1. **Navigate to Server Directory**
   ```bash
   cd server
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

   This will install:
   - express
   - cors
   - dotenv
   - razorpay
   - nodemailer
   - uuid

## Step 6: Configure Frontend Environment Variables

1. **Navigate to Frontend Directory**
   ```bash
   cd khet2kitchen
   ```

2. **Create `.env` File**
   ```bash
   # On Windows PowerShell
   New-Item .env
   
   # On Mac/Linux
   touch .env
   ```

3. **Add API Base URL**
   Open `.env` and add:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

   ⚠️ **For Production**: Change to your production backend URL:
   ```env
   VITE_API_BASE_URL=https://your-backend-domain.com
   ```

## Step 7: Start the Backend Server

1. **Start the Server**
   ```bash
   cd server
   npm start
   ```

   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

2. **Verify Server is Running**
   - You should see:
     ```
     Server running on port 5000
     Razorpay Key ID: Configured
     Email Service: Configured
     ```

3. **Test the Server**
   - Open browser and go to: `http://localhost:5000`
   - You should see a response or error (which is normal if no routes are defined for root)

## Step 8: Start the Frontend

1. **Open a New Terminal**
   - Keep the backend server running
   - Open a new terminal window/tab

2. **Navigate to Frontend**
   ```bash
   cd khet2kitchen
   ```

3. **Start Frontend Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Frontend will run on `http://localhost:5173`
   - Open this URL in your browser

## Step 9: Test the Payment Integration

### Test Payment Flow

1. **Add Products to Cart**
   - Go to Products page
   - Click "Add to Cart" on any product
   - Adjust quantities if needed

2. **Go to Checkout**
   - Click "View Cart" button or cart icon in navbar
   - Fill in customer information form

3. **Test Payment**
   - Click "Pay ₹XXX" button
   - Razorpay payment modal should open
   - Use test card details:
     - **Card Number**: `4111 1111 1111 1111`
     - **Expiry**: Any future date (e.g., `12/25`)
     - **CVV**: Any 3 digits (e.g., `123`)
     - **Name**: Any name

4. **Complete Payment**
   - Enter test card details
   - Click "Pay"
   - Payment should be successful

5. **Verify**
   - You should be redirected to Payment Success page
   - Check your email for confirmation email
   - Check backend console for logs

## Step 10: Verify Email Notifications

1. **Check Your Email**
   - After successful payment, check the email address you provided
   - You should receive a confirmation email

2. **If Email Not Received**
   - Check spam folder
   - Verify `EMAIL_USER` and `EMAIL_PASS` in `.env`
   - Check backend console for email errors
   - Ensure Gmail App Password is correct

## Troubleshooting

### Payment Modal Not Opening
- ✅ Check if Razorpay script is loading (check browser console)
- ✅ Verify `RAZORPAY_KEY_ID` is correct in `.env`
- ✅ Ensure backend server is running
- ✅ Check browser console for errors

### Payment Verification Failed
- ✅ Verify `RAZORPAY_KEY_SECRET` is correct
- ✅ Check backend logs for detailed error messages
- ✅ Ensure you're using test keys for test payments

### Email Not Sending
- ✅ Verify Gmail App Password is correct (no spaces)
- ✅ Check if 2-Step Verification is enabled
- ✅ Verify `EMAIL_USER` matches your Gmail address
- ✅ Check backend console for email errors

### CORS Errors
- ✅ Ensure backend CORS is enabled (already configured)
- ✅ Verify `VITE_API_BASE_URL` matches backend URL
- ✅ Check if backend server is running

### Backend Server Not Starting
- ✅ Check if port 5000 is already in use
- ✅ Verify all dependencies are installed (`npm install`)
- ✅ Check `.env` file exists and has correct values
- ✅ Look for error messages in console

## Next Steps After Testing

1. **Switch to Live Mode** (When ready for production)
   - Complete all Razorpay business verification
   - Generate Live API keys
   - Update `.env` with live keys
   - Enable HTTPS (required for production)

2. **Set Up Database** (Optional)
   - Currently using in-memory storage
   - Consider adding MongoDB/PostgreSQL for production

3. **Add Webhooks** (Recommended)
   - Set up Razorpay webhooks for additional security
   - Handle payment status updates

4. **Deploy to Production**
   - Deploy backend to a hosting service
   - Deploy frontend to a hosting service
   - Update environment variables for production

## Security Checklist

- ✅ Never commit `.env` files to version control
- ✅ Use environment variables for all sensitive data
- ✅ Enable HTTPS in production
- ✅ Use Razorpay webhooks for payment verification
- ✅ Validate all inputs on backend
- ✅ Keep Razorpay keys secure

## Support Resources

- **Razorpay Documentation**: https://razorpay.com/docs/
- **Razorpay Dashboard**: https://dashboard.razorpay.com
- **Razorpay Support**: support@razorpay.com

## Quick Reference

### Test Card Details
- **Card Number**: `4111 1111 1111 1111`
- **Expiry**: Any future date
- **CVV**: Any 3 digits
- **Name**: Any name

### Important URLs
- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:5173`
- **Razorpay Dashboard**: https://dashboard.razorpay.com

### Key Files
- **Backend Config**: `server/.env`
- **Frontend Config**: `khet2kitchen/.env`
- **Backend Server**: `server/server.js`

---

**Need Help?** Check the `INTEGRATION_GUIDE.md` for more detailed information.

