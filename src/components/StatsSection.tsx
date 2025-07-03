// Create: src/components/StatsSection.tsx
"use client";

import React from "react";
import { Handshake, Clock, TrendingUp, XCircle } from "lucide-react";
import useOrderStore from "@/stores/orderStore";

export default function StatsSection() {
  const { activeOrders, completedOrders } = useOrderStore();

  // Define styling variables
  const cardContainerClass =
    "flex items-start gap-4 justify-between rounded-xl p-3 px-6 pr-3 shadow-2xl";
  const cardContentClass =
    "flex flex-col items-start justify-between h-full w-3/5";
  const cardTitleClass = "text-sm mt-1 text-left text-white font-normal";
  const cardValueClass = "text-6xl font-bold text-white text-left";
  const cardIconContainerClass = "rounded-[50%] p-1";

  // Calculate stats
  const totalOrders = activeOrders.length + completedOrders.length;
  const slaPercentage = 92; // Mock percentage
  const avgDeliveryTime = 32; // Mock average in minutes
  const cancelledOrders = 0; // Mock cancelled orders

  return (
    <div className="lg:max-w-2/5 w-full bg-white shadow-lg rounded-xl h-full mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Total Orders */}
      <div className={`${cardContainerClass} bg-blue-700`}>
        <div className={cardContentClass}>
          <span className={cardTitleClass}>Total Orders</span>
          <span className={cardValueClass}>{totalOrders}</span>
        </div>
        <div className={`${cardIconContainerClass} bg-blue-500`}>
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Orders completed within SLA */}
      <div className={`${cardContainerClass} bg-green-700`}>
        <div className={cardContentClass}>
          <span className={cardTitleClass}>Orders completed Within SLA</span>
          <span className={cardValueClass}>{slaPercentage}%</span>
        </div>
        <div className={`${cardIconContainerClass} bg-green-600`}>
          <Handshake className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Average Delivery Time */}
      <div className={`${cardContainerClass} bg-yellow-600`}>
        <div className={`${cardContentClass} gap-3`}>
          <span className={cardTitleClass}>Avg. Delivery Time (min)</span>
          <span className={cardValueClass}>{avgDeliveryTime}</span>
        </div>
        <div className={`${cardIconContainerClass} bg-yellow-500`}>
          <Clock className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Cancelled Orders */}
      <div className={`${cardContainerClass} bg-red-600`}>
        <div className={cardContentClass}>
          <span className={cardTitleClass}>Cancelled Orders</span>
          <span className={cardValueClass}>{cancelledOrders}</span>
        </div>
        <div className={`${cardIconContainerClass} bg-red-400`}>
          <XCircle className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
