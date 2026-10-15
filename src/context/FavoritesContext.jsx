import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('nextdrive_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('nextdrive_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error("Error al guardar en localStorage", e);
    }
  }, [favorites]);

  const toggleFavorite = (car) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === car.id);
      if (exists) {
        return prev.filter((item) => item.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  const isFavorite = (carId) => {
    return favorites.some((item) => item.id === carId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}