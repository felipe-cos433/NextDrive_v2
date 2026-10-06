import { useState, useContext } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import { AuthContext } from '../context/AuthContext';

export default function TestDriveModal({ car, isOpen, onClose }) {
  const { addAppointment } = useContext(AppointmentContext);
  const { user } = useContext(AuthContext);

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = addAppointment({
      carId: car.id,
      carTitle: car.title,
      clientName: user ? user.name : 'Invitado',
      clientEmail: user ? user.email : 'No especificado',
      phone,
      date,
      time
    });

    if (res.success) {
      setSuccessMsg(res.message);
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-lg p-8 rounded-3xl shadow-2xl relative space-y-6">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-white text-lg font-bold"
        >
          ✕
        </button>

        <div className="space-y-1">
          <span className="text-amber-400 font-bold text-xs tracking-widest uppercase bg-amber-400/10 px-3 py-1 rounded-full">
            Prueba de Manejo
          </span>
          <h2 className="text-2xl font-extrabold font-Montserrat text-white">Agendar Test Drive</h2>
          <p className="text-slate-400 text-xs">Vehículo: <strong className="text-white">{car.title}</strong></p>
        </div>

        {successMsg ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-center font-semibold text-sm">
            {successMsg}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-xs font-semibold mb-1">Teléfono de Contacto</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="300 123 4567"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Fecha Preferida</label>
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs font-semibold mb-1">Hora Preferida</label>
                <input 
                  type="time" 
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg mt-2"
            >
              Confirmar Cita
            </button>
          </form>
        )}
      </div>
    </div>
  );
}