"use client";

import { useEffect, useState } from "react";
import MapTracker from "@/components/MapTracker";
import socket from "@/utils/socket";
import { useParams } from "next/navigation";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  
  const [driverLoc, setDriverLoc] = useState({ lat: 12.9716, lng: 77.5946 }); // Mock BLR driver
  const [customerLoc] = useState({ lat: 12.9352, lng: 77.6245 }); // Mock customer loc

  useEffect(() => {
    if (!orderId) return;

    socket.on("driverLocationUpdate", (data) => {
      if (data.orderId === orderId) {
        setDriverLoc({ lat: data.lat, lng: data.lng });
      }
    });

    return () => {
      socket.off("driverLocationUpdate");
    };
  }, [orderId]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Order #{orderId} - Live Tracking</h1>
      <MapTracker driverLocation={driverLoc} customerLocation={customerLoc} />
    </div>
  );
}
