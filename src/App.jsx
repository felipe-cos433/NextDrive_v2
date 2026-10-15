import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail';
import Contact from './pages/Contact';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import Financing from './pages/Financing'; // 👈 1. IMPORTA AQUÍ EL COMPONENTE DE FINANCIACIÓN
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './components/common/Toast';

export default function App() {
  return (
    <AuthProvider>
      <CarProvider>
        <AppointmentProvider>
          <FavoritesProvider>
            <ToastProvider>
              <Router>
                <div className="bg-black min-h-screen text-white font-sans selection:bg-amber-400 selection:text-black">
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/car/:id" element={<CarDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/compare" element={<Compare />} />
                    <Route path="/financing" element={<Financing />} /> {/* 👈 2. AÑADE LA RUTA AQUÍ */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Ruta protegida para Administradores */}
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute adminOnly={true}>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </div>
              </Router>
            </ToastProvider>
          </FavoritesProvider>
        </AppointmentProvider>
      </CarProvider>
    </AuthProvider>
  );
}