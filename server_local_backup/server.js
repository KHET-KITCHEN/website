import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Razorpay
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.warn('⚠️  Razorpay keys not configured. Payment functionality will not work.');
  console.warn('   Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Initialize Nodemailer - Supports multiple email services
let transporter;

// Check if using API-based email service (SendGrid, Mailgun, etc.)
if (process.env.EMAIL_API_KEY && process.env.EMAIL_SERVICE === 'sendgrid') {
  // SendGrid configuration
  transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.EMAIL_API_KEY,
    },
  });
} else if (process.env.EMAIL_API_KEY && process.env.EMAIL_SERVICE === 'mailgun') {
  // Mailgun configuration
  transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || process.env.MAILGUN_SMTP_USER,
      pass: process.env.EMAIL_API_KEY || process.env.MAILGUN_SMTP_PASSWORD,
    },
  });
} else if (process.env.EMAIL_SMTP_HOST) {
  // Custom SMTP configuration
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP_HOST,
    port: parseInt(process.env.EMAIL_SMTP_PORT || '587'),
    secure: process.env.EMAIL_SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS || process.env.EMAIL_API_KEY,
    },
    tls: {
      rejectUnauthorized: process.env.EMAIL_SMTP_TLS_REJECT === 'true',
    },
  });
} else {
  // Default: Gmail or service-based configuration
  transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Verify email configuration on server start
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
    console.warn('⚠️  Email service not properly configured. Emails may not be sent.');
  } else {
    console.log('✅ Email service configured successfully');
  }
});

// In-memory order storage (in production, use a database)
const orders = new Map();

// Create Razorpay order
app.post('/api/create-order', async (req, res) => {
  try {
    // Check if Razorpay is configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ 
        error: 'Razorpay not configured', 
        details: 'Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file' 
      });
    }

    const { amount, currency = 'INR', items, customer } = req.body;

    if (!amount || !items || !customer) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate amount
    if (amount <= 0 || amount < 1) {
      return res.status(400).json({ error: 'Invalid amount. Minimum amount is ₹1' });
    }

    const orderId = `order_${uuidv4()}`;
    // Razorpay receipt must be max 40 characters
    // Using timestamp + random string to keep it under 40 chars
    const receipt = `K2K${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`.substring(0, 40);
    const options = {
      amount: Math.round(amount * 100), // Convert to paise and round
      currency,
      receipt: receipt,
      notes: {
        items: JSON.stringify(items),
        customer_email: customer.email,
        customer_name: customer.name,
        customer_phone: customer.phone,
      },
    };

    console.log('Creating Razorpay order with amount:', options.amount, 'paise');
    const razorpayOrder = await razorpay.orders.create(options);

    // Store order details
    orders.set(razorpayOrder.id, {
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount,
      items,
      customer,
      status: 'created',
      createdAt: new Date(),
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error details:', {
      message: error.message,
      statusCode: error.statusCode,
      error: error.error,
    });
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create order';
    if (error.statusCode === 401) {
      errorMessage = 'Invalid Razorpay credentials. Please check your API keys.';
    } else if (error.statusCode === 400) {
      errorMessage = error.error?.description || error.message || 'Invalid request to Razorpay';
    } else if (error.message?.includes('key_id') || error.message?.includes('key_secret')) {
      errorMessage = 'Razorpay API keys are missing or invalid. Please check your .env file.';
    }
    
    res.status(500).json({ 
      error: errorMessage, 
      details: error.message,
      statusCode: error.statusCode,
    });
  }
});

