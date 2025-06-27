"use client";

import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";

interface Props {
  driverLocation: { lat: number; lng: number };
  customerLocation: { lat: number; lng: number };
}

const containerStyle = {
  width: "100%",
  height: "500px",
};

// Add libraries for geometry functions
const libraries: ("geometry" | "places")[] = ["geometry"];

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
  styles: [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#686868" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f2f2f2" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ lightness: "-22" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ saturation: "11" }, { lightness: "-51" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text",
      stylers: [{ saturation: "3" }, { lightness: "-56" }, { weight: "2.20" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ lightness: "-52" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.stroke",
      stylers: [{ weight: "6.13" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.icon",
      stylers: [
        { lightness: "-10" },
        { gamma: "0.94" },
        { weight: "1.24" },
        { saturation: "-100" },
        { visibility: "off" },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ lightness: "-16" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [{ saturation: "-41" }, { lightness: "-41" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.stroke",
      stylers: [{ weight: "5.46" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [{ weight: "0.72" }, { lightness: "-16" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ lightness: "-37" }],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#b7e4f4" }, { visibility: "on" }],
    },
  ],
};

export default function MapTracker({
  driverLocation,
  customerLocation,
}: Props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries,
  });

  const [routePath, setRoutePath] = useState<google.maps.LatLng[]>([]);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const fetchRoutes = async () => {
      try {
        // Use the new Routes API
        const response = await fetch(
          `https://routes.googleapis.com/directions/v2:computeRoutes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
              "X-Goog-FieldMask":
                "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
            },
            body: JSON.stringify({
              origin: {
                location: {
                  latLng: {
                    latitude: driverLocation.lat,
                    longitude: driverLocation.lng,
                  },
                },
              },
              destination: {
                location: {
                  latLng: {
                    latitude: customerLocation.lat,
                    longitude: customerLocation.lng,
                  },
                },
              },
              travelMode: "DRIVE",
              routingPreference: "TRAFFIC_AWARE",
              computeAlternativeRoutes: false,
              routeModifiers: {
                avoidTolls: false,
                avoidHighways: false,
                avoidFerries: false,
              },
              languageCode: "en-US",
              units: "IMPERIAL",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0];

          // Check if geometry library is loaded
          if (window.google?.maps?.geometry?.encoding) {
            // Decode polyline using Google Maps geometry library
            const decodedPath = window.google.maps.geometry.encoding.decodePath(
              route.polyline.encodedPolyline
            );
            setRoutePath(decodedPath);
          } else {
            // Fallback: simple straight line
            console.warn("Geometry library not loaded, using straight line");
            setRoutePath([
              new google.maps.LatLng(driverLocation.lat, driverLocation.lng),
              new google.maps.LatLng(
                customerLocation.lat,
                customerLocation.lng
              ),
            ]);
          }

          // Set route info
          setRouteInfo({
            distance: `${(route.distanceMeters / 1609.34).toFixed(1)} mi`,
            duration: route.duration.replace("s", " seconds"),
          });
        }
      } catch (error) {
        console.error("Routes API request failed:", error);

        // Fallback: Draw straight line between points
        setRoutePath([
          new google.maps.LatLng(driverLocation.lat, driverLocation.lng),
          new google.maps.LatLng(customerLocation.lat, customerLocation.lng),
        ]);

        // Calculate approximate straight-line distance
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(driverLocation.lat, driverLocation.lng),
          new google.maps.LatLng(customerLocation.lat, customerLocation.lng)
        );

        setRouteInfo({
          distance: `${(distance / 1609.34).toFixed(1)} mi (straight line)`,
          duration: "Estimated",
        });
      }
    };

    fetchRoutes();
  }, [isLoaded, driverLocation, customerLocation]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div>
      {/* Route Info */}
      {routeInfo && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex justify-between text-sm">
            <span>
              <strong>Distance:</strong> {routeInfo.distance}
            </span>
            <span>
              <strong>Duration:</strong> {routeInfo.duration}
            </span>
          </div>
        </div>
      )}

      {/* Map */}
      <GoogleMap
        center={driverLocation}
        zoom={13}
        mapContainerStyle={containerStyle}
        options={mapOptions}
      >
        {/* Driver Marker - Blue */}
        <Marker
          position={driverLocation}
          icon={{
            url:
              "data:image/svg+xml;base64," +
              btoa(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#3B82F6"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24),
          }}
          title="Driver Location"
        />

        {/* Customer Marker - Red */}
        <Marker
          position={customerLocation}
          icon={{
            url:
              "data:image/svg+xml;base64," +
              btoa(`
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="8" fill="#EF4444"/>
                <circle cx="12" cy="12" r="3" fill="white"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(24, 24),
          }}
          title="Delivery Location"
        />

        {/* Route Polyline */}
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: "#3B82F6",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
