import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
    setError('');
    setSubmitted(true);
    // Aquí puedes disparar tu Toast si lo tienes disponible en el contexto
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-2">
        Contacto y <span className="text-amber-500">Agendamiento</span>
      </h1>
      <p className="text-zinc-400 mb-8">
        Ponte en contacto con nuestros asesores comerciales o agenda tu prueba de manejo exclusiva.
      </p>

      {submitted ? (
        <div className="bg-zinc-900 border border-amber-500/50 p-8 rounded-2xl text-center space-y-4">
          <div className="text-amber-500 text-5xl">✨</div>
          <h3 className="text-2xl font-bold">¡Solicitud Recibida con Éxito!</h3>
          <p className="text-zinc-400">Un asesor especializado de NextDrive se comunicará contigo en menos de 2 horas hábiles.</p>
          <button 
            onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', message: '' }); }}
            className="mt-4 px-6 py-2 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors"
          >
            Enviar otra consulta
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-zinc-900/60 p-8 rounded-3xl border border-zinc-800 backdrop-blur-md space-y-6">
          {error && <div className="p-4 bg-red-950/50 border border-red-500/50 text-red-300 rounded-xl text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Nombre Completo *</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Ej. Carlos Mendoza" 
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Correo Electrónico *</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="carlos@example.com" 
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Teléfono / WhatsApp</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+57 300 1234567" 
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Mensaje o Vehículo de Interés *</label>
            <textarea 
              rows="4" 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Estoy interesado en agendar un test drive para..."
              className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500"
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
          >
            Enviar Solicitud
          </button>
        </form>
      )}
    </div>
  );
}