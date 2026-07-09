'use client';
import { useEffect, useState, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, storage } from '../../../../lib/firebase';
import { createVehicle } from '../../../../lib/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

// Helper function to resize and convert image files to Blob for Firebase Storage
function resizeAndGetBlob(file: File, maxWidth = 800, maxHeight = 600, quality = 0.7): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calculate new dimensions maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Canvas to Blob failed'));
        }, 'image/jpeg', quality);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}


const formatNumberWithCommas = (val: string | number) => {
  if (!val) return '';
  const parts = val.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join('.');
};

const brands = ['Toyota', 'Nissan', 'Honda', 'Mitsubishi', 'Suzuki', 'Mazda', 'Subaru', 'Daihatsu', 'Lexus', 'Mercedes-Benz', 'BMW', 'Audi', 'Kia', 'Hyundai', 'Peugeot', 'Ford', 'Land Rover', 'Range Rover', 'MG', 'DFSK', 'Tata', 'Mahindra', 'Micro', 'Renault', 'Volvo', 'Jeep', 'Porsche', 'Chevrolet', 'Isuzu'];
const bodyTypes = ['Sedan', 'Hatchback', 'SUV', 'Compact', 'Van', 'Wagon', 'Pickup'];
const fuelTypes = ['Petrol', 'Hybrid', 'Diesel', 'Electric'];
const transmissions = ['Auto', 'Manual'];
const locations = ['Malabe', 'Horana', 'Colombo', 'Negombo', 'Kandy', 'Galle'];
const statusOptions = ['Registered', 'Unregistered', 'Used'];

