# Firebase Setup & Admin Panel Guide

## Part 1: Firebase Project Create කරන ක්‍රමය

### Step 1: Firebase Console ඇතුළු වෙන්න
1. https://console.firebase.google.com/ ඇතුළු වෙන්න
2. Google ගිණුම සමඟ sign in වෙන්න

### Step 2: New Project Create කරන්න
1. "Create a project" බොතාම ක්ලික් කරන්න
2. Project නම දෙන්න (උදා: "Nagoya Auto Auction")
3. Google Analytics enable කරන්න
4. "Create project" ක්ලික් කරන්න

### Step 3: Web App එක්කරන්න
1. Firebase Console එ දිස්වෙන "Web" icon (</>)  ක්ලික් කරන්න
2. App නම දෙන්න (උදා: "Nagoya Website")
3. "Register app" ක්ලික් කරන්න
4. **Firebase Config කෙටුම්පත ලබාදෙනු ඇත** - මෙම දත්ත copy කරන්න

### Step 4: Firebase Config Copy කරන්න
Firebase Config වගේ:
```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}
```

---

## Part 2: Firebase එ Config File එ Update කරන්න

### Step 1: firebaseConfig.js Open කරන්න
`lib/firebaseConfig.js` file එ open කරන්න

### Step 2: Firebase Config එ Replace කරන්න
```javascript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",           // Firebase Console එකින් copy කරන්න
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 3: Save කරන්න
Ctrl+S දිග save කරන්න

---

## Part 3: Firestore Database Setup කරන්න

### Step 1: Firestore Create කරන්න
1. Firebase Console → "Firestore Database" ක්ලික් කරන්න
2. "Create database" ක්ලික් කරන්න
3. **Security rules**: "Start in test mode" තෝරා ගන්න (පසුව update කරනු ඇත)
4. Region එකට "asia-southeast1" (Singapore) තෝරා ගන්න
5. "Enable" ක්ලික් කරන්න

### Step 2: Firestore Collections Create කරන්න
Firestore වලින් දැන් එම collections manual එ create කරන්න:

#### Collection 1: `vehicles`
1. "+ Create collection" බොතාම ක්ලික් කරන්න
2. Collection ID: `vehicles`
3. "Next" ක්ලික් කරන්න
4. "Auto ID" තෝරා ගන්න
5. "Save" ක්ලික් කරන්න
6. පසුව admin panel එකින් cars add කරනු ඇත

#### Collection 2: `inquiries`
1. "+ Create collection" ක්ලික් කරන්න
2. Collection ID: `inquiries`
3. "Next" → "Auto ID" → "Save"

---

## Part 4: Authentication Setup කරන්න

### Step 1: Email/Password Auth Enable කරන්න
1. Firebase Console → "Authentication" → "Sign-in method"
2. "Email/Password" ක්ලික් කරන්න
3. Enable සිටින්න
4. "Save" ක්ලික් කරන්න

### Step 2: Admin User Create කරන්න
1. "Users" ටැබ් ක්ලික් කරන්න
2. "+ Add user" ක්ලික් කරන්න
3. Email: `admin@nagoya.com` (ඔබේ admin email)
4. Password: ශක්තිමත් password එක දෙන්න
5. "Add user" ක්ලික් කරන්න

---

## Part 5: Storage Setup කරන්න

### Step 1: Firebase Storage Enable කරන්න
1. Firebase Console → "Storage"
2. "Get started" ක්ලික් කරන්න
3. Security rules: "Start in test mode" තෝරා ගන්න
4. Region: "asia-southeast1"
5. "Done" ක්ලික් කරන්න

---

## Part 6: Website එ Run කරන්න

### Terminal එ Command Run කරන්න:
```bash
cd "c:\Users\user\Desktop\New folder (3)"
npm run dev
```

URL Open කරන්න: http://localhost:3000

---

## Part 7: Admin Panel එකින් Cars Add කරන්න

### Step 1: Admin Panel එ ඇතුළු වෙන්න
1. Website එ localhost:3000 දිසි තිබෙන්න
2. Header එ "Admin" බොතාම ක්ලික් කරන්න
3. Admin login page එ දිස්වෙනු ඇත

### Step 2: Admin ලෙස Login කරන්න
1. Email: `admin@nagoya.com`
2. Password: ඔබ Firebase එ create කළ password
3. "Login" ක්ලික් කරන්න

### Step 3: Car Add කරන්න
1. Admin dashboard එ "Add New Vehicle" section එ තිබෙනු ඇත
2. පහත තොරතුරු සම්පූර්ණ කරන්න:

```
Brand:           Toyota / Nissan / Honda ආදිය
Model:           Vitz / Dayz / Aqua ආදිය
Year:            2024 / 2023 / 2022 ආදිය
Price (LKR):     1,265,000
Mileage (km):    25,256
Fuel Type:       Petrol / Hybrid / Diesel
Transmission:    Auto / Manual
Body Type:       Sedan / Hatchback / SUV
Location:        Malabe / Horana / Colombo
Registration:    Registered / Not Registered
Inspection Score: 85-95 (%)
Images:          Click එකින් car images upload කරන්න
```

### Step 4: Submit කරන්න
"Add Vehicle" බොතාම ක්ලික් කරන්න

### Step 5: Website එ දිස්වෙනු ඇත
1. Home page එ (localhost:3000) බිමින් යන්න
2. "Featured Inventory" section එ නම්දහ car දිස්වෙනු ඇත
3. Cars ඇතුළු වෙනු ඇත! ✅

---

## Part 8: Security Rules Update කරන්න (ඉතා වැදගත්!)

### Step 1: Firestore Rules Update කරන්න
1. Firebase Console → "Firestore Database" → "Rules" ටැබ්
2. Rules replace කරන්න:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for vehicles
    match /vehicles/{document=**} {
      allow read: if true;
      allow create, update, delete: if request.auth != null && request.auth.uid == request.auth.uid;
    }
    
    // Public inquiry creation
    match /inquiries/{document=**} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update, delete: if false;
    }
  }
}
```

3. "Publish" ක්ලික් කරන්න

### Step 2: Storage Rules Update කරන්න
1. Firebase Console → "Storage" → "Rules" ටැබ්
2. Rules replace කරන්න:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Public read for all images
    match /vehicles/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. "Publish" ක්ලික් කරන්න

---

## Part 9: Environment Variables Set කරන්න

### .env.local File Create කරන්න
Project root එ `.env.local` file එක create කරන්න:

```
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Step 2: Restart Development Server
Terminal එ:
```bash
npm run dev
```

---

## Troubleshooting

### Issue 1: "Permission Denied" Error
**حل**: Firestore Rules proper ලෙස update කර ඇතිදැයි check කරන්න

### Issue 2: Firebase Config Error
**حل**: Config details Firebase Console එකින් නැවතත් copy කරන්න

### Issue 3: Admin Login එ काम නොකරන්න
**حل**: Firebase Authentication User properly create කර ඇතිදැයි check කරන්න

### Issue 4: Images Upload නොවන්න
**حل**: Storage Rules permissions correct ලෙස set කර ඇතිදැයි check කරන්න

---

## ඔබේ Firebase Project දැන් සූදානම්!

✅ Firebase Project create කර ඇත  
✅ Firestore Collections setup  
✅ Authentication enabled  
✅ Storage enabled  
✅ Rules secured  

**දැන් Admin Panel එකින් cars add කරන්න!** 🚗
