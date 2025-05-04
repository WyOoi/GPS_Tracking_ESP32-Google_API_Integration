// Designate as a Client Component
'use client';

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Map as LeafletMap } from 'leaflet';

// Fix for default Leaflet icon issues with build tools like Webpack
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Define the structure of GPS data points expected by this component
interface GpsData {
  id: number;
  lat: number;
  lng: number;
  created_date?: string; // Optional, as we primarily use lat/lng
}

// Define the props expected by the MapComponent
interface MapComponentProps {
  gpsData: GpsData[];
  center: [number, number]; // [latitude, longitude]
  zoom: number;
  selectedRouteId: string; // Add the new prop
}

// Helper component to update map view when center or zoom props change
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ gpsData, center, zoom, selectedRouteId }) => {
  // MOVE THE useEffect LOGIC HERE
  useEffect(() => {
    // This check ensures the code runs only once on the client
    if (typeof window !== 'undefined') {
        // Delete the problematic method and merge options
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: iconRetinaUrl.src,
            iconUrl: iconUrl.src,
            shadowUrl: shadowUrl.src,
        });
    }
  }, []); // Empty dependency array ensures it runs once on mount

  const mapRef = useRef<LeafletMap | null>(null);

  // Ensure Leaflet runs only on the client
  if (typeof window === 'undefined') {
    return null; // Render nothing on the server
  }

  console.log("Rendering MapComponent with data:", gpsData);
  console.log("MapComponent received selectedRouteId:", selectedRouteId); // Log the received prop

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      whenReady={() => {
        console.log('Map is ready');
      }}
      ref={mapRef}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {gpsData.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Popup>
            Latitude: {point.lat} <br /> Longitude: {point.lng} <br />
            {point.created_date && `Time: ${new Date(point.created_date).toLocaleString()}`}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent; 