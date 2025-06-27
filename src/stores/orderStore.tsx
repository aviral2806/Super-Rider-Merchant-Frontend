import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: string;
  pickupTime?: string;
  completedTime?: string;
  deliveryAddress: string;
  status: string;
  pickupLocation?: string;
  dropLocation?: string;
  customerPhone?: string;
  itemsList?: Item[];
  createdAt: string;
}

interface OrderStore {
  activeOrders: Order[];
  completedOrders: Order[];
  addOrder: (orderData: {
    pickupLocation: string;
    dropLocation: string;
    customerName: string;
    customerPhone: string;
    items: Item[];
  }) => void;
  orderStatusChange: (orderId: string, newStatus: string) => void;
}

const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      activeOrders: [
        {
          id: "ORD-001",
          customerName: "John Doe",
          items: "2x Pizza, 1x Coke",
          pickupTime: "2:30 PM",
          deliveryAddress: "123 Main St",
          dropLocation: "123 Main St",
          status: "In Transit",
          createdAt: "2024-06-26T14:30:00Z",
        },
        {
          id: "ORD-002",
          customerName: "Jane Smith",
          items: "1x Burger Combo",
          pickupTime: "3:15 PM",
          deliveryAddress: "456 Oak Ave",
          dropLocation: "456 Oak Ave",
          status: "Picked Up",
          createdAt: "2024-06-26T15:15:00Z",
        },
        {
          id: "ORD-005",
          customerName: "Emily Carter",
          items: "2x Pasta, 1x Garlic Bread",
          pickupTime: "4:00 PM",
          deliveryAddress: "987 Maple Rd",
          dropLocation: "987 Maple Rd",
          status: "Preparing",
          createdAt: "2024-06-26T16:00:00Z",
        },
        {
          id: "ORD-006",
          customerName: "David Lee",
          items: "3x Sushi Rolls",
          pickupTime: "4:30 PM",
          deliveryAddress: "654 Cedar Blvd",
          dropLocation: "654 Cedar Blvd",
          status: "In Transit",
          createdAt: "2024-06-26T16:30:00Z",
        },
        {
          id: "ORD-007",
          customerName: "Priya Patel",
          items: "1x Veggie Wrap, 2x Juice",
          pickupTime: "5:00 PM",
          deliveryAddress: "321 Willow Ln",
          dropLocation: "321 Willow Ln",
          status: "Picked Up",
          createdAt: "2024-06-26T17:00:00Z",
        },
        {
          id: "ORD-008",
          customerName: "Carlos Gomez",
          items: "2x Tacos, 1x Lemonade",
          pickupTime: "5:20 PM",
          deliveryAddress: "852 Birch St",
          dropLocation: "852 Birch St",
          status: "Preparing",
          createdAt: "2024-06-26T17:20:00Z",
        },
      ],
      completedOrders: [
        {
          id: "ORD-003",
          customerName: "Mike Johnson",
          items: "3x Sandwiches",
          completedTime: "Yesterday 6:45 PM",
          deliveryAddress: "789 Pine St",
          dropLocation: "789 Pine St",
          status: "Delivered",
          createdAt: "2024-06-25T18:00:00Z",
        },
        {
          id: "ORD-004",
          customerName: "Sarah Wilson",
          items: "1x Salad, 2x Drinks",
          completedTime: "Yesterday 5:20 PM",
          deliveryAddress: "321 Elm St",
          dropLocation: "321 Elm St",
          status: "Delivered",
          createdAt: "2024-06-25T16:30:00Z",
        },
        {
          id: "ORD-009",
          customerName: "Olivia Brown",
          items: "2x Burritos, 1x Soda",
          completedTime: "Today 1:10 PM",
          deliveryAddress: "555 Spruce Ave",
          dropLocation: "555 Spruce Ave",
          status: "Delivered",
          createdAt: "2024-06-26T12:50:00Z",
        },
        {
          id: "ORD-010",
          customerName: "Liam Martinez",
          items: "1x Pizza, 2x Garlic Knots",
          completedTime: "Today 12:30 PM",
          deliveryAddress: "222 Aspen Dr",
          dropLocation: "222 Aspen Dr",
          status: "Delivered",
          createdAt: "2024-06-26T11:45:00Z",
        },
        {
          id: "ORD-011",
          customerName: "Sophia Kim",
          items: "2x Noodles, 1x Spring Roll",
          completedTime: "Today 11:45 AM",
          deliveryAddress: "1010 Willow St",
          dropLocation: "1010 Willow St",
          status: "Delivered",
          createdAt: "2024-06-26T11:00:00Z",
        },
        {
          id: "ORD-012",
          customerName: "Noah Singh",
          items: "1x Chicken Wrap, 1x Juice",
          completedTime: "Today 10:20 AM",
          deliveryAddress: "3030 Maple Ave",
          dropLocation: "3030 Maple Ave",
          status: "Delivered",
          createdAt: "2024-06-26T09:45:00Z",
        },
      ],
      addOrder: (orderData) => {
        const { activeOrders } = get();

        // Generate order ID
        const orderCount = activeOrders.length + 1;
        const orderId = `ORD-${String(orderCount + 100).padStart(3, "0")}`;

        // Format items string
        const itemsString = orderData.items
          .map((item) => `${item.quantity}x ${item.name}`)
          .join(", ");

        // Get current time
        const now = new Date();
        const pickupTime = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        const newOrder: Order = {
          id: orderId,
          customerName: orderData.customerName,
          items: itemsString,
          pickupTime: pickupTime,
          deliveryAddress: orderData.dropLocation,
          status: "Preparing",
          pickupLocation: orderData.pickupLocation,
          dropLocation: orderData.dropLocation,
          customerPhone: orderData.customerPhone,
          itemsList: orderData.items,
          createdAt: now.toISOString(), // Add current timestamp
        };

        set((state) => ({
          activeOrders: [newOrder, ...state.activeOrders],
        }));
      },
      orderStatusChange: (orderId, newStatus) => {
        set((state) => ({
          activeOrders: state.activeOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          ),
        }));
      },
    }),
    {
      name: "order-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
