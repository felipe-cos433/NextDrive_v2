import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showAlert } from '../utils/helpers';

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password || password.length < 4) {
      showAlert.error('Contraseña requerida', 'La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    login(email, password, name);
    showAlert.success('¡Bienvenido!', 'Sesión iniciada correctamente.');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 text-slate-100">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
            Acceso a NextDrive
          </span>
          <h1 className="text-2xl font-black text-white">Iniciar Sesión</h1>
          <p className="text-slate-400 text-xs">
            Usa un correo con la palabra <strong className="text-yellow-400">admin</strong> para ingresar como Administrador, o cualquier otro correo para ingresar como Usuario.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-bold block mb-1">Nombre / Usuario</label>
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
              placeholder="admin@nextdrive.com o usuario@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="text-slate-300 font-bold block mb-1">Contraseña 🔒</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg shadow-yellow-500/20"
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}