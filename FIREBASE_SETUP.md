# Firebase Setup & Deployment Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Create a project"**
3. Name: `nagoya-auto-auction`
4. Select region (recommended: `asia-southeast1` for Sri Lanka)
5. Click **Create Project**
6. Wait for project to initialize

## Step 2: Get Firebase Credentials

1. In Firebase Console, click **Project Settings** (gear icon)
2. Go to **General** tab
3. Find **Web** section, click icon to add web app
4. App name: `nagoya-auction-web`
5. Copy the config object that looks like:
```javascript
{
  apiKey: "AIz...",
  authDomain: "nagoya-auto-auction-xyz.firebaseapp.com",
  projectId: "nagoya-auto-auction-xyz",
  storageBucket: "nagoya-auto-auction-xyz.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc123"
}
```

## Step 3: Update firebaseConfig.js

Replace `firebaseConfig.js` with your config:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export default firebaseConfig;
```

## Step 4: Update .firebaserc

Update `.firebaserc` with your project ID:
```json
{
  "projects": {
    "default": "nagoya-auto-auction-xyz"
  }
}
```

## Step 5: Enable Firebase Services

### 5.1 Firestore
1. Firebase Console → **Firestore Database**
2. Click **Create Database**
3. Select **Start in test mode** (change to production rules later)
4. Location: `asia-southeast1` (or nearest)
5. Click **Create**

### 5.2 Storage
1. Firebase Console → **Storage**
2. Click **Get Started**
3. Select **Start in test mode** (change to production rules later)
4. Location: `asia-southeast1`
5. Click **Done**

### 5.3 Authentication
1. Firebase Console → **Authentication**
2. Click **Get Started**
3. Click **Email/Password** provider
4. Enable **Email/Password**
5. Click **Save**
6. Go to **Users** tab → **Add User**
7. Email: `owner@nagoya.com` (or your choice)
8. Password: `SecurePassword123!`
9. Click **Add User**

## Step 6: Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
firebase init
```

## Step 7: Deploy Security Rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

This applies:
- Firestore rules that allow public reads, authenticated writes
- Storage rules that allow public reads, authenticated writes

## Step 8: Deploy Cloud Functions

### 8.1 Configure Email (Optional but Recommended)

Edit `functions/src/index.ts`:
Replace this section:
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
  },
});
```

With your actual SMTP credentials (e.g., Gmail, SendGrid):
- Gmail: Use App Password (not regular password)
- SendGrid: Use `apikey` as username, API key as password

### 8.2 Deploy Functions

```bash
cd functions && npm run build && cd ..
firebase deploy --only functions
```

## Step 9: Deploy to Hosting

```bash
npm run build
firebase deploy
```

Your app will be live at: `https://nagoya-auto-auction-xyz.web.app`

## Step 10: Test Everything

1. Open `https://YOUR_PROJECT.web.app`
2. Go to `/admin/login`
3. Sign in with the admin credentials you created
4. Click **Add Vehicle**
5. Fill form and upload test images
6. Vehicle should appear on home page

## Troubleshooting

### Issue: "Permission denied" when uploading images
**Solution:** Check Firebase Storage rules are deployed. Run:
```bash
firebase deploy --only storage:rules
```

### Issue: "User does not exist" on login
**Solution:** Create user in Firebase Console → Authentication → Users

### Issue: Cloud Functions not deploying
**Solution:** Ensure `functions/package.json` has correct dependencies and run:
```bash
firebase functions:config:set sendgrid.key="YOUR_API_KEY"
firebase deploy --only functions
```

### Issue: Firestore showing error creating documents
**Solution:** Check Firestore rules are correct and deployed. Test mode should allow writes initially.

## Production Checklist

- [ ] Change Firestore rules from test mode to production rules
- [ ] Change Storage rules from test mode to production rules
- [ ] Configure email notifications with real SMTP
- [ ] Set up automatic backups in Firestore
- [ ] Enable HTTPS (automatic with Firebase Hosting)
- [ ] Add custom domain (optional)
- [ ] Monitor costs in Firebase Console

## Monitoring & Support

- **Firebase Console:** `console.firebase.google.com`
- **Logs:** Cloud Functions → Logs
- **Usage:** Analytics → Usage & Billing
- **Support:** Firebase documentation at `firebase.google.com/docs`
