import React, { useState } from 'react';

export default function FinancingSimulator({ carPrice }) {
  const [downPayment, setDownPayment] = useState(carPrice * 0.2); // 20% inicial por defecto
  const [months, setMonths] = useState(48); // 48 meses
  
  const interestRate = 0.0099; // 0.99% interanual aproximado mensual
  const loanAmount = carPrice - downPayment;
  
  // Fórmula de cuota fija (Amortización francesa simplificada)
  const monthlyPayment = loanAmount > 0 
    ? (loanAmount * (interestRate * Math.pow(1 + interestRate, months))) / (Math.pow(1 + interestRate, months) - 1)
    : 0;

  return (
    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-inner mt-8">
      <h3 className="text-lg font-bold text-white mb-4">Simulador de <span className="text-amber-400">Financiación</span></h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="text-xs text-zinc-400 block mb-2">Cuota Inicial (USD): ${downPayment.toLocaleString()}</label>
          <input 
            type="range" 
            min={carPrice * 0.1} 
            max={carPrice * 0.8} 
            step="1000"
            value={downPayment} 
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full accent-amber-400 bg-zinc-900 cursor-pointer"
          />
        </div>

        <div>
          <label className="text-xs text-zinc-400 block mb-2">Plazo del Crédito: {months} Meses</label>
          <select 
            value={months} 
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-amber-400"
          >
            <option value={24}>24 Meses</option>
            <option value={36}>36 Meses</option>
            <option value={48}>48 Meses</option>
            <option value={60}>60 Meses</option>
          </select>
        </div>
      </div>

      <div className="bg-black/50 border border-zinc-900 p-4 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-xs text-zinc-500 uppercase tracking-wider block">Cuota Estimada Mensual</span>
          <span className="text-2xl font-black text-amber-400">${Math.round(monthlyPayment).toLocaleString()} <span className="text-xs text-zinc-400 font-normal">/mes</span></span>
        </div>
        <p className="text-[10px] text-zinc-500 max-w-[200px] text-right">
          *Sujeto a aprobación crediticia con tasa preferencial del 0.99%.
        </p>
      </div>
    </div>
  );
}