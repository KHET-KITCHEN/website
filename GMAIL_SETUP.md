# Gmail Email Configuration - Step by Step

Complete guide for setting up Gmail email notifications for payment confirmations.

## Step 1: Enable 2-Step Verification

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", find **2-Step Verification**
4. Click on it and follow the prompts to enable it
   - You'll need to verify your phone number
   - You'll receive a verification code via SMS

## Step 2: Generate App Password

1. After enabling 2-Step Verification, go back to **Security** settings
2. Find **App passwords** (it appears after 2-Step Verification is enabled)
3. Click on **App passwords**
4. You may need to sign in again
5. Select **Mail** as the app
6. Select **Other (Custom name)** as the device
7. Enter a name like "Khet2Kitchen Server" or "Payment Notifications"
8. Click **Generate**
9. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)
   - ⚠️ **Important**: This password is shown only once! Save it securely.

## Step 3: Configure `.env` File

Open your `server/.env` file and add these lines:

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=abcdefghijklmnop
```

### Important Notes:
- **EMAIL_USER**: Your full Gmail address (e.g., `mybusiness@gmail.com`)
- **EMAIL_PASS**: The 16-character App Password (remove spaces if any)
- **Do NOT use your regular Gmail password** - it won't work!

### Example `.env` File:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret_here

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=mybusiness@gmail.com
EMAIL_PASS=abcdefghijklmnop

# Server Configuration
PORT=5000
```

## Step 4: Save and Restart Server

1. **Save the `.env` file**
2. **Restart your server:**
   ```bash
   cd server
   npm start
   ```

3. **Check the console output:**
   - ✅ `Email service configured successfully` = Working!
   - ⚠️ `Email configuration error: ...` = Check your configuration

## Step 5: Test Email Configuration

### Test by Making a Payment:

1. Start your frontend server:
   ```bash
   cd khet2kitchen
   npm run dev
   ```

2. Go to `http://localhost:5173`
3. Add products to cart
4. Go to checkout
5. Fill customer information (use a real email address you can check)
6. Complete payment with test card: `4111 1111 1111 1111`
7. Check the email inbox for confirmation email

### Check Server Logs:

After successful payment, you should see in server console:
```
Confirmation email sent to: customer@email.com
```

## Troubleshooting

### Email Not Sending?

#### Check 1: Verify App Password
- ✅ Make sure you're using **App Password**, not regular password
- ✅ App Password should be 16 characters (no spaces)
- ✅ 2-Step Verification must be enabled

#### Check 2: Check Server Logs
Look for these messages:
- ❌ `Email configuration error: Invalid login`
  - **Solution**: Check EMAIL_USER and EMAIL_PASS are correct
- ❌ `Email configuration error: Connection timeout`
  - **Solution**: Check internet connection
- ❌ `Error sending email: ...`
  - **Solution**: Check error message details

#### Check 3: Common Issues

**Issue: "Invalid login"**
- ❌ Using regular Gmail password
- ✅ **Solution**: Generate App Password

**Issue: "2-Step Verification required"**
- ❌ 2-Step Verification not enabled
- ✅ **Solution**: Enable 2-Step Verification first

**Issue: "App Password not found"**
- ❌ App Password not generated
- ✅ **Solution**: Generate new App Password

**Issue: Email goes to spam**
- ✅ This is normal for Gmail personal accounts
- ✅ Check spam folder
- ✅ For production, consider using SendGrid or Mailgun

### Email Going to Spam?

This is common with Gmail personal accounts. To improve deliverability:

1. **Check Spam Folder**: Emails might be there
2. **Mark as Not Spam**: If found in spam
3. **For Production**: Consider using SendGrid or Mailgun for better deliverability

### Still Not Working?

1. **Verify `.env` file exists** in `server` directory
2. **Check for typos** in email address
3. **Ensure no spaces** in App Password
4. **Restart server** after changing `.env`
5. **Check server console** for detailed error messages

## Security Best Practices

1. ✅ **Never commit `.env` file** to version control (already in `.gitignore`)
2. ✅ **Use App Passwords** instead of main account password
3. ✅ **Don't share App Passwords** publicly
4. ✅ **Rotate App Passwords** periodically
5. ✅ **Use separate Gmail account** for production (not personal)

## Production Recommendations

For production, consider:
- **SendGrid** or **Mailgun** (better deliverability)
- **Business Gmail account** (better than personal)
- **Custom domain email** (more professional)
- **SPF/DKIM records** (improve email authentication)

## Quick Reference

### Required Variables:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### Server Console Messages:
- ✅ `Email service configured successfully` = Good!
- ⚠️ `Email configuration error: ...` = Check config

### Test Card:
- Card: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits

---

**After configuration, restart your server and test a payment!**

