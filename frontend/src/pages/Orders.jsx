import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Orders() {
  const [orders, setOrders] = useState([]);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        toast.error("User not logged in");
        return;
      }

      const res = await axios.get(
        `${BACKEND_URL}/api/order/user/${user._id}`
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

  // ...rest of your component remains exactly the same
}

export default Orders;