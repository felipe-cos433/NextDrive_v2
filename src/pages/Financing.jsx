import React, { useState } from 'react';

export default function Financing() {
  const [carPrice, setCarPrice] = useState(120000);
  const [downPayment, setDownPayment] = useState(30000);
  const [term, setTerm] = useState(36); // Meses
  const [interestRate, setInterestRate] = useState(1.1); // % mensual estimado

  // Cálculos financieros
  const loanAmount = carPrice - downPayment;
  const monthlyInterest = interestRate / 100;
  const monthlyPayment = loanAmount > 0 
    ? (loanAmount * (monthlyInterest * Math.pow(1 + monthlyInterest, term))) / (Math.pow(1 + monthlyInterest, term) - 1)
    : 0;

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Encabezado */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Simulador de <span className="text-amber-500">Financiación</span>
        </h1>
        <p className="text-zinc-400">
          Calcula y personaliza las cuotas mensuales para adquirir tu próximo vehículo de alta gama en NextDrive.
        </p>
      </div>

      {/* Contenedor principal con efecto Glassmorphism */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-zinc-900/60 p-6 sm:p-8 rounded-3xl border border-zinc-800/80 backdrop-blur-xl shadow-2xl">
        
        {/* Controles del Simulador */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Precio del Vehículo ($ USD)
            </label>
            <input
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-700/70 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Cuota Inicial / Entrada ($ USD)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-700/70 rounded-xl p-3 text-white focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium text-zinc-300 mb-2">
              <span>Plazo de Financiación</span>
              <span className="text-amber-500 font-bold">{term} Meses</span>
            </div>
            <input
              type="range"
              min="12"
              max="72"
              step="12"
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer bg-zinc-800 h-2 rounded-lg"
            />
            <div className="flex justify-between text-xs text-zinc-500 mt-1">
              <span>12 Meses</span>
              <span>72 Meses</span>
            </div>
          </div>
        </div>

        {/* Panel de Resultados */}
        <div className="flex flex-col justify-center items-center bg-zinc-950/80 p-8 rounded-2xl border border-amber-500/30 text-center relative overflow-hidden shadow-inner">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <span className="text-zinc-400 text-xs font-semibold uppercase tracking-widest mb-1">
            Cuota Mensual Estimada
          </span>
          <span className="text-4xl sm:text-5xl font-black text-amber-500 my-3">
            ${Math.round(monthlyPayment).toLocaleString()} <span className="text-sm font-normal text-zinc-400">/ mes</span>
          </span>
          
          <div className="w-full border-t border-zinc-800 my-4"></div>

          <div className="w-full flex justify-between text-sm text-zinc-400 mb-2">
            <span>Monto a Financiar:</span>
            <span className="text-white font-semibold">${loanAmount > 0 ? loanAmount.toLocaleString() : 0}</span>
          </div>
          <div className="w-full flex justify-between text-sm text-zinc-400">
            <span>Tasa de Interés estimada:</span>
            <span className="text-white font-semibold">{interestRate}% mensual</span>
          </div>
        </div>

      </div>
    </div>
  );
}