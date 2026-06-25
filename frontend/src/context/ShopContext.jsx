import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const updateQuantity = (itemId, quantity) => {
  if (quantity <= 0) {
    removeFromCart(itemId);
    return;
  }

  setCartItems((prev) => ({
    ...prev,
    [itemId]: quantity,
  }));
};

  const removeFromCart = (itemId) => {
    const copy = { ...cartItems };
    delete copy[itemId];
    setCartItems(copy);
  };
  const clearCart = () => {
  setCartItems({});
};

  const getCartCount = () => {
    let total = 0;

    for (const item in cartItems) {
      total += cartItems[item];
    }

    return total;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = products.find(
          (product) => product._id === itemId
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    getCartCount,
    getCartAmount,
    clearCart,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;