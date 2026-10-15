import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../../types';
import { sound } from '../../utils/audio';
import { 
  ArrowLeft, 
  Trophy, 
  Medal, 
  Sparkles, 
  Flame, 
  Star, 
  Award, 
  CheckCircle,
  Timer,
  Zap,
  Crown
} from 'lucide-react';

interface ChallengesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onAddXp: (amount: number, gems: number) => void;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  gems: number;
}

const LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Sofi Estelar', avatar: '🚀', xp: 2450, gems: 48 },
  { rank: 2, name: 'Mateo Cósmico', avatar: '🧑‍🚀', xp: 2180, gems: 42 },
  { rank: 3, name: 'Valentina Neo', avatar: '✨', xp: 1950, gems: 36 },
  { rank: 4, name: 'Lucas Galaxia', avatar: '🛸', xp: 1720, gems: 29 },
  { rank: 5, name: 'Camila Nova', avatar: '🌟', xp: 1540, gems: 24 },
];

export const ChallengesScreen: React.FC<ChallengesScreenProps> = ({ onNavigate, user, onAddXp }) => {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const [challengeStep, setChallengeStep] = useState(0);
  const [streakCount, setStreakCount] = useState(5);
  const [claimedReward, setClaimedReward] = useState(false);

  const handleClaimDailyGems = () => {
    if (claimedReward) return;
    sound.playLevelUp();
    setClaimedReward(true);
    onAddXp(100, 3);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-indigo-600" />
          <span>Volver al Universo ABA</span>
        </button>

        <span className="px-3.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-wider border border-indigo-200">
          Arena de Desafíos
        </span>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            Arena Estelar de Campeones
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Retos, Copas & Gemas
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl font-medium">
            Supera desafíos diarios a tu propio ritmo, desbloquea insignias de honor y celebra tu progreso.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shrink-0">
          <div className="text-center">
            <p className="text-xs font-bold text-indigo-200">Tus Gemas</p>
            <p className="text-2xl font-black font-display text-amber-300 tabular-nums">⭐ {user.starGems}</p>
          </div>
          <div className="h-8 w-[1px] bg-white/20"></div>
          <div className="text-center">
            <p className="text-xs font-bold text-indigo-200">Racha</p>
            <p className="text-2xl font-black font-display text-orange-300 tabular-nums">🔥 {streakCount} Días</p>
          </div>
        </div>
      </div>

      {/* Grid: Daily Missions & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Active Daily Missions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Daily Mystery Chest */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-black uppercase tracking-wider">
                Cofre Diario Cósmico
              </span>
              <span className="text-xs font-bold text-amber-100 flex items-center gap-1">
                <Timer className="w-3.5 h-3.5" /> Se renueva cada 24h
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-inner">
                🎁
              </div>
              <div>
                <h3 className="text-xl font-black font-display">Recompensa de Exploración</h3>
                <p className="text-xs text-amber-100 font-medium mt-0.5">
                  ¡Aprender todos los días despierta tu genialidad!
                </p>
              </div>
            </div>

            <button
              onClick={handleClaimDailyGems}
              disabled={claimedReward}
              className={`w-full py-3.5 rounded-full font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                claimedReward
                  ? 'bg-amber-800/40 text-amber-200 cursor-default'
                  : 'bg-white text-orange-700 hover:bg-amber-50 active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{claimedReward ? '¡Reclamado hoy! (+100 XP & 3 Gemas)' : 'Abrir Cofre (+100 XP & 3 Gemas)'}</span>
            </button>
          </div>

          {/* Quest list */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600" />
              Misiones Semanales ABA
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                    🧮
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Maestro de las Cifras</h4>
                    <p className="text-xs text-slate-500">Resuelve 5 problemas matemáticos</p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Completado ✔
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-lg">
                    📖
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Lector Galáctico</h4>
                    <p className="text-xs text-slate-500">Descubre una fábula completa</p>
                  </div>
                </div>
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                  En progreso (85%)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                    🔬
                  </span>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">Ojo de Lince Microscópico</h4>
                    <p className="text-xs text-slate-500">Inspecciona 3 estructuras celulares</p>
                  </div>
                </div>
                <span className="text-xs font-black text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Disponible
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Friendly Leaderboard */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 font-display flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Aventureros Destacados
            </h3>
            <span className="text-xs font-bold text-slate-400">Esta semana</span>
          </div>

          <div className="space-y-2.5">
            {LEADERBOARD.map((item) => (
              <div
                key={item.name}
                className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                  item.rank === 1
                    ? 'bg-amber-50/70 border-amber-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                    item.rank === 1 ? 'bg-amber-400 text-amber-950' :
                    item.rank === 2 ? 'bg-slate-300 text-slate-800' :
                    item.rank === 3 ? 'bg-amber-600 text-white' : 'text-slate-400'
                  }`}>
                    {item.rank}
                  </span>
                  <span className="text-xl">{item.avatar}</span>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">{item.name}</p>
                    <p className="text-xs font-bold text-blue-600 tabular-nums">{item.xp} XP</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full tabular-nums">
                    ⭐ {item.gems}
                  </span>
                </div>
              </div>
            ))}

            {/* Current user's card */}
            <div className="p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-400 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                  ★
                </span>
                <span className="text-xl">{user.avatar}</span>
                <div>
                  <p className="text-sm font-black text-blue-900">{user.name} (Tú)</p>
                  <p className="text-xs font-bold text-blue-700 tabular-nums">{user.xp} XP</p>
                </div>
              </div>

              <span className="text-xs font-extrabold text-amber-800 bg-amber-200/80 px-2.5 py-1 rounded-full tabular-nums">
                ⭐ {user.starGems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
