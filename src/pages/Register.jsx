import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('client'); // Por defecto cliente
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = register(name, email, password, role);
    if (res.success) {
      if (role === 'admin') navigate('/admin');
      else navigate('/');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-amber-400 font-bold text-xs tracking-widest uppercase bg-amber-400/10 px-3 py-1.5 rounded-full">
            Nuevo Usuario
          </span>
          <h1 className="text-3xl font-extrabold font-Montserrat text-white">Registro</h1>
          <p className="text-slate-400 text-xs">Crea una cuenta en NextDrive.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1">Nombre Completo</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu Nombre"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1">Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1">Tipo de Cuenta (Rol)</label>
            <select 
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400"
            >
              <option value="client">Cliente / Comprador</option>
              <option value="admin">Administrador (Gestión)</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg"
          >
            Registrarse
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
          ¿Ya tienes cuenta? <Link to="/login" className="text-amber-400 font-semibold hover:underline">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}