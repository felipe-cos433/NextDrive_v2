import React, { createContext, useState, useEffect } from 'react';

export const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('nextdrive_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointmentData) => {
    const newApp = { id: Date.now(), ...appointmentData, status: 'Pendiente' };
    setAppointments(prev => [newApp, ...prev]);
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, deleteAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}