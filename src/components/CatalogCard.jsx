import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { formatCOP, showAlert } from '../utils/helpers';

export default function CatalogCard({ car }) {
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const { addToCart } = useCart();

  // Redirección protegida a la ficha del vehículo
  const handleViewDetails = () => {
    requireAuth(() => {
      if (car && car.id) {
        navigate(`/car/${car.id}`);
      }
    });
  };

  // Agregar directamente al carrito con inicio de sesión obligatorio
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Previene activar handleViewDetails
    requireAuth(() => {
      addToCart(car);
      showAlert?.success?.('Añadido al Carrito', `${car.name} fue agregado a tu reserva.`);
    });
  };

  return (
    <div className="glass-card rounded-3xl p-5 border border-slate-800 space-y-4 hover:border-yellow-500/30 transition duration-300">
      {/* Contenedor de la imagen */}
      <div 
        onClick={handleViewDetails}
        className="h-48 rounded-2xl overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img src={car.image} alt={car.name} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
      </div>

      <div>
        <span className="text-[10px] text-yellow-400 font-bold uppercase">{car.brand}</span>
        <h3 
          onClick={handleViewDetails} 
          className="text-white font-bold text-lg cursor-pointer hover:text-yellow-400 transition"
        >
          {car.name}
        </h3>
        <p className="text-yellow-400 font-black text-sm pt-1">{formatCOP(car.price)}</p>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          onClick={handleViewDetails}
          className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-xl text-xs font-bold transition"
        >
          Ver Ficha 🔒
        </button>
        <button
          onClick={handleAddToCart}
          className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-md shadow-yellow-500/10"
        >
          + Carrito 🛒
        </button>
      </div>
    </div>
  );
}