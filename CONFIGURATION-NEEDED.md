# ⚙️ Configuration Checklist

## What Needs to Be Configured

### ✅ Already Working
- ✅ Form submission (saves to Firestore)
- ✅ Admin dashboard (views orders)
- ✅ All UI components

### 🔧 Needs Configuration

#### 1. **Firebase Configuration** (REQUIRED)
**File:** `client-files/firebase-admin-config.js`

Replace these placeholders:
```javascript
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_PROJECT.firebaseapp.com",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_PROJECT.appspot.com",
messagingSenderId: "YOUR_SENDER_ID",
appId: "YOUR_APP_ID"
```

**Where to get:** Firebase Console → Project Settings → Your apps → Web app config

---

#### 2. **Email Notifications** (OPTIONAL but recommended)
**File:** `functions/index.js`

Replace these placeholders:
```javascript
user: 'YOUR_EMAIL@gmail.com', // Your Gmail address
pass: 'YOUR_APP_PASSWORD' // Get from Google Account > Security > App Passwords
YOUR_EMAIL = 'YOUR_EMAIL@gmail.com'; // Your email to receive notifications
```

**Setup Steps:**
1. Follow `functions/EMAIL-SETUP-GUIDE.md`
2. Get Gmail App Password (if using Gmail)
3. Update `functions/index.js` with your email
4. Deploy: `firebase deploy --only functions`

**Note:** Email notifications will work automatically once configured. They trigger when orders are saved to Firestore.

---

## Summary

**Placeholders Found:**
1. ✅ Firebase config (6 values) - REQUIRED for form to work
2. ✅ Email config (2 values) - OPTIONAL for email notifications

**Everything else is ready to go!**

Once you configure Firebase (step 1), the form will work. Email notifications (step 2) are optional but recommended.

