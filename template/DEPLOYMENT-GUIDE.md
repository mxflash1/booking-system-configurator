# 🚀 Deployment Guide - {{BUSINESS_NAME}}

Your booking system is ready to deploy! Follow these simple steps.

---

## ⚡ Quick Deploy (5 minutes)

### Step 1: Install Firebase CLI (One-time setup)

Open Terminal and run:
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

A browser window will open - sign in with your Google account.

### Step 3: Navigate to Your Files

```bash
cd ~/Downloads/{{BUSINESS_NAME_SLUG}}
```

### Step 4: Initialize Firebase Project

```bash
firebase init
```

When prompted:
- **"Which Firebase features?"** → Select `Hosting` and `Firestore` (use spacebar to select)
- **"Use an existing project?"** → Yes
- **"Select a project"** → Choose `{{FIREBASE_PROJECT_ID}}`
- **"What do you want to use as your public directory?"** → `public`
- **"Configure as a single-page app?"** → No
- **"Overwrite index.html?"** → **No** (important!)

### Step 5: Deploy!

```bash
firebase deploy
```

Wait 30-60 seconds for deployment to complete.

### Step 6: Get Your Live URL

After deployment completes, you'll see:
```
✔  Deploy complete!

Hosting URL: https://{{FIREBASE_PROJECT_ID}}.web.app
```

**That's your live website! 🎉**

---

## 📁 File Structure

Your package includes:
```
{{BUSINESS_NAME_SLUG}}/
├── public/
│   ├── index.html              # Main booking page
│   ├── css/
│   │   └── style.css           # Your branded styles
│   ├── js/
│   │   ├── booking.js          # Booking logic
│   │   ├── firebase-config.js  # Firebase connection
│   │   └── ...                 # Other features
│   ├── config/
│   │   ├── firebase-config.json
│   │   └── availability-config.json
│   └── images/
│       └── (add your logo files here)
├── firebase.json               # Firebase hosting config
├── firestore.rules             # Database security rules
└── README.md                   # This file
```

---

## 🎨 Customization

### Add Your Logo

1. Add your logo files to `public/images/`:
   - `logo_open.png` (large logo for hero)
   - `lil_logo_opened.png` (small logo for nav)
   - `favicon.png` (browser tab icon)

2. Redeploy:
   ```bash
   firebase deploy
   ```

### Update Colors or Content

1. Edit `public/index.html` or `public/css/style.css`
2. Test locally: `firebase serve`
3. Deploy: `firebase deploy`

---

## 🔥 Your Configuration

- **Project ID:** `{{FIREBASE_PROJECT_ID}}`
- **Hosting URL:** `https://{{FIREBASE_PROJECT_ID}}.web.app`
- **Admin Panel:** `https://{{FIREBASE_PROJECT_ID}}.web.app/{{ADMIN_URL}}`
- **Primary Color:** {{PRIMARY_COLOR}}
- **Secondary Color:** {{SECONDARY_COLOR}}

---

## 🔒 Security Setup (Important!)

### 1. Configure Email Notifications (Optional)

If you want email notifications for new bookings:

```bash
firebase functions:config:set gmail.user="your-email@gmail.com" gmail.pass="your-app-password"
```

Get an app password: https://myaccount.google.com/apppasswords

{{#NOTIF_SMS}}
### 2. Configure SMS Notifications (Optional)

Set up Twilio credentials:

```bash
firebase functions:config:set twilio.account_sid="YOUR_ACCOUNT_SID" twilio.auth_token="YOUR_AUTH_TOKEN" twilio.phone="YOUR_TWILIO_PHONE"
```
{{/NOTIF_SMS}}

---

## 🧪 Testing Before Launch

### Test Locally
```bash
firebase serve
```
Visit: http://localhost:5000

### Test Features
- ✅ Book an appointment
- ✅ Cancel a booking (lookup by phone)
{{#FEATURE_AUTH}}
- ✅ Create user account
- ✅ Login/logout
{{/FEATURE_AUTH}}
- ✅ Check admin panel (`/{{ADMIN_URL}}`)

---

## 📱 Share Your Site

Once deployed, share your booking URL:
```
https://{{FIREBASE_PROJECT_ID}}.web.app
```

You can also set up a custom domain:
```bash
firebase hosting:channel:deploy live
```

---

## 🆘 Troubleshooting

**"firebase: command not found"**
- Reinstall Firebase CLI: `npm install -g firebase-tools`

**"Permission denied"**
- Run: `firebase login --reauth`

**"index.html overwritten"**
- Don't worry! Just re-copy the files from your download

**"Deploy failed"**
- Check Firebase project exists
- Verify you're logged in: `firebase login`

---

## 📊 Monitor Your Site

**Firebase Console:** https://console.firebase.google.com
- View bookings: Firestore Database
- Check analytics: Hosting section
- Monitor usage: Usage tab

---

## 🎓 Learn More

- Firebase Docs: https://firebase.google.com/docs
- Firestore Queries: https://firebase.google.com/docs/firestore
- Custom Domains: https://firebase.google.com/docs/hosting/custom-domain

---

**Need Help?**
Contact your system administrator or check the Firebase documentation.

---

**Generated:** {{GENERATION_DATE}}
**System Version:** 1.0.0

