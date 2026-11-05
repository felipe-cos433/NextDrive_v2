import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('nextdrive_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (car) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === car.id);
      if (exists) return prev;
      return [...prev, car];
    });
  };

  const removeFromCart = (carId) => {
    setCart((prev) => prev.filter((item) => item.id !== carId));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);