import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('nextdrive_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nextdrive_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (car) => {
    setFavorites(prev => {
      const exists = prev.find(item => item.id === car.id);
      if (exists) {
        return prev.filter(item => item.id !== car.id);
      } else {
        return [...prev, car];
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}