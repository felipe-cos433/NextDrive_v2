import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-black min-h-screen text-white">
      
      {/* Efectos de luces de fondo (Glows difuminados dorados) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[600px] right-[-200px] w-[500px] h-[500px] bg-yellow-600/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center space-y-8">
        <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-xs tracking-widest uppercase px-4 py-2 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          ✨ La nueva era de la conducción exclusiva
        </span>
        
        <h1 className="text-4xl md:text-7xl font-extrabold font-Montserrat tracking-tight max-w-4xl leading-tight">
          Experimenta el Poder y el Lujo con <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">NextDrive</span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          Explora nuestro catálogo exclusivo de vehículos de alta gama. Diseñado para quienes exigen rendimiento, elegancia y seguridad absoluta en cada kilómetro.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Link 
            to="/catalog" 
            className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl transition shadow-lg shadow-amber-500/25 btn-gold-glow"
          >
            Ver Catálogo Exclusivo
          </Link>
          <Link 
            to="/contact" 
            className="bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 text-white font-semibold px-8 py-4 rounded-2xl transition btn-gold-glow hover:border-amber-400"
          >
            Contactar Asesor
          </Link>
        </div>
      </section>

      {/* Sección de Ventajas / Publicidad Destacada */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-950/80 border border-amber-500/20 p-8 rounded-3xl space-y-3 hover:border-amber-400/60 transition-all duration-300 group">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 font-bold text-xl group-hover:scale-110 transition">
            🛡️
          </div>
          <h3 className="text-xl font-bold font-Montserrat text-white">Garantía Certificada</h3>
          <p className="text-slate-400 text-sm">Cada vehículo pasa por más de 150 puntos de inspección técnica rigurosa antes de ser entregado.</p>
        </div>

        <div className="bg-zinc-950/80 border border-amber-500/20 p-8 rounded-3xl space-y-3 hover:border-amber-400/60 transition-all duration-300 group">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 font-bold text-xl group-hover:scale-110 transition">
            ⚡
          </div>
          <h3 className="text-xl font-bold font-Montserrat text-white">Test Drive Inmediato</h3>
          <p className="text-slate-400 text-sm">Agenda tu prueba de manejo en línea de forma rápida y disfruta de una experiencia sin igual.</p>
        </div>

        <div className="bg-zinc-950/80 border border-amber-500/20 p-8 rounded-3xl space-y-3 hover:border-amber-400/60 transition-all duration-300 group">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 font-bold text-xl group-hover:scale-110 transition">
            💎
          </div>
          <h3 className="text-xl font-bold font-Montserrat text-white">Financiación a Medida</h3>
          <p className="text-slate-400 text-sm">Planes de pago flexibles adaptados a tus necesidades con aprobación en minutos.</p>
        </div>
      </section>

    </div>
  );
}