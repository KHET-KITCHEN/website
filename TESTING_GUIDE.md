# Complete Website Testing Guide

Step-by-step guide to test the entire payment flow from cart to email notification.

## Prerequisites

✅ Backend server is running on port 5000  
✅ Frontend server is running on port 5173  
✅ Razorpay API keys are configured in `server/.env`  
✅ Gmail email is configured in `server/.env`  

---

## Step 1: Start Both Servers

### Terminal 1 - Backend Server:
```powershell
cd server
npm start
```

**Expected Output:**
```
Server running on port 5000
Razorpay Key ID: Configured
Email Service: Configured
✅ Email service configured successfully
```

### Terminal 2 - Frontend Server:
```powershell
cd khet2kitchen
npm run dev
```

**Expected Output:**
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## Step 2: Open the Website

1. **Open your browser**
2. **Navigate to:** `http://localhost:5173`
3. **Verify the homepage loads** with:
   - Navbar with cart icon
   - Hero section
   - Featured products
   - Footer

---

## Step 3: Test Shopping Cart

### 3.1 Navigate to Products Page
1. Click **"Products"** in the navbar
2. Or go directly to: `http://localhost:5173/products`

### 3.2 Add Products to Cart
1. **Find a product** (e.g., "Cold Pressed Mustard Oil")
2. **Click "Add to Cart"** button
3. **Verify:**
   - Button changes to quantity controls (+/-)
   - Cart badge in navbar shows item count
   - Quantity shows "1"

### 3.3 Add More Products
1. **Add another product** to cart
2. **Increase quantity** of first product using "+" button
3. **Verify:**
   - Cart badge shows total items (e.g., "3")
   - Quantity controls work correctly

### 3.4 Test Cart Management
1. **Click cart icon** in navbar
2. **Or click "View Cart"** button on products page
3. **Verify:**
   - Redirects to checkout page
   - Order summary shows all items
   - Total amount is calculated correctly

---

## Step 4: Test Checkout Page

### 4.1 Verify Order Summary
- ✅ All products are listed
- ✅ Quantities are correct
- ✅ Prices are correct
- ✅ Total amount is correct
- ✅ Can adjust quantities (+/-)
- ✅ Can remove items (delete icon)

### 4.2 Fill Customer Information Form
Fill in all required fields:

**Required Fields:**
- Full Name: `John Doe`
- Email: `your_test_email@gmail.com` (use a real email you can check)
- Phone Number: `9876543210` (10 digits)
- Address: `123 Test Street`
- City: `Mumbai`
- State: `Maharashtra`
- Pincode: `400001`

### 4.3 Form Validation Test
1. **Try submitting with empty fields**
   - Should show error: "Please fill in all fields"

2. **Try invalid email**
   - Enter: `invalid-email`
   - Should show error: "Please enter a valid email address"

3. **Try invalid phone**
   - Enter: `12345` (less than 10 digits)
   - Should show error: "Please enter a valid 10-digit phone number"

---

## Step 5: Test Payment Flow

### 5.1 Initiate Payment
1. **Fill all customer information correctly**
2. **Click "Pay ₹XXX"** button (e.g., "Pay ₹450")
3. **Verify:**
   - Button shows "Processing..." briefly
   - Razorpay payment modal opens
   - Payment form appears

### 5.2 Razorpay Payment Modal
**Verify the modal shows:**
- ✅ Company name: "Khet2Kitchen Organics"
- ✅ Amount is correct
- ✅ Customer name is pre-filled
- ✅ Email is pre-filled
- ✅ Phone is pre-filled

### 5.3 Test Payment - Success Scenario

**Use Test Card Details:**
- **Card Number:** `4111 1111 1111 1111`
- **Expiry Date:** Any future date (e.g., `12/25`)
- **CVV:** Any 3 digits (e.g., `123`)
- **Name:** Any name (e.g., `John Doe`)

**Steps:**
1. Enter test card details
2. Click **"Pay"** button
3. **Verify:**
   - Payment processes
   - Modal closes
   - Redirects to Payment Success page

### 5.4 Verify Payment Success Page

**Check Success Page Shows:**
- ✅ Green checkmark icon
- ✅ "Payment Successful!" heading
- ✅ Success message
- ✅ "Confirmation Email Sent!" alert
- ✅ Order Details section with:
  - Order ID
  - Payment ID
  - Tracking ID (if generated)
  - Amount Paid
- ✅ Navigation buttons:
  - "Go to Home"
  - "Continue Shopping"

### 5.5 Verify Email Notification

1. **Check your email inbox** (the email you entered in customer form)
2. **Look for email from:** Your Gmail address
3. **Subject:** "Payment Successful - Khet2Kitchen Order Confirmation"
4. **Verify email contains:**
   - ✅ Payment confirmation message
   - ✅ Order ID
   - ✅ Payment ID
   - ✅ Amount paid
   - ✅ Items ordered list
   - ✅ Note about tracking information follow-up

5. **Check spam folder** if not in inbox (common with Gmail)

### 5.6 Check Server Logs

**In backend terminal, verify:**
```
Confirmation email sent to: customer@email.com
```

---

## Step 6: Test Payment Failure

### 6.1 Test Failure Scenario

