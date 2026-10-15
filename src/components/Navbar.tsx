import React from 'react';
import { ScreenType, UserProfile } from '../types';
import { sound } from '../utils/audio';
import { Sparkles, User, Award } from 'lucide-react';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onOpenAccount: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  user,
  onOpenAccount,
  onOpenAuth,
}) => {
  const navItems: { label: string; screen: ScreenType }[] = [
    { label: 'Inicio', screen: 'home' },
    { label: 'Explorar', screen: 'explore' },
    { label: 'Materias', screen: 'math' },
    { label: 'Retos', screen: 'challenges' },
  ];

  const handleNavClick = (screen: ScreenType) => {
    sound.playPop();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sky-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          {/* Visual Logo mark matching screenshot */}
          <div className="relative flex items-center justify-center w-11 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 p-[2px] shadow-sm group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#001D4A] rounded-[10px] flex items-center justify-center overflow-hidden relative">
              <span className="text-[13px] font-black tracking-wider text-cyan-300 font-display">ABA</span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full blur-[1px]"></div>
            </div>
          </div>
          
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black tracking-tight text-[#0047AB] font-display">ABA</span>
            <span className="hidden sm:inline-block text-[11px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
              Kids
            </span>
          </div>
        </div>

        {/* Center Navigation Pill bar */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center bg-[#EBF0FF] p-1.5 rounded-full border border-blue-100/80 shadow-inner">
          {navItems.map((item) => {
            const isActive = 
              currentScreen === item.screen || 
              (item.screen === 'math' && ['math', 'language', 'biology', 'english', 'videos'].includes(currentScreen));

            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.screen)}
                className={`relative px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-white/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* XP pill */}
          <button
            onClick={() => {
              sound.playGem();
              onOpenAccount();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-full text-xs font-bold transition-colors"
            title="Tus Gemas y XP"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
            <span className="tabular-nums">{user.xp} XP</span>
            <span className="text-amber-400">·</span>
            <span className="tabular-nums">⭐ {user.starGems}</span>
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenAuth('login');
            }}
            className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50/70 rounded-full transition-colors whitespace-nowrap"
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => {
              sound.playPop();
              onOpenAuth('register');
            }}
            className="px-4.5 py-1.5 text-xs sm:text-sm font-extrabold text-white bg-[#0052CC] hover:bg-[#0043A8] rounded-full btn-tactile-primary transition-all whitespace-nowrap shadow-sm"
          >
            Registrarse
          </button>

          {/* User Profile Avatar Icon button */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenAccount();
            }}
            aria-label="Abrir Perfil"
            className="relative p-2 rounded-full text-slate-600 hover:text-blue-600 hover:bg-sky-50 border border-slate-200 transition-all flex items-center justify-center group"
          >
            <div className="w-7 h-7 rounded-full bg-cyan-100 border-2 border-cyan-500 flex items-center justify-center text-sm font-bold text-cyan-800 overflow-hidden shadow-xs">
              {user.avatar ? (
                <span>{user.avatar}</span>
              ) : (
                <User className="w-4 h-4 text-cyan-700" />
              )}
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav pills bar */}
      <div className="flex md:hidden overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-100 gap-2 scrollbar-none">
        {navItems.map((item) => {
          const isActive = 
            currentScreen === item.screen || 
            (item.screen === 'math' && ['math', 'language', 'biology', 'english', 'videos'].includes(currentScreen));
          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.screen)}
              className={`px-3.5 py-1 text-xs font-bold rounded-full whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
