"use client";

import React from "react";
import { IoNavigateOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import useOrderStore from "@/stores/orderStore";

interface Order {
  id: string;
  customerName: string;
  items: string;
  pickupTime?: string;
  completedTime?: string;
  deliveryAddress: string;
  status: string;
}

interface ActiveOrderCardProps {
  order: Order;
}

const ActiveOrderCard: React.FC<ActiveOrderCardProps> = ({ order }) => {
  const { orderStatusChange } = useOrderStore();
  const handleStatusChange = (newStatus: string) => {
    if (newStatus === "Waiting for Pickup" && order.status === "Preparing") {
      orderStatusChange(order.id, newStatus);
      toast.success(`Order ${order.id} is ready for pickup!`, {
        duration: 4000,
        icon: "🍽️",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Preparing":
        return "bg-yellow-100 text-yellow-800";
      case "Waiting for Pickup":
        return "bg-blue-100 text-blue-800";
      case "Picked Up":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-orange-500">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900">{order.id}</h3>
        {order.status === "Preparing" ? (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={order.status}
          >
            <SelectTrigger
              className={`w-auto h-auto px-2 py-[-4px] text-xs rounded-full border-none ${getStatusColor(
                order.status
              )} hover:opacity-80 transition-opacity`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Preparing">Preparing</SelectItem>
              <SelectItem value="Waiting for Pickup">
                Ready for Pickup
              </SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <span
            className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
              order.status
            )}`}
          >
            {order.status}
          </span>
        )}
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">Customer:</span> {order.customerName}
        </p>
        <p>
          <span className="font-medium">Items:</span> {order.items}
        </p>
        <p>
          <span className="font-medium">Picked up:</span> {order.pickupTime}
        </p>
        <p>
          <span className="font-medium">Address:</span> {order.deliveryAddress}
        </p>
      </div>
      <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center border-2 rounded-md px-2 py-1">
        Track Order
        <IoNavigateOutline className="w-4 h-4 inline-block ml-1" />
      </button>
    </div>
  );
};

export default ActiveOrderCard;
