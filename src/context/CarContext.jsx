import React, { createContext, useContext, useState, useEffect } from 'react';

const CarContext = createContext();

const INITIAL_CARS = [
  {
    id: 1,
    title: 'NextDrive Apex GT',
    brand: 'Porsche',
    category: 'Deportivo',
    price: 225000,
    year: 2026,
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200',
    description: 'Deportivo de altas prestaciones con motor bóxer atmosférico y máxima aerodinámica.'
  },
  {
    id: 2,
    title: 'NextDrive Urban Cross',
    brand: 'Tesla',
    category: 'SUV',
    price: 48000,
    year: 2025,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200',
    description: 'SUV 100% eléctrico con gran autonomía, espacio interior optimizado y piloto automático.'
  },
  {
    id: 3,
    title: 'NextDrive Titan Pro',
    brand: 'Land Rover',
    category: 'Camioneta',
    price: 85000,
    year: 2026,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200',
    description: 'Resistencia y potencia máxima para todo terreno sin sacrificar confort en cabina.'
  },
  {
    id: 4,
    title: 'BMW M4 Competition',
    brand: 'BMW',
    category: 'Deportivo',
    price: 98000,
    year: 2024,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=1200',
    description: 'Rendimiento excepcional con motor TwinPower Turbo de 510 CV y tracción xDrive.'
  },
  {
    id: 5,
    title: 'Mercedes-AMG GT Coupe',
    brand: 'Mercedes',
    category: 'Deportivo',
    price: 175000,
    year: 2024,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200',
    description: 'Diseño imponente y potencia V8 biturbo con tracción total variable.'
  },
  {
    id: 6,
    title: 'Audi RS Q8',
    brand: 'Audi',
    category: 'SUV',
    price: 130000,
    year: 2024,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&q=80&w=1200',
    description: 'El SUV deportivo definitivo de Audi Sport con 600 CV de pura potencia.'
  },
  {
    id: 7,
    title: 'Toyota Supra GR',
    brand: 'Toyota',
    category: 'Deportivo',
    price: 55000,
    year: 2024,
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&q=80&w=1200',
    description: 'Leyenda deportiva japonesa con motor turbo de 6 cilindros en línea.'
  },
  {
    id: 8,
    title: 'Porsche Taycan Turbo S',
    brand: 'Porsche',
    category: 'Eléctrico',
    price: 190000,
    year: 2024,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
    description: 'Sedán eléctrico de alto rendimiento con arquitectura de 800 voltios y 761 CV.'
  },
  {
    id: 9,
    title: 'BMW M5 CS',
    brand: 'BMW',
    category: 'Sedán',
    price: 142000,
    year: 2023,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1200',
    description: 'El sedán ejecutivo más potente de la división M con 635 CV.'
  },
  {
    id: 10,
    title: 'Honda Civic Type R',
    brand: 'Honda',
    category: 'Sedán',
    price: 45000,
    year: 2024,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200',
    description: 'Hatchback/Sedán deportivo de tracción delantera de alto rendimiento.'
  }
];

export function CarProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem('nextdrive_cars');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validar que los objetos guardados tengan un precio numérico real
        if (Array.isArray(parsed) && parsed.length >= 10 && !isNaN(parsed[0]?.price)) {
          return parsed;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_CARS;
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_cars', JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar) => {
    const carWithId = { id: Date.now(), ...newCar, price: Number(newCar.price) };
    setCars((prev) => [carWithId, ...prev]);
  };

  const deleteCar = (id) => {
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
}

export const useCars = () => useContext(CarContext);