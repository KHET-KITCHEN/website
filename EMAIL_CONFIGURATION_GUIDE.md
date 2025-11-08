# Email Configuration Guide

This guide explains how to configure different email services for sending payment confirmation and tracking emails.

## Supported Email Services

1. **Gmail SMTP** (Default)
2. **SendGrid** (API-based)
3. **Mailgun** (API-based)
4. **Custom SMTP** (Any SMTP server)

---

## Configuration Options

### Option 1: Gmail SMTP (Recommended for Testing)

This is the default configuration and works with Gmail accounts.

#### `.env` Configuration:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

#### Setup Steps:
1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Enable **2-Step Verification**
3. Go to **App Passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password (no spaces)
6. Add to `EMAIL_PASS` in `.env`

#### Example:
```env
EMAIL_SERVICE=gmail
EMAIL_USER=mybusiness@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

---

### Option 2: SendGrid (Recommended for Production)

SendGrid is a popular email API service with high deliverability.

#### `.env` Configuration:
```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=your_sendgrid_email@example.com
EMAIL_API_KEY=your_sendgrid_api_key
```

#### Setup Steps:
1. **Sign up** at [SendGrid](https://sendgrid.com/)
2. **Create API Key**:
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Choose "Full Access" or "Restricted Access" (Mail Send)
   - Copy the API key (shown only once!)
3. **Verify Sender**:
   - Go to Settings → Sender Authentication
   - Verify your sender email or domain
4. **Add to `.env`**:
   ```env
   EMAIL_SERVICE=sendgrid
   EMAIL_USER=your_verified_email@example.com
   EMAIL_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

#### Example:
```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=noreply@khet2kitchen.com
EMAIL_API_KEY=SG.abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

---

### Option 3: Mailgun

Mailgun is another popular email API service.

#### `.env` Configuration:
```env
EMAIL_SERVICE=mailgun
EMAIL_USER=your_mailgun_smtp_user
EMAIL_API_KEY=your_mailgun_smtp_password
```

#### Setup Steps:
1. **Sign up** at [Mailgun](https://www.mailgun.com/)
2. **Get SMTP Credentials**:
   - Go to Sending → Domain Settings
   - Find your SMTP credentials
   - Copy SMTP Username and SMTP Password
3. **Add to `.env`**:
   ```env
   EMAIL_SERVICE=mailgun
   EMAIL_USER=postmaster@your-domain.mailgun.org
   EMAIL_API_KEY=your_smtp_password
   ```

#### Example:
```env
EMAIL_SERVICE=mailgun
EMAIL_USER=postmaster@mg.khet2kitchen.com
EMAIL_API_KEY=abc123def456ghi789
```

---

### Option 4: Custom SMTP Server

Use any SMTP server (Outlook, Yahoo, custom server, etc.)

#### `.env` Configuration:
```env
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
EMAIL_SMTP_TLS_REJECT=false
```

#### Common SMTP Settings:

**Outlook/Hotmail:**
```env
EMAIL_SMTP_HOST=smtp-mail.outlook.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
EMAIL_SMTP_TLS_REJECT=false
```

**Yahoo:**
```env
EMAIL_SMTP_HOST=smtp.mail.yahoo.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
EMAIL_SMTP_TLS_REJECT=false
```

**Custom Server:**
```env
EMAIL_SMTP_HOST=smtp.yourdomain.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=noreply@yourdomain.com
EMAIL_PASS=your_password
EMAIL_SMTP_TLS_REJECT=false
```

**For SSL/TLS (Port 465):**
```env
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=465
EMAIL_SMTP_SECURE=true
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
EMAIL_SMTP_TLS_REJECT=false
```

---

## Complete `.env` File Examples

### Example 1: Gmail
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=mybusiness@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop

# Server Configuration
PORT=5000
```

### Example 2: SendGrid
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret

# Email Configuration (SendGrid)
EMAIL_SERVICE=sendgrid
EMAIL_USER=noreply@khet2kitchen.com
EMAIL_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Server Configuration
PORT=5000
```

### Example 3: Custom SMTP
```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret

# Email Configuration (Custom SMTP)
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=noreply@example.com
EMAIL_PASS=your_password
EMAIL_SMTP_TLS_REJECT=false

