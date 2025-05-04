'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import DynamicMapLoader from './components/DynamicMapLoader'; // Import the new loader

// Define the structure of our GPS data (still needed for prop types)
interface GpsData {
  id: number;
  lat: number;
  lng: number;
  created_date: string; // Adjust type if necessary based on DB/usage
}

// Define the structure for a bus route
interface BusRoute {
  id: string;
  name: string;
  description: string; // Add other relevant details if needed
}

// --- Hardcoded Bus Routes (Replace with API call later) ---
const availableRoutes: BusRoute[] = [
  { id: 'route1', name: 'Route 1', description: 'Satria <> Kampus Induk' },
  { id: 'route2', name: 'Route 2', description: 'Kampus Induk <> Satria' },
  { id: 'route3', name: 'Route 3', description: 'Al-Jazari <> Kampus Induk' },
  { id: 'route4', name: 'Route 4', description: 'Kampus Induk <> Al-Jazari' },
  { id: 'all', name: 'Show All Routes', description: 'Display all active buses' },
];
// --- End Hardcoded Routes ---

// --- Main Page Component (Client Component) ---
export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [selectedRouteId, setSelectedRouteId] = useState<string>(availableRoutes[0].id); // Default to first route

  // --- Authentication Check ---
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus !== 'true') {
      router.replace('/login'); // Use replace to avoid adding login to history stack
    } else {
      setIsLoggedIn(true);
    }
    setIsLoading(false); // Finished loading/checking auth
  }, [router]);
  // --- End Authentication Check ---

  // --- Data Fetching and State (Client-Side - Placeholder) ---
  // In a real app, you might fetch data here after login confirmation
  // or pass it down if fetched in a higher-level server component (more advanced)
  const gpsData: GpsData[] = []; // Provide an empty array for now
  const initialCenter: [number, number] = [2.309180, 102.320486]; // Default center
  const initialZoom = 13; // Adjusted zoom level
  // --- End Data Fetching ---

  const handleRouteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRouteId(event.target.value);
    // TODO: Trigger data refresh for the map based on the new route
    console.log("Selected Route ID:", event.target.value);
  };

  const selectedRoute = availableRoutes.find(route => route.id === selectedRouteId);

  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-full"> {/* Use h-full for loading */}
        <p>Loading...</p> {/* Or a spinner component */}
      </div>
    );
  }

  // Remove the outer <main> tag's styling, keep the tag for semantics if desired
  // Or remove the <main> tag entirely if the one in layout.tsx is sufficient
  return (
      <div className="flex flex-col lg:flex-row h-full gap-4 lg:gap-6"> {/* Main flex container for this page */}

          {/* Left Panel: Controls & Info */}
          <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md overflow-y-auto border border-gray-200">
              {/* Route Selector */}
              <div className="border-b pb-4">
                  <label htmlFor="route-select" className="block text-lg font-semibold text-gray-800 mb-2">Select Bus Route:</label>
                  <select
                      id="route-select"
                      value={selectedRouteId}
                      onChange={handleRouteChange}
                      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                      {availableRoutes.map((route) => (
                          <option key={route.id} value={route.id}>
                              {route.name} ({route.description})
                          </option>
                      ))}
                  </select>
              </div>

              {/* Bus Information Area */}
              <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                     Bus Information{selectedRoute ? `: ${selectedRoute.name}` : ''}
                  </h2>
                  {/* Conditional Bus Info Display (Placeholder) */}
                  <div className="flex flex-col gap-3">
                      {/* Example structure - adapt as needed */}
                      {/* Show only info relevant to the selected route or all if 'all' is selected */}
                      {(selectedRouteId === 'route1' || selectedRouteId === 'all') && (
                          <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200 text-sm">
                              <p><strong>Bus Plate:</strong> UTEM 1234</p>
                              <p><strong>Route:</strong> Satria &lt;&gt; Kampus Induk</p>
                              <p><strong>Status:</strong> <span className="text-green-600 font-medium">Available</span></p>
                          </div>
                      )}
                       {(selectedRouteId === 'route2' || selectedRouteId === 'all') && (
                           <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200 text-sm">
                              <p><strong>Bus Plate:</strong> UTEM 1233</p>
                              <p><strong>Route:</strong> Kampus Induk &lt;&gt; Satria</p>
                              <p><strong>Status:</strong> <span className="text-red-600 font-medium">Unavailable</span></p>
                          </div>
                      )}
                      {(selectedRouteId === 'route3' || selectedRouteId === 'all') && (
                          <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200 text-sm">
                              <p><strong>Bus Plate:</strong> UTEM 1244</p>
                              <p><strong>Route:</strong> Al-Jazari &lt;&gt; Kampus Induk</p>
                              <p><strong>Status:</strong> <span className="text-red-600 font-medium">Unavailable</span></p>
                          </div>
                      )}
                      {(selectedRouteId === 'route4' || selectedRouteId === 'all') && (
                          <div className="bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200 text-sm">
                              <p><strong>Bus Plate:</strong> UTEM 1222</p>
                              <p><strong>Route:</strong> Kampus Induk &lt;&gt; Al-Jazari</p>
                              <p><strong>Status:</strong> <span className="text-red-600 font-medium">Unavailable</span></p>
                          </div>
                      )}
                       {(selectedRouteId !== 'route1' && selectedRouteId !== 'route2' && selectedRouteId !== 'route3' && selectedRouteId !== 'route4' && selectedRouteId !== 'all') && (
                           <p className="text-gray-500 italic text-sm">No bus information available for this route yet.</p>
                       )}
                  </div>
              </div>
          </div>

          {/* Right Panel: Map */}
          <div className="w-full lg:flex-grow rounded-lg shadow-lg border border-gray-200 overflow-hidden min-h-[60vh] lg:min-h-0"> {/* Ensure map takes space */}
              <DynamicMapLoader
                  gpsData={gpsData} // Pass actual data later
                  center={initialCenter}
                  zoom={initialZoom} // Use state for zoom if needed
                  selectedRouteId={selectedRouteId}
              />
          </div>
      </div>
  );
}
