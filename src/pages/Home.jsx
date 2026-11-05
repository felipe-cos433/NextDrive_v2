import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';
import { formatCOP } from '../utils/helpers';

export default function Home() {
  const { cars } = useCars();
  const { requireAuth } = useAuth();
  const navigate = useNavigate();

  // Función interactiva: Agendar prueba de manejo
  const handleTestDrive = (carName) => {
    requireAuth(() => {
      alert(`¡Excelente! Hemos registrado tu solicitud de prueba de manejo para el ${carName}. Un asesor te contactará.`);
    });
  };

  // Función interactiva: Cotizar vehículo
  const handleQuote = (carId) => {
    requireAuth(() => {
      navigate(`/car/${carId}`);
    });
  };

  return (
    <div className="space-y-24 pb-24 text-slate-100">
      
      {/* 1. HERO SECTION CON VIDEO EN BUCLE */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-105 pointer-events-none"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-yellow-sports-car-driving-on-a-road-5437/1080p.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradiente de profundidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-6">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">
            Showroom Exclusivo • El Poblado, Medellín
          </span>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            Alto Rendimiento. <br />
            <span className="text-yellow-400">Diseño Sin Concesiones.</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Representamos la cumbre del automovilismo deportivo y de lujo. Vehículos homologados con certificación técnica de fábrica y entrega inmediata en todo Colombia.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              to="/catalog"
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-sm transition shadow-xl shadow-yellow-500/20"
            >
              Explorar Colección
            </Link>
            <Link
              to="/financing"
              className="px-8 py-4 bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 font-bold rounded-2xl text-sm transition backdrop-blur-md"
            >
              Simular Financiación
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MUESTRA DESTACADA DE LA FLOTA CON BOTONES INTERACTIVOS */}
      <div className="max-w-7xl mx-auto px-4 space-y-10">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Inventario Disponible</span>
            <h2 className="text-3xl font-black text-white mt-1">Superdeportivos e Ingeniería de Pista</h2>
          </div>
          <Link to="/catalog" className="text-yellow-400 text-xs font-bold hover:underline flex items-center gap-1">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.slice(0, 3).map((car) => (
            <div
              key={car.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-yellow-500/40 transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                    {car.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                    <span>{car.brand}</span>
                    <span>Año {car.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition">{car.name}</h3>
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {car.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-4">
                <div className="text-yellow-400 font-black text-xl border-t border-slate-800/60 pt-4">
                  {formatCOP(car.price)}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleQuote(car.id)}
                    className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-xl text-xs font-bold transition"
                  >
                    Ver Ficha
                  </button>
                  <button
                    onClick={() => handleTestDrive(car.name)}
                    className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/10"
                  >
                    Test Drive 🔒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SERVICIOS EXCLUSIVOS */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass-card p-8 sm:p-14 rounded-3xl space-y-12 border border-slate-800">
          <div className="max-w-2xl space-y-3">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest">Especialización Automotriz</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Servicios de Clase Mundial</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-yellow-500/10 text-yellow-400 rounded-2xl flex items-center justify-center font-black text-2xl border border-yellow-500/20">
                🏎️
              </div>
              <h3 className="text-lg font-bold text-white">Importación Directa</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Ubicamos la configuración exacta de tu vehículo en cualquier mercado internacional, gestionando homologación y transporte cerrado.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 bg-yellow-500/10 text-yellow-400 rounded-2xl flex items-center justify-center font-black text-2xl border border-yellow-500/20">
                ⚙️
              </div>
              <h3 className="text-lg font-bold text-white">Peritaje Técnico Riguroso</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Diagnóstico computarizado de motor, medición de espesor de pintura, verificación estructural y escaneo de módulos electrónicos.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 bg-yellow-500/10 text-yellow-400 rounded-2xl flex items-center justify-center font-black text-2xl border border-yellow-500/20">
                🤝
              </div>
              <h3 className="text-lg font-bold text-white">Gestión de Retoma</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Evaluamos tu vehículo de gama alta o deportiva como parte de pago con valoración comercial justa e inmediata.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}