# Server Configuration
PORT=5000
```

---

## Testing Email Configuration

### 1. Start the Server
```bash
cd server
npm start
```

### 2. Check Server Logs
You should see one of these messages:
- ✅ `Email service configured successfully` - Configuration is correct
- ⚠️ `Email configuration error: ...` - Check your configuration

### 3. Test Payment Flow
1. Complete a test payment
2. Check if email is received
3. Check server logs for email errors

### 4. Manual Email Test (Optional)
You can test email by making a payment and checking:
- Server console for email logs
- Customer's email inbox
- Spam folder (if not received)

---

## Troubleshooting

### Email Not Sending

#### Check 1: Verify Configuration
- ✅ Check `.env` file exists
- ✅ Verify all required variables are set
- ✅ Check for typos in email addresses
- ✅ Verify API keys/passwords are correct

#### Check 2: Check Server Logs
```bash
# Look for these messages:
✅ Email service configured successfully
❌ Email configuration error: ...
❌ Error sending email: ...
```

#### Check 3: Common Issues

**Gmail:**
- ❌ Using regular password instead of App Password
- ❌ 2-Step Verification not enabled
- ✅ Solution: Generate App Password

**SendGrid:**
- ❌ API key not correct
- ❌ Sender email not verified
- ✅ Solution: Verify sender in SendGrid dashboard

**Mailgun:**
- ❌ SMTP credentials incorrect
- ❌ Domain not verified
- ✅ Solution: Check Mailgun dashboard

**Custom SMTP:**
- ❌ Wrong host/port
- ❌ Firewall blocking connection
- ❌ Wrong credentials
- ✅ Solution: Test SMTP settings

### Email Going to Spam

1. **Use Professional Email Service**: SendGrid/Mailgun have better deliverability
2. **Verify Domain**: Set up SPF, DKIM records
3. **Use Verified Sender**: Always use verified email addresses
4. **Avoid Spam Words**: Email content is already optimized

### Connection Timeout

1. **Check Firewall**: Ensure port 587/465 is open
2. **Check Network**: Verify internet connection
3. **Try Different Port**: Switch between 587 and 465
4. **Check TLS Settings**: Adjust `EMAIL_SMTP_SECURE` and `EMAIL_SMTP_TLS_REJECT`

---

## Security Best Practices

1. **Never Commit `.env` Files**: Already in `.gitignore`
2. **Use App Passwords**: Don't use main account passwords
3. **Rotate API Keys**: Regularly update API keys
4. **Limit API Permissions**: Use restricted access when possible
5. **Monitor Email Logs**: Check for suspicious activity

---

## Production Recommendations

### For Production, Use:
1. **SendGrid** or **Mailgun** (Better deliverability)
2. **Verified Domain**: Set up custom domain
3. **SPF/DKIM Records**: Improve email authentication
4. **Email Templates**: Professional HTML templates (already implemented)
5. **Error Monitoring**: Set up alerts for email failures

### Avoid in Production:
- ❌ Gmail personal accounts (use business email)
- ❌ Unverified senders
- ❌ Shared email accounts
- ❌ Weak passwords

---

## Quick Reference

### Required Variables by Service:

**Gmail:**
- `EMAIL_SERVICE=gmail`
- `EMAIL_USER`
- `EMAIL_PASS`

**SendGrid:**
- `EMAIL_SERVICE=sendgrid`
- `EMAIL_USER`
- `EMAIL_API_KEY`

**Mailgun:**
- `EMAIL_SERVICE=mailgun`
- `EMAIL_USER`
- `EMAIL_API_KEY`

**Custom SMTP:**
- `EMAIL_SMTP_HOST`
- `EMAIL_SMTP_PORT`
- `EMAIL_SMTP_SECURE`
- `EMAIL_USER`
- `EMAIL_PASS`

---

## Need Help?

1. **Check Server Logs**: Look for error messages
2. **Verify Configuration**: Compare with examples above
3. **Test Connection**: Server will verify on startup
4. **Check Email Service Dashboard**: Verify settings there

---

**After configuring, restart your server to apply changes!**

```bash
# Stop server (Ctrl+C)
# Start server again
npm start
```

