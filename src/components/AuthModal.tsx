import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { X, Rocket, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode: 'login' | 'register';
  onSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [nickname, setNickname] = useState('');
  const [age, setAge] = useState('7');
  const [favoriteColor, setFavoriteColor] = useState('Azul Cósmico');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    const finalName = nickname.trim() || (mode === 'register' ? 'Capitán Estelar' : 'Aventurero');
    onSuccess(finalName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white relative">
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0052CC] to-cyan-400 text-white flex items-center justify-center mx-auto shadow-sm">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display">
            {mode === 'login' ? '¡Bienvenido de vuelta!' : '¡Únete al Universo ABA!'}
          </h3>
          <p className="text-xs font-semibold text-slate-500">
            {mode === 'login'
              ? 'Ingresa tu nombre para continuar tu progreso'
              : 'Crea tu perfil rápido para guardar tus estrellas y XP'}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setMode('login');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playPop();
              setMode('register');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Registrarse Gratis
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Nombre o Apodo de Aventurero:
            </label>
            <input
              type="text"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Ej: Sofi, Mateo, Leo..."
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-500 font-bold text-slate-800 outline-none transition-colors text-sm"
            />
          </div>

          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Edad:</label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl border-2 border-slate-200 font-bold text-slate-800 outline-none text-xs bg-white"
                >
                  <option value="5">5 años</option>
                  <option value="6">6 años</option>
                  <option value="7">7 años</option>
                  <option value="8">8 años</option>
                  <option value="9">9 años</option>
                  <option value="10">10+ años</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Color de Traje:</label>
                <select
                  value={favoriteColor}
                  onChange={(e) => setFavoriteColor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-2xl border-2 border-slate-200 font-bold text-slate-800 outline-none text-xs bg-white"
                >
                  <option value="Azul Cósmico">Azul Cósmico</option>
                  <option value="Cyan Eléctrico">Cyan Eléctrico</option>
                  <option value="Violeta Estelar">Violeta Estelar</option>
                  <option value="Verde Neón">Verde Neón</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#0052CC] hover:bg-[#0041A3] text-white font-black text-sm rounded-full btn-tactile-primary transition-all flex items-center justify-center gap-2 mt-4"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>{mode === 'login' ? 'Entrar a Jugar' : '¡Despegar al Cosmos!'}</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Acceso seguro sin contraseñas complicadas</span>
        </div>
      </div>
    </div>
  );
};
