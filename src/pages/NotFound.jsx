import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <h1 className="text-8xl font-black text-yellow-500">404</h1>
      <h2 className="text-2xl font-bold text-white">Página no encontrada</h2>
      <p className="text-slate-400 text-sm max-w-md">
        Lo sentimos, la ruta a la que intentas acceder no existe o fue movida.
      </p>
      <Link
        to="/catalog"
        className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-sm inline-block"
      >
        Volver al Catálogo
      </Link>
    </div>
  );
}