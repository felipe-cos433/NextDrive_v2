import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Contextos
import { AuthProvider } from './context/AuthContext';
import { CarProvider } from './context/CarContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AppointmentProvider } from './context/AppointmentContext';

// Componentes
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

// Páginas
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CarDetail from './pages/CarDetail';
import Favorites from './pages/Favorites';
import Financing from './pages/Financing';
import Compare from './pages/Compare';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <CarProvider>
          <CartProvider>
            <FavoritesProvider>
              <AppointmentProvider>
                <div className="min-h-screen bg-slate-950 text-white flex flex-col relative overflow-hidden selection:bg-yellow-500 selection:text-slate-950">
                  
                  {/* 🏎️ Fondo Animado de Carro en Movimiento */}
                  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover scale-105 opacity-25 filter blur-[2px] brightness-75"
                    >
                      <source
                        src="https://assets.mixkit.co/videos/preview/mixkit-car-driving-on-a-street-at-night-4125-large.mp4"
                        type="video/mp4"
                      />
                    </video>
                    {/* Capas de gradiente para contraste y elegancia */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950" />
                    <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
                  </div>

                  {/* Capa principal del sitio */}
                  <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    
                    {/* Modales globales */}
                    <CartDrawer />
                    <CheckoutModal />

                    <main className="flex-grow">
                      <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                        <Route path="/" element={
                          <ProtectedRoute>
                            <Home />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="/catalog" element={
                          <ProtectedRoute>
                            <Catalog />
                          </ProtectedRoute>
                        } />

                        <Route path="/car/:id" element={
                          <ProtectedRoute>
                            <CarDetail />
                          </ProtectedRoute>
                        } />

                        <Route path="/favorites" element={
                          <ProtectedRoute>
                            <Favorites />
                          </ProtectedRoute>
                        } />

                        <Route path="/financing" element={
                          <ProtectedRoute>
                            <Financing />
                          </ProtectedRoute>
                        } />

                        <Route path="/compare" element={
                          <ProtectedRoute>
                            <Compare />
                          </ProtectedRoute>
                        } />

                        <Route path="/contact" element={
                          <ProtectedRoute>
                            <Contact />
                          </ProtectedRoute>
                        } />

                        <Route path="/admin" element={
                          <ProtectedRoute>
                            <AdminDashboard />
                          </ProtectedRoute>
                        } />
                        
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>

                    <Footer />
                  </div>

                </div>
              </AppointmentProvider>
            </FavoritesProvider>
          </CartProvider>
        </CarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;