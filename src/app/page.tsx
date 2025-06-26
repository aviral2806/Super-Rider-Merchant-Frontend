"use client";
import React, { useState } from "react";
import { Handshake, Clock, TrendingUp, XCircle } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import { ListPlus } from "lucide-react";
import OrdersDashboard from "@/components/OrdersDashboard";
import { Navbar1 } from "@/components/navbar1";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import useOrderStore from "@/stores/orderStore";
import toast from "react-hot-toast";

export default function Home() {
  // Get data and methods from Zustand store
  const { activeOrders, completedOrders, addOrder } = useOrderStore();

  // State for order form
  const [orderForm, setOrderForm] = useState({
    pickupLocation: "Om Sweets, Sector 56, Gurgaon",
    dropLocation: "",
    customerName: "",
    customerPhone: "",
    items: [{ name: "", quantity: 1, price: 0 }],
  });
  // Handle order form changes
  const handleOrderFormChange = (field: string, value: string) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }));
  };

  // Handle item changes
  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = [...orderForm.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setOrderForm((prev) => ({ ...prev, items: updatedItems }));
  };

  // Add new item
  const addItem = () => {
    setOrderForm((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  // Remove item
  const removeItem = (index: number) => {
    if (orderForm.items.length > 1) {
      const updatedItems = orderForm.items.filter((_, i) => i !== index);
      setOrderForm((prev) => ({ ...prev, items: updatedItems }));
    }
  };

  const orderTotal = (): number => {
    return orderForm.items.reduce(
      (acc, i) => acc + Number(i.price) * Number(i.quantity),
      0
    );
  };

  // Submit order
  const handleSubmitOrder = () => {
    // Validate form
    if (!orderForm.pickupLocation) {
      toast.error("Please enter pickup location", {
        duration: 3000,
        icon: "📍",
      });
      return;
    }

    if (!orderForm.dropLocation) {
      toast.error("Please enter drop location", {
        duration: 3000,
        icon: "📍",
      });
      return;
    }

    if (!orderForm.customerName) {
      toast.error("Please enter customer name", {
        duration: 3000,
        icon: "👤",
      });
      return;
    }

    if (!orderForm.customerPhone) {
      toast.error("Please enter customer phone number", {
        duration: 3000,
        icon: "📞",
      });
      return;
    }

    if (orderForm.items.some((item) => !item.name || item.quantity <= 0)) {
      toast.error("Please fill in all item details correctly", {
        duration: 3000,
        icon: "📝",
      });
      return;
    }

    // Add order to store
    addOrder({
      pickupLocation: orderForm.pickupLocation,
      dropLocation: orderForm.dropLocation,
      customerName: orderForm.customerName,
      customerPhone: orderForm.customerPhone,
      items: orderForm.items,
    });

    console.log("Order submitted:", orderForm);

    // Show success toast
    toast.success(
      `Order added successfully! Total: $${orderTotal().toFixed(2)}`,
      {
        duration: 4000,
        icon: "✅",
      }
    );

    // Reset form after submission
    setOrderForm({
      pickupLocation: "Om Sweets, Sector 56, Gurgaon",
      dropLocation: "",
      customerName: "",
      customerPhone: "",
      items: [{ name: "", quantity: 1, price: 0 }],
    });
  };

  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar1 />
      {/* Main Content */}
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Section */}
        <section className="mb-12 max-w-8xl flex gap-4">
          <div className="w-3/5 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col size-full justify-between items-center py-4">
              <div className="w-full">
                <BlurText
                  text="Welcome to SuperRider! Add a new order below"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-2xl text-black font-bold mb-8"
                  stepDuration={0.15}
                />
              </div>
              <div className="w-full space-y-4">
                {/* Add new order functionality here */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <Input
                      id="pickup"
                      placeholder="Enter pickup location"
                      value={orderForm.pickupLocation}
                      onChange={(e) =>
                        handleOrderFormChange("pickupLocation", e.target.value)
                      }
                      required={true}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="drop">Drop Location</Label>
                    <Input
                      id="drop"
                      placeholder="Enter drop location"
                      value={orderForm.dropLocation}
                      onChange={(e) =>
                        handleOrderFormChange("dropLocation", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      placeholder="Enter customer name"
                      value={orderForm.customerName}
                      onChange={(e) =>
                        handleOrderFormChange("customerName", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customerPhone">Customer Phone</Label>
                    <Input
                      id="customerPhone"
                      placeholder="Enter customer phone"
                      value={orderForm.customerPhone}
                      onChange={(e) =>
                        handleOrderFormChange("customerPhone", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex w-full justify-between">
                    <Label>Items</Label>
                    <Label>Total: ${orderTotal().toFixed(2)}</Label>
                  </div>
                  {orderForm.items.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-2">
                        <Label className="text-xs text-gray-600">
                          Item Name
                        </Label>
                        <Input
                          placeholder="Item name"
                          value={item.name}
                          onChange={(e) =>
                            handleItemChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div className="w-20 space-y-2">
                        <Label className="text-xs text-gray-600">Qty</Label>
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "quantity",
                              Number(e.target.value)
                            )
                          }
                          min="1"
                        />
                      </div>
                      <div className="w-24 space-y-2">
                        <Label className="text-xs text-gray-600">Price</Label>
                        <Input
                          type="number"
                          placeholder="Price"
                          value={item.price}
                          onChange={(e) =>
                            handleItemChange(
                              index,
                              "price",
                              Number(e.target.value)
                            )
                          }
                          min="0"
                          step="0.01"
                        />
                      </div>
                      {orderForm.items.length > 1 && (
                        <div className="">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ListPlus className="!w-5 !h-5 inline-block" />
                  Submit Order
                </Button>
              </div>
            </div>
          </div>
          <div className="max-w-2/5 w-full bg-white shadow-lg rounded-xl h-full mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Orders in the past week */}
            <div className="flex items-start gap-4 justify-center bg-blue-50 rounded-lg p-4 shadow">
              <div className="">
                <TrendingUp className="w-14 h-14 text-blue-700 mb-2" />
              </div>
              <div className="flex flex-col items-start justify-center w-3/5">
                <span className="text-5xl italic font-bold text-blue-700 text-left">
                  {activeOrders.length + completedOrders.length}
                </span>
                <span className="text-sm mt-1 text-left text-blue-700 font-semibold">
                  Total Orders
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
            {/* Active Orders */}
            <div className="flex items-start gap-4 justify-center bg-red-50 rounded-lg p-4 shadow">
              <div className="">
                <XCircle className="w-14 h-14 text-red-700 mb-2" />
              </div>
              <div className="flex flex-col items-start justify-center w-3/5">
                <span className="text-5xl italic font-bold text-red-700 text-left">
                  {activeOrders.length}
                </span>
                <span className="text-sm mt-1 text-left text-red-700 font-semibold">
                  Active Orders
                </span>
              </div>
            </div>
          </div>
        </section>
        <OrdersDashboard
          activeOrders={activeOrders}
          completedOrders={completedOrders}
        />
      </main>
    </div>
  );
}
