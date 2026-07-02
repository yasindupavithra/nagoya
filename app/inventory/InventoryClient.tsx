'use client';
import { useMemo, useState } from 'react';

import type { Vehicle } from '../../lib/types';
import LatestArrivalCard from '../../components/LatestArrivalCard';

const brands = ['Toyota', 'Nissan', 'Honda', 'Mitsubishi', 'Suzuki', 'Mazda', 'Subaru', 'Daihatsu', 'Lexus', 'Mercedes-Benz', 'BMW', 'Audi', 'Kia', 'Hyundai', 'Peugeot', 'Ford', 'Land Rover', 'Range Rover', 'MG', 'DFSK', 'Tata', 'Mahindra', 'Micro', 'Renault', 'Volvo', 'Jeep', 'Porsche', 'Chevrolet', 'Isuzu'];
const fuelTypes = ['Petrol', 'Hybrid', 'Diesel'];
const bodyTypes = ['Sedan', 'Hatchback', 'SUV', 'Compact', 'Van'];
const transmissions = ['Auto', 'Manual'];
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'mileage', label: 'Lowest Mileage' },
];

const priceOptions = [
  ...Array.from({ length: 29 }, (_, i) => (i + 2) * 1000000),
  ...Array.from({ length: 10 }, (_, i) => (i + 7) * 5000000)
];

const PAGE_SIZE = 9;

export default function InventoryClient({ initialVehicles }: { initialVehicles: Vehicle[] }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [priceMax, setPriceMax] = useState(80000000);
  const [yearMin, setYearMin] = useState(1990);
  const [fuelType, setFuelType] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [mileageMax, setMileageMax] = useState(500000);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');



  const filteredVehicles = useMemo(() => {
    const source = vehicles;
    let result = source.filter((v) =>
      v.price <= priceMax &&
      v.year >= yearMin &&
      v.mileage <= mileageMax &&
      (!fuelType || v.fuelType === fuelType) &&
      (!bodyType || v.bodyType === bodyType) &&
      (!transmission || v.transmission === transmission) &&
      (!brandFilter || v.brand === brandFilter)
    );

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'mileage': result.sort((a, b) => a.mileage - b.mileage); break;
      default: break;
    }

    return result;
  }, [vehicles, priceMax, yearMin, fuelType, bodyType, transmission, brandFilter, mileageMax, sortBy]);

  const activeFilters = [
    brandFilter && `Brand: ${brandFilter}`,
    fuelType && `Fuel: ${fuelType}`,
    bodyType && `Type: ${bodyType}`,
    transmission && `Trans: ${transmission}`,
  ].filter(Boolean);

  function clearFilters() {
    setBrandFilter(''); setFuelType(''); setBodyType(''); setTransmission('');
    setPriceMax(80000000); setYearMin(1990); setMileageMax(500000);
  }

  return (
    <main>
      <div className="container">
        <section className="section">
          <div className="inventory-top">
            <div>
              <span className="tag">Inventory</span>
              <h2 style={{ margin: '8px 0 0' }}>Browse All Vehicles</h2>
              <p className="text-muted">{filteredVehicles.length} vehicles found</p>
            </div>
            <div className="flex" style={{ gap: 10, alignItems: 'center' }}>
              <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <div className="view-toggle">
                <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>▦</button>
                <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>☰</button>
              </div>
            </div>
          </div>

          {activeFilters.length > 0 && (
            <div className="filter-chips">
              {activeFilters.map((f) => (
                <span key={f} className="filter-chip">{f}</span>
              ))}
              <button className="filter-chip" onClick={clearFilters} style={{ background: 'var(--surface-alt)', color: 'var(--text-muted)' }}>
                ✕ Clear All
              </button>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 28, alignItems: 'start' }}>
            {/* Sidebar Filters */}
            <div className="card panel" style={{ position: 'sticky', top: 'calc(var(--header-height) + var(--topbar-height) + 24px)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Filters</h3>

              <div className="field">
                <label>Brand</label>
                <select value={brandFilter} onChange={(e) => { setBrandFilter(e.target.value); }}>
                  <option value="">All Brands</option>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="field">
                <label>Max Price: {priceMax / 1000000} Million</label>
                <input 
                  type="range" 
                  min={0} 
                  max={priceOptions.length - 1} 
                  step={1} 
                  value={priceOptions.indexOf(priceMax) !== -1 ? priceOptions.indexOf(priceMax) : priceOptions.length - 1} 
                  onChange={(e) => { 
                    setPriceMax(priceOptions[Number(e.target.value)]); 
                  }} 
                />
              </div>

              <div className="field">
                <label>Min Year: {yearMin}</label>
                <input type="range" min={1990} max={2026} value={yearMin} onChange={(e) => { setYearMin(Number(e.target.value)); }} />
              </div>

              <div className="field">
                <label>Fuel Type</label>
                <select value={fuelType} onChange={(e) => { setFuelType(e.target.value); }}>
                  <option value="">Any Fuel</option>
                  {fuelTypes.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <div className="field">
                <label>Body Type</label>
                <select value={bodyType} onChange={(e) => { setBodyType(e.target.value); }}>
                  <option value="">Any Type</option>
                  {bodyTypes.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div className="field">
                <label>Transmission</label>
                <select value={transmission} onChange={(e) => { setTransmission(e.target.value); }}>
                  <option value="">Any</option>
                  {transmissions.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="field">
                <label>Max Mileage: {mileageMax.toLocaleString('en-LK')} km</label>
                <input type="range" min={10000} max={500000} step={5000} value={mileageMax} onChange={(e) => { setMileageMax(Number(e.target.value)); }} />
              </div>

              <button className="button secondary full-width" style={{ marginTop: 16 }} onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>

            {/* Vehicle Grid */}
            <div>
              {filteredVehicles.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-3' : 'grid'} style={viewMode === 'list' ? { gridTemplateColumns: '1fr' } : {}}>
                  {filteredVehicles.map((vehicle, i) => (
                    <div key={vehicle.id} className={`animate-fade-in-up stagger-${(i % 6) + 1}`}>
                      <LatestArrivalCard vehicle={vehicle} />
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '64px 24px', color: 'var(--text-muted)' }}>
                  <p style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</p>
                  <h3>No vehicles found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                  <button className="button danger" onClick={clearFilters} style={{ marginTop: 16 }}>
                    Clear All Filters
                  </button>
                </div>
              )}

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
