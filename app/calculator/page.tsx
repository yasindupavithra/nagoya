'use client';

import { useState, useEffect } from 'react';

const VEHICLE_DATA: Record<string, Record<string, { chassis: string; duty: number; name: string }[]>> = {
  "AUDI": {
    "A3": [{ chassis: "8V", duty: 12000000, name: "AUDI A3 SPORTBACK" }],
    "A4": [{ chassis: "B9", duty: 15000000, name: "AUDI A4" }],
    "Q3": [{ chassis: "F3", duty: 18000000, name: "AUDI Q3" }]
  },
  "BMW": {
    "1 Series": [{ chassis: "F40", duty: 14000000, name: "BMW 118d Play" }],
    "3 Series": [{ chassis: "G20", duty: 16000000, name: "BMW 320d M SPORT" }],
    "X1": [{ chassis: "U11", duty: 14000000, name: "BMW X1 sDrive18i" }],
    "5 Series": [{ chassis: "G30", duty: 22000000, name: "BMW 523d" }]
  },
  "DAIHATSU": {
    "Mira": [{ chassis: "LA300S", duty: 3500000, name: "DAIHATSU MIRA e:S" }],
    "Tanto": [
      { chassis: "LA650S", duty: 4000000, name: "DAIHATSU TANTO CUSTOM" },
      { chassis: "LA600S", duty: 3800000, name: "DAIHATSU TANTO X" }
    ],
    "Rocky": [{ chassis: "A200S", duty: 7500000, name: "DAIHATSU ROCKY Premium" }],
    "Hijet": [
      { chassis: "S321V", duty: 3500000, name: "DAIHATSU HIJET CARGO" },
      { chassis: "S500P", duty: 3000000, name: "DAIHATSU HIJET TRUCK" }
    ],
    "Taft": [{ chassis: "LA900S", duty: 4200000, name: "DAIHATSU TAFT G TURBO" }],
    "Move": [{ chassis: "LA150S", duty: 3800000, name: "DAIHATSU MOVE CUSTOM" }]
  },
  "FORD": {
    "Mustang": [{ chassis: "S550", duty: 30000000, name: "FORD MUSTANG GT" }],
    "Ranger": [{ chassis: "T6", duty: 12000000, name: "FORD RANGER RAPTOR" }]
  },
  "HONDA": {
    "Vezel": [
      { chassis: "RU3", duty: 10500000, name: "HONDA VEZEL Z" },
      { chassis: "RV5", duty: 11800000, name: "HONDA VEZEL e:HEV Z" },
      { chassis: "RV6", duty: 12500000, name: "HONDA VEZEL e:HEV PLAY" }
    ],
    "Fit": [
      { chassis: "GR3", duty: 8000000, name: "HONDA FIT e:HEV CROSSTAR" },
      { chassis: "GR4", duty: 8200000, name: "HONDA FIT e:HEV NESS" },
      { chassis: "GP5", duty: 7500000, name: "HONDA FIT HYBRID S" }
    ],
    "Civic": [
      { chassis: "FL1", duty: 14000000, name: "HONDA CIVIC HATCHBACK EX" },
      { chassis: "FL4", duty: 15500000, name: "HONDA CIVIC e:HEV" }
    ],
    "Stepwgn": [
      { chassis: "RP8", duty: 16000000, name: "HONDA STEPWGN SPADA e:HEV" },
      { chassis: "RP3", duty: 12000000, name: "HONDA STEPWGN SPADA" }
    ],
    "Freed": [
      { chassis: "GB7", duty: 10000000, name: "HONDA FREED HYBRID G" }
    ],
    "CR-V": [
      { chassis: "RT5", duty: 16500000, name: "HONDA CR-V e:HEV EX" }
    ],
    "ZR-V": [
      { chassis: "RZ4", duty: 17000000, name: "HONDA ZR-V e:HEV Z" }
    ],
    "N-BOX": [
      { chassis: "JF3", duty: 4500000, name: "HONDA N-BOX CUSTOM" }
    ],
    "N-WGN": [
      { chassis: "JH3", duty: 4000000, name: "HONDA N-WGN CUSTOM" }
    ]
  },
  "ISUZU": {
    "D-Max": [{ chassis: "RG01", duty: 10000000, name: "ISUZU D-MAX V-CROSS" }],
    "Elf": [{ chassis: "NLR85", duty: 6000000, name: "ISUZU ELF TRUCK" }]
  },
  "LEXUS": {
    "RX": [
      { chassis: "AL20", duty: 25000000, name: "LEXUS RX450h F SPORT" },
      { chassis: "TALA15", duty: 35000000, name: "LEXUS RX500h F SPORT PERFORMANCE" }
    ],
    "NX": [
      { chassis: "AZ20", duty: 20000000, name: "LEXUS NX350h F SPORT" },
      { chassis: "AAZA20", duty: 22000000, name: "LEXUS NX450h+" }
    ],
    "UX": [{ chassis: "ZA10", duty: 15000000, name: "LEXUS UX250h F SPORT" }],
    "ES": [{ chassis: "AXZH10", duty: 28000000, name: "LEXUS ES300h" }]
  },
  "MAZDA": {
    "Mazda2": [{ chassis: "DJ5FS", duty: 7000000, name: "MAZDA2 XD TOURING" }],
    "Mazda3": [{ chassis: "BP8P", duty: 11000000, name: "MAZDA3 FASTBACK XD" }],
    "CX-3": [{ chassis: "DK8AW", duty: 10000000, name: "MAZDA CX-3 XD" }],
    "CX-30": [{ chassis: "DM8P", duty: 12000000, name: "MAZDA CX-30 XD" }],
    "CX-5": [{ chassis: "KF2P", duty: 15000000, name: "MAZDA CX-5 XD L PACKAGE" }],
    "CX-8": [{ chassis: "KG2P", duty: 18000000, name: "MAZDA CX-8 XD" }]
  },
  "MERCEDES BENZ": {
    "C-Class": [{ chassis: "W206", duty: 18000000, name: "MERCEDES BENZ C200 AMG LINE" }],
    "E-Class": [{ chassis: "W213", duty: 25000000, name: "MERCEDES BENZ E220d AMG LINE" }],
    "GLA": [{ chassis: "H247", duty: 15000000, name: "MERCEDES BENZ GLA 200 AMG LINE" }]
  },
  "MITSUBISHI": {
    "Outlander": [{ chassis: "GN0W", duty: 16000000, name: "MITSUBISHI OUTLANDER PHEV P" }],
    "Montero": [{ chassis: "V98W", duty: 20000000, name: "MITSUBISHI MONTERO EXCEED" }],
    "Eclipse Cross": [{ chassis: "GK1W", duty: 11000000, name: "MITSUBISHI ECLIPSE CROSS G" }],
    "Delica D:5": [{ chassis: "CV1W", duty: 15000000, name: "MITSUBISHI DELICA D:5" }]
  },
  "NISSAN": {
    "Roox": [{ chassis: "B44A", duty: 4800000, name: "NISSAN ROOX HIGHWAY STAR" }],
    "X-Trail": [
      { chassis: "T33", duty: 15000000, name: "NISSAN X-TRAIL e-4ORCE G" },
      { chassis: "T32", duty: 12000000, name: "NISSAN X-TRAIL 20X" }
    ],
    "Leaf": [{ chassis: "ZE1", duty: 8000000, name: "NISSAN LEAF G" }],
    "Note": [
      { chassis: "E13", duty: 7500000, name: "NISSAN NOTE e-POWER X" },
      { chassis: "SNE13", duty: 8000000, name: "NISSAN NOTE AURA e-POWER G" }
    ],
    "Serena": [
      { chassis: "C27", duty: 11000000, name: "NISSAN SERENA e-POWER HIGHWAY STAR V" },
      { chassis: "C28", duty: 13000000, name: "NISSAN SERENA e-POWER LUXION" }
    ],
    "Kicks": [{ chassis: "P15", duty: 9000000, name: "NISSAN KICKS e-POWER X" }],
    "Sakura": [{ chassis: "B6AW", duty: 5500000, name: "NISSAN SAKURA G" }],
    "Caravan": [{ chassis: "VN350", duty: 12000000, name: "NISSAN NV350 CARAVAN PREMIUM GX" }]
  },
  "SUBARU": {
    "Forester": [
      { chassis: "SK9", duty: 14000000, name: "SUBARU FORESTER Advance" },
      { chassis: "SKE", duty: 14500000, name: "SUBARU FORESTER SPORT" }
    ],
    "XV": [{ chassis: "GT7", duty: 12000000, name: "SUBARU XV 2.0i-S EyeSight" }],
    "Crosstrek": [{ chassis: "GUD", duty: 13500000, name: "SUBARU CROSSTREK Limited" }],
    "Levorg": [{ chassis: "VN5", duty: 13000000, name: "SUBARU LEVORG STI Sport" }],
    "Outback": [{ chassis: "BT5", duty: 18000000, name: "SUBARU OUTBACK X-BREAK" }]
  },
  "SUZUKI": {
    "Wagon R": [
      { chassis: "MH55S-FZ", duty: 4500000, name: "SUZUKI WAGON R FZ" },
      { chassis: "MH55S-FX", duty: 4200000, name: "SUZUKI WAGON R HYBRID FX" },
      { chassis: "MH95S", duty: 4800000, name: "SUZUKI WAGON R CUSTOM Z" }
    ],
    "Every": [
      { chassis: "DA17V", duty: 3500000, name: "SUZUKI EVERY JOIN TURBO" },
      { chassis: "DA17W", duty: 4200000, name: "SUZUKI EVERY WAGON PZ TURBO" }
    ],
    "Swift": [
      { chassis: "ZC53S", duty: 5500000, name: "SUZUKI SWIFT HYBRID RS" },
      { chassis: "ZC33S", duty: 6500000, name: "SUZUKI SWIFT SPORT" }
    ],
    "Jimny": [
      { chassis: "JB64W", duty: 6000000, name: "SUZUKI JIMNY XC" },
      { chassis: "JB74W", duty: 8000000, name: "SUZUKI JIMNY SIERRA JC" }
    ],
    "Hustler": [{ chassis: "MR52S", duty: 4500000, name: "SUZUKI HUSTLER HYBRID X TURBO" }],
    "Spacia": [{ chassis: "MK53S", duty: 4800000, name: "SUZUKI SPACIA CUSTOM HYBRID XS" }],
    "Solio": [{ chassis: "MA37S", duty: 6000000, name: "SUZUKI SOLIO BANDIT HYBRID MV" }],
    "Crossbee": [{ chassis: "MN71S", duty: 6500000, name: "SUZUKI CROSSBEE HYBRID MZ" }]
  },
  "TOYOTA": {
    "Corolla": [
      { chassis: "NRE210-G", duty: 12000000, name: "COROLLA G" },
      { chassis: "ZWE219-G", duty: 15725214, name: "COROLLA HYBRID G" },
      { chassis: "ZWE211-WXB", duty: 16000000, name: "COROLLA HYBRID WXB" },
      { chassis: "ZWE214-X", duty: 15000000, name: "COROLLA HYBRID X" },
      { chassis: "NRE210-WXB", duty: 12500000, name: "COROLLA WXB" }
    ],
    "Crown": [
      { chassis: "AZSH20-Z", duty: 25000000, name: "CROWN HYBRID Z" }
    ],
    "Dyna": [
      { chassis: "DYNA-CC-FZT", duty: 8000000, name: "DYNA CREW CAB FREEZER TRUCK <4 YEAR <5 TON" },
      { chassis: "DYNA-CC-FB", duty: 7500000, name: "DYNA CREW CAB FULL BODY <4 YEAR <5 TON" },
      { chassis: "DYNA-CC-HB", duty: 7000000, name: "DYNA CREW CAB HALF BODY <4 YEAR <5 TON" },
      { chassis: "DYNA-FZT", duty: 7800000, name: "DYNA FREEZER TRUCK <4 YEAR <5 TON" },
      { chassis: "DYNA-FB", duty: 7200000, name: "DYNA FULL BODY <4 YEAR <5 TON" },
      { chassis: "DYNA-SC-FZT", duty: 6500000, name: "DYNA SINGLE CAB FREEZER TRUCK <4 YEAR <5 TON" },
      { chassis: "DYNA-SC-FB", duty: 6000000, name: "DYNA SINGLE CAB FULL BODY <4 YEAR <5 TON" },
      { chassis: "DYNA-SC-HB", duty: 5500000, name: "DYNA SINGLE CAB HALF BODY <4 YEAR <5 TON" }
    ],
    "Hiace": [
      { chassis: "GDH223-14D", duty: 18000000, name: "HIACE COMMUTER GL 14 SEATER DIESEL" },
      { chassis: "GDH223-14D-MM", duty: 19500000, name: "HIACE COMMUTER GL 14 SEATER MODIFIED MODELLISTA DIESEL" },
      { chassis: "TRH223-14P-MM", duty: 18500000, name: "HIACE COMMUTER GL 14 SEATER MODIFIED MODELLISTA PETROL" },
      { chassis: "GDH223-14D-MT", duty: 19000000, name: "HIACE COMMUTER GL 14 SEATER MODIFIED TRD DIESEL" },
      { chassis: "TRH223-14P-MT", duty: 18000000, name: "HIACE COMMUTER GL 14 SEATER MODIFIED TRD PETROL" },
      { chassis: "TRH223-14P", duty: 17000000, name: "HIACE COMMUTER GL 14 SEATER PETROL" },
      { chassis: "GDH201-DXD", duty: 15000000, name: "HIACE DX DIESEL" },
      { chassis: "GDH201-DXGL", duty: 15500000, name: "HIACE DX GL" },
      { chassis: "GDH201-SGL", duty: 16500000, name: "HIACE SUPER GL" },
      { chassis: "GDH201-SGL-DP2", duty: 17500000, name: "HIACE SUPER GL DARK PRIME II" },
      { chassis: "GDH201-SGLD", duty: 17000000, name: "HIACE SUPER GL DIESEL" },
      { chassis: "TRH214-WDX", duty: 14000000, name: "HIACE WAGON DX" },
      { chassis: "TRH214-WGL", duty: 15000000, name: "HIACE WAGON GL" },
      { chassis: "TRH224-WGC", duty: 18000000, name: "HIACE WAGON GRAND CABIN" }
    ],
    "Hilux": [
      { chassis: "GUN125-19X", duty: 20000000, name: "HILUX (2019) X" },
      { chassis: "GUN125-19Z", duty: 22000000, name: "HILUX (2019) Z" },
      { chassis: "GUN125-22X", duty: 24000000, name: "HILUX (2022) X" },
      { chassis: "GUN125-22Z", duty: 26000000, name: "HILUX (2022) Z" },
      { chassis: "GUN125-22ZGR", duty: 28000000, name: "HILUX (2022) Z GR SPORT" },
      { chassis: "GUN125-24ZR", duty: 30000000, name: "HILUX (2024) Z REVO ROCCO" },
      { chassis: "GUN126-GR", duty: 32000000, name: "HILUX REVO GR SPORT 4X4 2.8 AT" },
      { chassis: "GUN126-RC", duty: 31000000, name: "HILUX REVO ROCCO 4X4 2.8 AT" }
    ],
    "Land Cruiser": [
      { chassis: "GDJ250-VX7", duty: 45000000, name: "LAND CRUISER 250 VX 7 SEATER" },
      { chassis: "GDJ250-VXD7", duty: 46000000, name: "LAND CRUISER 250 VX DIESEL 7 SEATER" },
      { chassis: "GDJ250-ZXD7", duty: 50000000, name: "LAND CRUISER 250 ZX DIESEL 7 SEATER" },
      { chassis: "FJA300-AX7", duty: 60000000, name: "LAND CRUISER 300 AX 7 SEATER" },
      { chassis: "FJA300-GR7", duty: 65000000, name: "LAND CRUISER 300 GR SPORT 7 SEATER" },
      { chassis: "FJA300-VX7", duty: 62000000, name: "LAND CRUISER 300 VX 7 SEATER" },
      { chassis: "FJA300-ZX7", duty: 68000000, name: "LAND CRUISER 300 ZX 7 SEATER" }
    ],
    "Pixis": [
      { chassis: "LA350A-B", duty: 3500000, name: "PIXIS EPOCH B" },
      { chassis: "LA350A-BSA3", duty: 3700000, name: "PIXIS EPOCH B SA III" },
      { chassis: "LA350A-L", duty: 3800000, name: "PIXIS EPOCH L" },
      { chassis: "LA350A-LSA3", duty: 4000000, name: "PIXIS EPOCH L SA III" },
      { chassis: "S321M-VC", duty: 4500000, name: "PIXIS VAN CRUISE" },
      { chassis: "S321M-VCT", duty: 4800000, name: "PIXIS VAN CRUISE TURBO" }
    ],
    "Raize": [
      { chassis: "A202A", duty: 7500000, name: "TOYOTA RAIZE Z" },
      { chassis: "A210A", duty: 7800000, name: "TOYOTA RAIZE G" }
    ],
    "Vitz": [{ chassis: "KSP130", duty: 6500000, name: "TOYOTA VITZ F" }],
    "Yaris": [{ chassis: "MXPH10", duty: 8500000, name: "TOYOTA YARIS HYBRID" }],
    "Prado": [{ chassis: "GDJ150W", duty: 35000000, name: "TOYOTA LAND CRUISER PRADO TX-L" }]
  }
};

