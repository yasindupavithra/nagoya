import { MetadataRoute } from 'next';
import { fetchActiveVehicles } from '../lib/firestore';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nagoyaglobal.lk';
  
  // Static routes
  const routes = ['', '/inventory', '/about', '/contact', '/leasing'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic vehicle routes
    const activeVehicles = await fetchActiveVehicles();
    
    const vehicleRoutes = activeVehicles.map((vehicle) => ({
      url: `${baseUrl}/vehicle/${vehicle.id}`,
      lastModified: new Date(vehicle.createdAt ? vehicle.createdAt.seconds * 1000 : Date.now()).toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    return [...routes, ...vehicleRoutes];
  } catch (error) {
    console.error('Failed to generate sitemap for vehicles:', error);
    return routes;
  }
}
