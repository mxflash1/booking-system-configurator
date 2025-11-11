# 📧 Email Notifications Setup Guide

## What This Does

When a client submits an order, you'll automatically receive:
1. **Email to YOU** - With all order details (pretty HTML email)
2. **Email to CLIENT** - Confirmation that you received their order

---

## 🚀 Quick Setup (10 minutes)

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Initialize Functions

```bash
cd /Users/moliveracervantes/Desktop/Haircuts/booking-system-configurator
firebase init functions
```

Answer the prompts:
- **Use existing project:** Select your Firebase project
- **Language:** JavaScript
- **ESLint:** No (or Yes if you want)
- **Install dependencies:** Yes

### Step 3: Configure Your Email

Open `functions/index.js` and find these lines:

```javascript
const EMAIL_CONFIG = {
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com', // Replace with your Gmail
    pass: 'YOUR_APP_PASSWORD' // We'll get this next
  }
};

const YOUR_EMAIL = 'YOUR_EMAIL@gmail.com'; // Replace with your Gmail
```

Replace with your actual email address.

---

## 🔑 Get Gmail App Password (Required for Gmail)

1. **Go to Google Account Settings:**
   - Visit: https://myaccount.google.com/security

2. **Enable 2-Step Verification:**
   - Find "2-Step Verification" and turn it ON
   - Follow the prompts to set it up

3. **Create App Password:**
   - Go back to Security settings
   - Find "App passwords" (at the bottom)
   - Click "Select app" → Choose "Mail"
   - Click "Select device" → Choose "Other" → Type "Booking Builder"
   - Click **Generate**

4. **Copy the 16-character password:**
   - It looks like: `abcd efgh ijkl mnop`
   - Remove the spaces: `abcdefghijklmnop`

5. **Paste into `functions/index.js`:**
   ```javascript
   pass: 'abcdefghijklmnop'
   ```

---

## 📤 Deploy to Firebase

```bash
firebase deploy --only functions
```

Wait 2-3 minutes for deployment to complete.

---

## ✅ Test It

1. **Open your client landing page** (`index.html`)
2. **Submit a test order**
3. **Check your email inbox**
   - You should receive a beautiful HTML email with all order details
4. **Check the client's email**
   - They should receive a confirmation email

---

## 🎨 Customize Email Templates

Want to change how the emails look?

1. **Open `functions/index.js`**
2. **Find the `emailHTML` sections**
3. **Edit the HTML** to match your branding
4. **Redeploy:**
   ```bash
   firebase deploy --only functions
   ```

---

## 🔧 Troubleshooting

### Emails not sending?

1. **Check Firebase Console:**
   - Go to Functions section
   - Click on your function
   - Check the Logs tab for errors

2. **Common issues:**
   - Wrong Gmail password (must use App Password, not regular password)
   - 2-Step Verification not enabled
   - Firestore rules blocking writes

3. **Test manually:**
   ```bash
   cd functions
   npm run serve
   ```
   Then trigger a test submission

### Want to use a different email service?

**Option 1: SendGrid (Professional)**

1. Sign up at: https://sendgrid.com/ (free tier: 100 emails/day)
2. Get your API key
3. Update `functions/index.js`:
   ```javascript
   const EMAIL_CONFIG = {
     host: 'smtp.sendgrid.net',
     port: 587,
     auth: {
       user: 'apikey',
       pass: 'YOUR_SENDGRID_API_KEY'
     }
   };
   ```

**Option 2: Mailgun**

Similar to SendGrid - just change the SMTP settings.

---

## 💰 Cost

- **Gmail:** 100% FREE
- **SendGrid Free Tier:** 100 emails/day (FREE)
- **Firebase Functions:** First 2 million invocations/month FREE

Unless you're getting 1000s of orders per day, this will cost you **$0**! 🎉

---

## 🎓 How It Works

```
Client submits order
    ↓
Firestore creates document
    ↓
Firebase Function automatically triggers
    ↓
Function sends 2 emails:
    1. To YOU with order details
    2. To CLIENT with confirmation
    ↓
Both emails delivered instantly! ⚡
```

---

## ✨ Done!

You now have professional email notifications set up!

Every time someone orders, you'll get an email with:
- Client's contact info
- Business details
- Colors they chose
- Services they want
- Special requests
- Direct link to view in Firebase Console

**Never miss an order again!** 🚀


