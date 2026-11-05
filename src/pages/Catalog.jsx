import React, { useState, useMemo } from 'react';
import { useCars } from '../context/CarContext';
import { useCart } from '../context/CartContext';
import { formatCOP } from '../utils/helpers';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const { cars } = useCars();
  const { addToCart } = useCart();

  // Estados para Filtros y Buscador
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(2000000000); // 2.000 Millones COP
  const [sortBy, setSortBy] = useState('default');

  const categories = ['Todos', 'Deportivo', 'Sedán', 'Camioneta'];

  // Filtrado y Ordenamiento Dinámico
  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        const matchesCategory = selectedCategory === 'Todos' || car.category === selectedCategory;
        const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              car.brand.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = car.price <= maxPrice;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year-desc') return b.year - a.year;
        return 0;
      });
  }, [cars, selectedCategory, searchTerm, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-10 text-slate-100">
      
      {/* Encabezado Principal */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
          Inventario Certificado • Medellín
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Catálogo Exclusivo
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Explora nuestra selección de superdeportivos y vehículos de alta gama listos para entrega inmediata.
        </p>
      </div>

      {/* PANEL DE FILTROS Y BÚSQUEDA */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Buscador de Texto */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Buscar Modelo o Marca
            </label>
            <input
              type="text"
              placeholder="Ej. Porsche, Ferrari..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          {/* Ordenamiento */}
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
              Ordenar Por
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-500 font-bold"
            >
              <option value="default">Destacados</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="year-desc">Año: Más Reciente</option>
            </select>
          </div>

          {/* Filtro por Rango de Precio */}
          <div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1.5">
              <span>Precio Máximo:</span>
              <span className="text-yellow-400">{formatCOP(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="400000000"
              max="2000000000"
              step="50000000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-yellow-500 bg-slate-900 rounded-lg h-2 cursor-pointer mt-2"
            />
          </div>
        </div>

        {/* Botones de Categorías */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                  selectedCategory === cat
                    ? 'bg-yellow-500 text-slate-950 border-yellow-500 shadow-md shadow-yellow-500/10'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-slate-400 text-xs font-bold">
            Mostrando <span className="text-yellow-400">{filteredCars.length}</span> de {cars.length} vehículos
          </span>
        </div>

      </div>

      {/* REJILLA DE VEHÍCULOS */}
      {filteredCars.length === 0 ? (
        <div className="glass-card p-12 rounded-3xl text-center space-y-4 border border-slate-800 max-w-lg mx-auto">
          <div className="text-4xl">🔍</div>
          <h3 className="text-lg font-bold text-white">No se encontraron resultados</h3>
          <p className="text-slate-400 text-xs">
            Intenta ajustar los términos de búsqueda o ampliar el rango de precios para visualizar más modelos.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('Todos');
              setMaxPrice(2000000000);
            }}
            className="px-6 py-2.5 bg-yellow-500 text-slate-950 font-bold rounded-xl text-xs"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-yellow-500/40 transition flex flex-col justify-between group"
            >
              <div>
                {/* Imagen y Categoria */}
                <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                    {car.category}
                  </span>
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                    <span>{car.brand}</span>
                    <span>Año {car.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition">
                    {car.name}
                  </h3>

                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {car.description}
                  </p>

                  <div className="text-yellow-400 font-black text-xl pt-2 border-t border-slate-800/80">
                    {formatCOP(car.price)}
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="p-6 pt-0 flex gap-3">
                <Link
                  to={`/car/${car.id}`}
                  className="flex-1 text-center py-3 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Ficha Técnica
                </Link>
                <button
                  onClick={() => addToCart(car)}
                  className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/10"
                >
                  Reservar VIP
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}