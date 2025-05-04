'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Define the structure of GPS data points expected by MapComponent
interface GpsData {
  id: number;
  lat: number;
  lng: number;
  created_date?: string;
}

// Define the props for the loader component
interface DynamicMapLoaderProps {
  gpsData: GpsData[];
  center: [number, number];
  zoom: number;
  selectedRouteId: string;
}

// Dynamically import the actual MapComponent *inside* this client component
const MapComponentWithNoSSR = dynamic(
  () => import('./MapComponent'),
  {
    ssr: false, // ssr: false is allowed here because this file is a Client Component
    loading: () => <p className="text-center p-4">Loading map...</p>
  }
);

const DynamicMapLoader: React.FC<DynamicMapLoaderProps> = (props) => {
  // Render the dynamically loaded map component, passing the props down
  return <MapComponentWithNoSSR {...props} />;
};

export default DynamicMapLoader;