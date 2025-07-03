// Create: src/components/PlacesAutocomplete.tsx
"use client";

import React, { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useLoadScript } from "@react-google-maps/api";

interface PlacesAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

const libraries: "places"[] = ["places"];

export default function PlacesAutocomplete({
  value,
  onChange,
  placeholder = "Enter location",
  id,
  className,
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [inputValue, setInputValue] = useState(value);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries,
  });

  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      // Initialize Places Autocomplete
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["establishment", "geocode"], // Include businesses and addresses
          componentRestrictions: { country: "in" }, // Restrict to India (change as needed)
          fields: [
            "formatted_address",
            "geometry",
            "name",
            "place_id",
            "types",
            "address_components",
          ],
        }
      );

      // Listen for place selection
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();

        if (place && place.formatted_address) {
          const selectedAddress = place.formatted_address;
          setInputValue(selectedAddress);
          onChange(selectedAddress);

          // Optional: Log additional place details
          console.log("Selected place:", {
            name: place.name,
            address: place.formatted_address,
            placeId: place.place_id,
            location: place.geometry?.location?.toJSON(),
          });
        }
      });
    }
  }, [isLoaded, onChange]);

  // Update input value when prop changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  if (!isLoaded) {
    return (
      <Input placeholder="Loading places..." disabled className={className} />
    );
  }

  return (
    <Input
      ref={inputRef}
      id={id}
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={className}
      autoComplete="off"
    />
  );
}