type Breakdown = {
  vehicleName: string;
  fobJpy: number;
  cifJpy: number;
  yenRate: number;
  fobLkr: number;
  japanSupplierLkr: number;
  cifLkr: number;
  dutyLkr: number;
  clearingLkr: number;
  doChargesLkr: number;
  lcJpy: number;
  lcLkr: number;
  ssclBase: number;
  ssclTax: number;
  surcharge: number;
  totalTax: number;
  totalCost: number;
};

export default function CalculatorPage() {
  const [timeRemaining, setTimeRemaining] = useState(74000); // Dummy countdown for next update

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  const [fob, setFob] = useState('');
  const [lc, setLc] = useState('');
  const [rate, setRate] = useState('2.1');

  const [breakdown, setBreakdown] = useState<Breakdown | null>(null);

  // Quote Form State
  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    name: '', whatsapp: '', make: '', model: '', year: '', engine: '', color: '', grade: '', notes: ''
  });
  const [isSending, setIsSending] = useState(false);

  const handleQuoteChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setQuoteForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleQuoteSubmit = () => {
    const { name, whatsapp, make, model, year, engine, color, grade, notes } = quoteForm;
    if (!name || !whatsapp || !make || !model) {
      alert("Please fill in all required fields (*).");
      return;
    }
    
    // Format the message for WhatsApp
    const message = `*New Vehicle Quotation Request* 🚗

*Customer Details:*
Name: ${name}
WhatsApp: ${whatsapp}

*Vehicle Details:*
Make: ${make}
Model: ${model}
Year: ${year || 'N/A'}
Engine: ${engine || 'N/A'}
Color: ${color || 'N/A'}
Auction Grade: ${grade || 'N/A'}

*Additional Notes:*
${notes || 'None'}`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // The owner's WhatsApp number (including country code, e.g., 94 for Sri Lanka)
    const ownerWhatsAppNumber = "94714495632"; 
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  const availableMakes = Object.keys(VEHICLE_DATA);
  const availableVariants = selectedMake ? Object.values(VEHICLE_DATA[selectedMake]).flat() : [];

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMake(e.target.value);
    setSelectedModel('');
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(e.target.value);
  };

  const handleCalculate = () => {
    const fJpy = parseFloat(fob) || 0;
    const lJpy = parseFloat(lc) || 0;
    const r = parseFloat(rate) || 0;

    if (fJpy > 0 && r > 0 && selectedModel) {
      const chassisObj = availableVariants.find(c => c.chassis === selectedModel);
      const duty = chassisObj ? chassisObj.duty : 15725214;
      const vName = chassisObj ? `${chassisObj.name} — ${chassisObj.chassis}` : 'Selected Vehicle';

      const cifJpy = 500000;
      const fLkr = fJpy * r;
      const jsLkr = fJpy * 0.05 * r;
      const cifLkr = cifJpy * r;
      const clearing = 150000;
      const doCharge = 40000;
      const lLkr = lJpy * r;

      const ssclBase = lLkr + duty;
      const ssclTax = ssclBase * 0.025;
      const surcharge = (lLkr * 1.1) * 0.3 * 0.5;

      const totalTax = duty + ssclTax + surcharge;
      const totalCost = fLkr + jsLkr + cifLkr + clearing + doCharge + totalTax;

      setBreakdown({
        vehicleName: vName,
        fobJpy: fJpy,
        cifJpy: cifJpy,
        yenRate: r,
        fobLkr: fLkr,
        japanSupplierLkr: jsLkr,
        cifLkr: cifLkr,
        dutyLkr: duty,
        clearingLkr: clearing,
        doChargesLkr: doCharge,
        lcJpy: lJpy,
        lcLkr: lLkr,
        ssclBase,
        ssclTax,
        surcharge,
        totalTax,
        totalCost
      });
    } else {
      setBreakdown(null);
      alert("Please select a vehicle chassis and enter valid FOB/LC amounts.");
    }
  };

  const formatCurrency = (val: number) => {
    return Math.round(val).toLocaleString('en-LK');
  };

  const handleSendBreakdownWhatsApp = () => {
    if (!breakdown) return;

    const message = `*Vehicle Cost Breakdown* 🧮
*Vehicle:* ${breakdown.vehicleName}

*FOB Price:* ¥${breakdown.fobJpy.toLocaleString()} (LKR ${formatCurrency(breakdown.fobLkr)})
*CIF Charges:* ¥${breakdown.cifJpy.toLocaleString()} (LKR ${formatCurrency(breakdown.cifLkr)})
*Yen Rate:* ${breakdown.yenRate}

*Duty:* LKR ${formatCurrency(breakdown.dutyLkr)}
*SSCL Tax:* LKR ${formatCurrency(breakdown.ssclTax)}
*Surcharge:* LKR ${formatCurrency(breakdown.surcharge)}
*Total Tax:* LKR ${formatCurrency(breakdown.totalTax)}

*Clearing/Bank/Handling:* LKR ${formatCurrency(breakdown.clearingLkr)}
*DO Charges:* LKR ${formatCurrency(breakdown.doChargesLkr)}

*Total Estimated Cost:* LKR ${formatCurrency(breakdown.totalCost)}

_Service charge is not inclusive in this estimate._`;

    const encodedMessage = encodeURIComponent(message);
    const ownerWhatsAppNumber = "94714495632"; 
    window.open(`https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <main style={{ backgroundColor: '#F4F7FB', minHeight: '100vh', padding: '120px 20px 60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* TOP BAR: CBSL RATES */}
        <div style={{ backgroundColor: '#FFF9EB', border: '1px solid #F5D38A', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, color: '#333' }}>📈 CBSL Rates</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <strong style={{ color: '#0B2B5E' }}>JPY/LKR</strong>
              <span style={{ fontSize: '0.9rem' }}>Sell: <strong style={{ color: '#E52329' }}>2.1098</strong></span>
              <span style={{ fontSize: '0.9rem' }}>Buy: 2.0341</span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Ind 2.0687</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <strong style={{ color: '#0B2B5E' }}>USD/LKR</strong>
              <span style={{ fontSize: '0.9rem' }}>Sell: <strong style={{ color: '#E52329' }}>339.8836</strong></span>
              <span style={{ fontSize: '0.9rem' }}>Buy: 330.3999</span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>Ind 334.9494</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#888', marginLeft: 'auto' }}>Updated Today, 11:00 AM</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#D97706', borderTop: '1px solid #FDE68A', paddingTop: '12px' }}>
            <span>⏳ Next update in {formatTime(timeRemaining)}</span>
            <a href="#" style={{ color: '#D97706', textDecoration: 'underline' }}>CBSL Official</a>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '850px', width: '100%', margin: '0 auto' }}>

          {/* REQUEST QUOTATION (No Chassis) */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #eaeaea' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0B2B5E', marginBottom: '8px' }}>Request a Quotation</h2>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px' }}>Fill in your details and we'll send you a vehicle quotation via WhatsApp.</p>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Your Name *</label>
                <input value={quoteForm.name} onChange={handleQuoteChange('name')} type="text" placeholder="e.g., John Doe" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>WhatsApp Number *</label>
                <input value={quoteForm.whatsapp} onChange={handleQuoteChange('whatsapp')} type="tel" placeholder="+94 7X XXX XXXX" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Vehicle Make *</label>
                  <input value={quoteForm.make} onChange={handleQuoteChange('make')} type="text" placeholder="e.g., Toyota" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Vehicle Model *</label>
                  <input value={quoteForm.model} onChange={handleQuoteChange('model')} type="text" placeholder="e.g., Aqua" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Year</label>
                  <select value={quoteForm.year} onChange={handleQuoteChange('year')} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff' }}>
                    <option value="">Select Year</option>
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Engine Capacity</label>
                  <input value={quoteForm.engine} onChange={handleQuoteChange('engine')} type="text" placeholder="e.g., 1500cc" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Color</label>
                  <input value={quoteForm.color} onChange={handleQuoteChange('color')} type="text" placeholder="e.g., White" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Auction Grade</label>
                  <select value={quoteForm.grade} onChange={handleQuoteChange('grade')} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff' }}>
                    <option value="">Select Grade</option>
                    <option value="S">S</option>
                    <option value="6">6</option>
                    <option value="5">5</option>
                    <option value="4.5">4.5</option>
                    <option value="4">4</option>
                    <option value="3.5">3.5</option>
                    <option value="3">3</option>
                    <option value="R">R</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Additional Notes</label>
                <textarea value={quoteForm.notes} onChange={handleQuoteChange('notes')} rows={4} placeholder="Any specific requirements or questions..." style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', resize: 'vertical' }}></textarea>
              </div>
              <button onClick={handleQuoteSubmit} disabled={isSending} type="button" style={{ backgroundColor: '#F5A623', color: '#002147', fontWeight: 800, fontSize: '1.1rem', padding: '16px', borderRadius: '8px', border: 'none', cursor: isSending ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: isSending ? 0.7 : 1 }}>
                {isSending ? 'Sending Request...' : 'Request Quotation'}
              </button>
            </form>
          </div>

          {/* CALCULATOR HEADER */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0B2B5E', display: 'flex', alignItems: 'center', gap: '12px', margin: 0 }}>
              <span style={{ fontSize: '2.5rem' }}>🧮</span> Vehicle Cost Calculator
            </h1>
            <p style={{ color: '#555', fontSize: '1.1rem', margin: 0 }}>Calculate the total landed cost of importing a vehicle from Japan.</p>
            <a href="https://jpcenter.ru/japan" target="_blank" style={{ display: 'inline-block', textAlign: 'center', backgroundColor: '#FFD166', color: '#0B2B5E', fontWeight: 700, padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', marginTop: '12px' }}>
              Open Auction Site (JPCenter)
            </a>
          </div>

          {/* EDUCATIONAL SECTION */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #eaeaea' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0B2B5E', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#F5A623' }}>✓</span> How to Get Vehicle FOB Price from Auction
            </h3>
            <div style={{ backgroundColor: '#F4F7FB', padding: '20px', borderRadius: '8px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Username</span>
                <code style={{ fontSize: '1.1rem', color: '#0B2B5E', fontWeight: 600 }}>cus@richmotors</code>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '4px' }}>Password</span>
                <code style={{ fontSize: '1.1rem', color: '#0B2B5E', fontWeight: 600 }}>Csrm12345678@</code>
              </div>
            </div>
            <details>
              <summary style={{ fontWeight: 600, color: '#333', cursor: 'pointer', outline: 'none' }}>Step-by-Step Instructions</summary>
              <ol style={{ marginTop: '16px', color: '#555', fontSize: '0.95rem', lineHeight: 1.6, paddingLeft: '20px' }}>
                <li><strong>Go to the auction link</strong> — Click the "Open Auction Site" button above.</li>
                <li><strong>Log in</strong> — Enter the username & password shown above.</li>
                <li><strong>Select "Statistics"</strong> — Navigate to the Statistics section.</li>
                <li><strong>Find your vehicle</strong> — Search for the vehicle make & model you want.</li>
                <li><strong>Select the auction grade</strong> — Choose the grade that matches your preference.</li>
                <li><strong>Filter by "Sold"</strong> — Select "Sold" to see actual sold prices.</li>
                <li><strong>Get FOB Price</strong> — Note the sold price (in JPY) — this is your FOB price.</li>
              </ol>
            </details>
          </div>

          {/* REFERENCE TABLE */}
          <div style={{ backgroundColor: '#FFFDF5', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #FDE68A' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#92400E', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💴</span> LC Rates (Reference)
            </h3>
            <p style={{ color: '#92400E', fontSize: '0.9rem', marginBottom: '24px' }}>Current LC amounts for popular models</p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #FDE68A', color: '#6B7280', textAlign: 'left' }}>
                  <th style={{ paddingBottom: '12px', fontWeight: 500 }}>Vehicle</th>
                  <th style={{ paddingBottom: '12px', fontWeight: 500, textAlign: 'right' }}>LC Amount (JPY)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Honda Vezel', price: '¥2,700,000' },
                  { name: 'Toyota Raize A202A', price: '¥1,800,000' },
                  { name: 'Toyota Raize A210A', price: '¥1,600,000' },
                  { name: 'Suzuki Wagon R ZX', price: '¥1,275,000' },
                  { name: 'Suzuki FX', price: '¥1,100,000' },
                  { name: 'Nissan Roox X Pro Pilot', price: '¥1,300,000' },
                  { name: 'Nissan Roox', price: '¥1,200,000' },
                  { name: 'Nissan Days', price: '¥1,000,000' }
                ].map((item, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #FEF3C7' }}>
                    <td style={{ padding: '16px 0', fontWeight: 600, color: '#111827' }}>{item.name}</td>
                    <td style={{ padding: '16px 0', textAlign: 'right', fontFamily: 'monospace', fontSize: '1.05rem', color: '#0B2B5E' }}>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* LIVE CALCULATOR FORM */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #eaeaea' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0B2B5E', marginBottom: '24px' }}>Select Vehicle</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '-16px', marginBottom: '24px' }}>Choose vehicle details and enter FOB price</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Make</label>
                <select value={selectedMake} onChange={handleMakeChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#F9FAFB' }}>
                  <option value="">Select Make</option>
                  {availableMakes.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Model</label>
                <select value={selectedModel} onChange={handleModelChange} disabled={!selectedMake} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: selectedMake ? '#F9FAFB' : '#f0f0f0' }}>
                  <option value="">Select Model</option>
                  {availableVariants.map(v => <option key={v.chassis} value={v.chassis}>{v.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>FOB Price (JPY)</label>
                  <input type="number" value={fob} onChange={(e) => setFob(e.target.value)} placeholder="Enter FOB" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#F9FAFB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>LC Amount (JPY)</label>
                  <input type="number" value={lc} onChange={(e) => setLc(e.target.value)} placeholder="Enter LC" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#F9FAFB' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Yen Rate</label>
                  <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} step="0.01" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#F9FAFB' }} />
                </div>
              </div>
              <button onClick={handleCalculate} type="button" style={{ backgroundColor: '#F5A623', color: '#002147', fontWeight: 800, fontSize: '1.1rem', padding: '16px', borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', marginTop: '12px' }}>
                🧮 Calculate Cost
              </button>

              {breakdown !== null && (
                <div style={{ marginTop: '24px', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden' }}>
                  <div style={{ backgroundColor: '#0B2B5E', color: '#fff', padding: '20px', textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>Cost Breakdown</h3>
                    <p style={{ margin: '8px 0 0', color: '#FFD166', fontWeight: 600, fontSize: '1.1rem' }}>{breakdown.vehicleName}</p>
                  </div>

                  <div style={{ padding: '0 20px', backgroundColor: '#fff' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                      <tbody>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>FOB Price (JPY)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>￥{breakdown.fobJpy.toLocaleString()}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>CIF Charges (JPY)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>￥{breakdown.cifJpy.toLocaleString()}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #E5E7EB', backgroundColor: '#F9FAFB' }}>
                          <td style={{ padding: '12px', color: '#111827', fontWeight: 600 }}>Yen Rate</td>
                          <td style={{ padding: '12px', textAlign: 'right', fontWeight: 700, color: '#E52329' }}>× {breakdown.yenRate}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>FOB Price (LKR)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.fobLkr)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>Japan Supplier Charge (5%)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.japanSupplierLkr)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>CIF Charges (LKR)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.cifLkr)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563', fontWeight: 600 }}>Duty (LKR)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 700, color: '#0B2B5E' }}>LKR {formatCurrency(breakdown.dutyLkr)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>Clearing/Bank/Handling (LKR)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.clearingLkr)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>DO Charges (LKR)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.doChargesLkr)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6', backgroundColor: '#FFFDF5' }}>
                          <td style={{ padding: '12px', color: '#92400E' }}>LC Amount (JPY)</td>
                          <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#92400E' }}>￥{breakdown.lcJpy.toLocaleString()}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #FDE68A', backgroundColor: '#FFFDF5' }}>
                          <td style={{ padding: '12px', color: '#92400E' }}>LC Amount (LKR)</td>
                          <td style={{ padding: '12px', textAlign: 'right', fontWeight: 600, color: '#92400E' }}>LKR {formatCurrency(breakdown.lcLkr)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>SSCL Tax Base (LC×Rate + Duty)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.ssclBase)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>SSCL Tax (2.5%)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.ssclTax)}</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563' }}>Surcharge ((LC+10%)×30%×50%)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 600 }}>LKR {formatCurrency(breakdown.surcharge)}</td>
                        </tr>
                        <tr style={{ borderBottom: '2px solid #E5E7EB' }}>
                          <td style={{ padding: '12px 0', color: '#4B5563', fontWeight: 600 }}>Total Tax (Duty + SSCL + Surcharge)</td>
                          <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: 700, color: '#E52329' }}>LKR {formatCurrency(breakdown.totalTax)}</td>
                        </tr>
                        <tr style={{ backgroundColor: '#E0F2FE' }}>
                          <td style={{ padding: '20px 12px', color: '#0369A1', fontSize: '1.2rem', fontWeight: 800 }}>Total Cost</td>
                          <td style={{ padding: '20px 12px', textAlign: 'right', fontSize: '1.4rem', fontWeight: 900, color: '#0B2B5E' }}>LKR {formatCurrency(breakdown.totalCost)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div style={{ padding: '16px', backgroundColor: '#FFFDF5', borderTop: '1px solid #FDE68A', textAlign: 'center' }}>
                    <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <span>⚠️</span> Service charge is not inclusive in this cost estimate
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button onClick={handleSendBreakdownWhatsApp} type="button" style={{ backgroundColor: '#25D366', color: '#fff', fontWeight: 600, padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>💬</span> Send via WhatsApp
                      </button>
                      <button type="button" style={{ backgroundColor: '#10B981', color: '#fff', fontWeight: 600, padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📄</span> Download Cost Report (PDF)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
