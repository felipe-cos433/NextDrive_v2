import React, { useState } from 'react';
import { useCars } from '../context/CarContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Catalog() {
  const { cars } = useCars();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(300000);
  const [notification, setNotification] = useState('');

  // Filtro flexible que tolera variaciones en las propiedades del auto
  const filteredCars = (cars || []).filter((car) => {
    const carName = String(car.title || car.name || car.modelo || '').toLowerCase();
    const carBrand = String(car.brand || car.marca || '').toLowerCase();
    const carPrice = Number(car.price || car.precio || 0);
    const carCategory = car.category || car.categoria || 'Deportivo';

    const matchesSearch = carName.includes(searchTerm.toLowerCase()) || 
                          carBrand.includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todos' || 
                          carCategory.toLowerCase() === selectedCategory.toLowerCase();
    
    const matchesPrice = carPrice <= maxPrice || maxPrice >= 300000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (car) => {
    addToCart(car);
    setNotification(`¡"${car.title || car.name}" fue añadido al carrito! 🛒`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Título */}
      <div>
        <h1 className="text-3xl font-black text-white">
          Catálogo de <span className="text-yellow-500">Vehículos</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Explora nuestra flota exclusiva y encuentra tu próximo auto.</p>
      </div>

      {notification && (
        <div className="bg-yellow-500/10 border border-yellow-500/40 text-yellow-400 px-4 py-3 rounded-xl text-sm font-semibold">
          {notification}
        </div>
      )}

      {/* Sección de Filtros */}
      <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
        
        {/* Buscador por Texto */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Buscar Vehículo</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Ej. Porsche, BMW..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
          />
        </div>

        {/* Filtro por Categoría */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Categoría</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500"
          >
            <option value="Todos">Todas las categorías</option>
            <option value="Deportivo">Deportivo</option>
            <option value="SUV">SUV</option>
            <option value="Sedán">Sedán</option>
            <option value="Eléctrico">Eléctrico</option>
          </select>
        </div>

        {/* Filtro por Precio Máximo */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Precio Máximo</label>
            <span className="text-sm font-bold text-yellow-500">${maxPrice.toLocaleString('es-CO')}</span>
          </div>
          <input
            type="range"
            min="50000"
            max="300000"
            step="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-yellow-500 bg-slate-950 cursor-pointer"
          />
        </div>

      </div>

      {/* Listado de Vehículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-slate-900/40 border border-slate-800 rounded-2xl">
            <p className="text-slate-400 text-lg">No se encontraron vehículos con los filtros seleccionados.</p>
          </div>
        ) : (
          filteredCars.map((car) => {
            const price = Number(car.price || car.precio || 0);
            const title = car.title || car.name || car.modelo || 'Vehículo NextDrive';
            const image = car.image || car.img || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800';

            return (
              <div key={car.id} className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group hover:border-yellow-500/50 transition-all">
                
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-yellow-500 border border-slate-800 text-xs font-bold px-3 py-1 rounded-full">
                      {car.category || car.categoria || 'Deportivo'}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">{car.brand || car.marca} {car.year && `• ${car.year}`}</p>
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2">{car.description || 'Vehículo de alta gama disponible en NextDrive.'}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/60 mt-4">
                  <div>
                    <p className="text-xs text-slate-500">Precio</p>
                    <p className="text-xl font-black text-yellow-500">${price.toLocaleString('es-CO')}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link
                      to={`/car/${car.id}`}
                      className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors"
                    >
                      Detalles
                    </Link>
                    <button
                      onClick={() => handleAddToCart(car)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                      Comprar
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}