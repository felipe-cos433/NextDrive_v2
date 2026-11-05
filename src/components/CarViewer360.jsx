import React from 'react';

export default function CarViewer360({ image, carName }) {
  // Imagen por defecto en caso de no recibir la URL principal
  const fallbackImage = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1400&q=80';

  return (
    <div className="w-full">
      <div className="relative h-80 sm:h-[460px] w-full rounded-3xl overflow-hidden glass-card border border-yellow-500/30 shadow-2xl bg-slate-950 flex items-center justify-center">
        <img
          src={image || fallbackImage}
          alt={carName || 'Vehículo NextDrive'}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />

        {/* Gradiente sutil para integración visual */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

        <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur border border-yellow-500/30 px-3.5 py-1.5 rounded-xl text-yellow-400 text-xs font-bold uppercase tracking-wider">
          NextDrive Exclusive
        </div>
      </div>
    </div>
  );
}