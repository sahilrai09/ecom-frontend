// src/Context/Context.jsx
import React, { createContext, useCallback, useEffect, useState } from "react";
import API from "../axios"; // axios instance

const AppContext = createContext({
  data: [],
  isError: false,
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  refreshData: async () => {},
  updateStockQuantity: () => {},
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // stable refreshData so callers always run the same function reference
  const refreshData = useCallback(async () => {
    try {
      const response = await API.get("/products");
      // debug log so you can see in the browser console what's returned
      console.log("refreshData: /products response:", response?.data);
      setData(Array.isArray(response.data) ? response.data : []);
      setIsError(false);
    } catch (err) {
      console.error("refreshData error:", err);
      setData([]);
      setIsError(true);
    }
  }, []);

  useEffect(() => {
    // initial load
    refreshData();
  }, [refreshData]);

  // persist cart whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to persist cart:", e);
    }
  }, [cart]);

  const addToCart = (product) => {
    if (!product) return;
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        data,
        isError,
        cart,
        addToCart,
        removeFromCart,
        refreshData,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
