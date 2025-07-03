"use client";

import React from "react";
import { Navbar1 } from "@/components/navbar1";
import OrdersDashboard from "@/components/OrdersDashboard";
import NewOrderForm from "@/components/NewOrderForm";
import StatsSection from "@/components/StatsSection";
import useOrderStore from "@/stores/orderStore";

export default function Home() {
  const { activeOrders, completedOrders } = useOrderStore();

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar1 />

      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Section: New Order Form + Stats */}
        <section className="mb-12 max-w-8xl lg:flex-row  flex-col flex gap-4">
          <NewOrderForm onAnimationComplete={handleAnimationComplete} />
          <StatsSection />
        </section>

        {/* Bottom Section: Orders Dashboard */}
        <OrdersDashboard
          activeOrders={activeOrders}
          completedOrders={completedOrders}
        />
      </main>
    </div>
  );
}
