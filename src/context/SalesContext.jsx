import React, { createContext, useContext, useState, useEffect } from 'react';

export const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState(() => {
    try {
      const saved = localStorage.getItem('nextdrive_sales');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_sales', JSON.stringify(sales));
  }, [sales]);

  const addSale = (newSale) => {
    setSales((prev) => [newSale, ...prev]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
}

export const useSales = () => useContext(SalesContext);