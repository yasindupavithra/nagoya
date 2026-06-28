import React from 'react';
import type { Vehicle } from '../lib/types';
import Link from 'next/link';

export default function LatestArrivalCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/vehicle/${vehicle.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #eaeaea',
        borderRadius: '4px',
        overflow: 'hidden',
        color: '#111',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ position: 'relative', height: '240px', backgroundColor: '#f5f5f5' }}>
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: '#ff2424',
            color: '#fff',
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: 800,
            zIndex: 2,
          }}>
            {vehicle.year}
          </div>
          <img
            src={vehicle.imageUrls?.[0] || 'https://via.placeholder.com/400x250?text=No+Image'}
            alt={vehicle.model}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ padding: '24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ 
            fontSize: '1.1rem', 
            fontWeight: 800, 
            textTransform: 'uppercase',
            margin: '0 0 4px 0',
            lineHeight: 1.4
          }}>
            {vehicle.brand} {vehicle.model}
          </h3>

          <div style={{
            fontSize: '1.25rem',
            fontWeight: 900,
            color: '#ff2424',
            marginBottom: '16px'
          }}>
            Rs {vehicle.price.toLocaleString('en-LK')}
          </div>
          <div style={{
            display: 'flex',
            gap: '16px',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#666',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#ff2424', fontSize: '1rem' }}>⚙️</span> {vehicle.transmission}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#ff2424', fontSize: '1rem' }}>⛽</span> {vehicle.fuelType}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#ff2424', fontSize: '1rem' }}>🛣️</span> {vehicle.mileage.toLocaleString()} KM
            </span>
          </div>

          <div style={{
            marginTop: 'auto',
            borderTop: '1px solid #eaeaea',
            paddingTop: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.8rem',
            fontWeight: 700,
          }}>
            <span>VIEW DETAILS</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#f0f0f0',
              color: '#333',
              fontSize: '0.8rem',
            }}>➔</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
