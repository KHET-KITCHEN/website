# Quick Setup Steps - After Adding Razorpay API Keys

Follow these steps to get your payment integration running:

## Step 1: Configure Backend Environment

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Open `.env` file** (create it if it doesn't exist)

3. **Add your Razorpay credentials**:
   ```env
   RAZORPAY_KEY_ID=your_razorpay_key_id_here
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   PORT=5000
   ```

4. **Save the file**

## Step 2: Setup Gmail for Email Notifications

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Generate new app password for "Mail"
5. Copy the 16-character password (no spaces)
6. Add it to `EMAIL_PASS` in `.env`

## Step 3: Install Backend Dependencies

```bash
cd server
npm install
```

## Step 4: Configure Frontend Environment

1. **Navigate to frontend directory**
   ```bash
   cd khet2kitchen
   ```

2. **Create `.env` file** (if not exists)

3. **Add API URL**:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Save the file**

## Step 5: Start Backend Server

```bash
cd server
npm start
```

You should see:
```
Server running on port 5000
Razorpay Key ID: Configured
Email Service: Configured
```

## Step 6: Start Frontend Server

Open a **new terminal** and run:

```bash
cd khet2kitchen
npm run dev
```

Frontend will run on `http://localhost:5173`

## Step 7: Test the Payment Flow

1. **Open** `http://localhost:5173` in browser
2. **Go to Products page**
3. **Add products to cart**
4. **Click "View Cart" or cart icon**
5. **Fill customer information form**
6. **Click "Pay ₹XXX" button**
7. **Razorpay payment modal opens**
8. **Use test card**:
   - Card: `4111 1111 1111 1111`
   - Expiry: Any future date (e.g., `12/25`)
   - CVV: Any 3 digits (e.g., `123`)
9. **Complete payment**
10. **Verify**:
    - Success page appears ✅
    - Email received ✅
    - Cart is cleared ✅

## Step 8: Test Payment Failure

1. **Go through checkout again**
2. **Click "Pay ₹XXX"**
3. **Cancel payment or use invalid card**
4. **Verify**:
    - Failure page appears ✅
    - Error message displayed ✅
    - Can retry payment ✅

## Complete Payment Flow

### Success Flow:
```
Products → Add to Cart → Checkout → Fill Form → Pay → 
Razorpay Gateway → Payment Success → Success Page → Email Sent ✅
```

### Failure Flow:
```
Products → Add to Cart → Checkout → Fill Form → Pay → 
Razorpay Gateway → Payment Failed → Failure Page ✅
```

## Troubleshooting

### Backend Not Starting:
- Check if port 5000 is available
- Verify `.env` file exists and has correct values
- Check for error messages in console

### Payment Modal Not Opening:
- Check browser console for errors
- Verify Razorpay Key ID in `.env`
- Ensure backend server is running

### Email Not Sending:
- Verify Gmail App Password (no spaces)
- Check if 2-Step Verification is enabled
- Verify EMAIL_USER matches your Gmail address

### Payment Verification Failed:
- Verify RAZORPAY_KEY_SECRET is correct
- Check backend console for detailed errors

## What's Working Now

✅ Shopping cart with add/remove/update  
✅ Checkout page with order summary  
✅ Customer information form  
✅ Razorpay payment gateway integration  
✅ Payment success page with acknowledgment  
✅ Payment failure page with error handling  
✅ Automatic email notification on success  
✅ Complete error handling throughout  

## Files Created/Modified

### New Files:
- `server/server.js` - Backend server
- `server/package.json` - Backend dependencies
- `khet2kitchen/src/context/CartContext.jsx` - Cart management
- `khet2kitchen/src/pages/Checkout.jsx` - Checkout page
- `khet2kitchen/src/pages/PaymentSuccess.jsx` - Success page
- `khet2kitchen/src/pages/PaymentFailure.jsx` - Failure page ⭐

### Modified Files:
- `khet2kitchen/src/pages/Products.jsx` - Added cart functionality
- `khet2kitchen/src/components/Navbar.jsx` - Added cart icon
- `khet2kitchen/src/App.jsx` - Added routes and CartProvider

---

**Everything is ready! Start both servers and test the payment flow.**

For detailed information, see `CHANGES_SUMMARY.md`

