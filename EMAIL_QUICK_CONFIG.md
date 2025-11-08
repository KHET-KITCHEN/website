# Email Configuration Quick Reference

Based on which email service you're using, here's what you need to add to your `server/.env` file:

## Option 1: Gmail (Default - For Testing)

```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Setup:**
1. Enable 2-Step Verification in Google Account
2. Generate App Password for "Mail"
3. Use the 16-character password (no spaces)

---

## Option 2: SendGrid (Recommended for Production)

```env
EMAIL_SERVICE=sendgrid
EMAIL_USER=your_verified_email@example.com
EMAIL_API_KEY=SG.your_sendgrid_api_key_here
```

**Setup:**
1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create API Key in Settings → API Keys
3. Verify sender email/domain
4. Copy API key (starts with `SG.`)

---

## Option 3: Mailgun

```env
EMAIL_SERVICE=mailgun
EMAIL_USER=postmaster@your-domain.mailgun.org
EMAIL_API_KEY=your_mailgun_smtp_password
```

**Setup:**
1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Get SMTP credentials from Domain Settings
3. Use SMTP Username and Password

---

## Option 4: Custom SMTP Server

```env
EMAIL_SMTP_HOST=smtp.example.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_password
EMAIL_SMTP_TLS_REJECT=false
```

**Common Examples:**

**Outlook:**
```env
EMAIL_SMTP_HOST=smtp-mail.outlook.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=your_email@outlook.com
EMAIL_PASS=your_password
```

**Yahoo:**
```env
EMAIL_SMTP_HOST=smtp.mail.yahoo.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_SECURE=false
EMAIL_USER=your_email@yahoo.com
EMAIL_PASS=your_app_password
```

---

## Complete `.env` Example

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_key_secret

# Email Configuration (Choose one option above)
EMAIL_SERVICE=sendgrid
EMAIL_USER=noreply@khet2kitchen.com
EMAIL_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Server Configuration
PORT=5000
```

---

## After Configuration

1. **Save the `.env` file**
2. **Restart your server:**
   ```bash
   cd server
   npm start
   ```
3. **Check the console** - You should see:
   - ✅ `Email service configured successfully` (Success)
   - ⚠️ `Email configuration error: ...` (Check your config)

---

## Testing

1. Complete a test payment
2. Check if email is received
3. Check server logs for any errors

---

**For detailed instructions, see `EMAIL_CONFIGURATION_GUIDE.md`**

