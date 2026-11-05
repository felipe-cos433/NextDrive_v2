import React, { createContext, useContext, useState, useEffect } from 'react';

const SalesContext = createContext();

export function SalesProvider({ children }) {
  const [sales, setSales] = useState(() => {
    const saved = localStorage.getItem('nextdrive_sales');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_sales', JSON.stringify(sales));
  }, [sales]);

  const addSale = (saleData) => {
    const newSale = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      ...saleData
    };
    setSales((prev) => [newSale, ...prev]);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
}

export const useSales = () => useContext(SalesContext);