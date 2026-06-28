'use client';
import { useState } from 'react';
import Link from 'next/link';
import type { Vehicle } from '../lib/types';

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const [liked, setLiked] = useState(false);

  const whatsappMsg = encodeURIComponent(
    `Hi! I'm interested in the ${vehicle.year} ${vehicle.brand} ${vehicle.model} (₨${vehicle.price.toLocaleString('en-LK')}). Is it still available?`
  );

  return (
    <article className="card vehicle-card">
      <div className="card-media">
        <img
          src={vehicle.imageUrls[0] ?? 'https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80'}
          alt={`${vehicle.brand} ${vehicle.model}`}
        />
        <div className="card-media-overlay" />
        <div className="card-badge">
          <span>✓</span> Verified
        </div>
        <div className="card-flag">360°</div>
        <button
          className={`card-favorite${liked ? ' liked' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setLiked(!liked);
          }}
          aria-label="Add to favorites"
        >
          {liked ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <h3>{vehicle.brand} {vehicle.model}</h3>
          <div className="card-meta-info">
            <span>{vehicle.year}</span>
            <span>{vehicle.fuelType}</span>
            <span>{vehicle.bodyType ?? 'Used'}</span>
          </div>
        </div>

        <div className="card-specs">
          <div>
            <span className="spec-icon">📍</span>
            <span>{vehicle.mileage.toLocaleString('en-LK')} km</span>
          </div>
          <div>
            <span className="spec-icon">⚙️</span>
            <span>{vehicle.transmission}</span>
          </div>
        </div>

        <div className="card-price-row">
          <div>
            <span className="card-price">₨{vehicle.price.toLocaleString('en-LK')}</span>
            <span className="card-price-sub">From ₨{Math.round(vehicle.price / 36).toLocaleString('en-LK')}/mo</span>
          </div>
        </div>

        <div className="card-actions">
          <a
            href={`https://wa.me/94714495632?text=${whatsappMsg}`}
            target="_blank"
            rel="noreferrer"
            className="button secondary sm"
          >
            💬 WhatsApp
          </a>
          <Link href={`/vehicle/${vehicle.id}`} className="button danger sm">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
