import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const {
    getCartAmount,
    cartItems,
    clearCart,
    products, // ✅ FIXED (important)
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const deliveryFee = getCartAmount() > 2000 ? 0 : 50;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // 🔥 Razorpay open function
  const initRazorpay = (razorpayOrder, orderData) => {
    if (!razorpayOrder) {
      toast.error("Payment init failed");
      return;
    }

    const options = {
      key: "rzp_test_T5kNPI3IoEqbd2",
      amount: razorpayOrder.amount, // already in paise from backend
      currency: razorpayOrder.currency,
      order_id: razorpayOrder.id,

      name: "My Shop",
      description: "Order Payment",

      handler: async function (response) {
        try {
          const finalOrder = {
            ...orderData,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            paymentStatus: "Paid",
          };

          await axios.post(
            "http://localhost:5000/api/order/place",
            finalOrder
          );

          toast.success("Payment Successful");

          clearCart();
          navigate("/order-success");
        } catch (err) {
          console.log(err);
          toast.error("Order saving failed");
        }
      },

      theme: {
        color: "#f97316",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🔥 Submit Order
  const submitOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        toast.error("Login required");
        return;
      }

      const items = Object.keys(cartItems)
        .filter((id) => cartItems[id] > 0)
        .map((id) => {
          const product = products.find((p) => p._id === id);

          return {
            productId: id,
            name: product?.name,
            image: product?.image,
            price: product?.price,
            quantity: cartItems[id],
          };
        });

      const orderData = {
        userId: user._id,
        items,
        amount: getCartAmount() + deliveryFee,
        address: formData,
      };

      const { data } = await axios.post(
  `${import.meta.env.VITE_BACKEND_URL}/api/payment/create`,
  {
    amount: orderData.amount,
  }
);

      console.log("Razorpay Order:", data);

      // 🔥 Open Razorpay checkout
      initRazorpay(data, orderData);

    } catch (error) {
      console.log(error);
      toast.error("Order Failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Delivery Information
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT FORM */}
        <form className="flex flex-col gap-4">

          <input
            placeholder="First Name"
            className="border p-3 rounded-lg"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />

          <input
            placeholder="Last Name"
            className="border p-3 rounded-lg"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="border p-3 rounded-lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            placeholder="Street"
            className="border p-3 rounded-lg"
            value={formData.street}
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
          />

          <input
            placeholder="City"
            className="border p-3 rounded-lg"
            value={formData.city}
            onChange={(e) =>
              setFormData({ ...formData, city: e.target.value })
            }
          />

          <input
            placeholder="State"
            className="border p-3 rounded-lg"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
          />

          <input
            placeholder="Zip Code"
            className="border p-3 rounded-lg"
            value={formData.zipCode}
            onChange={(e) =>
              setFormData({ ...formData, zipCode: e.target.value })
            }
          />

          <input
            placeholder="Country"
            className="border p-3 rounded-lg"
            value={formData.country}
            onChange={(e) =>
              setFormData({ ...formData, country: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            className="border p-3 rounded-lg"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
        </form>

        {/* RIGHT SUMMARY */}
        <div className="border p-6 rounded-xl h-fit">

          <h2 className="text-2xl font-bold mb-5">
            Cart Totals
          </h2>

          <div className="flex justify-between mb-3">
            <span>Subtotal</span>
            <span>₹{getCartAmount()}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Delivery Fee</span>
            <span>₹{deliveryFee}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-xl">
            <span>Total</span>
            <span>₹{getCartAmount() + deliveryFee}</span>
          </div>

          <button
            onClick={submitOrder}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded-lg"
          >
            Pay Now
          </button>

        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;