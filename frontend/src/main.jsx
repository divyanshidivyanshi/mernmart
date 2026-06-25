import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import ShopContextProvider from "./context/ShopContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ShopContextProvider>
      <Toaster />
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);