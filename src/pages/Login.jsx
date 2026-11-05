import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(name || 'Juan Felipe');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-black text-white">Iniciar Sesión</h1>
          <p className="text-slate-400 text-xs">
            Ingresa tu nombre para activar las funciones interactivas de la plataforma.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-bold block mb-1">Tu Nombre</label>
            <input
              type="text"
              required
              placeholder="Ej. Juan Felipe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/20"
          >
            Ingresar
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-400">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-yellow-400 font-bold hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}