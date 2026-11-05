import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirige al login guardando la ruta origen para regresar tras autenticarse
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}