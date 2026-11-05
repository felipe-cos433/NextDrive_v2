import React, { createContext, useContext, useState, useEffect } from 'react';

const FinancingContext = createContext();

const INITIAL_REQUESTS = [
  {
    id: 101,
    clientName: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '+57 300 123 4567',
    carName: '911 GT3 RS',
    carPrice: 1250000000,
    downPayment: 300000000,
    months: 48,
    status: 'En Estudio'
  }
];

export function FinancingProvider({ children }) {
  const [financingRequests, setFinancingRequests] = useState(() => {
    const saved = localStorage.getItem('nextdrive_financing');
    return saved ? JSON.parse(saved) : INITIAL_REQUESTS;
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_financing', JSON.stringify(financingRequests));
  }, [financingRequests]);

  const addFinancingRequest = (request) => {
    const newReq = { ...request, id: Date.now(), status: 'En Estudio' };
    setFinancingRequests((prev) => [newReq, ...prev]);
  };

  const updateFinancingStatus = (id, status) => {
    setFinancingRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status } : req))
    );
  };

  return (
    <FinancingContext.Provider value={{ financingRequests, addFinancingRequest, updateFinancingStatus }}>
      {children}
    </FinancingContext.Provider>
  );
}

export const useFinancing = () => useContext(FinancingContext);