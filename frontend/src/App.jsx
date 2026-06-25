import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";

import Navbar from "./components/Navbar";
import LoginPopup from "./components/LoginPopup";
import PlaceOrder from "./pages/PlaceOrder";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";
import AdminProduct from "./pages/AdminProduct";
import Admin from "./pages/Admin";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>

      {showLogin && (
        <LoginPopup setShowLogin={setShowLogin} />
      )}

      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/products" element={<AdminProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;