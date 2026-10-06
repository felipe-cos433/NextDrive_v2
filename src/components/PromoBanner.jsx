import { useState, useEffect } from 'react';

const promos = [
  "🔥 ¡Bono de descuento de $2,000 USD en vehículos seleccionados este mes!",
  "⚡ Financiación disponible con tasa preferencial del 0.99% interanual.",
  "🚗 Agendar tu Test Drive hoy mismo no tiene ningún costo ni compromiso."
];

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 text-slate-950 font-bold text-xs py-2 px-4 text-center tracking-wide shadow-inner overflow-hidden relative">
      <div className="transition-all duration-500 transform">
        {promos[currentIndex]}
      </div>
    </div>
  );
}