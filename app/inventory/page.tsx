import { fetchVehicles } from '../../lib/firestore';
import InventoryClient from './InventoryClient';

export default async function InventoryPage() {
  const initialVehicles = await fetchVehicles();

  return <InventoryClient initialVehicles={initialVehicles} />;
}
