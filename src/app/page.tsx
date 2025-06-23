"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Handshake, Clock, TrendingUp, XCircle } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import { ListPlus } from "lucide-react";
import { LuListChecks } from "react-icons/lu";
import { IoNavigateOutline } from "react-icons/io5";
import OrdersDashboard from "@/components/OrdersDashboard";
import AddOrderModal from "@/components/AddOrderModal"; // Import the modal component

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Mock data for demonstration
  const activeOrders = [
    {
      id: "ORD-001",
      customerName: "John Doe",
      items: "2x Pizza, 1x Coke",
      pickupTime: "2:30 PM",
      deliveryAddress: "123 Main St",
      status: "In Transit",
    },
    {
      id: "ORD-002",
      customerName: "Jane Smith",
      items: "1x Burger Combo",
      pickupTime: "3:15 PM",
      deliveryAddress: "456 Oak Ave",
      status: "Picked Up",
    },
  ];

  const completedOrders = [
    {
      id: "ORD-003",
      customerName: "Mike Johnson",
      items: "3x Sandwiches",
      completedTime: "Yesterday 6:45 PM",
      deliveryAddress: "789 Pine St",
      status: "Delivered",
    },
    {
      id: "ORD-004",
      customerName: "Sarah Wilson",
      items: "1x Salad, 2x Drinks",
      completedTime: "Yesterday 5:20 PM",
      deliveryAddress: "321 Elm St",
      status: "Delivered",
    },
  ];
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Merchant Dashboard
            </h1>
            <div className="flex space-x-4">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                // Open modal on click
              >
                + Add New Order
              </button>
              <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                View Past Orders
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <section className="mb-12 max-w-7xl flex gap-4">
          <div className="w-1/2 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col size-full justify-between items-center py-10">
              <div className="">
                <BlurText
                  text="Welcome to Super Rider"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-4xl text-black font-bold mb-8"
                  stepDuration={0.3}
                />
              </div>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  onClick={handleOpenModal}
                >
                  <ListPlus className="w-6 h-6 inline-block mr-2" />
                  Add New Order
                </button>
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center">
                  <LuListChecks className="w-6 h-6 inline-block mr-2" />
                  View Past Orders
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-1/2 w-full bg-white shadow-lg rounded-xl h-full mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Orders in the past week */}
            <div className="flex items-start gap-4 justify-center bg-blue-50 rounded-lg p-4 shadow">
              <div className="">
                <TrendingUp className="w-14 h-14 text-blue-700 mb-2" />
              </div>
              <div className="flex flex-col items-start justify-center w-3/5">
                <span className="text-5xl italic font-bold text-blue-700 text-left">
                  128
                </span>
                <span className="text-sm mt-1 text-left text-blue-700 font-semibold">
                  Orders in Past Week
                </span>
              </div>
            </div>
            {/* % Orders completed within SLA */}
            <div className="flex items-start gap-4 justify-center bg-green-50 rounded-lg p-4 shadow">
              <div className="">
                <Handshake className="w-14 h-14 text-green-700 mb-2" />
              </div>
              <div className="flex flex-col items-start justify-center w-3/5">
                <span className="text-5xl italic font-bold text-green-700 text-left">
                  92%
                </span>
                <span className="text-sm mt-1 text-left text-green-700 font-semibold">
                  Orders completed Within SLA
                </span>
              </div>
            </div>
            {/* Average Delivery Time */}
            <div className="flex items-start gap-4 justify-center bg-yellow-50 rounded-lg p-4 shadow">
              <div className="">
                <Clock className="w-14 h-14 text-yellow-700 mb-2" />
              </div>
              <div className="flex flex-col items-start justify-center w-3/5">
                <span className="text-5xl italic font-bold text-yellow-700 text-left">
                  32
                </span>
                <span className="text-sm mt-1 text-left text-yellow-700 font-semibold">
                  Avg. Delivery Time (min)
                </span>
              </div>
            </div>
            {/* Cancelled Orders */}
            <div className="flex items-start gap-4 justify-center bg-red-50 rounded-lg p-4 shadow">
              <div className="">
                <XCircle className="w-14 h-14 text-red-700 mb-2" />
              </div>
              <div className="flex flex-col items-start justify-center w-3/5">
                <span className="text-5xl italic font-bold text-red-700 text-left">
                  5
                </span>
                <span className="text-sm mt-1 text-left text-red-700 font-semibold">
                  Cancelled Orders in the past month
                </span>
              </div>
            </div>
          </div>
        </section>
        <OrdersDashboard
          activeOrders={activeOrders}
          completedOrders={completedOrders}
        />

        {/* Add Order Modal */}
        {isModalOpen && (
          <AddOrderModal isOpen={isModalOpen} onClose={handleCloseModal} />
        )}
      </main>
    </div>
  );
}
