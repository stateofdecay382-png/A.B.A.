import React, { useState } from 'react';
import { UserProfile } from '../types';
import { sound } from '../utils/audio';
import { 
  X, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Award, 
  ShieldCheck, 
  Check, 
  Star,
  User,
  Zap
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

const AVATARS = ['🧑‍🚀', '🚀', '⭐', '🛸', '🤖', '🦊', '🦁', '🌟'];

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [soundEnabled, setSoundEnabled] = useState(user.soundEnabled);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playSuccess();
    onUpdateUser({
      name: name.trim() || 'Aventurero',
      avatar: selectedAvatar,
      soundEnabled,
    });
    sound.setEnabled(soundEnabled);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sound.setEnabled(nextVal);
    if (nextVal) {
      sound.playPop();
    }
  };

  const xpPercent = Math.min(100, Math.round((user.xp / user.nextLevelXp) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0052CC] to-cyan-500 text-white flex items-center justify-center text-2xl shadow-sm">
            {selectedAvatar}
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 font-display">Mi Cuenta ABA</h2>
            <p className="text-xs font-bold text-slate-500">Perfil de Aventurero Autónomo</p>
          </div>
        </div>

        {/* Level and XP Card */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl p-5 text-white mb-6 space-y-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-sky-100">
              Nivel de Explorador
            </span>
            <span className="text-lg font-black font-display bg-white/20 px-3 py-0.5 rounded-full">
              Nivel {user.level}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span>{user.xp} XP acumulados</span>
              <span>Meta: {user.nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-cyan-300 h-full rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${xpPercent}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-sky-100 pt-1">
            <span className="flex items-center gap-1">
              ⭐ <strong className="text-white tabular-nums">{user.starGems}</strong> Gemas Estelares
            </span>
            <span className="flex items-center gap-1">
              🔥 <strong className="text-white tabular-nums">{user.streakDays}</strong> Días de Racha
            </span>
          </div>
        </div>

        {/* Edit Name & Pick Avatar */}
        <div className="space-y-5">
          <div>
            <label className="text-xs font-black text-slate-700 block mb-1.5 uppercase tracking-wide">
              Nombre del Explorador:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-blue-500 font-bold text-slate-800 outline-none transition-colors"
              placeholder="Escribe tu apodo..."
            />
          </div>

          <div>
            <label className="text-xs font-black text-slate-700 block mb-2 uppercase tracking-wide">
              Elige tu Avatar Favorito:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {AVATARS.map((av) => (
                <button
                  key={av}
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setSelectedAvatar(av);
                  }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all border-2 ${
                    selectedAvatar === av
                      ? 'bg-blue-50 border-blue-600 scale-110 shadow-sm'
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>

          {/* Sound Preferences */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-blue-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <p className="text-sm font-extrabold text-slate-800">Efectos de Sonido</p>
                <p className="text-xs text-slate-500">Campanadas y sonidos alegres de logros</p>
              </div>
            </div>

            <button
              type="button"
              onClick={toggleSound}
              className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
            </button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Perfil Protegido</span>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#0041A3] text-white font-extrabold rounded-full text-sm btn-tactile-primary transition-all flex items-center gap-2"
          >
            {savedNotice ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Guardado!</span>
              </>
            ) : (
              <span>Guardar Cambios</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
