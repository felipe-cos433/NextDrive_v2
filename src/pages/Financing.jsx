import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { formatCOP } from '../utils/helpers';

export default function Financing() {
  const { cars } = useCars();

  // Estado del simulador
  const [selectedCarId, setSelectedCarId] = useState(cars[0]?.id || '');
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30% cuota inicial por defecto
  const [termMonths, setTermMonths] = useState(48); // 48 meses
  const [monthlyInterestRate] = useState(1.45); // Tasa prom. mensual 1.45% M.V. (~18.8% E.A.)
  
  // Estado del formulario de solicitud
  const [applicantType, setApplicantType] = useState('Empleado');
  const [fullName, setFullName] = useState('');
  const [documentId, setDocumentId] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Vehículo seleccionado
  const selectedCar = cars.find((car) => car.id === selectedCarId) || cars[0];

  // Cálculos Financieros
  const carPrice = selectedCar ? selectedCar.price : 0;
  const downPaymentAmount = (carPrice * downPaymentPercent) / 100;
  const loanAmount = carPrice - downPaymentAmount;

  // Cálculo de cuota mensual usando fórmula de amortización en pesos colombianos:
  // C = P * [i * (1 + i)^n] / [(1 + i)^n - 1]
  const i = monthlyInterestRate / 100;
  const n = termMonths;
  const monthlyAmortization = loanAmount > 0 
    ? (loanAmount * (i * Math.pow(1 + i, n))) / (Math.pow(1 + i, n) - 1)
    : 0;

  // Estimado de seguro de auto y deudor mensual (~0.12% del valor prestado)
  const estimatedInsurance = loanAmount * 0.0012;
  const totalMonthlyPayment = monthlyAmortization + estimatedInsurance;

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!fullName || !documentId || !monthlyIncome) {
      alert('Por favor completa todos los campos requeridos para la preevaluación.');
      return;
    }
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 text-slate-100">
      
      {/* Encabezado */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          Planes Crediticios VIP • NextDrive Capital
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Simulador de Crédito Automotriz
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Diseñado para estructurar el plan de pagos ideal de tu vehículo deportivo o de lujo con aprobación directa y tasas preferenciales de banca privada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: CONFIGURADOR DEL CRÉDITO */}
        <div className="lg:col-span-7 space-y-8 glass-card p-6 sm:p-8 rounded-3xl border border-slate-800">
          <h2 className="text-xl font-bold text-white border-b border-slate-800 pb-4">
            1. Configura tus Parámetros
          </h2>

          {/* Selección de Vehículo */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Seleccionar Vehículo del Inventario
            </label>
            <select
              value={selectedCarId}
              onChange={(e) => setSelectedCarId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-yellow-500 font-bold"
            >
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.name} — {formatCOP(car.price)}
                </option>
              ))}
            </select>
          </div>

          {/* Selector de Cuota Inicial */}
          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-slate-300">Cuota Inicial ({downPaymentPercent}%)</span>
              <span className="font-black text-yellow-400">{formatCOP(downPaymentAmount)}</span>
            </div>
            <input
              type="range"
              min="20"
              max="70"
              step="5"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-yellow-500 bg-slate-900 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold">
              <span>Mínimo 20%</span>
              <span>Recomendado 30% - 40%</span>
              <span>Máximo 70%</span>
            </div>
          </div>

          {/* Selector de Plazo en Meses */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Plazo de Financiación
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[24, 36, 48, 60].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setTermMonths(months)}
                  className={`py-3 rounded-xl text-xs font-bold transition border ${
                    termMonths === months
                      ? 'bg-yellow-500 text-slate-950 border-yellow-500 font-black shadow-lg shadow-yellow-500/20'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {months} Meses
                </button>
              ))}
            </div>
          </div>

          {/* Información Técnica de Tasa y Amortización */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-2 text-[11px] text-slate-400">
            <div className="flex justify-between">
              <span>Tasa de Interés Referencial:</span>
              <span className="text-white font-bold">{monthlyInterestRate}% M.V. (~18.8% E.A.)</span>
            </div>
            <div className="flex justify-between">
              <span>Monto Total a Financiar:</span>
              <span className="text-white font-bold">{formatCOP(loanAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Seguro de Vida y Deudor (Estimado):</span>
              <span className="text-white font-bold">{formatCOP(estimatedInsurance)} / mes</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: RESUMEN DE CUOTA Y SOLICITUD DE PREEVALUACIÓN */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card Resumen de la Cuota */}
          <div className="glass-card p-6 rounded-3xl border border-yellow-500/30 space-y-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            <div className="absolute top-0 right-0 bg-yellow-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl">
              Calculadora VIP
            </div>

            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block">
              Cuota Mensual Estimada
            </span>
            
            <div className="text-3xl sm:text-4xl font-black text-yellow-400">
              {formatCOP(totalMonthlyPayment)}
              <span className="text-xs text-slate-400 font-normal block sm:inline mt-1"> / mes*</span>
            </div>

            <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3">
              *Incluye capital, intereses amortizados y póliza de protección. Sujeto a estudio final del perfil crediticio.
            </p>
          </div>

          {/* Formulario de Preevaluación en Línea */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-white">
              Solicitar Estudio de Crédito Directo
            </h3>

            {isSubmitted ? (
              <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-2xl text-center space-y-3">
                <div className="text-3xl">✅</div>
                <h4 className="font-bold text-white text-sm">¡Solicitud de Preaprobación Recibida!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Un ejecutivo comercial de NextDrive Capital revisará tus datos e historial de ingresos para contactarte en un plazo máximo de 2 horas.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-yellow-400 underline pt-2 block mx-auto"
                >
                  Simular otro vehículo
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-400 font-bold block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Felipe Niño"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Cédula / Documento</label>
                    <input
                      type="text"
                      required
                      placeholder="1000XXXXXX"
                      value={documentId}
                      onChange={(e) => setDocumentId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 font-bold block mb-1">Tipo de Perfil</label>
                    <select
                      value={applicantType}
                      onChange={(e) => setApplicantType(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500 font-bold"
                    >
                      <option value="Empleado">Empleado</option>
                      <option value="Independiente">Independiente</option>
                      <option value="Empresario">Empresario / P. Jurídica</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-bold block mb-1">Ingresos Mensuales Aproximados (COP)</label>
                  <input
                    type="number"
                    required
                    placeholder="Ej. 12000000"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/20"
                >
                  Enviar para Preaprobación Inmediata
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      {/* REQUISITOS Y DOCUMENTACIÓN NECESARIA */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white">Requisitos para Aprobación Inmediata</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-2 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-yellow-400 text-sm">Empleados</h4>
            <ul className="text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Certificación laboral (vigencia &lt; 30 días).</li>
              <li>Comprobantes de nómina de los últimos 3 meses.</li>
              <li>Extractos bancarios de los últimos 3 meses.</li>
            </ul>
          </div>
          <div className="space-y-2 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-yellow-400 text-sm">Independientes</h4>
            <ul className="text-slate-400 space-y-1.5 list-disc list-inside">
              <li>RUT actualizado.</li>
              <li>Extractos bancarios de los últimos 6 meses.</li>
              <li>Declaración de renta del último período gravable.</li>
            </ul>
          </div>
          <div className="space-y-2 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
            <h4 className="font-bold text-yellow-400 text-sm">Personas Jurídicas</h4>
            <ul className="text-slate-400 space-y-1.5 list-disc list-inside">
              <li>Certificado de Cámara de Comercio.</li>
              <li>Estados financieros firmados por contador público.</li>
              <li>Declaración de renta corporativa.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}