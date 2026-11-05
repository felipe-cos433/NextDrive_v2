import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Visitante navegando libremente
  const [pendingAction, setPendingAction] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const login = (userName) => {
    const newUser = { name: userName || 'Juan Felipe' };
    setUser(newUser);

    // Si había una acción pendiente (ej. presionar un botón de cotizar), se ejecuta ahora
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }

    // Regresa a la vista donde estaba o al Inicio
    const origin = location.state?.from?.pathname || '/';
    navigate(origin, { replace: true });
  };

  const logout = () => {
    setUser(null);
    setPendingAction(null);
    navigate('/');
  };

  // Solo se invoca manualmente cuando el usuario presiona un botón de función interactiva
  const requireAuth = (actionCallback) => {
    if (!user) {
      setPendingAction(() => actionCallback);
      navigate('/login', { state: { from: location } });
    } else {
      actionCallback();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);