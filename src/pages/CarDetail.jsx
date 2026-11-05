import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { useCart } from '../context/CartContext';
import { formatCOP } from '../utils/helpers';
import CarViewer360 from '../components/CarViewer360';

export default function CarDetail() {
  const { id } = useParams();
  const { cars } = useCars();
  const { addToCart } = useCart();

  const car = cars.find((c) => String(c.id) === String(id));

  if (!car) {
    return (
      <div className="text-center py-20 text-slate-400 space-y-4">
        <p>Vehículo no encontrado.</p>
        <Link to="/catalog" className="inline-block text-yellow-400 underline font-bold">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* Presentación Fotográfica HD Limpia */}
        <div className="w-full">
          <CarViewer360 image={car.image} carName={car.name} />
        </div>

        {/* Información del Vehículo */}
        <div className="glass-card p-8 rounded-3xl space-y-6">
          <div>
            <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">
              {car.brand} • {car.year}
            </span>
            <h1 className="text-3xl font-black text-white mt-1">{car.name}</h1>
            <span className="inline-block bg-slate-900 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-bold mt-2">
              {car.category}
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{car.description}</p>

          <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 uppercase font-bold">Precio Oficial COP</span>
            <span className="text-2xl font-black text-yellow-400">{formatCOP(car.price)}</span>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Link
              to={`/financing?carId=${car.id}`}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-yellow-400 border border-yellow-500/30 font-bold rounded-xl text-xs text-center transition shadow-lg"
            >
              Simular Financiación
            </Link>

            <button
              onClick={() => addToCart && addToCart(car)}
              className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg"
            >
              Comprar Ahora
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}