export default function AddVehiclePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Auth state
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Form states - Basic Info
  const [brand, setBrand] = useState('Toyota');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2020);
  const [price, setPrice] = useState('');
  const [initialPayment, setInitialPayment] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [mileage, setMileage] = useState('');
  const [cc, setCc] = useState('1500');
  const [location, setLocation] = useState('');
  const [registeredStatus, setRegisteredStatus] = useState('Registered');
  // Form states - Advanced Info
  const [bodyType, setBodyType] = useState('Sedan');
  const [transmission, setTransmission] = useState('Auto');
  const [fuelType, setFuelType] = useState('Petrol');
  const [color, setColor] = useState('White');
  const [doors, setDoors] = useState(4);
  const [seatingCapacity, setSeatingCapacity] = useState(5);
  const [features, setFeatures] = useState('');
  const [description, setDescription] = useState('');
  const [tagline, setTagline] = useState('');
  const [auctionGrade, setAuctionGrade] = useState('');
  const [condition, setCondition] = useState('');
  const [whyChooseUs, setWhyChooseUs] = useState('');

  // Image files states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  
  // Form submission states
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // active tab for multi-section form layout
  const [activeSection, setActiveSection] = useState<'specs' | 'details' | 'images'>('specs');

  // Calculator States
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcValuation, setCalcValuation] = useState('');
  const [calcRealPrice, setCalcRealPrice] = useState('');
  const [calcLeasingRate, setCalcLeasingRate] = useState('');
  const [calcLoanRate, setCalcLoanRate] = useState('1500');


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Update previews when selected files change
  useEffect(() => {
    // Generate previews
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Clean up memory
    return () => {
      newPreviews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
      setSelectedFiles(prev => [...prev, ...imageFiles]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const chosenFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...chosenFiles]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'left' | 'right') => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      if (direction === 'left' && index > 0) {
        [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
      } else if (direction === 'right' && index < newFiles.length - 1) {
        [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
      }
      return newFiles;
    });
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;
    
    if (selectedFiles.length === 0) {
      setActiveSection('images');
      setStatus('Please upload at least one image.');
      return;
    }

    setIsSubmitting(true);
    setStatus('Compressing and uploading images to Cloudinary (this may take a few moments)...');

    try {
      // Convert, compress and upload files to Cloudinary
      const uploadPromises = selectedFiles.map(async (file) => {
        const blob = await resizeAndGetBlob(file);
        
        const formData = new FormData();
        formData.append('file', blob);
        formData.append('upload_preset', 'mco1ctsd'); // User's Cloudinary upload preset

        const res = await fetch('https://api.cloudinary.com/v1_1/hubh1wiy/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Failed to upload image to Cloudinary');
        }

        const data = await res.json();
        return data.secure_url; // Returns the Cloudinary HTTPS URL
      });
      
      const imageUrls = await Promise.all(uploadPromises);
      
      setStatus('Saving vehicle data to database...');

      const featuresList = features
        .split(',')
        .map(f => f.trim())
        .filter(f => f.length > 0);

      const whyChooseUsList = whyChooseUs
        .split(',')
        .map(w => w.trim())
        .filter(w => w.length > 0);

      await createVehicle({
        brand,
        model,
        year: Number(year),
        price: Number(price),
        initialPayment: initialPayment ? Number(initialPayment) : undefined,
        monthlyPayment: monthlyPayment ? Number(monthlyPayment) : undefined,
        mileage: Number(mileage),
        fuelType,
        transmission,
        bodyType,
        imageUrls,
        registeredStatus,
        location,
        isSold: false,
        cc,
        description,
        color,
        doors: Number(doors),
        seatingCapacity: Number(seatingCapacity),
        features: featuresList,
        tagline,
        auctionGrade,
        condition,
        whyChooseUs: whyChooseUsList,
      });

      setStatus('Vehicle added successfully! Redirecting...');
      setTimeout(() => {
        router.push('/admin/inventory');
      }, 1500);
    } catch (error: any) {
      console.error(error);
      setIsSubmitting(false);
      setStatus(`Failed to add vehicle: ${error.message || 'Error occurred'}`);
    }
  }

  if (loading) {
    return (
      <main>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <div className="loading-spinner" />
          <p className="text-muted" style={{ marginTop: 16 }}>Checking authentication...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="auth-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="container auth-container" style={{ maxWidth: 560 }}>
          <div className="card panel auth-card" style={{ textAlign: 'center', borderTop: '4px solid var(--brand-red)', padding: '40px 32px' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔐</div>
            <h2>Admin Access Required</h2>
            <p className="text-muted" style={{ margin: '12px 0 24px' }}>
              Please sign in to your owner account to add new vehicles.
            </p>
            <a href="/admin/login" className="button danger lg full-width">Sign In →</a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container" style={{ paddingBottom: 80 }}>
        <section className="section" style={{ paddingTop: 30 }}>
          <div className="flex-between" style={{ marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <span className="tag">New Listing</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0 0' }}>Add Vehicle Listing</h2>
              <p className="text-muted">Fill out the vehicle technical specs, options, pricing, and images.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                type="button" 
                onClick={() => setShowCalculator(true)} 
                className="button" 
                style={{ background: '#2563eb', color: 'white', border: 'none' }}
              >
                🧮 Leasing Calculator
              </button>
              <a href="/admin/inventory" className="button outline">← Cancel & Back</a>
            </div>
          </div>

          <div className="card panel" style={{ maxWidth: 960, margin: '0 auto', padding: 0, overflow: 'hidden' }}>
            {/* Steps / Navigation headers */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--surface-alt)' }}>
              {[
                { id: 'specs', label: '1. Basic Specifications' },
                { id: 'details', label: '2. Details & Features' },
                { id: 'images', label: '3. Image Gallery' }
              ].map(sec => (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id as any)}
                  style={{
                    flex: 1,
                    padding: '16px 12px',
                    background: activeSection === sec.id ? 'var(--surface)' : 'transparent',
                    color: activeSection === sec.id ? 'var(--brand-red)' : 'var(--text-secondary)',
                    fontWeight: activeSection === sec.id ? '700' : '500',
                    fontSize: '0.88rem',
                    borderRight: '1px solid var(--border)',
                    borderBottom: activeSection === sec.id ? '2px solid var(--brand-red)' : 'none',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '32px 28px' }}>
              
              {/* Section 1: Basic Specifications */}
              {activeSection === 'specs' && (
                <div className="animate-fade-in" style={{ display: 'grid', gap: 20 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: 10, margin: 0 }}>Vehicle Core Specs</h3>
                  
                  <div className="grid grid-2" style={{ gap: 20 }}>
                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Brand</label>
                      <select value={brand} onChange={(e) => setBrand(e.target.value)}>
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Model Name</label>
                      <input 
                        type="text" 
                        value={model} 
                        onChange={(e) => setModel(e.target.value)} 
                        placeholder="e.g. Axio, Grace, Outlander" 
                        required 
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Year of Manufacture</label>
                      <input 
                        type="number" 
                        min={2000} 
                        max={2027} 
                        value={year} 
                        onChange={(e) => setYear(Number(e.target.value))} 
                        required 
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Price (LKR)</label>
                      <input 
                        type="text"
                        inputMode="numeric"
                        value={formatNumberWithCommas(price)} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setPrice(val);
                        }} 
                        placeholder="e.g. 3,500,000"
                        required 
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Initial Payment (in Lakhs) / අතින් දෙන ගාණ (ලක්ෂ වලින්)</label>
                      <input 
                        type="text"
                        inputMode="numeric"
                        value={formatNumberWithCommas(initialPayment)} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9.]/g, '');
                          setInitialPayment(val);
                        }} 
                        placeholder="e.g. 36 (for 3.6 Million)"
                      />
                      {initialPayment !== '' && Number(initialPayment) > 0 && (
                        <div style={{ marginTop: '8px', padding: '8px 12px', backgroundColor: '#fff4f4', border: '1px solid #ffcccc', borderRadius: '6px', color: '#e50000', fontSize: '0.9rem', fontWeight: 700, display: 'inline-block' }}>
                          💡 සයිට් එකේ පේන්නේ: අතින් ලක්ෂ {Number(initialPayment).toLocaleString('en-LK', { maximumFractionDigits: 1 })}ක් දීලා අරගෙන යන්න!
                        </div>
                      )}
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Total Monthly Payment (LKR) / මාසික වාරිකය (රුපියල් වලින්)</label>
                      <input 
                        type="text"
                        inputMode="numeric"
                        value={formatNumberWithCommas(monthlyPayment)} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setMonthlyPayment(val);
                        }} 
                        placeholder="e.g. 135000"
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Mileage (km)</label>
                      <input 
                        type="text"
                        inputMode="numeric"
                        value={formatNumberWithCommas(mileage)} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^0-9]/g, '');
                          setMileage(val);
                        }} 
                        placeholder="e.g. 45,000"
                        required 
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Engine CC</label>
                      <input 
                        type="text" 
                        value={formatNumberWithCommas(cc)} 
                        onChange={(e) => setCc(e.target.value)} 
                        placeholder="e.g. 1500, 2000" 
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Location</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Malabe, Colombo, Kandy"
                        required
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Registration Status</label>
                      <select value={registeredStatus} onChange={(e) => setRegisteredStatus(e.target.value)}>
                        {statusOptions.map(st => <option key={st} value={st}>{st}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
                    <button 
                      type="button" 
                      className="button danger" 
                      onClick={() => setActiveSection('details')}
                    >
                      Next Step: Details →
                    </button>
                  </div>
                </div>
              )}

              {/* Section 2: Details & Features */}
              {activeSection === 'details' && (
                <div className="animate-fade-in" style={{ display: 'grid', gap: 20 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: 10, margin: 0 }}>Advanced Configurations</h3>
                  
                  <div className="grid grid-3" style={{ gap: 16 }}>
                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Body Type</label>
                      <select value={bodyType} onChange={(e) => setBodyType(e.target.value)}>
                        {bodyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Transmission</label>
                      <select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
                        {transmissions.map(tr => <option key={tr} value={tr}>{tr}</option>)}
                      </select>
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Fuel Type</label>
                      <select value={fuelType} onChange={(e) => setFuelType(e.target.value)}>
                        {fuelTypes.map(ft => <option key={ft} value={ft}>{ft}</option>)}
                      </select>
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Color</label>
                      <input 
                        type="text" 
                        value={color} 
                        onChange={(e) => setColor(e.target.value)} 
                        placeholder="e.g. Pearl White, Silver, Black" 
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Number of Doors</label>
                      <input 
                        type="number" 
                        min={2} 
                        max={6} 
                        value={doors} 
                        onChange={(e) => setDoors(Number(e.target.value))} 
                      />
                    </div>

                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Seating Capacity</label>
                      <input 
                        type="number" 
                        min={1} 
                        max={15} 
                        value={seatingCapacity} 
                        onChange={(e) => setSeatingCapacity(Number(e.target.value))} 
                      />
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 10 }}>
                    <label>Tagline / Highlights</label>
                    <input 
                      type="text" 
                      value={tagline} 
                      onChange={(e) => setTagline(e.target.value)} 
                      placeholder="e.g. German Luxury • Premium Performance • Advanced Safety" 
                    />
                  </div>

                  <div className="grid grid-2" style={{ gap: 16 }}>
                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Auction Grade</label>
                      <input 
                        type="text" 
                        value={auctionGrade} 
                        onChange={(e) => setAuctionGrade(e.target.value)} 
                        placeholder="e.g. 4.5, 5, R" 
                      />
                    </div>
                    <div className="field" style={{ marginTop: 0 }}>
                      <label>Vehicle Condition</label>
                      <input 
                        type="text" 
                        value={condition} 
                        onChange={(e) => setCondition(e.target.value)} 
                        placeholder="e.g. Brand New Condition" 
                      />
                    </div>
                  </div>

                  <div className="field" style={{ marginTop: 10 }}>
                    <label>Key Features (comma-separated list)</label>
                    <input 
                      type="text" 
                      value={features} 
                      onChange={(e) => setFeatures(e.target.value)} 
                      placeholder="e.g. Leather Seats, Reverse Camera, Push Start" 
                    />
                  </div>

                  <div className="field" style={{ marginTop: 10 }}>
                    <label>Why Choose This Vehicle (comma-separated list)</label>
                    <input 
                      type="text" 
                      value={whyChooseUs} 
                      onChange={(e) => setWhyChooseUs(e.target.value)} 
                      placeholder="e.g. Genuine Auction Grade 4.5, Only 19000 km Driven" 
                    />
                  </div>

                  <div className="field" style={{ marginTop: 10 }}>
                    <label>Description / Seller Notes</label>
                    <textarea 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Provide a detailed description of the car condition, history, extra upgrades, options etc..."
                    />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <button 
                      type="button" 
                      className="button outline" 
                      onClick={() => setActiveSection('specs')}
                    >
                      ← Back to Specs
                    </button>
                    <button 
                      type="button" 
                      className="button danger" 
                      onClick={() => setActiveSection('images')}
                    >
                      Next Step: Images →
                    </button>
                  </div>
                </div>
              )}

              {/* Section 3: Image Upload */}
              {activeSection === 'images' && (
                <div className="animate-fade-in" style={{ display: 'grid', gap: 20 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, borderBottom: '1px solid var(--border)', paddingBottom: 10, margin: 0 }}>Image Gallery</h3>
                  
                  {/* Custom Drag & Drop Zone */}
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: dragActive ? '2px dashed var(--brand-red)' : '2px dashed var(--border)',
                      borderRadius: 'var(--radius-lg)',
                      background: dragActive ? 'rgba(211, 47, 47, 0.04)' : 'var(--surface-alt)',
                      padding: '40px 20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🖼️</div>
                    <strong style={{ fontSize: '0.98rem' }}>Drag & Drop vehicle photos here</strong>
                    <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: 6 }}>
                      or click to browse from files. Supports JPG, PNG, WebP format.
                    </p>
                  </div>
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }}
                  />

                  {/* Previews Grid */}
                  {previews.length > 0 && (
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: 12 }}>Selected Photos ({selectedFiles.length})</h4>
                      <div className="image-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 12 }}>
                        {previews.map((previewUrl, index) => (
                          <div key={index} style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                            <img 
                              src={previewUrl} 
                              alt={`Preview ${index + 1}`} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              style={{
                                position: 'absolute',
                                top: 6,
                                right: 6,
                                width: 22,
                                height: 22,
                                borderRadius: '50%',
                                background: 'rgba(0,0,0,0.6)',
                                color: '#fff',
                                display: 'grid',
                                placeItems: 'center',
                                border: 'none',
                                fontSize: '0.7rem',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                              }}
                              onMouseOver={(e) => (e.currentTarget.style.background = 'var(--brand-red)')}
                              onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.6)')}
                            >
                              ✕
                            </button>
                            
                            <div style={{ position: 'absolute', bottom: 6, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 8 }}>
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveFile(index, 'left');
                                }}
                                style={{
                                  background: 'rgba(0,0,0,0.6)',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '2px 8px',
                                  cursor: index === 0 ? 'not-allowed' : 'pointer',
                                  opacity: index === 0 ? 0.3 : 1
                                }}
                              >
                                ◀
                              </button>
                              <button
                                type="button"
                                disabled={index === previews.length - 1}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveFile(index, 'right');
                                }}
                                style={{
                                  background: 'rgba(0,0,0,0.6)',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '4px',
                                  padding: '2px 8px',
                                  cursor: index === previews.length - 1 ? 'not-allowed' : 'pointer',
                                  opacity: index === previews.length - 1 ? 0.3 : 1
                                }}
                              >
                                ▶
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit and Navigation Actions */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                    <button 
                      type="button" 
                      className="button outline" 
                      onClick={() => setActiveSection('details')}
                      disabled={isSubmitting}
                    >
                      ← Back to Details
                    </button>
                    
                    <button 
                      type="submit" 
                      className="button danger" 
                      disabled={isSubmitting}
                      style={{ height: 48, padding: '0 32px' }}
                    >
                      {isSubmitting ? (
                        <div className="flex" style={{ gap: 8, alignItems: 'center' }}>
                          <div className="loading-spinner" style={{ width: 16, height: 16, borderTopColor: '#fff', borderLeftColor: 'transparent', margin: 0 }} />
                          <span>Processing...</span>
                        </div>
                      ) : (
                        'Save Vehicle Listing'
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>

          {status && (
            <div 
              className="animate-fade-in" 
              style={{ 
                maxWidth: 960, 
                margin: '24px auto 0', 
                padding: '16px 20px', 
                borderRadius: 'var(--radius-md)', 
                background: status.includes('successfully') ? 'rgba(34, 197, 94, 0.08)' : 'rgba(211, 47, 47, 0.04)',
                border: `1px solid ${status.includes('successfully') ? '#16a34a' : 'rgba(211, 47, 47, 0.15)'}`,
                color: status.includes('successfully') ? '#16a34a' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
            >
              <div className="flex" style={{ gap: 10, alignItems: 'center' }}>
                {!status.includes('successfully') && !status.includes('uploading') && !status.includes('Saving') && <span style={{ fontSize: '1.1rem' }}>⚠️</span>}
                {isSubmitting && <div className="loading-spinner" style={{ width: 16, height: 16, borderTopColor: 'var(--brand-red)', borderLeftColor: 'transparent', margin: 0 }} />}
                <span>{status}</span>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* ══════ LEASING CALCULATOR MODAL (PREMIUM UI) ══════ */}
      {showCalculator && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '20px'
        }}>
          <div className="animate-fade-in" style={{
            background: '#ffffff', borderRadius: '24px', width: '100%', maxWidth: '640px',
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.2)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', maxHeight: '90vh', overflowY: 'auto'
          }}>
            {/* Header */}
            <div style={{ 
              background: 'linear-gradient(135deg, #e50000 0%, #a80000 100%)', 
              padding: '24px 32px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              boxShadow: '0 4px 20px rgba(229, 0, 0, 0.2)'
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.6rem' }}>🧮</span> Leasing & Loan Calculator
                </h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', opacity: 0.9, fontWeight: 500 }}>Calculate downpayment and monthly installments</p>
              </div>
              <button type="button" onClick={() => setShowCalculator(false)} style={{ 
                background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', width: '36px', height: '36px', 
                borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
              >✕</button>
            </div>
            
            {/* Body */}
            <div style={{ padding: '32px' }}>
              <div className="grid grid-2" style={{ gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Valuation Amount <span style={{ textTransform: 'none', color: '#94a3b8' }}>(තක්සේරු මුදල)</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontWeight: 600 }}>Rs.</span>
                    <input type="text" value={formatNumberWithCommas(calcValuation)} onChange={e => setCalcValuation(e.target.value.replace(/[^0-9]/g, ''))} placeholder="5,000,000" 
                      style={{ width: '100%', padding: '14px 16px 14px 45px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', background: '#f8fafc', transition: 'all 0.2s', outline: 'none' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#e50000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Real Price <span style={{ textTransform: 'none', opacity: 0.8 }}>(ඇත්තම ගාන)</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#e50000', fontWeight: 600 }}>Rs.</span>
                    <input type="text" value={formatNumberWithCommas(calcRealPrice)} onChange={e => setCalcRealPrice(e.target.value.replace(/[^0-9]/g, ''))} placeholder="4,500,000" 
                      style={{ width: '100%', padding: '14px 16px 14px 45px', borderRadius: '12px', border: '1px solid #fecaca', fontSize: '1.05rem', fontWeight: 700, color: '#991b1b', background: '#fef2f2', transition: 'all 0.2s', outline: 'none' }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = '#fecaca'; e.currentTarget.style.boxShadow = 'none'; }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Leasing Rate <span style={{ textTransform: 'none', color: '#94a3b8' }}>(ලීසිං වාරිකය)</span></label>
                  <input type="text" value={formatNumberWithCommas(calcLeasingRate)} onChange={e => setCalcLeasingRate(e.target.value.replace(/[^0-9]/g, ''))} placeholder="e.g. 2500" 
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', background: '#f8fafc', transition: 'all 0.2s', outline: 'none' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Loan Rate <span style={{ textTransform: 'none', color: '#94a3b8' }}>(ලෝන් වාරිකය)</span></label>
                  <input type="text" value={formatNumberWithCommas(calcLoanRate)} onChange={e => setCalcLoanRate(e.target.value.replace(/[^0-9]/g, ''))} placeholder="e.g. 1500" 
                    style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid #cbd5e1', fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', background: '#f8fafc', transition: 'all 0.2s', outline: 'none' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Results */}
              <div style={{ marginTop: '32px', background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)' }}>
                <h4 style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '1.1rem', borderBottom: '2px dashed #cbd5e1', paddingBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  📊 Calculation Breakdown
                </h4>
                
                {(() => {
                  const realPrice = Number(calcRealPrice) || 0;
                  const valuationAmt = Number(calcValuation) || 0;
                  
                  const leasingAmt = valuationAmt * 0.4;
                  const loanAmt = valuationAmt * 0.2;
                  
                  const downPayment = realPrice - (leasingAmt + loanAmt);
                  const displayDownpayment = downPayment > 0 ? downPayment : 0;
                  
                  const leasingMonthly = (leasingAmt / 100000) * (Number(calcLeasingRate) || 0);
                  const loanMonthly = (loanAmt / 100000) * (Number(calcLoanRate) || 0);
                  const totalMonthly = leasingMonthly + loanMonthly;

                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '12px 16px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <span style={{ color: '#64748b', fontWeight: 600 }}>Downpayment (අතින්):</span>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem' }}>Rs. {displayDownpayment.toLocaleString('en-LK')}</div>
                          <div style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 700 }}>({(displayDownpayment / 100000).toFixed(1)} LKR Lakhs)</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
                        <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Leasing Amount <span style={{ opacity: 0.6 }}>(40% of Val)</span>:</span>
                        <span style={{ fontWeight: 600, color: '#334155' }}>Rs. {leasingAmt.toLocaleString('en-LK')}</span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 8px' }}>
                        <span style={{ color: '#64748b', fontSize: '0.95rem' }}>Loan Amount <span style={{ opacity: 0.6 }}>(20% of Val)</span>:</span>
                        <span style={{ fontWeight: 600, color: '#334155' }}>Rs. {loanAmt.toLocaleString('en-LK')}</span>
                      </div>

                      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, #cbd5e1, transparent)', margin: '8px 0' }} />
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff0f0', border: '1px solid #fecaca', padding: '16px 20px', borderRadius: '12px' }}>
                        <span style={{ fontWeight: 800, color: '#b91c1c', fontSize: '1.15rem' }}>Total Monthly:</span>
                        <span style={{ fontWeight: 900, color: '#e50000', fontSize: '1.4rem' }}>Rs. {totalMonthly.toLocaleString('en-LK')}</span>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => {
                          const lakhs = (displayDownpayment / 100000).toFixed(1);
                          setInitialPayment(lakhs.endsWith('.0') ? lakhs.split('.')[0] : lakhs);
                          setMonthlyPayment(Math.round(totalMonthly).toString());
                          setShowCalculator(false);
                        }}
                        style={{ 
                          marginTop: '20px', 
                          background: 'linear-gradient(135deg, #e50000 0%, #cc0000 100%)', 
                          color: 'white', border: 'none', padding: '16px', borderRadius: '12px', 
                          fontWeight: 800, fontSize: '1.05rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
                          boxShadow: '0 10px 20px -5px rgba(229, 0, 0, 0.3)',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(229, 0, 0, 0.4)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(229, 0, 0, 0.3)'; }}
                      >
                        ⚡ Apply Downpayment & Installment
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
