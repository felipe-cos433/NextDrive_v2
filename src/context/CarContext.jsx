import React, { createContext, useContext, useState, useEffect } from 'react';

const CarContext = createContext();

// Clave v3 para forzar al navegador a cargar únicamente estos 5 vehículos
const LOCAL_STORAGE_KEY = 'nextdrive_cars_v3';

const INITIAL_CARS = [
  {
    id: '1',
    name: 'Porsche 911 GT3 RS',
    brand: 'Porsche',
    price: 1250000000,
    category: 'Deportivo',
    year: 2024,
    description: 'Motor atmosférico de 4.0 litros, 525 CV y aerodinámica de carreras de circuito homologado para calle.',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2',
    name: 'Lamborghini Huracán Sterrato',
    brand: 'Lamborghini',
    price: 1450000000,
    category: 'Deportivo',
    year: 2024,
    description: 'Motor V10 de 5.2 Litros diseñado para el máximo rendimiento en asfalto y tierra con tracción integral.',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '3',
    name: 'Ferrari 296 GTB',
    brand: 'Ferrari',
    price: 1680000000,
    category: 'Deportivo',
    year: 2024,
    description: 'Motor V6 Turbo Híbrido que entrega 830 CV de potencia combinada con aceleración brutal.',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '4',
    name: 'BMW M5 Competition',
    brand: 'BMW',
    price: 780000000,
    category: 'Sedán',
    year: 2023,
    description: 'Sedán ejecutivo de altísimo rendimiento con motor V8 M TwinPower Turbo y tracción xDrive.',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '5',
    name: 'Mercedes-AMG G 63',
    brand: 'Mercedes-Benz',
    price: 1150000000,
    category: 'Camioneta',
    year: 2024,
    description: 'La camioneta todoterreno definitiva con motor V8 Biturbo de 585 CV y acabados de lujo industrial.',
    image: 'https://images.unsplash.com/photo-1520050206274-a1ae44613e6d?auto=format&fit=crop&w=1200&q=80'
  }
];

export function CarProvider({ children }) {
  const [cars, setCars] = useState(() => {
    try {
      const savedCars = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedCars ? JSON.parse(savedCars) : INITIAL_CARS;
    } catch {
      return INITIAL_CARS;
    }
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar) => {
    const carWithId = {
      ...newCar,
      id: Date.now().toString(),
      price: Number(newCar.price)
    };
    setCars((prevCars) => [carWithId, ...prevCars]);
  };

  const updateCar = (id, updatedData) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === id ? { ...car, ...updatedData, price: Number(updatedData.price) } : car))
    );
  };

  const deleteCar = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
}

export const useCars = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars debe ser usado dentro de un CarProvider');
  }
  return context;
};