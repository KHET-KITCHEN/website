# Quick Start Checklist - Razorpay Integration

Follow this checklist step by step after registering on Razorpay.

## ✅ Step 1: Get Razorpay API Keys

- [ ] Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
- [ ] Go to **Settings → API Keys**
- [ ] Generate **Test Keys** (for development)
- [ ] Copy **Key ID** (starts with `rzp_test_...`)
- [ ] Copy **Key Secret** (starts with `rzp_test_...`)
- [ ] ⚠️ Save Key Secret securely (shown only once!)

## ✅ Step 2: Setup Backend Environment

- [ ] Navigate to `server` directory
- [ ] Create `.env` file (copy from `.env.example`)
- [ ] Add Razorpay Key ID to `.env`
- [ ] Add Razorpay Key Secret to `.env`
- [ ] Set `PORT=5000` in `.env`

## ✅ Step 3: Setup Email (Gmail)

- [ ] Go to [Google Account Settings](https://myaccount.google.com/)
- [ ] Enable **2-Step Verification**
- [ ] Go to **App Passwords**
- [ ] Generate new app password for "Mail"
- [ ] Copy the 16-character password
- [ ] Add `EMAIL_USER=your_email@gmail.com` to `.env`
- [ ] Add `EMAIL_PASS=your_app_password` to `.env` (no spaces)

## ✅ Step 4: Install Backend Dependencies

- [ ] In `server` directory, run: `npm install`
- [ ] Verify all packages installed successfully

## ✅ Step 5: Setup Frontend Environment

- [ ] Navigate to `khet2kitchen` directory
- [ ] Create `.env` file
- [ ] Add `VITE_API_BASE_URL=http://localhost:5000` to `.env`

## ✅ Step 6: Start Backend Server

- [ ] In `server` directory, run: `npm start`
- [ ] Verify server is running on port 5000
- [ ] Check console for: "Razorpay Key ID: Configured"
- [ ] Check console for: "Email Service: Configured"

## ✅ Step 7: Start Frontend Server

- [ ] Open a new terminal
- [ ] Navigate to `khet2kitchen` directory
- [ ] Run: `npm run dev`
- [ ] Verify frontend is running on `http://localhost:5173`

## ✅ Step 8: Test Payment Flow

- [ ] Open `http://localhost:5173` in browser
- [ ] Go to Products page
- [ ] Add products to cart
- [ ] Click "View Cart" or cart icon
- [ ] Fill in customer information form
- [ ] Click "Pay ₹XXX" button
- [ ] Razorpay payment modal should open
- [ ] Use test card: `4111 1111 1111 1111`
- [ ] Enter any future expiry date
- [ ] Enter any CVV (e.g., `123`)
- [ ] Complete payment
- [ ] Verify redirect to Payment Success page
- [ ] Check email for confirmation

## ✅ Step 9: Verify Everything Works

- [ ] Payment completes successfully
- [ ] Payment Success page shows order details
- [ ] Confirmation email received
- [ ] Email contains order details
- [ ] No errors in browser console
- [ ] No errors in backend console

## 🎉 Success!

If all checkboxes are checked, your Razorpay integration is complete!

## 📝 Next Steps (Optional)

- [ ] Test with different products
- [ ] Test with different amounts
- [ ] Verify email notifications
- [ ] Check order details on success page
- [ ] Review backend logs for any issues

## 🆘 Troubleshooting

If something doesn't work:

1. **Payment Modal Not Opening**
   - Check browser console for errors
   - Verify Razorpay Key ID in `.env`
   - Ensure backend server is running

2. **Payment Verification Failed**
   - Verify Razorpay Key Secret in `.env`
   - Check backend console for errors

3. **Email Not Sending**
   - Verify Gmail App Password (no spaces)
   - Check if 2-Step Verification is enabled
   - Check backend console for email errors

4. **Backend Not Starting**
   - Check if port 5000 is available
   - Verify all dependencies installed
   - Check `.env` file exists and has correct values

---

**For detailed instructions, see `RAZORPAY_SETUP_GUIDE.md`**

