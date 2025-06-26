"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { List } from "lucide-react";
import ActiveOrderCard from "./ActiveOrderCard";
import CompletedOrdersTable from "./CompletedOrdersTable";

interface Order {
  id: string;
  customerName: string;
  items: string;
  pickupTime?: string;
  completedTime?: string;
  deliveryAddress: string;
  status: string;
  dropLocation?: string;
}

interface OrdersDashboardProps {
  activeOrders: Order[];
  completedOrders: Order[];
}

const OrdersDashboard: React.FC<OrdersDashboardProps> = ({
  activeOrders,
  completedOrders,
}) => {
  return (
    <div>
      {/* Active Orders Section */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Active Orders
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeOrders.map((order) => (
            <ActiveOrderCard key={order.id} order={order} />
          ))}
        </div>
        {activeOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No active orders at the moment</p>
          </div>
        )}
      </section>

      {/* Completed Orders Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Recent Completed Orders
        </h2>
        <CompletedOrdersTable
          orders={completedOrders.slice(0, 10)}
          showViewAllButton={true}
        />
      </section>
    </div>
  );
};

export default OrdersDashboard;
