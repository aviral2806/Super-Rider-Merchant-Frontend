import React, { useState } from "react";
import Modal from "./Modal";

const AddOrderModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [orderDetails, setOrderDetails] = useState({
    pickupLocation: "",
    dropLocation: "",
    customerName: "",
    customerPhone: "",
    slaType: "Quick Delivery",
  });

  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const handleItemChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleOrderChange = (field: string, value: string) => {
    setOrderDetails({ ...orderDetails, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Order Submitted:", { ...orderDetails, items });
    onClose(); // Close modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl text-black font-bold mb-4">Add New Order</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pickup Location
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={orderDetails.pickupLocation}
            onChange={(e) =>
              handleOrderChange("pickupLocation", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Drop Location
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={orderDetails.dropLocation}
            onChange={(e) => handleOrderChange("dropLocation", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={orderDetails.customerName}
            onChange={(e) => handleOrderChange("customerName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Phone
          </label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={orderDetails.customerPhone}
            onChange={(e) => handleOrderChange("customerPhone", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            SLA Type
          </label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            value={orderDetails.slaType}
            onChange={(e) => handleOrderChange("slaType", e.target.value)}
          >
            <option>Quick Delivery</option>
            <option>Slow Delivery</option>
          </select>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Items</h3>
          {items.map((item, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Item Name"
                className="flex-1 border-gray-300 rounded-md shadow-sm"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                className="w-20 border-gray-300 rounded-md shadow-sm"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="w-20 border-gray-300 rounded-md shadow-sm"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(index, "price", Number(e.target.value))
                }
              />
            </div>
          ))}
          <button
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={handleAddItem}
          >
            + Add Item
          </button>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default AddOrderModal;
