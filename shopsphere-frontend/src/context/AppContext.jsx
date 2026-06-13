import { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "../api/axiosConfig";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const refreshCartCount = useCallback(async () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (!token) {
      setCartCount(0);
      return;
    }

    try {
      const res = await api.get("/cart");
      const count =
        res.data.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return (
    <AppContext.Provider value={{ cartCount, refreshCartCount, isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
