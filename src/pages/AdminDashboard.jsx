import React, { useState, useEffect } from 'react';
import { useCars } from '../context/CarContext';
import { exportPurchasesToExcel } from '../utils/exportToExcel';

export default function AdminDashboard() {
  const { cars, addCar, deleteCar } = useCars();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'orders'

  const [newCar, setNewCar] = useState({
    title: '',
    brand: '',
    category: 'Deportivo',
    price: '',
    year: 2026,
    image: '',
    description: ''
  });

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('nextdrive_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleAddCarSubmit = (e) => {
    e.preventDefault();
    if (!newCar.title || !newCar.price) return;

    addCar({
      ...newCar,
      price: Number(newCar.price)
    });

    setNewCar({
      title: '',
      brand: '',
      category: 'Deportivo',
      price: '',
      year: 2026,
      image: '',
      description: ''
    });

    alert('¡Vehículo agregado con éxito al catálogo!');
  };

  const handleClearOrders = () => {
    if (window.confirm('¿Estás seguro de limpiar todo el historial de ventas?')) {
      localStorage.removeItem('nextdrive_orders');
      setOrders([]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white">
            Panel de <span className="text-yellow-500">Administración</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Gestiona el inventario de autos y revisa el historial de ventas.</p>
        </div>

        {/* Pestañas */}
        <div className="flex bg-slate-900 border border-slate-800 p-1.5 rounded-xl gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'inventory' ? 'bg-yellow-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            🚗 Inventario ({cars.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'orders' ? 'bg-yellow-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Historial de Ventas ({orders.length})
          </button>
        </div>
      </div>

      {/* VISTA 1: INVENTARIO */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800 p-6 rounded-2xl shadow-xl h-fit space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Agregar Nuevo Vehículo</h2>
            
            <form onSubmit={handleAddCarSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Modelo / Título</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. BMW M3 Touring"
                  value={newCar.title}
                  onChange={(e) => setNewCar({ ...newCar, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Marca</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. BMW"
                    value={newCar.brand}
                    onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Categoría</label>
                  <select
                    value={newCar.category}
                    onChange={(e) => setNewCar({ ...newCar, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                  >
                    <option value="Deportivo">Deportivo</option>
                    <option value="SUV">SUV</option>
                    <option value="Camioneta">Camioneta</option>
                    <option value="Sedán">Sedán</option>
                    <option value="Eléctrico">Eléctrico</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Precio ($ USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="85000"
                    value={newCar.price}
                    onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Año</label>
                  <input
                    type="number"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">URL de la Imagen</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newCar.image}
                  onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Descripción</label>
                <textarea
                  rows="2"
                  placeholder="Especificaciones clave..."
                  value={newCar.description}
                  onChange={(e) => setNewCar({ ...newCar, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-2.5 rounded-xl transition-colors shadow-lg text-sm"
              >
                Guardar Vehículo
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Lista de Vehículos Activos</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-950 text-slate-400">
                  <tr>
                    <th className="p-3">Vehículo</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Precio</th>
                    <th className="p-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {cars.map((car) => (
                    <tr key={car.id} className="hover:bg-slate-950/40">
                      <td className="p-3 font-semibold text-white flex items-center gap-3">
                        <img src={car.image} alt={car.title} className="w-10 h-10 object-cover rounded-lg bg-slate-950" />
                        <div>
                          <p>{car.title}</p>
                          <p className="text-xs text-slate-500">{car.brand} • {car.year}</p>
                        </div>
                      </td>
                      <td className="p-3"><span className="bg-slate-950 border border-slate-800 px-2 py-1 rounded text-xs text-yellow-500">{car.category}</span></td>
                      <td className="p-3 font-bold text-white">${Number(car.price || 0).toLocaleString('es-CO')}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteCar(car.id)}
                          className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* VISTA 2: HISTORIAL DE VENTAS */}
      {activeTab === 'orders' && (
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-bold text-white">Registro Global de Ventas</h2>
              <p className="text-xs text-slate-400">Listado de todas las transacciones procesadas en el checkout.</p>
            </div>

            {orders.length > 0 && (
              <div className="flex gap-3">
                <button
                  onClick={() => exportPurchasesToExcel(orders)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg transition-colors"
                >
                  📥 Exportar Historial a Excel (.xlsx)
                </button>
                <button
                  onClick={handleClearOrders}
                  className="bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  Vaciar Registro
                </button>
              </div>
            )}
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-base">No hay ventas registradas todavía.</p>
              <p className="text-xs mt-1">Realiza una compra de prueba desde el catálogo para ver el registro aquí.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-950 text-slate-400">
                  <tr>
                    <th className="p-3">N° Orden</th>
                    <th className="p-3">Fecha</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Cédula / ID</th>
                    <th className="p-3">Ciudad</th>
                    <th className="p-3">Vehículo</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {orders.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-950/40">
                      <td className="p-3 font-mono text-xs text-yellow-500 font-bold">{item.orderId}</td>
                      <td className="p-3 text-xs text-slate-400">{item.date}</td>
                      <td className="p-3 font-semibold text-white">{item.clientName}</td>
                      <td className="p-3 text-xs">{item.documentId}</td>
                      <td className="p-3 text-xs">{item.city}</td>
                      <td className="p-3 text-xs font-semibold text-slate-200">{item.carTitle}</td>
                      <td className="p-3 font-black text-yellow-500">${Number(item.price || 0).toLocaleString('es-CO')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

    </div>
  );
}