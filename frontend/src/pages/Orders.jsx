import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        toast.error("User not logged in");
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/order/user/${user._id}`
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border p-5 rounded-xl shadow-sm"
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
                <span className="font-semibold">
                  ₹{order.amount}
                </span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Status:</span>
                <span className="text-green-600 font-medium">
                  <span
  className={
    order.status === "Delivered"
      ? "text-green-600"
      : order.status === "Shipped"
      ? "text-blue-600"
      : order.status === "Processing"
      ? "text-yellow-600"
      : "text-gray-600"
  }
>
  {order.status}
</span>
                </span>
              </div>

              {/* ITEMS */}
              <div className="mt-4">
                <h3 className="font-semibold mb-3">
                  Items:
                </h3>

                {(order.items || []).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b py-2"
                  >
                    {/* IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />

                    {/* NAME + QTY */}
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    {/* PRICE */}
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

export default Orders;