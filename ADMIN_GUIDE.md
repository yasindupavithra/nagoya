# Admin Panel - Cars Add කරන ක්‍රමය 🚗

## Quick Start

### Step 1: Admin Panel එ ඇතුළු වෙන්න
1. Website එ http://localhost:3000 විසිටින අතරතුර "Admin" බොතාම ක්ලික් කරන්න
2. Admin login page එ දිස්වෙනු ඇත

### Step 2: Admin Credentials සමඟ Sign In කරන්න
```
Email:    admin@nagoya.com
Password: ඔබ Firebase Console එ set කළ password
```

ඒක ක්ලික් කරන්න: **"Sign In"** බොතාම

---

## Dashboard එ ඇතිවෙන විට

### දිස්වෙන දෑ:
- **Active Listings**: එතෙකට ඉතුරු cars ගිණන
- **Sold Listings**: විකිණු cars ගිණන
- **New Inquiries**: Buyers ගෙන්නා ප්‍රශ්න ගිණන

### දකුණු කෙළවරින්:
**"Add Vehicle"** බොතාම ක්ලික් කරන්න ➜ New car එක්කරන්න

---

## Car එක්කරන ක්‍රමය (Form එ පිරවීම)

### Step 1: Brand තෝරා ගන්න
```
Options:
- Toyota
- Nissan
- Honda
- Mitsubishi
- Suzuki
```
ඔබේ car brand තෝරා ගන්න

### Step 2: Model දෙන්න
```
උදා: "Vitz" / "Dayz" / "Aqua" / "Fit" ආදිය
```
Model නම text field එ type කරන්න

### Step 3: Year දෙන්න
```
Min: 2005
Max: 2025
```
Car කවද්දා නිෂ්පාදනය වුණේද ඒ වසර දෙන්න

### Step 4: Price (LKR) දෙන්න
```
උදා: 1,265,000
```
Car මිල ඇතුලු කරන්න

### Step 5: Mileage (km) දෙන්න
```
උදා: 25,256 km
```
Car බිහිසුණු දුර දෙන්න

### Step 6: Fuel Type තෝරා ගන්න
```
- Petrol (පෙට‍්‍රල්)
- Hybrid (හයිබ්‍රිඩ්)
- Diesel (ඩිසල්)
```

### Step 7: Transmission තෝරා ගන්න
```
- Auto (ස්වයංක‍්‍රිය)
- Manual (ඉන්ජිනේරු)
```

### Step 8: Body Type තෝරා ගන්න
```
- Sedan (සෙඩාන්)
- Hatchback (හැට්චබැක්)
- SUV (ඔසිවී)
- Compact (කුඩා)
- Van (වෑන්)
```

### Step 9: Registration Status තෝරා ගන්න
```
- Registered (ලියාපදිංචි)
- Unregistered (ලියාපදිංචි නොවූ)
```

### Step 10: Location තෝරා ගන්න
```
- Malabe (මාලාබේ)
- Horana (හෝරණ)
- Colombo (කොළඹ)
- Negombo (නෙගොම්බ)
```

### Step 11: Inspection Score දෙන්න
```
Min: 0
Max: 100
උදා: 88 / 92 / 95
```
Car අවිත්‍යඕත්කරණ ලකුණ (%)

### Step 12: Images Upload කරන්න
```
1. "Choose Files" බොතාම ක්ලික් කරන්න
2. කිතුනු images තෝරා ගන්න (අවම 1, සුපුරුදු 3-5)
3. Open ක්ලික් කරන්න
```

**ඉතා වැදගත්**: අවම තරමින් **1 image** upload කරන්න!

---

## Form එ Submit කරන්න

### Step 13: "Save Vehicle" බොතාම ක්ලික් කරන්න
- Images upload වනු ඇත
- Car data Firestore එ save වනු ඇත
- Success message දිස්වනු ඇත ✅

---

## Homepage එ දිස්වෙනු ඇත

✅ Home page එ බිමින් යන්න: http://localhost:3000  
✅ "Featured Inventory" section එ නම්දා car දිස්වෙනු ඇත  
✅ Search filters සහ car cards ක‍්‍රියාත්මක ව ඇත!

---

## Multiple Cars Add කරන්න

1. Dashboard එ නැවතත් එන්න (Back)
2. "Add Vehicle" බොතාම ක්ලික් කරන්න
3. Steps 1-13 ප්‍රතිවර්තනය කරන්න
4. අවශ්‍ය ගිණන cars සඳහා පුනරාවර්තනය කරන්න

---

## Troubleshooting

### ❌ "Please upload at least one image" Error
**Solution**: අවම තරමින් 1 image upload කරන්න

### ❌ "Failed to add vehicle" Error
**Solution**: 
- Firebase credentials නිවැරදිදැයි check කරන්න
- Internet connection confirm කරන්න
- Storage Rules permissions check කරන්න

### ❌ Car images දිස්නොවන්න
**Solution**: Storage Rules update කර ඇතිදැයි check කරන්න

### ❌ Dashboard එ data පෙනෙන්නේ නැත
**Solution**: 
- Admin login නිවැරදිදැයි confirm කරන්න
- Firestore security rules check කරන්න

---

## Dashboard එ Manage කරන්න

### Inventory එ බලන්න
1. Admin Dashboard → "Manage Inventory" බොතාම ක්ලික් කරන්න
2. All cars listed වනු ඇත
3. Edit/Delete කිරීමට option තිබෙනු ඇත

### Sign Out කරන්න
Admin Dashboard → "Sign Out" බොතාම ක්ලික් කරන්න

---

## ඔබේ Admin Panel දැන් සූදානම්! 🎉

සරල steps සඳහා Firebase SETUP GUIDE.md document එ බලන්න
