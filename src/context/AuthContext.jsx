import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado del usuario actual logueado
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nextdrive_logged_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Base de datos simulada de usuarios registrados en localStorage
  const [usersDb, setUsersDb] = useState(() => {
    const savedDb = localStorage.getItem('nextdrive_users_db');
    // Creamos un admin por defecto si no existe
    return savedDb ? JSON.parse(savedDb) : [
      { name: 'Administrador', email: 'admin@nextdrive.com', password: '123', role: 'admin' }
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('nextdrive_logged_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nextdrive_logged_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('nextdrive_users_db', JSON.stringify(usersDb));
  }, [usersDb]);

  const register = (name, email, password, role = 'client') => {
    const existing = usersDb.find(u => u.email === email);
    if (existing) {
      return { success: false, message: 'El correo electrónico ya está registrado.' };
    }
    const newUser = { name, email, password, role };
    setUsersDb([...usersDb, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const found = usersDb.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'Correo o contraseña incorrectos.' };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, usersDb, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}