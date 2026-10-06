import { createContext, useState, useEffect } from "react";
import { carsData as initialCars } from "../data/carsData";

export const CarContext = createContext();

export function CarProvider({ children }) {
  const [cars, setCars] = useState(() => {
    const savedCars = localStorage.getItem("nextdrive_cars_db");
    return savedCars ? JSON.parse(savedCars) : initialCars;
  });

  useEffect(() => {
    localStorage.setItem("nextdrive_cars_db", JSON.stringify(cars));
  }, [cars]);

  const addCar = (newCar) => {
    const carWithId = { id: Date.now(), ...newCar };
    setCars((prevCars) => [carWithId, ...prevCars]);
  };

  const deleteCar = (id) => {
    setCars((prevCars) => prevCars.filter((car) => car.id !== id));
  };

  return (
    <CarContext.Provider value={{ cars, addCar, deleteCar }}>
      {children}
    </CarContext.Provider>
  );
}