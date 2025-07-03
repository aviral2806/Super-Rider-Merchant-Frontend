// Create: src/components/NewOrderForm.tsx
"use client";

import React, { useState } from "react";
import { ListPlus, Plus, Trash2 } from "lucide-react";
import BlurText from "@/components/ui/BlurText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useOrderStore from "@/stores/orderStore";
import toast from "react-hot-toast";
import PlacesAutocomplete from "@/components/PlacesAutocomplete";

interface NewOrderFormProps {
  onAnimationComplete?: () => void;
}

export default function NewOrderForm({
  onAnimationComplete,
}: NewOrderFormProps) {
  const { addOrder } = useOrderStore();

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

  return (
    <div className="lg:w-3/5 w-full px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-xl">
      <div className="flex flex-col size-full justify-between items-center py-4">
        <div className="w-full">
          <BlurText
            text="Welcome to SuperRider! Add a new order below"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={onAnimationComplete}
            className="text-2xl text-black font-bold mb-8"
            stepDuration={0.15}
          />
        </div>
        <div className="w-full space-y-4">
          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">Pickup Location</Label>
              <PlacesAutocomplete
                id="pickup"
                value={orderForm.pickupLocation}
                onChange={(value) =>
                  handleOrderFormChange("pickupLocation", value)
                }
                placeholder="Enter pickup location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="drop">Drop Location</Label>
              <PlacesAutocomplete
                id="drop"
                value={orderForm.dropLocation}
                onChange={(value) =>
                  handleOrderFormChange("dropLocation", value)
                }
                placeholder="Enter drop location"
              />
            </div>
          </div>

          {/* Customer Details */}
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

          {/* Items Section */}
          <div className="space-y-3">
            <div className="flex w-full justify-between">
              <Label>Items</Label>
              <Label>Total: Rs {orderTotal().toFixed(2)}</Label>
            </div>
            {orderForm.items.map((item, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1 space-y-2">
                  <Label className="text-xs text-gray-600">Item Name</Label>
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
                      handleItemChange(index, "price", Number(e.target.value))
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

          {/* Submit Button */}
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
  );
}
