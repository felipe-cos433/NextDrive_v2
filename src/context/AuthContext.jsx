import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Recuperar usuario con sesión activa
    const savedUser = localStorage.getItem('nextdrive_active_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Función de Iniciar Sesión
  const login = (email, password) => {
    // 1. Verificar credenciales de Admin hardcodeadas (opcional/testing)
    if (email === 'admin@nextdrive.com' && password === '123456') {
      const adminUser = { id: 1, name: 'Administrador', email, role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('nextdrive_active_user', JSON.stringify(adminUser));
      return true;
    }

    // 2. Buscar en la lista de usuarios registrados en localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('nextdrive_users') || '[]');
    const foundUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const activeUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email, role: foundUser.role || 'client' };
      setUser(activeUser);
      localStorage.setItem('nextdrive_active_user', JSON.stringify(activeUser));
      return true;
    }

    return false; // Credenciales incorrectas
  };

  // Función de Registro
  const register = (name, email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem('nextdrive_users') || '[]');

    // Validar si el usuario ya existe
    const exists = registeredUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      alert('El correo ya está registrado. Por favor inicia sesión.');
      return false;
    }

    // Crear y guardar el nuevo usuario
    const newUser = { id: Date.now(), name, email, password, role: 'client' };
    registeredUsers.push(newUser);
    localStorage.setItem('nextdrive_users', JSON.stringify(registeredUsers));

    // Autologin directo al registrarse
    const activeUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUser(activeUser);
    localStorage.setItem('nextdrive_active_user', JSON.stringify(activeUser));

    return true;
  };

  // Función de Cerrar Sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('nextdrive_active_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de AuthProvider');
  }
  return context;
};