'use client';

import { useState } from 'react';

export default function CalculatorPage() {
  // Quote Form State
  const [quoteForm, setQuoteForm] = useState<any>({
    name: '', whatsapp: '', make: '', model: '', year: '', engine: '', color: '', grade: ['S', '6', '5', '4.5', '4', '3.5', 'RA', 'R'], notes: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSending, setIsSending] = useState(false);

  const handleQuoteChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setQuoteForm((prev: any) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const { name, whatsapp, make, model } = quoteForm;
    
    if (!name.trim()) newErrors.name = "Name is required";
    
    if (!whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else {
      const phoneRegex = /^[+]?[\d\s-]{9,15}$/;
      if (!phoneRegex.test(whatsapp)) {
        newErrors.whatsapp = "Please enter a valid phone number";
      }
    }
    
    if (!make.trim()) newErrors.make = "Vehicle make is required";
    if (!model.trim()) newErrors.model = "Vehicle model is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuoteSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    const { name, whatsapp, make, model, year, engine, color, grade, notes } = quoteForm;
    
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
Auction Grade: ${Array.isArray(grade) ? grade.join(', ') : grade || 'N/A'}

*Additional Notes:*
${notes || 'None'}`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);
    
    // The owner's WhatsApp number (including country code, e.g., 94 for Sri Lanka)
    const ownerWhatsAppNumber = "94714495632"; 
    
    // Redirect to WhatsApp
    window.open(`https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <main style={{ backgroundColor: '#F4F7FB', minHeight: '100vh', padding: '120px 20px 60px' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* REQUEST QUOTATION (No Chassis) */}
        <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.04)', border: '1px solid #eaeaea' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0B2B5E', marginBottom: '8px' }}>Request a Quotation</h2>
          <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '24px' }}>Fill in your details and we'll send you a vehicle quotation via WhatsApp.</p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Your Name *</label>
              <input value={quoteForm.name} onChange={handleQuoteChange('name')} type="text" placeholder="e.g., John Doe" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${errors.name ? 'red' : '#ddd'}`, fontSize: '1rem', outline: 'none' }} />
              {errors.name && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.name}</span>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>WhatsApp Number *</label>
              <input value={quoteForm.whatsapp} onChange={handleQuoteChange('whatsapp')} type="tel" placeholder="+94 7X XXX XXXX" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${errors.whatsapp ? 'red' : '#ddd'}`, fontSize: '1rem', outline: 'none' }} />
              {errors.whatsapp && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.whatsapp}</span>}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Vehicle Make *</label>
                <input value={quoteForm.make} onChange={handleQuoteChange('make')} type="text" placeholder="e.g., Toyota" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${errors.make ? 'red' : '#ddd'}`, fontSize: '1rem', outline: 'none' }} />
                {errors.make && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.make}</span>}
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Vehicle Model *</label>
                <input value={quoteForm.model} onChange={handleQuoteChange('model')} type="text" placeholder="e.g., Aqua" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: `1px solid ${errors.model ? 'red' : '#ddd'}`, fontSize: '1rem', outline: 'none' }} />
                {errors.model && <span style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.model}</span>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Year</label>
                <select value={quoteForm.year} onChange={handleQuoteChange('year')} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', outline: 'none', backgroundColor: '#fff' }}>
                  <option value="">Select Year</option>
                  {[2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map(y => <option key={y} value={y}>{y}</option>)}
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
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#333', marginBottom: '8px' }}>Auction Grades (Select multiple)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['S', '6', '5', '4.5', '4', '3.5', 'RA', 'R'].map(g => (
                    <label key={g} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '10px 4px', border: quoteForm.grade.includes(g) ? '2px solid #002147' : '1px solid #ddd', 
                      borderRadius: '8px', cursor: 'pointer', 
                      backgroundColor: quoteForm.grade.includes(g) ? '#F5A623' : '#fff',
                      color: quoteForm.grade.includes(g) ? '#002147' : '#555',
                      fontWeight: quoteForm.grade.includes(g) ? 700 : 500,
                      transition: 'all 0.2s', userSelect: 'none',
                      boxShadow: quoteForm.grade.includes(g) ? '0 4px 10px rgba(245, 166, 35, 0.3)' : 'none'
                    }}>
                      <input 
                        type="checkbox" 
                        checked={quoteForm.grade.includes(g)}
                        onChange={(e) => {
                          const currentGrades = [...quoteForm.grade];
                          if (e.target.checked) {
                            currentGrades.push(g);
                          } else {
                            const index = currentGrades.indexOf(g);
                            if (index > -1) currentGrades.splice(index, 1);
                          }
                          setQuoteForm((prev: any) => ({ ...prev, grade: currentGrades }));
                        }}
                        style={{ display: 'none' }}
                      />
                      {g}
                    </label>
                  ))}
                </div>
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
      </div>
    </main>
  );
}
