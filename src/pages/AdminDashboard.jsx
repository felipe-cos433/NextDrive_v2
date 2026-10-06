import React, { useContext, useState } from 'react';
import { AppointmentContext } from '../context/AppointmentContext';
import { CarContext } from '../context/CarContext'; // O tu fuente de datos de vehículos
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function AdminDashboard() {
  const { appointments, deleteAppointment } = useContext(AppointmentContext);
  const [activeTab, setActiveTab] = useState('appointments');

  // Estado local para simular la adición de un nuevo vehículo
  const [newCar, setNewCar] = useState({ name: '', price: '', category: 'Deportivo', image: '' });

  const handleAddCar = (e) => {
    e.preventDefault();
    alert(`Vehículo "${newCar.name}" agregado con éxito al catálogo.`);
    setNewCar({ name: '', price: '', category: 'Deportivo', image: '' });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-zinc-900 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Panel de <span className="text-amber-400">Administración</span></h1>
          <p className="text-zinc-400 text-sm mt-1">Gestión centralizada de citas, inventario y solicitudes de clientes.</p>
        </div>

        {/* Pestañas de Navegación del Panel */}
        <div className="flex gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-900">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'appointments' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Citas Agendadas ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'inventory' ? 'bg-amber-400 text-black shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Agregar Vehículo
          </button>
        </div>
      </div>

      {/* Contenido de Citas */}
      {activeTab === 'appointments' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Solicitudes de Test Drive</h2>
          {appointments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {appointments.map(app => (
                <div key={app.id} className="bg-zinc-950 border border-zinc-900 p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-bold text-sm">{app.clientName || app.name}</span>
                      <span className="bg-amber-400/10 text-amber-400 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-400/20">
                        {app.status || 'Pendiente'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">Vehículo de interés: <strong className="text-white">{app.carModel || app.vehicle}</strong></p>
                    <p className="text-xs text-zinc-500 mt-0.5">Contacto: {app.phone} | Correo: {app.email}</p>
                  </div>
                  <Button 
                    variant="danger" 
                    className="text-xs py-2 px-3"
                    onClick={() => deleteAppointment(app.id)}
                  >
                    Eliminar Cita
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-zinc-950 rounded-2xl border border-zinc-900">
              <p className="text-zinc-500 text-sm">No hay solicitudes de test drive registradas por el momento.</p>
            </div>
          )}
        </div>
      )}

      {/* Contenido de Inventario */}
      {activeTab === 'inventory' && (
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-6">Registrar Nuevo Vehículo en el Catálogo</h2>
          <form onSubmit={handleAddCar} className="space-y-4">
            <Input 
              label="Nombre del Modelo" 
              placeholder="Ej. BMW M5 Competition" 
              value={newCar.name} 
              onChange={(e) => setNewCar({...newCar, name: e.target.value})}
              required
            />
            <Input 
              label="Precio (USD)" 
              type="number" 
              placeholder="Ej. 95000" 
              value={newCar.price} 
              onChange={(e) => setNewCar({...newCar, price: e.target.value})}
              required
            />
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-wider text-zinc-300 uppercase">Categoría</label>
              <select 
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 text-sm"
                value={newCar.category}
                onChange={(e) => setNewCar({...newCar, category: e.target.value})}
              >
                <option value="Deportivo">Deportivo</option>
                <option value="SUV">SUV</option>
                <option value="Superdeportivo">Superdeportivo</option>
                <option value="Muscle Car">Muscle Car</option>
              </select>
            </div>
            <Input 
              label="URL de la Imagen" 
              placeholder="https://images.unsplash.com/..." 
              value={newCar.image} 
              onChange={(e) => setNewCar({...newCar, image: e.target.value})}
              required
            />
            <div className="pt-4">
              <Button type="submit" className="w-full">Publicar en el Catálogo</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}