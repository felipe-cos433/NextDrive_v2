import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useSales } from '../context/SalesContext';
import { formatCOP, showAlert } from '../utils/helpers';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const { user, requireAuth } = useAuth();
  const { addSale } = useSales();
  const navigate = useNavigate();

  // Estados para mejoras adicionales en el carrito
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCouponName, setAppliedCouponName] = useState('');

  // Simulación de cupones de descuento (ej. "NEXTDRIVE10" descuenta el 10%)
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = coupon.trim().toUpperCase();
    if (code === 'NEXTDRIVE10') {
      setDiscount(0.10);
      setAppliedCouponName('NEXTDRIVE10 (-10%)');
      showAlert.success('¡Cupón Aplicado!', 'Se ha aplicado un 10% de descuento a tu reserva.');
    } else if (code === 'VIP2026') {
      setDiscount(0.15);
      setAppliedCouponName('VIP2026 (-15%)');
      showAlert.success('¡Cupón VIP Aplicado!', 'Se ha aplicado un 15% de descuento especial.');
    } else {
      showAlert.error('Cupón Inválido', 'El código ingresado no es válido o ha expirado.');
      setDiscount(0);
      setAppliedCouponName('');
    }
  };

  // Cálculos financieros
  const subtotal = total;
  const estimatedTaxes = subtotal * 0.03; // 3% de matrícula y trámites RUNT
  const discountAmount = subtotal * discount;
  const finalTotal = subtotal + estimatedTaxes - discountAmount;

  const handleCheckout = () => {
    requireAuth(() => {
      if (cart.length === 0) return;

      const newSale = {
        id: Date.now().toString().slice(-6),
        date: new Date().toLocaleDateString('es-CO'),
        clientName: user?.name || 'Cliente Web',
        items: cart,
        subtotal: subtotal,
        taxes: estimatedTaxes,
        discount: discountAmount,
        total: finalTotal
      };

      addSale(newSale);
      clearCart();
      
      showAlert.success(
        '¡Reserva VIP Exitosa!', 
        'Tu solicitud de compra ha sido registrada en el sistema. Un asesor de la sede de El Poblado se comunicará contigo en breve.'
      );
      
      navigate('/catalog');
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 text-slate-100">
      
      {/* Encabezado */}
      <div className="text-center space-y-2">
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          Transacción Segura
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Carrito y Resumen de Reserva</h1>
        <p className="text-slate-400 text-xs">Revisa los vehículos seleccionados y procede con el bloqueo comercial.</p>
      </div>

      {cart.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-4 border border-slate-800 max-w-lg mx-auto">
          <span className="text-5xl block">🛒</span>
          <h2 className="text-xl font-bold text-white">Tu carrito está vacío</h2>
          <p className="text-slate-400 text-xs">Aún no has agregado ningún vehículo de alta gama para reserva.</p>
          <Link
            to="/catalog"
            className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/20"
          >
            Explorar Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Listado de Vehículos en el Carrito (Ocupa 2 columnas) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h2 className="text-sm font-bold text-slate-300 uppercase">Vehículos Seleccionados ({cart.length})</h2>
              <button
                onClick={clearCart}
                className="text-xs text-red-400 hover:underline font-bold"
              >
                Vaciar Carrito
              </button>
            </div>

            {cart.map((car) => (
              <div 
                key={car.id} 
                className="glass-card p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-slate-700 transition"
              >
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full sm:w-28 h-20 object-cover rounded-xl bg-slate-950 border border-slate-800" 
                />
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-wider">{car.brand} • {car.category}</span>
                  <h3 className="text-white font-bold text-sm">{car.name}</h3>
                  <span className="text-slate-400 text-xs">Modelo {car.year}</span>
                </div>
                <div className="text-center sm:text-right space-y-2">
                  <span className="text-yellow-400 font-black text-sm block">{formatCOP(car.price)}</span>
                  <button
                    onClick={() => {
                      removeFromCart(car.id);
                      showAlert.success('Vehículo Retirado', `${car.name} fue removido del carrito.`);
                    }}
                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold transition"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Tarjeta de Resumen Financiero y Checkout (Ocupa 1 columna) */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 sticky top-24">
            <h2 className="text-base font-black text-white border-b border-slate-800 pb-3">Resumen de Inversión</h2>
            
            {/* Formulario de Cupón de Descuento */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="Código de Cupón..."
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-yellow-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition"
              >
                Aplicar
              </button>
            </form>

            {appliedCouponName && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl text-emerald-400 text-xs flex justify-between items-center">
                <span>Cupón: <strong>{appliedCouponName}</strong></span>
                <button 
                  onClick={() => { setDiscount(0); setAppliedCouponName(''); }}
                  className="text-red-400 hover:underline font-bold text-[10px]"
                >
                  Remover
                </button>
              </div>
            )}

            {/* Desglose de Costos */}
            <div className="space-y-3 text-xs border-t border-slate-800 pt-4">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal Flota:</span>
                <span className="text-white font-bold">{formatCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Trámite Matrícula / RUNT (~3%):</span>
                <span className="text-white font-bold">{formatCOP(estimatedTaxes)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Descuento Aplicado:</span>
                  <span className="font-bold">-{formatCOP(discountAmount)}</span>
                </div>
              )}
              <div className="border-t border-slate-800 pt-3 flex justify-between items-center">
                <span className="text-slate-200 font-bold uppercase">Total Inversión:</span>
                <span className="text-yellow-400 font-black text-xl">{formatCOP(finalTotal)}</span>
              </div>
            </div>

            {/* Botón de Confirmación */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-xs transition shadow-xl shadow-yellow-500/20 tracking-wider uppercase"
            >
              Procesar Reserva VIP 🔒
            </button>

            <p className="text-[10px] text-slate-500 text-center leading-relaxed">
              * Al hacer clic en procesar reserva, generas un bloqueo temporal del vehículo por 24 horas hábiles en nuestra sucursal de Medellín.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}