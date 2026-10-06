import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { carsData } from '../data/carsData';
import { FavoritesContext } from '../context/FavoritesContext';
import { AppointmentContext } from '../context/AppointmentContext';
import { useToast } from '../components/common/Toast';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import FinancingSimulator from '../components/FinancingSimulator';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const car = carsData.find(c => c.id === Number(id)) || carsData[0];
  
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { addAppointment } = useContext(AppointmentContext);
  
  const isFavorite = favorites.some(item => item.id === car.id);

  // Estado para el formulario del Test Drive
  const [formData, setFormData] = useState({ clientName: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTestDrive = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      addAppointment({
        carModel: car.name,
        ...formData
      });
      setIsSubmitting(false);
      showToast('¡Test Drive agendado con éxito!');
      setFormData({ clientName: '', email: '', phone: '' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-16">
      <button 
        onClick={() => navigate(-1)}
        className="text-zinc-400 hover:text-amber-400 text-xs font-bold mb-6 flex items-center gap-2 transition"
      >
        ← Volver
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Imagen y Acciones Rápidas */}
        <div>
          <div className="relative rounded-2xl overflow-hidden border border-zinc-900 shadow-2xl mb-6">
            <img src={car.image} alt={car.name} className="w-full h-[400px] object-cover" />
            <button
              onClick={() => {
                toggleFavorite(car);
                showToast(isFavorite ? 'Eliminado de favoritos' : 'Añadido a favoritos');
              }}
              className="absolute top-4 right-4 bg-black/70 backdrop-blur-md p-3 rounded-full border border-zinc-800 text-amber-400 hover:scale-110 transition shadow-lg"
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </div>

          <FinancingSimulator carPrice={car.price || 85000} />
        </div>

        {/* Información y Formulario de Cita */}
        <div className="space-y-6">
          <div>
            <span className="bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {car.category || 'Deportivo'}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">{car.name}</h1>
            <p className="text-2xl font-black text-amber-400 mt-2">${car.price?.toLocaleString()}</p>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed">
            {car.description || 'Vehículo de altas prestaciones diseñado para ofrecer la máxima experiencia de lujo, potencia y seguridad absoluta en cada kilómetro recorrido.'}
          </p>

          {/* Formulario de Agendamiento Test Drive */}
          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-2xl shadow-xl">
            <h3 className="text-lg font-bold mb-4">Agendar Prueba de Manejo</h3>
            <form onSubmit={handleTestDrive} className="space-y-4">
              <Input 
                label="Nombre Completo" 
                placeholder="Ej. Carlos Pérez" 
                value={formData.clientName}
                onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                required
              />
              <Input 
                label="Correo Electrónico" 
                type="email"
                placeholder="correo@ejemplo.com" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
              <Input 
                label="Teléfono" 
                placeholder="+57 300 000 0000" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
              <div className="pt-2">
                <Button type="submit" isLoading={isSubmitting} className="w-full">
                  Confirmar Cita Test Drive
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}