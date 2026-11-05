import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Contact() {
  const { requireAuth } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    requireAuth(() => {
      setSubmitted(true);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-slate-100">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          Atención Personalizada
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">Atención y Citas VIP</h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Agenda tu visita a nuestra sala de exhibición o solicita atención directa con un ejecutivo especializado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Formulario de Mensaje */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-xl font-bold text-white">Enviar Mensaje Directo</h2>
          {submitted ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 p-8 rounded-2xl text-center space-y-3">
              <span className="text-3xl">📩</span>
              <h3 className="font-bold text-white text-base">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-xs text-slate-300">
                Tu solicitud ha sido recibida por el equipo comercial de NextDrive. Nos comunicaremos contigo en breve.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-yellow-400 font-bold underline pt-2 block mx-auto"
              >
                Enviar otra consulta
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Teléfono Móvil</label>
                  <input
                    type="tel"
                    required
                    placeholder="+57 300 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">Asunto de la Consulta</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Agendar cita para ver Porsche 911 GT3 RS"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="text-slate-400 font-bold block mb-1">Mensaje</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Escribe aquí los detalles de tu requerimiento..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/20"
              >
                Enviar Solicitud Directa
              </button>
            </form>
          )}
        </div>

        {/* Tarjeta de Sede Principal e Información Completa */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            <h2 className="text-xl font-bold text-white">Sede Principal NextDrive</h2>
            
            <div className="space-y-5 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">📍</span>
                <div>
                  <strong className="text-white block text-sm">Ubicación Estratégica</strong>
                  <p className="text-slate-400">El Poblado, Cra 43A #1-50, Medellín, Antioquia</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">📞</span>
                <div>
                  <strong className="text-white block text-sm">Líneas de Atención Directa</strong>
                  <p className="text-slate-400">+57 (604) 444-0000 • PBX Ventas</p>
                  <p className="text-slate-400">+57 310 000 0000 • WhatsApp VIP</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">🕒</span>
                <div>
                  <strong className="text-white block text-sm">Horarios de Atención</strong>
                  <p className="text-slate-400">Lunes a Viernes: 8:00 AM – 7:00 PM</p>
                  <p className="text-slate-400">Sábados: 9:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>

            {/* Simulación del Mapa de la Sede */}
            <div className="h-40 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden relative flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <span className="text-2xl block">🗺️</span>
                <span className="text-xs font-bold text-yellow-400 block">Showroom El Poblado</span>
                <span className="text-[10px] text-slate-500 block">Zona Rosa / Avenida El Poblado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}