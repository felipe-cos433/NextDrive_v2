import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Si no está logueado, redirige al login
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    // Si requiere ser admin y no lo es, redirige al inicio o catálogo
    return <Navigate to="/catalog" replace />;
  }

  return children;
}