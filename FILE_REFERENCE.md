# Project File Reference

## Configuration Files
| File | Purpose |
|---|---|
| `firebaseConfig.js` | Firebase credentials (FILL WITH YOUR CREDENTIALS) |
| `.firebaserc` | Firebase project ID reference |
| `firebase.json` | Firebase hosting & functions config |
| `package.json` | npm dependencies |
| `tsconfig.json` | TypeScript configuration |
| `next.config.mjs` | Next.js configuration |

## Security Rules
| File | Purpose |
|---|---|
| `firestore.rules` | Firestore database security rules |
| `storage.rules` | Firebase Storage security rules |

## Frontend Pages
| File | Route | Purpose |
|---|---|---|
| `app/page.tsx` | `/` | Home with search bar & featured inventory |
| `app/inventory/page.tsx` | `/inventory` | Full inventory browser with filters |
| `app/vehicle/[id]/page.tsx` | `/vehicle/[id]` | Vehicle detail, gallery, lease calculator |
| `app/admin/page.tsx` | `/admin` | Admin dashboard with stats |
| `app/admin/login/page.tsx` | `/admin/login` | Owner login page |
| `app/admin/inventory/page.tsx` | `/admin/inventory` | Inventory management table |
| `app/admin/inventory/add/page.tsx` | `/admin/inventory/add` | Add vehicle form |

## Components
| File | Purpose |
|---|---|
| `components/VehicleCard.tsx` | Displays individual vehicle in grid (with 360° badge) |
| `components/LeaseCalculator.tsx` | Interactive lease calculator (down payment + tenor) |

## Styles
| File | Purpose |
|---|---|
| `app/layout.tsx` | Root layout with sticky header |
| `app/globals.css` | Global design system (colors, typography, layout) |

## Firebase & Database
| File | Purpose |
|---|---|
| `lib/firebase.ts` | Firebase app initialization & auth setup |
| `lib/firestore.ts` | Firestore CRUD operations (vehicles, inquiries) |
| `lib/storage.ts` | Firebase Storage image upload helper |
| `lib/types.ts` | TypeScript types (Vehicle, Inquiry) |

## Backend Functions
| File | Purpose |
|---|---|
| `functions/src/index.ts` | Cloud Functions (autoFillVehicleSpecs, onInquiryReceive) |
| `functions/package.json` | Functions dependencies |
| `functions/tsconfig.json` | Functions TypeScript config |

## Static Assets
| File | Purpose |
|---|---|
| `public/placeholder.svg` | Fallback car image |

## Documentation
| File | Purpose |
|---|---|
| `README.md` | Project overview & full documentation |
| `FIREBASE_SETUP.md` | Step-by-step Firebase deployment guide |
| `DELIVERY_SUMMARY.md` | Project completion checklist |

---

## Quick Start

1. **Update Firebase Credentials**
   ```bash
   # Edit firebaseConfig.js with your Firebase project details
   nano firebaseConfig.js
   ```

2. **Update Firebase Project ID**
   ```bash
   # Edit .firebaserc with your project ID
   nano .firebaserc
   ```

3. **Install Dependencies**
   ```bash
   npm install
   cd functions && npm install && cd ..
   ```

4. **Build Locally**
   ```bash
   npm run build
   ```

5. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

See `FIREBASE_SETUP.md` for detailed instructions.

---

## Key Features at a Glance

✅ **Buyer Pages:**
- Homepage with advanced search filters
- Full inventory browser with dynamic filters
- Vehicle detail page with image gallery
- Built-in lease calculator
- WhatsApp inquiry integration

✅ **Admin Pages:**
- Email/password authentication
- Dashboard with stats
- Inventory management table
- Multi-image vehicle upload form

✅ **Backend:**
- Firestore database collections
- Firebase Storage for images
- Cloud Functions for automation
- Security rules for access control

✅ **Design:**
- Matches reference design (image_3.png)
- Nagoya Crimson & Charcoal color theme
- Modern typography (Poppins/Inter)
- Responsive layout

---

## Dependencies

### Main Project
- `next@14.2.5` – React framework
- `react@18.3.1` – UI library
- `firebase@12.15.0` – Firebase SDK

### Functions
- `firebase-functions@4.6.1` – Cloud Functions SDK
- `firebase-admin@11.13.0` – Firebase Admin SDK
- `nodemailer@6.9.5` – Email notifications

---

## File Sizes

```
app/page.tsx              ~4.2 KB
components/VehicleCard   ~2.8 KB
lib/firebase.ts          ~0.4 KB
lib/firestore.ts         ~1.2 KB
functions/src/index.ts   ~2.1 KB
app/globals.css          ~8.5 KB
```

Total uncompressed: ~85 KB (excluding node_modules)

---

## Testing Checklist

- [ ] Local build runs: `npm run build`
- [ ] Home page loads at `/`
- [ ] Can browse inventory at `/inventory`
- [ ] Can view vehicle detail at `/vehicle/[id]`
- [ ] Can log in at `/admin/login`
- [ ] Can add vehicle at `/admin/inventory/add`
- [ ] Images upload successfully
- [ ] Lease calculator works
- [ ] WhatsApp links open correctly
- [ ] Inquiry form submits to Firestore

---

For more details, see `README.md` or `FIREBASE_SETUP.md`.
