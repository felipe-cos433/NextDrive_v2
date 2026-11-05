import React, { createContext, useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('nextdrive_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [pendingAction, setPendingAction] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Función de inicio de sesión simplificada (Admin o Usuario)
  const login = (email, password, name = 'Usuario') => {
    // Definimos el rol de manera estricta según el correo o la selección
    const isAdmin = email.toLowerCase().includes('admin');
    const userRole = isAdmin ? 'admin' : 'usuario';
    
    const newUser = {
      name: name || (isAdmin ? 'Administrador' : 'Juan Felipe'),
      email: email,
      role: userRole // 'admin' o 'usuario'
    };

    setUser(newUser);
    localStorage.setItem('nextdrive_user', JSON.stringify(newUser));

    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }

    // Redirección inteligente según el rol
    const origin = location.state?.from?.pathname || (userRole === 'admin' ? '/admin' : '/catalog');
    navigate(origin, { replace: true });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nextdrive_user');
    setPendingAction(null);
    navigate('/');
  };

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