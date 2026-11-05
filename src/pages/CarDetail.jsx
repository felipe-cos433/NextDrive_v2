import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCOP, showAlert } from '../utils/helpers';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars } = useCars();
  const { addToCart } = useCart();
  const { requireAuth } = useAuth();

  // Buscar el vehículo por ID
  const car = cars?.find((item) => String(item.id) === String(id));

  // Si el vehículo no existe
  if (!car) {
    return (
      <div className="max-w-4xl mx-auto my-20 p-8 glass-card border border-slate-800 rounded-3xl text-center space-y-4 text-slate-100">
        <h2 className="text-2xl font-black text-white">Vehículo No Encontrado</h2>
        <p className="text-slate-400 text-xs">El modelo solicitado no está disponible en el inventario actual.</p>
        <Link to="/catalog" className="inline-block px-6 py-3 bg-yellow-500 text-slate-950 font-black rounded-xl text-xs">
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    requireAuth(() => {
      addToCart(car);
      showAlert?.success?.('Añadido al Carrito', `${car.name} fue agregado a tu reserva.`);
    });
  };

  const handleBuyNow = () => {
    requireAuth(() => {
      addToCart(car);
      navigate('/cart');
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 text-slate-100">
      {/* Botón de regreso */}
      <button
        onClick={() => navigate('/catalog')}
        className="text-xs text-yellow-400 font-bold hover:underline flex items-center gap-1"
      >
        ← Volver al Catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Imagen Principal */}
        <div className="glass-card p-4 rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-80 sm:h-96 object-cover rounded-2xl"
          />
        </div>

        {/* Informes y Especificaciones */}
        <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-black text-yellow-400 uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
              {car.brand} • {car.category}
            </span>
            <h1 className="text-3xl font-black text-white mt-3">{car.name}</h1>
            <p className="text-slate-400 text-xs mt-1">Modelo Año {car.year}</p>
          </div>

          <div className="border-t border-b border-slate-800 py-4 flex justify-between items-center">
            <span className="text-slate-400 text-xs font-bold uppercase">Precio Comercial</span>
            <span className="text-2xl font-black text-yellow-400">{formatCOP(car.price)}</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">Ficha Técnica & Descripción:</h3>
            <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              {car.description || 'Vehículo de alta gama verificado por nuestro equipo técnico con inspección de 150 puntos, garantía mecánica extendida y documentación en regla.'}
            </p>
          </div>

          {/* Acciones del Carrito */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold border border-slate-700 rounded-xl text-xs transition"
            >
              + Agregar al Carrito 🛒
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/20"
            >
              Reservar Ahora VIP 🔒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}