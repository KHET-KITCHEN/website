# Khet2Kitchen Backend Server

Backend server for Khet2Kitchen with Razorpay payment integration and email notifications.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Configure your environment variables:
   - **RAZORPAY_KEY_ID**: Get from Razorpay Dashboard
   - **RAZORPAY_KEY_SECRET**: Get from Razorpay Dashboard
   - **EMAIL_USER**: Your Gmail address
   - **EMAIL_PASS**: Gmail App Password (not regular password)
   - **PORT**: Server port (default: 5000)

## Gmail App Password Setup

1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to App Passwords
4. Generate a new app password for "Mail"
5. Use this password in `EMAIL_PASS`

## Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

## API Endpoints

- `POST /api/create-order` - Create a Razorpay order
- `POST /api/verify-payment` - Verify payment and send confirmation email
- `POST /api/send-tracking` - Send tracking details email
- `GET /api/order/:orderId` - Get order status

