import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  // 🔥 FETCH ALL ORDERS
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/order/all"
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 UPDATE STATUS
  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/order/status",
        {
          orderId,
          status,
        }
      );

      if (res.data.success) {
        toast.success("Status Updated");

        // refresh list
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin Orders Panel
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-5 rounded-xl"
            >
              {/* ORDER INFO */}
              <div className="flex justify-between mb-2">
                <span className="font-semibold">
                  Order ID:
                </span>
                <span className="text-sm">
                  {order._id}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Total:</span>
                <span>₹{order.amount}</span>
              </div>

              {/* STATUS DROPDOWN */}
              <div className="flex justify-between items-center mb-4">
                <span>Status:</span>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border p-2 rounded"
                >
                  <option>Order Placed</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
              </div>

              {/* ITEMS */}
              <div className="mt-3">
                <h3 className="font-semibold mb-2">
                  Items:
                </h3>

                {(order.items || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b py-2"
                  >
                    <img
                      src={item.image}
                      className="w-12 h-12 object-cover rounded"
                    />

                    <div className="flex-1">
                      <p className="font-medium">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;