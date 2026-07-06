import type { Metadata, ResolvingMetadata } from 'next';
import { fetchVehicleById } from '../../../lib/firestore';
import VehicleClient from './VehicleClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const vehicle = await fetchVehicleById(params.id);

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found',
    };
  }

  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
  const description = vehicle.description || `Buy this ${title} for ${vehicle.price.toLocaleString('en-LK')} LKR. Experience luxury effortlessly.`;
  const image = vehicle.imageUrls?.[0] || '/Gemini_Generated_Image_ewmootewmootewmo.png';

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Nagoya Auto Auction`,
      description,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Nagoya Auto Auction`,
      description,
      images: [image],
    },
  };
}

export default async function VehiclePage({ params }: Props) {
  const vehicle = await fetchVehicleById(params.id);

  if (!vehicle) {
    return (
      <main>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2>Vehicle Not Found</h2>
          <p className="text-muted" style={{ marginTop: 16 }}>The vehicle you are looking for does not exist or has been removed.</p>
        </div>
      </main>
    );
  }

  return <VehicleClient initialVehicle={vehicle} />;
}
