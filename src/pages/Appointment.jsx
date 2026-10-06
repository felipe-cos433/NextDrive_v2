import React, { useState, useContext } from 'react';
import { carsData } from '../data/carsData';
import { AppointmentContext } from '../context/AppointmentContext';
import { AuthContext } from '../context/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Toast from '../components/Toast';

export default function Appointment() {
  const { addAppointment } = useContext(AppointmentContext);
  const { user } = useContext(AuthContext);

  const [selectedCar, setSelectedCar] = useState(carsData[0]?.brand + ' ' + carsData[0]?.model || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) {
      setToast({ text: 'Por favor completa todos los campos de fecha y hora.', type: 'error' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      addAppointment({
        carName: selectedCar,
        clientName: user?.name || 'Cliente NextDrive',
        date,
        time
      });
      setLoading(false);
      setToast({ text: '¡Cita agendada con éxito! Te esperamos en nuestro concesionario.', type: 'success' });
      setDate('');
      setTime('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-['Montserrat'] animate-fade-in">
      <div className="max-w-3xl mx-auto bg-zinc-950 border border-zinc-900 p-8 rounded-3xl shadow-2xl">
        
        <div className="mb-8 border-b border-zinc-900 pb-6">
          <h1 className="text-3xl font-black text-amber-400 tracking-wider">AGENDAR TEST DRIVE</h1>
          <p className="text-gray-400 text-sm mt-2">Experimenta la potencia y el lujo de nuestros vehículos en persona.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Selector de Vehículo */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold tracking-wider text-gray-300 uppercase">Selecciona el Vehículo</label>
            <select 
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
            >
              {carsData.map((car) => (
                <option key={car.id} value={`${car.brand} ${car.model}`} className="bg-zinc-900 text-white">
                  {car.brand} {car.model} ({car.year}) - {car.price}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              label="Fecha de la Cita"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <Input 
              label="Hora Preferida"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          <div className="pt-4">
            <Button type="submit" isLoading={loading} className="w-full py-4 text-base">
              Confirmar Reserva de Test Drive
            </Button>
          </div>
        </form>

      </div>

      {toast && (
        <Toast message={toast.text} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}