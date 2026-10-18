import React, { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('nextdrive_appointments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_appointments', JSON.stringify(appointments));
  }, [appointments]);

  const addAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      dateCreated: new Date().toLocaleDateString('es-CO'),
      status: 'Pendiente',
      ...appointmentData,
    };
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const deleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, deleteAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export const useAppointments = () => useContext(AppointmentContext);