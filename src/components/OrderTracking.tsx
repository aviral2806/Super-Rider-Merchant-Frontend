"use client";

import React, { useState, useEffect } from "react";
import type { Order } from "@/stores/orderStore";
import MapTracker from "./MapTracker";
import {
  Package,
  User,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Timer,
} from "lucide-react";

interface OrderTrackingProps {
  order: Order;
}

export default function OrderTracking({ order }: OrderTrackingProps) {
  // Mock driver and customer locations for active orders
  const [driverLocation, setDriverLocation] = useState({
    lat: 12.9716,
    lng: 77.5946,
  });
  const [customerLocation] = useState({ lat: 12.9352, lng: 77.6245 });

  // Mock real-time driver location updates for active orders

  const isActiveOrder = (status: string) => {
    return [
      "Preparing",
      "Waiting for Pickup",
      "Picked Up",
      "In Transit",
    ].includes(status);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Waiting for Pickup":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Picked Up":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Transit":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Preparing":
        return <Timer className="w-4 h-4" />;
      case "Waiting for Pickup":
        return <Package className="w-4 h-4" />;
      case "Picked Up":
        return <Truck className="w-4 h-4" />;
      case "In Transit":
        return <Truck className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Order Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Order {order.id}</h3>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-full border ${getStatusColor(
              order.status
            )}`}
          >
            {getStatusIcon(order.status)}
            <span className="text-sm font-medium">{order.status}</span>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <div>
              <p className="font-medium">Order Placed</p>
              <p>{formatDate(order.createdAt)}</p>
            </div>
          </div>
          {order.pickupTime && (
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <div>
                <p className="font-medium">Pickup Time</p>
                <p>{order.pickupTime}</p>
              </div>
            </div>
          )}
          {order.completedTime && (
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <div>
                <p className="font-medium">Completed</p>
                <p>{order.completedTime}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Customer Details
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{order.customerName}</p>
            </div>
            {order.customerPhone && (
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {order.customerPhone}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Location Information */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Locations
          </h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500">Pickup Location</p>
              <p className="font-medium">{order.pickupLocation || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Drop Location</p>
              <p className="font-medium">
                {order.dropLocation || order.deliveryAddress}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Items
        </h4>

        {order.itemsList && order.itemsList.length > 0 ? (
          <div className="space-y-3">
            {order.itemsList.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-bold text-green-600">
                  $
                  {order.itemsList
                    .reduce(
                      (total, item) => total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">{order.items}</p>
        )}
      </div>

      {/* Map Tracker for Active Orders */}
      {isActiveOrder(order.status) && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Live Tracking
          </h4>
          <div className="mb-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Driver Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Delivery Location</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden border">
            <MapTracker
              driverLocation={driverLocation}
              customerLocation={customerLocation}
            />
          </div>
          {/* <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-blue-700 font-medium">Driver Location</p>
              <p className="text-blue-600">
                {driverLocation.lat.toFixed(4)}, {driverLocation.lng.toFixed(4)}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-red-700 font-medium">Destination</p>
              <p className="text-red-600">
                {customerLocation.lat.toFixed(4)},{" "}
                {customerLocation.lng.toFixed(4)}
              </p>
            </div>
          </div> */}
        </div>
      )}

      {/* Additional Info for Completed Orders */}
      {order.status === "Delivered" && (
        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <div className="flex items-center gap-2 text-green-800 mb-2">
            <CheckCircle2 className="w-5 h-5" />
            <h4 className="text-lg font-semibold">
              Order Completed Successfully!
            </h4>
          </div>
          <p className="text-green-700">
            This order was delivered on {order.completedTime}. Thank you for
            using SuperRider!
          </p>
        </div>
      )}
    </div>
  );
}
