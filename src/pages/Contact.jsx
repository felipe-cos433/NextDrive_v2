import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    carInterest: 'NextDrive Apex GT',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes simular el envío de los datos o conectarlos con una API
    console.log('Datos de contacto enviados:', formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-amber-400 font-bold text-xs tracking-widest uppercase bg-amber-400/10 px-3 py-1.5 rounded-full">
          Atención Personalizada
        </span>
        <h1 className="text-4xl font-extrabold font-Montserrat text-white mt-4">Contáctanos</h1>
        <p className="text-slate-400 text-base mt-2">
          ¿Tienes dudas sobre algún vehículo o deseas agendar una prueba de manejo? Completa el formulario y un asesor se pondrá en contacto contigo de inmediato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Información de Contacto / Sede */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8 shadow-xl">
          <h3 className="text-xl font-bold font-Montserrat text-white">Información de la Sede</h3>
          
          <div className="space-y-6 text-slate-300 text-sm">
            <div className="flex items-start space-x-4">
              <span className="text-amber-400 text-lg">📍</span>
              <div>
                <strong className="block text-white font-semibold">Ubicación Principal</strong>
                <span className="text-slate-400">Medellín, Colombia</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-amber-400 text-lg">📞</span>
              <div>
                <strong className="block text-white font-semibold">Teléfono / WhatsApp</strong>
                <span className="text-slate-400">+57 (300) 123-4567</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-amber-400 text-lg">✉️</span>
              <div>
                <strong className="block text-white font-semibold">Correo Electrónico</strong>
                <span className="text-slate-400">contacto@nextdrive.com</span>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <span className="text-amber-400 text-lg">⏰</span>
              <div>
                <strong className="block text-white font-semibold">Horarios de Atención</strong>
                <span className="text-slate-400">Lunes a Sábado: 9:00 AM - 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          {submitted ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-white font-Montserrat">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-slate-400 max-w-md mx-auto">
                Gracias por comunicarte con NextDrive. Hemos recibido tus datos y un asesor se comunicará contigo muy pronto.
              </p>
              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', carInterest: 'NextDrive Apex GT', message: '' });
                }}
                className="mt-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-2.5 rounded-xl transition text-sm"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Nombre completo</label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Carlos Pérez"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Correo electrónico</label>
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Teléfono de contacto</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-semibold mb-2">Vehículo de interés</label>
                  <select 
                    name="carInterest"
                    value={formData.carInterest}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-400 transition"
                  >
                    <option value="NextDrive Apex GT">NextDrive Apex GT</option>
                    <option value="NextDrive Urban Cross">NextDrive Urban Cross</option>
                    <option value="NextDrive Titan Pro">NextDrive Titan Pro</option>
                    <option value="Otro / General">Otro / Asesoría general</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">Mensaje o comentarios</label>
                <textarea 
                  name="message" 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Escribe aquí tus dudas o si deseas agendar una prueba de manejo..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 transition resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}