**Option 1: Cancel Payment**
1. Go through checkout again
2. Click "Pay ₹XXX"
3. When Razorpay modal opens, click **"X"** to close
4. **Verify:**
   - Modal closes
   - Stays on checkout page
   - Can try again

**Option 2: Use Invalid Card**
1. Go through checkout
2. Click "Pay ₹XXX"
3. Enter invalid card details:
   - Card: `4000 0000 0000 0002` (declined card)
   - Or any invalid card number
4. Try to complete payment
5. **Verify:**
   - Payment fails
   - Redirects to Payment Failure page

### 6.2 Verify Payment Failure Page

**Check Failure Page Shows:**
- ✅ Red error icon
- ✅ "Payment Failed" heading
- ✅ Error message explaining what happened
- ✅ Order Details (if available)
- ✅ Troubleshooting tips
- ✅ Action buttons:
  - "Try Again"
  - "Go to Home"
  - "Continue Shopping"

---

## Step 7: Test Cart Persistence

### 7.1 Test LocalStorage
1. **Add products to cart**
2. **Refresh the page** (F5)
3. **Verify:**
   - Cart items are still there
   - Quantities are preserved
   - Cart badge shows correct count

### 7.2 Test Cart After Payment
1. **Complete a successful payment**
2. **Navigate to Products page**
3. **Verify:**
   - Cart is empty
   - Cart badge shows "0"
   - Can add new products

---

## Step 8: Test Navigation

### 8.1 Test All Routes
Navigate through all pages:
- ✅ Home (`/`)
- ✅ About (`/about`)
- ✅ Products (`/products`)
- ✅ Contact (`/contact`)
- ✅ Checkout (`/checkout`)
- ✅ Payment Success (`/payment-success`)
- ✅ Payment Failure (`/payment-failure`)

### 8.2 Test Cart Icon
1. **Click cart icon** in navbar
2. **Verify:** Redirects to checkout page
3. **Check cart badge** shows correct item count

---

## Step 9: Test Responsive Design

### 9.1 Test Mobile View
1. **Open browser DevTools** (F12)
2. **Toggle device toolbar** (Ctrl+Shift+M)
3. **Select mobile device** (e.g., iPhone 12)
4. **Test:**
   - Navbar shows hamburger menu
   - Products grid adjusts
   - Checkout form is usable
   - Payment modal works

### 9.2 Test Tablet View
1. **Select tablet device** (e.g., iPad)
2. **Verify layout** adjusts correctly

---

## Step 10: Test Error Handling

### 10.1 Test Backend Not Running
1. **Stop backend server** (Ctrl+C)
2. **Try to make payment**
3. **Verify:**
   - Error message appears
   - User-friendly error displayed

### 10.2 Test Network Errors
1. **Disconnect internet** temporarily
2. **Try to make payment**
3. **Verify:**
   - Error handling works
   - User sees appropriate message

---

## Expected Results Summary

### ✅ Success Indicators:

**Frontend:**
- ✅ All pages load correctly
- ✅ Cart functionality works
- ✅ Checkout form validates correctly
- ✅ Razorpay modal opens
- ✅ Success/Failure pages display correctly
- ✅ Navigation works smoothly

**Backend:**
- ✅ Server starts without errors
- ✅ Email service configured successfully
- ✅ Orders are created
- ✅ Payments are verified
- ✅ Emails are sent

**Email:**
- ✅ Confirmation email received
- ✅ Email contains all order details
- ✅ Email is properly formatted

---

## Troubleshooting

### Payment Modal Not Opening
- ✅ Check Razorpay Key ID in `.env`
- ✅ Check browser console for errors
- ✅ Verify backend is running
- ✅ Check network connection

### Email Not Received
- ✅ Check spam folder
- ✅ Verify Gmail App Password is correct
- ✅ Check server logs for email errors
- ✅ Verify EMAIL_USER in `.env`

### Payment Verification Failed
- ✅ Check RAZORPAY_KEY_SECRET in `.env`
- ✅ Verify backend logs for errors
- ✅ Check payment was actually successful

### Cart Not Persisting
- ✅ Check browser localStorage is enabled
- ✅ Clear browser cache and try again
- ✅ Check browser console for errors

---

## Test Checklist

- [ ] Backend server starts successfully
- [ ] Frontend server starts successfully
- [ ] Homepage loads correctly
- [ ] Products page displays products
- [ ] Can add products to cart
- [ ] Cart badge shows correct count
- [ ] Can adjust quantities
- [ ] Can remove items from cart
- [ ] Checkout page shows order summary
- [ ] Customer form validates correctly
- [ ] Payment button works
- [ ] Razorpay modal opens
- [ ] Test payment succeeds
- [ ] Success page displays correctly
- [ ] Email is received
- [ ] Cart is cleared after payment
- [ ] Payment failure is handled
- [ ] Failure page displays correctly
- [ ] Navigation works on all pages
- [ ] Responsive design works

---

## Quick Test Commands

**Start Backend:**
```powershell
cd server
npm start
```

**Start Frontend:**
```powershell
cd khet2kitchen
npm run dev
```

**Test Card:**
- Card: `4111 1111 1111 1111`
- Expiry: `12/25`
- CVV: `123`

---

**Happy Testing! 🎉**

If you encounter any issues during testing, check the troubleshooting section or review the server logs for detailed error messages.

