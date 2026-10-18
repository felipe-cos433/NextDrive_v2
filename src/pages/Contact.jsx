import React, { useState } from 'react';
import { useAppointments } from '../context/AppointmentContext';

export default function Contact() {
  const { addAppointment } = useAppointments();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carInterest: '',
    date: '',
    message: '',
  });

  const [notification, setNotification] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(formData);

    setNotification('¡Tu solicitud de Test Drive / Contacto ha sido enviada con éxito! 🏎️');
    setTimeout(() => setNotification(''), 4000);

    setFormData({
      name: '',
      email: '',
      phone: '',
      carInterest: '',
      date: '',
      message: '',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-white">
          Contacto y <span className="text-yellow-500">Agendamiento</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Ponte en contacto con nuestros asesores comerciales o agenda tu prueba de manejo exclusiva.
        </p>
      </div>

      {notification && (
        <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 px-4 py-3 rounded-xl text-sm font-semibold">
          {notification}
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-slate-300 mb-1">Nombre Completo *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ej. Carlos Mendoza"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1">Correo Electrónico *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="carlos@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Teléfono / WhatsApp *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+57 300 1234567"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 mb-1">Vehículo de Interés</label>
              <input
                type="text"
                name="carInterest"
                placeholder="Ej. Porsche 911 / BMW M4"
                value={formData.carInterest}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1">Fecha Deseada para Test Drive</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Mensaje o Detalle *</label>
            <textarea
              name="message"
              required
              rows="4"
              placeholder="Estoy interesado en agendar un test drive para..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-yellow-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-3 rounded-lg transition-all duration-300"
          >
            Enviar Agendamiento
          </button>
        </form>
      </div>
    </div>
  );
}