"use client";

import { IoNavigateOutline } from "react-icons/io5";

interface OrderDashboardProps {
  activeOrders: Array<{
    id: string;
    status: string;
    customerName: string;
    items: string;
    pickupTime: string;
    deliveryAddress: string;
  }>;
  completedOrders: Array<{
    id: string;
    status: string;
    customerName: string;
    items: string;
    completedTime: string;
  }>;
}

export default function OrdersDashboard({
  activeOrders,
  completedOrders,
}: OrderDashboardProps) {
  return (
    <>
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Active Orders
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-orange-500"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{order.id}</h3>
                <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Customer:</span>{" "}
                  {order.customerName}
                </p>
                <p>
                  <span className="font-medium">Items:</span> {order.items}
                </p>
                <p>
                  <span className="font-medium">Picked up:</span>{" "}
                  {order.pickupTime}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {order.deliveryAddress}
                </p>
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center border-2 rounded-md px-2 py-1">
                Track Order
                <IoNavigateOutline className="w-4 h-4 inline-block ml-1" />
              </button>
            </div>
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
                    Completed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {completedOrders.map((order) => (
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
        {completedOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500">No completed orders found</p>
          </div>
        )}
      </section>
    </>
  );
}
