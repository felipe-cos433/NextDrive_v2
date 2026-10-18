import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { exportPurchasesToExcel } from '../utils/exportToExcel';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    documentId: '',
    city: '',
    phone: ''
  });

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, car) => acc + Number(car.price || 0), 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.documentId || !formData.city) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    // Estructuramos cada vehículo comprado en una orden
    const purchasesData = cart.map((car, index) => ({
      orderId: `ND-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString('es-CO'),
      clientName: formData.fullName,
      documentId: formData.documentId,
      city: formData.city,
      phone: formData.phone,
      carTitle: car.title || car.name,
      category: car.category || 'Deportivo',
      price: car.price,
      status: 'Aprobado'
    }));

    // 🚀 1. Guardamos la compra en el historial local (opcional)
    const existingOrders = JSON.parse(localStorage.getItem('nextdrive_orders') || '[]');
    localStorage.setItem('nextdrive_orders', JSON.stringify([...existingOrders, ...purchasesData]));

    // 🚀 2. Generamos y descargamos el archivo Excel automáticamente
    exportPurchasesToExcel(purchasesData);

    // 🚀 3. Limpiamos carrito y cerramos modal
    clearCart();
    alert('¡Pago procesado con éxito! Se ha descargado automáticamente tu comprobante en Excel.');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-6">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white">Finalizar Compra</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
        </div>

        <form onSubmit={handleSubmitPayment} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nombre Completo *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Ej. Juan Felipe Niño"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Cédula / Identificación *</label>
              <input
                type="text"
                name="documentId"
                required
                value={formData.documentId}
                onChange={handleChange}
                placeholder="1020304050"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Ciudad *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Medellín"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Teléfono de Contacto</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="300 123 4567"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div className="border-t border-slate-800 pt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-slate-500 uppercase">Total a Pagar</p>
              <p className="text-2xl font-black text-yellow-500">${totalAmount.toLocaleString('es-CO')}</p>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-colors shadow-lg"
            >
              Confirmar y Descargar Excel 📊
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}