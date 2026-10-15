import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const res = login(email, password);
      if (res.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/catalog');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black text-white pt-32 pb-16 px-4 flex justify-center items-center"
    >
      <div className="w-full max-w-md bg-zinc-950 p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Iniciar <span className="text-amber-500">Sesión</span>
        </h2>
        <p className="text-zinc-400 text-sm text-center mb-6">Accede a tu cuenta de NextDrive</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Correo Electrónico</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nextdrive.com o tu email"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 mt-2"
          >
            Ingresar
          </button>
        </form>

        <p className="text-xs text-zinc-400 text-center mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-amber-500 font-semibold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </motion.div>
  );
}