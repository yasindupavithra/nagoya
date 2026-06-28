// seed-vehicles.mjs
// Seeds 15 realistic Japanese cars to Firestore
// Run: node seed-vehicles.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDWJDWNoxieua7WUv7Iqi9VHTMprLoZQf4",
  authDomain: "nagoya-app.firebaseapp.com",
  projectId: "nagoya-app",
  storageBucket: "nagoya-app.firebasestorage.app",
  messagingSenderId: "476354964710",
  appId: "1:476354964710:web:b4327f03046959ab7b5f27",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vehicles = [
  // ─── TOYOTA ───────────────────────────────────────────────────────
  {
    brand: 'Toyota', model: 'Axio', year: 2018, price: 4850000, mileage: 42000,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'Sedan', cc: '1500',
    color: 'Pearl White', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Colombo',
    features: ['Reverse Camera', 'Push Start', 'LED Headlights', 'Alloy Wheels'],
    description: 'Well maintained Toyota Axio in excellent condition. One owner, full service history. Low mileage and fuel efficient.',
    imageUrls: [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Toyota', model: 'Aqua', year: 2020, price: 6250000, mileage: 22000,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Hatchback', cc: '1500',
    color: 'Silver', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Malabe',
    features: ['Hybrid Battery', 'Smart Entry', 'Cruise Control', 'LED Lights', 'Touchscreen Audio'],
    description: 'Toyota Aqua hybrid in stunning condition. Very fuel efficient — ideal for city driving. No accidents, full documentation available.',
    imageUrls: [
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Toyota', model: 'Premio', year: 2019, price: 8750000, mileage: 38500,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'Sedan', cc: '1800',
    color: 'Champagne Gold', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Kandy',
    features: ['Leather Seats', 'Sunroof', 'Parking Sensors', 'Alloy Wheels', 'Dual Airbags'],
    description: 'Premium class Toyota Premio. Excellent interior with leather trim. Perfect for executives and families. All papers clear.',
    imageUrls: [
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Toyota', model: 'Vitz', year: 2017, price: 3200000, mileage: 58000,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'Hatchback', cc: '1000',
    color: 'Red', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Galle',
    features: ['Bluetooth Audio', 'Rear Sensors', 'Economical Engine'],
    description: 'Fun, compact and super economical Toyota Vitz. Ideal for first-time buyers or young professionals. Great city car.',
    imageUrls: [
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Toyota', model: 'Prius', year: 2018, price: 11200000, mileage: 31000,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Sedan', cc: '1800',
    color: 'Midnight Black', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Colombo',
    features: ['Hybrid System', 'Pre-Collision System', 'Lane Assist', 'Adaptive Cruise', 'Wireless Charging', 'JBL Sound System'],
    description: 'Iconic Toyota Prius 4th Gen in showroom condition. Loaded with safety tech and premium features. The ultimate green machine.',
    imageUrls: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Toyota', model: 'Raize', year: 2022, price: 14500000, mileage: 8500,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'SUV', cc: '1000',
    color: 'Flame Orange', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Unregistered', location: 'Malabe',
    features: ['Turbo Engine', 'Apple CarPlay', 'Android Auto', 'Digital Cockpit', '360 Camera', 'Sunroof'],
    description: 'Brand new 2022 Toyota Raize with turbo engine. Extremely stylish and powerful compact SUV. Factory warranty still active.',
    imageUrls: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Toyota', model: 'Corolla', year: 2021, price: 12800000, mileage: 15000,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Sedan', cc: '1800',
    color: 'Pearl White', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Unregistered', location: 'Negombo',
    features: ['Hybrid AWD', 'TSS Safety Suite', 'HUD Display', 'JBL Premium Audio', 'Heated Seats'],
    description: 'All-new 12th Gen Toyota Corolla Hybrid. The benchmark of Japanese engineering. Stunning design with top safety ratings.',
    imageUrls: [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  // ─── NISSAN ───────────────────────────────────────────────────────
  {
    brand: 'Nissan', model: 'Dayz', year: 2019, price: 3850000, mileage: 29000,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'Compact', cc: '660',
    color: 'Sky Blue', doors: 4, seatingCapacity: 4,
    registeredStatus: 'Registered', location: 'Horana',
    features: ['Auto AC', 'Reverse Camera', 'Smart Key', 'Eco Mode'],
    description: 'Cute and economical Nissan Dayz K-car. Very low fuel consumption. Perfect for city errands and narrow streets.',
    imageUrls: [
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Nissan', model: 'Note e-Power', year: 2018, price: 4100000, mileage: 47500,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Hatchback', cc: '1200',
    color: 'Pearl White', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Malabe',
    features: ['e-Power Hybrid', 'ProPilot Assist', 'Around View Monitor', 'LED Lights'],
    description: 'Revolutionary Nissan Note with e-Power system — runs on petrol but drives like an EV. Silky smooth, instant torque.',
    imageUrls: [
      'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Nissan', model: 'Leaf', year: 2020, price: 9500000, mileage: 18000,
    fuelType: 'Electric', transmission: 'Auto', bodyType: 'Hatchback', cc: 'Electric',
    color: 'Glacier White', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Colombo',
    features: ['40kWh Battery', 'ProPilot', 'e-Pedal', 'Fast Charge Port', 'Bose Audio', '6 Airbags'],
    description: 'Pure electric Nissan Leaf 2nd Gen. Zero emissions, zero fuel cost. Perfect for the eco-conscious professional. Included: Level 2 charging cable.',
    imageUrls: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Nissan', model: 'X-Trail', year: 2019, price: 13500000, mileage: 34000,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'SUV', cc: '2000',
    color: 'Diamond Black', doors: 4, seatingCapacity: 7,
    registeredStatus: 'Registered', location: 'Kandy',
    features: ['4WD / AWD', 'ProPilot', '7 Seater', 'Panoramic Sunroof', 'Around View Monitor', 'Leather Interior'],
    description: 'Powerful 7-seater Nissan X-Trail T32. The family SUV that conquers any terrain. Full safety suite and premium leather interior.',
    imageUrls: [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Nissan', model: 'Serena', year: 2020, price: 10250000, mileage: 26000,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Van', cc: '2000',
    color: 'Platinum Silver', doors: 4, seatingCapacity: 8,
    registeredStatus: 'Registered', location: 'Negombo',
    features: ['e-Power Hybrid', 'ProPilot', '8 Seater', 'Sliding Doors', 'Rear Entertainment', 'Auto Parking'],
    description: 'Family king — Nissan Serena 8-seater hybrid. Ultimate comfort and space for large families. ProPilot driver assist included.',
    imageUrls: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Nissan', model: 'Juke', year: 2021, price: 8900000, mileage: 12000,
    fuelType: 'Petrol', transmission: 'Auto', bodyType: 'SUV', cc: '1000',
    color: 'Two-Tone Orange Black', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Unregistered', location: 'Galle',
    features: ['Turbo Engine', 'Bose Sound System', 'Digital Cockpit', 'Apple CarPlay', 'Sport Mode'],
    description: 'Iconic Nissan Juke — the original crossover. Striking looks, turbocharged performance and premium Bose audio inside.',
    imageUrls: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  {
    brand: 'Nissan', model: 'Skyline 370GT', year: 2016, price: 17500000, mileage: 55000,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Sedan', cc: '3500',
    color: 'Deep Blue Pearl', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Colombo',
    features: ['3.5L V6 Hybrid', 'Direct Adaptive Steering', 'Bose 13-Speaker', 'Around View Monitor', 'Sunroof'],
    description: 'Iconic Nissan Skyline 370GT hybrid — V6 power meets hybrid efficiency. A legend that turns heads everywhere it goes.',
    imageUrls: [
      'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
  // ─── HONDA ───────────────────────────────────────────────────────
  {
    brand: 'Honda', model: 'Fit Grace', year: 2018, price: 5650000, mileage: 36000,
    fuelType: 'Hybrid', transmission: 'Auto', bodyType: 'Sedan', cc: '1500',
    color: 'Crystal Black', doors: 4, seatingCapacity: 5,
    registeredStatus: 'Registered', location: 'Malabe',
    features: ['Hybrid System', 'Honda Sensing', 'Apple CarPlay', 'LED Lights', 'Sunroof', 'Leather Seats'],
    description: 'Elegant Honda Fit Grace hybrid sedan. Combines Honda Sensing safety tech with luxurious interior comfort. A premium experience.',
    imageUrls: [
      'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=900&q=80',
    ],
    isSold: false,
  },
];

const vehiclesRef = collection(db, 'vehicles');

async function seedVehicles() {
  console.log('\n🚗  Nagoya Auto — Database Seeder\n');
  console.log(`📦  Seeding ${vehicles.length} vehicles...\n`);

  let ok = 0, fail = 0;
  for (const v of vehicles) {
    try {
      const ref = await addDoc(vehiclesRef, { ...v, createdAt: new Date() });
      console.log(`  ✅  ${v.brand} ${v.model} (${v.year})  →  ${ref.id}`);
      ok++;
      await new Promise(r => setTimeout(r, 250));
    } catch (err) {
      console.error(`  ❌  ${v.brand} ${v.model}  →  ${err.message}`);
      fail++;
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅  ${ok} vehicles added`);
  if (fail) console.log(`❌  ${fail} failed`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  process.exit(0);
}

seedVehicles().catch(e => { console.error(e); process.exit(1); });
