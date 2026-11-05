import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCOP } from '../utils/helpers';

export default function CheckoutModal() {
  const { cart, clearCart, isCheckoutOpen, setIsCheckoutOpen } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Medellín',
    paymentMethod: 'transfer'
  });

  if (!isCheckoutOpen) return null;

  const total = cart.reduce((acc, car) => acc + Number(car.price || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Solicitud de compra enviada con éxito! Un asesor de NextDrive te contactará pronto.');
    clearCart();
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-yellow-500/30 w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-2"
        >
          ✕
        </button>

        <div>
          <h2 className="text-2xl font-black text-white">Finalizar Compra</h2>
          <p className="text-xs text-slate-400 mt-1">Completa tus datos para procesar la reserva del vehículo.</p>
        </div>

        {/* Resumen del Pedido */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Vehículos seleccionados:</span>
            <span className="font-bold text-white">{cart.length}</span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span className="text-slate-300">Total a pagar:</span>
            <span className="text-yellow-400">{formatCOP(total)}</span>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-400 font-bold mb-1">Nombre Completo</label>
            <input
              type="text"
              required
              placeholder="Ej. Juan Pérez"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 font-bold mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-bold mb-1">Teléfono / WhatsApp</label>
              <input
                type="tel"
                required
                placeholder="+57 300 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-bold mb-1">Método de Pago Preferido</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:border-yellow-500 outline-none"
            >
              <option value="transfer">Transferencia Bancaria (Bancolombia / Nequi)</option>
              <option value="financing">Financiación Directa / Crédito</option>
              <option value="card">Tarjeta de Crédito / Débito</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg mt-4"
          >
            Confirmar Reserva
          </button>
        </form>
      </div>
    </div>
  );
}