// Verify payment and send email
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment details' });
    }

    // Verify signature
    const crypto = await import('crypto');
    const generated_signature = crypto.default
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Get order details
    const order = orders.get(razorpay_order_id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update order status
    order.status = 'paid';
    order.paymentId = razorpay_payment_id;
    order.paidAt = new Date();
    order.trackingId = `TRK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Send confirmation email
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: order.customer.email,
        subject: 'Payment Successful - Khet2Kitchen Order Confirmation',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2E7D32; color: white; padding: 20px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .order-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
              .success { color: #2E7D32; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Payment Successful!</h1>
              </div>
              <div class="content">
                <p class="success">Dear ${order.customer.name},</p>
                <p>Thank you for your order! Your payment has been successfully processed.</p>
                
                <div class="order-details">
                  <h3>Order Details:</h3>
                  <p><strong>Order ID:</strong> ${order.orderId}</p>
                  <p><strong>Payment ID:</strong> ${razorpay_payment_id}</p>
                  <p><strong>Amount:</strong> ₹${order.amount}</p>
                  <p><strong>Date:</strong> ${new Date().toLocaleString('en-IN')}</p>
                  
                  <h4>Items Ordered:</h4>
                  <ul>
                    ${order.items.map(item => `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`).join('')}
                  </ul>
                </div>
                
                <p>We are processing your order and will share the tracking ID and tracking URL in a follow-up email shortly.</p>
                <p>If you have any questions, please feel free to contact us.</p>
              </div>
              <div class="footer">
                <p>Thank you for choosing Khet2Kitchen!</p>
                <p>From Farm to Your Kitchen</p>
              </div>
            </div>
          </body>
          </html>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent to:', order.customer.email);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the payment verification if email fails
    }

    res.json({
      success: true,
      orderId: order.orderId,
      paymentId: razorpay_payment_id,
      trackingId: order.trackingId,
      message: 'Payment verified and confirmation email sent',
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment', details: error.message });
  }
});

// Send tracking email (can be called later when tracking is available)
app.post('/api/send-tracking', async (req, res) => {
  try {
    const { orderId, trackingId, trackingUrl } = req.body;

    // Find order by orderId
    let order = null;
    for (const [key, value] of orders.entries()) {
      if (value.orderId === orderId) {
        order = value;
        break;
      }
    }

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Update tracking info
    order.trackingId = trackingId || order.trackingId;
    order.trackingUrl = trackingUrl;

    // Send tracking email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: order.customer.email,
      subject: 'Your Order Tracking Details - Khet2Kitchen',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2E7D32; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .tracking-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 5px; }
            .tracking-button { display: inline-block; padding: 10px 20px; background-color: #2E7D32; color: white; text-decoration: none; border-radius: 5px; margin-top: 10px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Order is on the Way!</h1>
            </div>
            <div class="content">
              <p>Dear ${order.customer.name},</p>
              <p>Great news! Your order has been processed and is ready for shipment.</p>
              
              <div class="tracking-details">
                <h3>Tracking Information:</h3>
                <p><strong>Order ID:</strong> ${order.orderId}</p>
                <p><strong>Tracking ID:</strong> ${order.trackingId}</p>
                ${order.trackingUrl ? `<a href="${order.trackingUrl}" class="tracking-button">Track Your Order</a>` : ''}
              </div>
              
              <p>You can use the tracking ID above to track your order status.</p>
              <p>If you have any questions, please feel free to contact us.</p>
            </div>
            <div class="footer">
              <p>Thank you for choosing Khet2Kitchen!</p>
              <p>From Farm to Your Kitchen</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Tracking email sent to:', order.customer.email);

    res.json({
      success: true,
      message: 'Tracking email sent successfully',
    });
  } catch (error) {
    console.error('Error sending tracking email:', error);
    res.status(500).json({ error: 'Failed to send tracking email', details: error.message });
  }
});

// Get order status
app.get('/api/order/:orderId', (req, res) => {
  const { orderId } = req.params;
  
  for (const [key, value] of orders.entries()) {
    if (value.orderId === orderId || value.razorpayOrderId === orderId) {
      return res.json(value);
    }
  }
  
  res.status(404).json({ error: 'Order not found' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`\n📋 Configuration Status:`);
  console.log(`   Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   Razorpay Key Secret: ${process.env.RAZORPAY_KEY_SECRET ? '✅ Configured' : '❌ Missing'}`);
  console.log(`   Email Service: ${process.env.EMAIL_USER ? '✅ Configured' : '❌ Missing'}`);
  
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.log(`\n⚠️  WARNING: Razorpay keys are missing!`);
    console.log(`   Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file`);
    console.log(`   Payment functionality will not work without these keys.\n`);
  }
});

