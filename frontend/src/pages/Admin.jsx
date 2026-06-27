import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Admin() {
  const [orders, setOrders] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/admin/orders`
      );

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/admin/order-status`,
        {
          orderId,
          status,
        }
      );

      if (res.data.success) {
        toast.success("Status Updated");
        fetchOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="flex flex-wrap gap-3 mb-6">
        <Link
          to="/admin/orders"
          className="px-4 py-2 bg-gray-100 rounded"
        >
          Orders Panel
        </Link>

        <Link
          to="/admin/products"
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Products Panel
        </Link>
      </div>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border p-5 rounded mb-4"
          >
            <p>
              <b>Order ID:</b> {order._id}
            </p>

            <p>
              <b>User:</b>{" "}
              {order.userId?.name ||
                order.userId?.email ||
                order.userId}
            </p>

            <p>
              <b>Amount:</b> ₹{order.amount}
            </p>

            <p className="mt-2">
              <b>Status:</b> {order.status}
            </p>

            <div className="mt-3">
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
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;