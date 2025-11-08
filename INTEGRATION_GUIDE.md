# Razorpay Payment Integration Guide

This guide will help you set up the Razorpay payment gateway integration for Khet2Kitchen.

## Prerequisites

1. **Razorpay Account**: Sign up at [https://razorpay.com](https://razorpay.com)
2. **Node.js**: Version 16 or higher
3. **Gmail Account**: For sending email notifications (or any email service)

## Backend Setup

### 1. Navigate to Server Directory

```bash
cd server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server Configuration
PORT=5000
```

### 4. Get Razorpay Keys

1. Log in to your Razorpay Dashboard
2. Go to Settings → API Keys
3. Generate Test/Live keys
4. Copy the Key ID and Key Secret to your `.env` file

### 5. Setup Gmail App Password

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS` (not your regular Gmail password)

### 6. Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd khet2kitchen
```

### 2. Configure Environment Variables

Create a `.env` file in the `khet2kitchen` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Install Dependencies (if not already installed)

```bash
npm install
```

### 4. Start the Frontend Development Server

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Features

### 1. Shopping Cart
- Add products to cart from the Products page
- Adjust quantities
- View cart items in the navbar
- Cart persists in localStorage

### 2. Checkout Process
- Customer information form
- Order summary
- Razorpay payment integration
- Payment verification

### 3. Payment Success
- Payment confirmation page
- Order details display
- Email notification sent automatically

### 4. Email Notifications
- **Confirmation Email**: Sent immediately after successful payment
  - Contains order details
  - Payment confirmation
  - Note about tracking information

- **Tracking Email**: Can be sent later via API
  - Contains tracking ID and URL
  - Order status update

## API Endpoints

### Backend Endpoints

1. **POST /api/create-order**
   - Creates a Razorpay order
   - Returns order details for payment

2. **POST /api/verify-payment**
   - Verifies payment signature
   - Sends confirmation email
   - Returns order confirmation

3. **POST /api/send-tracking**
   - Sends tracking details email
   - Requires: `orderId`, `trackingId`, `trackingUrl`

4. **GET /api/order/:orderId**
   - Retrieves order status
   - Returns order details

## Testing

### Test Mode

Razorpay provides test credentials for development:
- Use test keys from Razorpay Dashboard
- Test card: `4111 1111 1111 1111`
- Any future expiry date
- Any CVV

### Production Mode

1. Switch to live keys in Razorpay Dashboard
2. Update `.env` with live credentials
3. Ensure HTTPS is enabled (required for production)

## Troubleshooting

### Payment Not Working
- Check if Razorpay script is loaded
- Verify API keys are correct
- Check browser console for errors
- Ensure backend server is running

### Email Not Sending
- Verify Gmail app password is correct
- Check if 2-Step Verification is enabled
- Ensure `EMAIL_USER` and `EMAIL_PASS` are correct
- Check server logs for email errors

### CORS Issues
- Ensure backend CORS is configured
- Check if frontend URL is allowed
- Verify API base URL is correct

## Security Notes

1. **Never commit `.env` files** to version control
2. Use environment variables for sensitive data
3. Enable HTTPS in production
4. Use Razorpay's webhook for additional security
5. Validate all inputs on the backend

## Next Steps

1. Set up a database (currently using in-memory storage)
2. Implement order management system
3. Add admin dashboard
4. Set up webhooks for payment status updates
5. Implement inventory management

## Support

For issues or questions:
- Razorpay Documentation: https://razorpay.com/docs/
- Check server logs for detailed error messages
- Review browser console for frontend errors

