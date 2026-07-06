import React from 'react';
import type { Vehicle } from '../lib/types';
import Link from 'next/link';
import Image from 'next/image';

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
        <div style={{ position: 'relative', aspectRatio: '4/3', backgroundColor: '#f5f5f5', overflow: 'hidden' }}>
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
          <Image
            src={vehicle.imageUrls?.[0] || 'https://via.placeholder.com/400x250?text=No+Image'}
            alt={vehicle.model}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            style={{ objectFit: 'cover' }}
          />
          {vehicle.isSold && (
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 3,
              pointerEvents: 'none'
            }}>
              <svg width="160" height="160" viewBox="0 0 200 200" style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' }}>
                <defs>
                  <path id="curveTop" d="M 35,100 A 65,65 0 0,1 165,100" />
                  <path id="curveBot" d="M 165,100 A 65,65 0 0,1 35,100" />
                </defs>
                <circle cx="100" cy="100" r="90" fill="none" stroke="#e50000" strokeWidth="8" strokeDasharray="10 8" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#e50000" strokeWidth="3" />
                
                <text fill="#e50000" fontWeight="bold" fontSize="18" letterSpacing="4">
                  <textPath href="#curveTop" startOffset="50%" textAnchor="middle">SOLD OUT</textPath>
                </text>
                <text fill="#e50000" fontWeight="bold" fontSize="18" letterSpacing="4">
                  <textPath href="#curveBot" startOffset="50%" textAnchor="middle">SOLD OUT</textPath>
                </text>
                
                <rect x="10" y="75" width="180" height="50" fill="rgba(255,255,255,0.95)" stroke="#e50000" strokeWidth="4" />
                <text x="100" y="111" fill="#e50000" fontWeight="900" fontSize="32" fontFamily="Arial, sans-serif" textAnchor="middle">
                  SOLD OUT
                </text>
              </svg>
            </div>
          )}
        </div>

        <div style={{ padding: 'clamp(12px, 3vw, 24px) clamp(10px, 2vw, 20px)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{
            fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
            margin: '0 0 4px 0',
            lineHeight: 1.4
          }}>
            {vehicle.brand} {vehicle.model}
          </h3>

          <div style={{
            fontSize: 'clamp(0.9rem, 3vw, 1.25rem)',
            fontWeight: 900,
            color: '#ff2424',
            marginBottom: vehicle.initialPayment ? '4px' : '12px'
          }}>
            Rs {vehicle.price.toLocaleString('en-LK')}
          </div>
          
          {vehicle.initialPayment && (
            <div style={{
              fontSize: 'clamp(0.75rem, 2.5vw, 0.9rem)',
              fontWeight: 800,
              color: '#111',
              backgroundColor: '#fff4f4',
              border: '1px solid #ffcccc',
              padding: '6px 10px',
              borderRadius: '6px',
              marginBottom: '12px',
              display: 'inline-block'
            }}>
              🔥 අතින් ලක්ෂ {vehicle.initialPayment.toLocaleString('en-LK', { maximumFractionDigits: 1 })}ක්
            </div>
          )}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(6px, 1.5vw, 16px)',
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
            paddingTop: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
            fontWeight: 800,
            textTransform: 'uppercase',
          }}>
            <span>EXPLORE MORE</span>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'clamp(18px, 4vw, 24px)',
              height: 'clamp(18px, 4vw, 24px)',
              borderRadius: '50%',
              backgroundColor: '#ff2424',
              color: '#fff',
              fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)',
            }}>➔</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
