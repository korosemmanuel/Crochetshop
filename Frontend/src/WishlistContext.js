// src/context/WishlistContext.js
import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on first render
  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever wishlist updates
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (item) => {
    if (wishlist.some((w) => w.id === item.id)) {
      setWishlist(wishlist.filter((w) => w.id !== item.id));
    } else {
      setWishlist([...wishlist, item]);
    }
  };

  const isInWishlist = (id) => wishlist.some((w) => w.id === id);

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
