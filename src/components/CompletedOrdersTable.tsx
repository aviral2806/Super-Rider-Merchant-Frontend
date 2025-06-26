"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { List } from "lucide-react";

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

interface CompletedOrdersTableProps {
  orders: Order[];
  showViewAllButton?: boolean;
}

const CompletedOrdersTable: React.FC<CompletedOrdersTableProps> = ({
  orders,
  showViewAllButton = false,
}) => {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drop Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.dropLocation || order.deliveryAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.completedTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {orders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No completed orders found</p>
        </div>
      )}

      {/* View All Orders Button */}
      {showViewAllButton && (
        <div className="mt-6 text-center">
          <Link href="/orders">
            <Button variant="outline" className="px-8 py-2">
              <List className="!w-5 !h-5 inline-block" />
              View All Orders
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CompletedOrdersTable;
