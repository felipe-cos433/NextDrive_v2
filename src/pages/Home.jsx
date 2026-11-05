import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCars } from '../context/CarContext';
import { useAuth } from '../context/AuthContext';
import { formatCOP } from '../utils/helpers';

export default function Home() {
  const { cars } = useCars();
  const { user, requireAuth, requireRole } = useAuth();
  const navigate = useNavigate();

  const handleTestDrive = (carName) => {
    requireAuth(() => {
      alert(`¡Solicitud de Test Drive registrada para ${carName}! Un asesor comercial se pondrá en contacto.`);
    });
  };

  const handleConsignVehicle = () => {
    requireRole(['proveedor', 'admin'], () => {
      alert('Redirigiendo al formulario de consignación e inspección técnica para proveedores...');
    });
  };

  return (
    <div className="space-y-20 pb-24 text-slate-100 overflow-hidden">
      
      {/* 1. HERO CON ANIMACIÓN DE FONDO */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Fondo Animado con Partículas / Glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/90 z-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-6 pt-12">
          <span className="inline-block bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest backdrop-blur-md">
            Showroom Exclusivo • El Poblado, Medellín
          </span>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
            Movilidad Inteligente, <br />
            <span className="text-yellow-400">Transparente y Sostenible</span>
          </h1>
          
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Plataforma integral para la comercialización, renta y administración de vehículos de alta gama, híbridos y eléctricos con certificación técnica de 150 puntos.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              to="/catalog"
              className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm transition shadow-xl shadow-yellow-500/20"
            >
              Explorar Catálogo Libre
            </Link>
            <button
              onClick={handleConsignVehicle}
              className="px-8 py-4 bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-bold rounded-2xl text-xs sm:text-sm transition backdrop-blur-md"
            >
              Consignar Vehículo (Proveedor) 🔒
            </button>
          </div>

          {user && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-300">
                <span>Perfil Activo:</span>
                <span className="text-yellow-400 font-bold uppercase">{user.name} ({user.role})</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. BARRA DE MÉTRICAS OPERATIVAS (KPIs) */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-card rounded-3xl border border-slate-800 text-center">
          <div className="space-y-1 border-r border-slate-800/80 last:border-0">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400">+150</span>
            <p className="text-[11px] text-slate-400 uppercase font-bold">Puntos de Inspección</p>
          </div>
          <div className="space-y-1 border-r border-slate-800/80 last:border-0">
            <span className="text-2xl sm:text-3xl font-black text-white">100%</span>
            <p className="text-[11px] text-slate-400 uppercase font-bold">Garantía Mecánica</p>
          </div>
          <div className="space-y-1 border-r border-slate-800/80 last:border-0">
            <span className="text-2xl sm:text-3xl font-black text-yellow-400">500+</span>
            <p className="text-[11px] text-slate-400 uppercase font-bold">Rentas Ejecutadas</p>
          </div>
          <div className="space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-white">24/7</span>
            <p className="text-[11px] text-slate-400 uppercase font-bold">Soporte y Telemetría</p>
          </div>
        </div>
      </div>

      {/* 3. SECCIÓN DE PROMOCIONES Y BONOS DE LANZAMIENTO */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative glass-card rounded-3xl p-8 sm:p-12 border border-yellow-500/30 overflow-hidden bg-gradient-to-r from-slate-900 via-slate-900/90 to-yellow-500/10">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-3 text-center md:text-left">
              <span className="bg-yellow-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                Oferta por Tiempo Limitado
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                Bono de Matrícula y SOAT Gratis <br />
                <span className="text-yellow-400">En Toda la Flota Eléctrica e Híbrida</span>
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Financia hasta el 80% de tu vehículo con tasa preferencial y recibe un bono de descuento directo al apartar este mes en nuestra sede de El Poblado.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                to="/catalog"
                className="px-6 py-3.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs text-center transition shadow-lg shadow-yellow-500/20"
              >
                Ver Vehículos en Promo
              </Link>
              <Link
                to="/financing"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold rounded-xl text-xs text-center transition"
              >
                Simular Crédito
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FLOTA DESTACADA */}
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex justify-between items-end border-b border-slate-800 pb-4">
          <div>
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Showroom en Vivo</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Modelos Destacados</h2>
          </div>
          <Link to="/catalog" className="text-xs text-yellow-400 font-bold hover:underline">
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.slice(0, 3).map((car) => (
            <div key={car.id} className="glass-card rounded-3xl overflow-hidden border border-slate-800 p-5 space-y-4">
              <div className="h-48 rounded-2xl overflow-hidden bg-slate-950">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] text-yellow-400 font-bold uppercase">{car.brand}</span>
                  <h3 className="text-lg font-bold text-white">{car.name}</h3>
                </div>
                <span className="text-xs font-black text-yellow-400">{formatCOP(car.price)}</span>
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  to={`/car/${car.id}`}
                  className="flex-1 py-2.5 text-center bg-slate-900 text-white rounded-xl text-xs font-bold border border-slate-700"
                >
                  Detalles
                </Link>
                <button
                  onClick={() => handleTestDrive(car.name)}
                  className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition"
                >
                  Test Drive 🔒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. MÓDULO DE INFORMACIÓN Y ROLES */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-slate-800 space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">Ecosistema Integrado</span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">Permisos y Roles de la Plataforma</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-yellow-400 font-bold text-sm block">👤 Cliente / Arrendatario</span>
              <p className="text-slate-400">Navegación libre por catálogo, simulación de cuotas, agendamiento de citas y reserva directa de vehículos.</p>
            </div>
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-yellow-400 font-bold text-sm block">📦 Proveedor Consignatario</span>
              <p className="text-slate-400">Registro de vehículos para venta o renta y seguimiento en tiempo real del estatus comercial.</p>
            </div>
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-yellow-400 font-bold text-sm block">💼 Asesor Comercial</span>
              <p className="text-slate-400">Gestión de citas programadas, seguimiento de clientes y módulo de cálculo de comisiones.</p>
            </div>
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-yellow-400 font-bold text-sm block">🚚 Personal de Logística</span>
              <p className="text-slate-400">Control de entregas/recogidas, inspección fotográfica digital y agenda de mantenimiento preventivo.</p>
            </div>
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-yellow-400 font-bold text-sm block">⚙️ Administrador del Negocio</span>
              <p className="text-slate-400">Consola ejecutiva global, monitoreo de metas (100 ventas / 500 rentas) y asignación de roles.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}