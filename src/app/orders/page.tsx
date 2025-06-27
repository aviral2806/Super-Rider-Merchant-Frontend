"use client";

import React, { useState, useMemo } from "react";
import { Navbar1 } from "@/components/navbar1";
import ActiveOrderCard from "@/components/ActiveOrderCard";
import CompletedOrdersTable from "@/components/CompletedOrdersTable";
import useOrderStore from "@/stores/orderStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

const OrdersPage = () => {
  const { activeOrders, completedOrders } = useOrderStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");

  // Combine all orders for filtering
  const allOrders = useMemo(() => {
    return [...activeOrders, ...completedOrders];
  }, [activeOrders, completedOrders]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = allOrders;

    // Filter by status
    if (filterStatus === "active") {
      filtered = activeOrders;
    } else if (filterStatus === "completed") {
      filtered = completedOrders;
    }

    // Search by items or drop location
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (order) =>
          order.items.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (order.dropLocation &&
            order.dropLocation
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          order.deliveryAddress
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by creation time (createdAt)
    filtered.sort((a, b) => {
      const timeA = new Date(a.createdAt ?? 0).getTime();
      const timeB = new Date(b.createdAt ?? 0).getTime();

      if (sortOrder === "asc") {
        return timeA - timeB; // Oldest first
      } else {
        return timeB - timeA; // Newest first
      }
    });

    return filtered;
  }, [
    allOrders,
    activeOrders,
    completedOrders,
    filterStatus,
    searchQuery,
    sortOrder,
  ]);

  // Separate filtered orders back into active and completed
  const filteredActiveOrders = filteredAndSortedOrders.filter((order) =>
    ["Preparing", "Waiting for Pickup", "Picked Up", "In Transit"].includes(
      order.status
    )
  );

  const filteredCompletedOrders = filteredAndSortedOrders.filter(
    (order) => order.status === "Delivered"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar1 />
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">All Orders</h1>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between w-full gap-4">
              {/* Search */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by items, drop location, customer name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-4">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Orders</SelectItem>
                    <SelectItem value="active">Active Orders</SelectItem>
                    <SelectItem value="completed">Completed Orders</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort by Time */}
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger>
                    {sortOrder === "desc" ? (
                      <SortDesc className="h-4 w-4 mr-2" />
                    ) : (
                      <SortAsc className="h-4 w-4 mr-2" />
                    )}
                    <SelectValue placeholder="Sort by time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">
                      Newest First (by order time)
                    </SelectItem>
                    <SelectItem value="asc">
                      Oldest First (by order time)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAndSortedOrders.length} orders
              {searchQuery && ` matching "${searchQuery}"`}
              {filterStatus !== "all" && ` (${filterStatus})`}
              {sortOrder === "desc" ? " - newest first" : " - oldest first"}
            </div>
          </div>
        </div>

        {/* Active Orders Section */}
        {(filterStatus === "all" || filterStatus === "active") &&
          filteredActiveOrders.length > 0 && (
            <section className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Active Orders ({filteredActiveOrders.length})
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredActiveOrders.map((order) => (
                  <ActiveOrderCard key={order.id} order={order} />
                ))}
              </div>
            </section>
          )}

        {/* Completed Orders Section */}
        {(filterStatus === "all" || filterStatus === "completed") &&
          filteredCompletedOrders.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Completed Orders ({filteredCompletedOrders.length})
              </h2>
              <CompletedOrdersTable
                orders={filteredCompletedOrders}
                showViewAllButton={false}
              />
            </section>
          )}

        {/* No Results */}
        {filteredAndSortedOrders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">No orders found</p>
            {searchQuery && (
              <p className="text-gray-400 text-sm mt-2">
                Try adjusting your search terms or filters
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
