import { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Cart() {
  const {
    products,
    cartItems,
    removeFromCart,
    updateQuantity,
  } = useContext(ShopContext);

  // ✅ safer + reactive cart list
  const cartProducts = useMemo(() => {
    return products
      .filter((product) => cartItems?.[product._id] > 0)
      .map((product) => ({
        ...product,
        quantity: cartItems[product._id],
      }));
  }, [products, cartItems]);

  const totalAmount = useMemo(() => {
    return cartProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartProducts]);

  const handleDecrease = (id, qty) => {
    if (qty <= 1) {
      removeFromCart(id);
      toast.success("Item Removed");
    } else {
      updateQuantity(id, qty - 1);
    }
  };

  const handleIncrease = (id, qty) => {
    updateQuantity(id, qty + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cartProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">

            {cartProducts.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center gap-6 border p-4 rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-orange-500 font-bold">
                    ₹{item.price}
                  </p>
                </div>

                {/* Quantity Buttons */}
                <div className="flex items-center gap-3">

                  <button
                    onClick={() =>
                      handleDecrease(item._id, item.quantity)
                    }
                    className="bg-gray-200 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span className="font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrease(item._id, item.quantity)
                    }
                    className="bg-orange-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() => {
                    removeFromCart(item._id);
                    toast.success("Item Removed");
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

          <div className="mt-10 border-t pt-6">

            <h2 className="text-2xl font-bold">
              Total: ₹{totalAmount}
            </h2>

            <Link
              to="/place-order"
              className="inline-block mt-4 bg-orange-500 text-white px-6 py-3 rounded-lg"
            >
              Checkout
            </Link>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;