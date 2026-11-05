import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { useAppointments } from '../context/AppointmentContext';
import { useFinancing } from '../context/FinancingContext';
import { useSales } from '../context/SalesContext';
import { formatCOP, showAlert } from '../utils/helpers';

// ==========================================
// SUBCOMPONENTE 1: INVENTARIO
// ==========================================
function InventoryTab({ cars, formData, setFormData, editingId, handleCarSubmit, handleEditCar, handleCancelEdit, deleteCar, handleImageFileUpload }) {
  const handleDelete = async (id) => {
    const confirmed = await showAlert?.confirm?.('¿Eliminar vehículo?', 'Esta acción no se puede deshacer.');
    if (confirmed) {
      deleteCar(id);
      showAlert?.success?.('Eliminado', 'El vehículo fue retirado del inventario.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-yellow-500/20">
        <h2 className="text-xl font-bold text-white mb-6">
          {editingId ? '✏️ Editar Vehículo' : '➕ Agregar Nuevo Vehículo'}
        </h2>
        <form onSubmit={handleCarSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Modelo / Nombre</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Marca</label>
            <input
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Precio COP</label>
            <input
              type="number"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Categoría</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none font-bold"
            >
              <option value="Deportivo">Deportivo</option>
              <option value="SUV">SUV</option>
              <option value="Camioneta">Camioneta</option>
              <option value="Sedán">Sedán</option>
              <option value="Eléctrico / Híbrido">Eléctrico / Híbrido</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Año</label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:border-yellow-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Imagen (Local o URL)</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileUpload}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300"
              />
              <input
                type="text"
                placeholder="O URL de imagen..."
                value={formData.image?.startsWith('data:') ? '' : formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white text-xs"
              />
            </div>
          </div>
          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Descripción</label>
            <textarea
              rows="2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm"
            />
          </div>
          <div className="md:col-span-3 flex justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl text-sm"
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-sm shadow-lg"
            >
              {editingId ? 'Actualizar Vehículo' : 'Guardar Vehículo'}
            </button>
          </div>
        </form>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden p-6 border border-slate-800">
        <h2 className="text-xl font-bold text-white mb-6">Inventario Activo</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Vehículo</th>
                <th className="p-4">Categoría</th>
                <th className="p-4">Precio (COP)</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {cars?.map((car) => (
                <tr key={car.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 flex items-center gap-4">
                    <img src={car.image} alt={car.name} className="w-14 h-14 object-cover rounded-xl border border-slate-800 bg-slate-950" />
                    <div>
                      <p className="font-bold text-white text-sm">{car.name}</p>
                      <p className="text-xs text-slate-400">{car.brand} — Año {car.year}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-900 text-yellow-400 text-xs px-3 py-1 rounded-full border border-yellow-500/20 font-bold">
                      {car.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-white">{formatCOP(car.price)}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditCar(car)}
                      className="px-3 py-1.5 bg-slate-800 text-yellow-400 rounded-lg text-xs font-bold"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold border border-red-500/20"
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
  );
}

// ==========================================
// SUBCOMPONENTE 2: CITAS
// ==========================================
function AppointmentsTab({ appointments, updateAppointmentStatus, deleteAppointment }) {
  const handleDelete = async (id) => {
    const confirmed = await showAlert?.confirm?.('¿Eliminar cita?', 'Esta acción borrará el registro.');
    if (confirmed) {
      deleteAppointment(id);
      showAlert?.success?.('Eliminada', 'La cita fue eliminada.');
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-800">
      <h2 className="text-xl font-bold text-white mb-6">Agendamiento de Citas</h2>
      {appointments && appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Cliente</th>
                <th className="p-4">Vehículo</th>
                <th className="p-4">Fecha / Hora</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4">
                    <p className="font-bold text-white">{apt.name}</p>
                    <p className="text-xs text-slate-400">{apt.email}</p>
                  </td>
                  <td className="p-4 font-bold text-yellow-400">{apt.carName || 'General'}</td>
                  <td className="p-4 text-xs">{apt.date} — {apt.time}</td>
                  <td className="p-4">
                    <select
                      value={apt.status || 'Pendiente'}
                      onChange={(e) => {
                        updateAppointmentStatus(apt.id, e.target.value);
                        showAlert?.success?.('Actualizado', `Estado cambiado a ${e.target.value}`);
                      }}
                      className="bg-slate-950 border border-slate-800 text-xs text-yellow-400 rounded-lg px-2.5 py-1"
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="Confirmada">Confirmada</option>
                      <option value="Completada">Completada</option>
                      <option value="Cancelada">Cancelada</option>
                    </select>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(apt.id)}
                      className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/20"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">No hay citas registradas.</div>
      )}
    </div>
  );
}

// ==========================================
// SUBCOMPONENTE 3: FINANCIACIÓN
// ==========================================
function FinancingTab({ financingRequests, updateFinancingStatus }) {
  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-800">
      <h2 className="text-xl font-bold text-white mb-6">Solicitudes de Crédito</h2>
      {financingRequests && financingRequests.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Cliente</th>
                <th className="p-4">Vehículo / Valor</th>
                <th className="p-4">Condiciones</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Gestionar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {financingRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4">
                    <p className="font-bold text-white">{req.clientName}</p>
                    <p className="text-xs text-slate-400">{req.email} • {req.phone}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-yellow-400">{req.carName}</p>
                    <p className="text-xs text-slate-400">{formatCOP(req.carPrice)}</p>
                  </td>
                  <td className="p-4 text-xs">
                    <p>Inicial: {formatCOP(req.downPayment)}</p>
                    <p className="text-slate-400">{req.months} meses</p>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      req.status === 'Aprobada' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      req.status === 'Rechazada' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        updateFinancingStatus(req.id, 'Aprobada');
                        showAlert?.success?.('Aprobado', 'Solicitud de crédito aprobada.');
                      }}
                      className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg"
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => {
                        updateFinancingStatus(req.id, 'Rechazada');
                        showAlert?.error?.('Rechazado', 'Solicitud de crédito rechazada.');
                      }}
                      className="px-2.5 py-1 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg"
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">No hay solicitudes de financiación.</div>
      )}
    </div>
  );
}

// ==========================================
// SUBCOMPONENTE 4: VENTAS
// ==========================================
function SalesTab({ sales }) {
  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-800">
      <h2 className="text-xl font-bold text-white mb-6">Historial de Transacciones y Compras</h2>
      {sales && sales.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950 text-slate-400 text-xs font-bold uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">ID Transacción</th>
                <th className="p-4">Fecha</th>
                <th className="p-4">Comprador</th>
                <th className="p-4">Vehículos Adquiridos</th>
                <th className="p-4 text-right">Total Pagado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-4 font-mono text-xs text-yellow-400">#{sale.id}</td>
                  <td className="p-4 text-xs text-slate-400">{sale.date}</td>
                  <td className="p-4 font-bold text-white">{sale.clientName || 'Cliente Web'}</td>
                  <td className="p-4">
                    {sale.items?.map((item, idx) => (
                      <div key={idx} className="text-xs text-slate-300">• {item.name} ({formatCOP(item.price)})</div>
                    ))}
                  </td>
                  <td className="p-4 text-right font-black text-emerald-400">
                    {formatCOP(sale.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 text-slate-400 text-sm">No se han registrado ventas en el concesionario todavía.</div>
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL: ADMIN DASHBOARD
// ==========================================
export default function AdminDashboard() {
  const { cars, addCar, updateCar, deleteCar } = useCars();
  const { appointments, updateAppointmentStatus, deleteAppointment } = useAppointments();
  const { financingRequests, updateFinancingStatus } = useFinancing();
  const { sales } = useSales();

  const [activeTab, setActiveTab] = useState('inventory');

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    year: 2026,
    price: 200000000,
    category: 'Deportivo',
    image: '',
    description: ''
  });

  const handleEditCar = (car) => {
    setEditingId(car.id);
    setFormData(car);
    setActiveTab('inventory');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      brand: '',
      year: 2026,
      price: 200000000,
      category: 'Deportivo',
      image: '',
      description: ''
    });
  };

  const handleImageFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCarSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      showAlert?.error?.('Imagen requerida', 'Por favor agrega una imagen para el vehículo.');
      return;
    }

    if (editingId) {
      updateCar(editingId, formData);
      showAlert?.success?.('Actualizado', 'Vehículo modificado correctamente.');
    } else {
      addCar({ ...formData, id: Date.now().toString() });
      showAlert?.success?.('Creado', 'Vehículo agregado al inventario.');
    }
    handleCancelEdit();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 text-slate-100">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Panel de Administración</h1>
          <p className="text-slate-400 text-sm mt-1">Control total de inventario, citas, créditos y ventas</p>
        </div>
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          Modo Administrador Activo
        </span>
      </div>

      {/* Métricas / KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-bold">Total Vehículos</span>
          <h3 className="text-3xl font-black text-yellow-400 mt-1">{cars?.length || 0}</h3>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-bold">Citas Activas</span>
          <h3 className="text-3xl font-black text-yellow-400 mt-1">{appointments?.length || 0}</h3>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-bold">Créditos en Estudio</span>
          <h3 className="text-3xl font-black text-yellow-400 mt-1">{financingRequests?.length || 0}</h3>
        </div>
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <span className="text-xs text-slate-400 uppercase font-bold">Ventas Totales</span>
          <h3 className="text-3xl font-black text-emerald-400 mt-1">{sales?.length || 0}</h3>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className="flex flex-wrap gap-3 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${activeTab === 'inventory' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          📦 Inventario
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${activeTab === 'appointments' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          📅 Citas ({appointments?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('financing')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${activeTab === 'financing' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          🏦 Financiación ({financingRequests?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`px-5 py-2.5 rounded-xl font-bold text-xs transition ${activeTab === 'sales' ? 'bg-yellow-500 text-slate-950 shadow-lg' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
        >
          💰 Historial de Ventas ({sales?.length || 0})
        </button>
      </div>

      {/* Vistas internas */}
      {activeTab === 'inventory' && (
        <InventoryTab
          cars={cars}
          formData={formData}
          setFormData={setFormData}
          editingId={editingId}
          handleCarSubmit={handleCarSubmit}
          handleEditCar={handleEditCar}
          handleCancelEdit={handleCancelEdit}
          deleteCar={deleteCar}
          handleImageFileUpload={handleImageFileUpload}
        />
      )}

      {activeTab === 'appointments' && (
        <AppointmentsTab
          appointments={appointments}
          updateAppointmentStatus={updateAppointmentStatus}
          deleteAppointment={deleteAppointment}
        />
      )}

      {activeTab === 'financing' && (
        <FinancingTab
          financingRequests={financingRequests}
          updateFinancingStatus={updateFinancingStatus}
        />
      )}

      {activeTab === 'sales' && (
        <SalesTab sales={sales} />
      )}
    </div>
  );
}