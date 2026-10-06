import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      navigate('/admin'); // Si es admin, lo manda al panel
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-amber-400 font-bold text-xs tracking-widest uppercase bg-amber-400/10 px-3 py-1.5 rounded-full">
            Seguridad NextDrive
          </span>
          <h1 className="text-3xl font-extrabold font-Montserrat text-white">Iniciar Sesión</h1>
          <p className="text-slate-400 text-xs">Accede al panel de administración o tu cuenta.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-xs font-semibold mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nextdrive.com"
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

          <button 
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg"
          >
            Ingresar
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-800 text-xs text-slate-400">
          ¿No tienes una cuenta? <Link to="/register" className="text-amber-400 font-semibold hover:underline">Regístrate aquí</Link>
        </div>
      </div>
    </div>
  );
}