import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal'; // Importamos el modal de checkout

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, car) => acc + Number(car.price || 0), 0);

  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    // Abrimos el modal de checkout para ingresar datos y descargar Excel
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 flex justify-end bg-slate-950/70 backdrop-blur-sm">
        <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl">
          
          <div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🛒 Carrito de Compras
              </h2>
              <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-slate-500 text-center py-10">Tu carrito está vacío.</p>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {cart.map((car) => (
                  <div key={car.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{car.title || car.name}</h4>
                      <p className="text-xs text-yellow-500 font-bold">${Number(car.price || 0).toLocaleString('es-CO')}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(car.id)}
                      className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white text-xs px-2.5 py-1 rounded-lg transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-3">
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total:</span>
                <span className="text-yellow-500">${totalAmount.toLocaleString('es-CO')}</span>
              </div>

              {/* Botón que ahora dispara el modal de Checkout */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-3 rounded-xl transition-colors shadow-lg"
              >
                Proceder al Pago / Reserva
              </button>

              <button
                onClick={clearCart}
                className="w-full text-xs text-slate-500 hover:text-slate-300 py-1"
              >
                Vaciar Carrito
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Modal de Pago / Excel */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          onClose(); // Cierra el carrito tras completar la compra
        }}
      />
    </>
  );
}