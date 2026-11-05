import React from 'react';
import { useCars } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatCOP, showAlert } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const { cars } = useCars();
  const { requireAuth } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Función para agregar al carrito obligando a iniciar sesión previa
  const handleAddToCart = (car) => {
    requireAuth(() => {
      addToCart(car);
      showAlert.success('Añadido al Carrito', `${car.name} fue agregado a tu lista de reserva.`);
    });
  };

  // Función para ver los detalles/ficha técnica tras iniciar sesión
  const handleViewDetails = (carId) => {
    requireAuth(() => {
      navigate(`/car/${carId}`);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-slate-100">
      
      {/* SECCIÓN DE PROMOCIONES DE LA SEMANA */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <span className="bg-yellow-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
            🔥 Promociones de la Semana
          </span>
          <h2 className="text-2xl font-black text-white">Opciones con Bono de Descuento</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cars.slice(0, 2).map((car) => (
            <div key={car.id} className="glass-card rounded-3xl p-6 border border-yellow-500/40 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center">
              <span className="absolute top-3 right-3 bg-red-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                -10% Bono Especial
              </span>
              <img src={car.image} alt={car.name} className="w-full sm:w-44 h-32 object-cover rounded-2xl bg-slate-950" />
              <div className="space-y-2 flex-1">
                <span className="text-[10px] text-yellow-400 font-bold uppercase">{car.brand}</span>
                <h3 className="text-lg font-bold text-white">{car.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-black text-base">{formatCOP(car.price * 0.9)}</span>
                  <span className="text-slate-500 line-through text-xs">{formatCOP(car.price)}</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleViewDetails(car.id)}
                    className="flex-1 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 transition"
                  >
                    Detalles 🔒
                  </button>
                  <button
                    onClick={() => handleAddToCart(car)}
                    className="flex-1 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs shadow-md transition"
                  >
                    + Carrito 🔒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOTA GENERAL DEL CATÁLOGO */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-white border-b border-slate-800 pb-4">Flota Disponible</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="glass-card rounded-3xl p-5 border border-slate-800 space-y-4">
              <div className="h-48 rounded-2xl overflow-hidden bg-slate-950">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] text-yellow-400 font-bold uppercase">{car.brand}</span>
                <h3 className="text-white font-bold text-lg">{car.name}</h3>
                <p className="text-yellow-400 font-black text-sm pt-1">{formatCOP(car.price)}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(car.id)}
                  className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold border border-slate-700 hover:bg-slate-800 transition"
                >
                  Ficha 🔒
                </button>
                <button
                  onClick={() => handleAddToCart(car)}
                  className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-md shadow-yellow-500/10"
                >
                  + Carrito 🔒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}