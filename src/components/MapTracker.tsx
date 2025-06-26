"use client";

import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from "@react-google-maps/api";

interface Props {
  driverLocation: { lat: number; lng: number };
  customerLocation: { lat: number; lng: number };
}

export default function MapTracker({ driverLocation, customerLocation }: Props) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  console.log(isLoaded, " loading or not")

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <GoogleMap
      center={driverLocation}
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "500px" }}
    >
      <Marker position={driverLocation} label="🚗" />
      <Marker position={customerLocation} label="📍" />
      <DirectionsRenderer
        directions={{
          routes: [{
            legs: [{
              start_location: driverLocation,
              end_location: customerLocation,
              steps: [],
            }],
          }],
        } as any} // Only for visual route demo, real Directions API recommended later
      />
    </GoogleMap>
  );
}
