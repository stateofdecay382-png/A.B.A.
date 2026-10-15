import React from 'react';
import { ShieldCheck, Sparkles, User, HelpCircle, Lock } from 'lucide-react';
import { sound } from '../utils/audio';

interface FooterProps {
  onOpenAccount: () => void;
  onOpenSupport: (topic: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAccount, onOpenSupport }) => {
  return (
    <>
      <footer className="w-full bg-white border-t border-slate-200 mt-20 pt-10 pb-12 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-slate-100">
            {/* Brand & Kid-Safe Tagline */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
              <div className="flex items-center gap-2.5">
                <span className="font-extrabold text-xl text-[#0047AB] font-display">ABA Kids</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wide bg-[#00E5FF]/20 text-[#00626E] border border-[#00E5FF]/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00626E]" />
                  100% Seguro
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-500 max-w-sm">
                Aprendizaje Básico Autónomo guiado por curiosidad y diversión.
              </p>
            </div>

            {/* Support and Safety Navigation */}
            <nav className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-slate-600">
              <button
                onClick={() => {
                  sound.playPop();
                  onOpenSupport('soporte');
                }}
                className="hover:text-blue-600 transition-colors"
              >
                Centro de Soporte
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={() => {
                  sound.playPop();
                  onOpenSupport('privacidad');
                }}
                className="hover:text-blue-600 transition-colors"
              >
                Protección Infantil y Privacidad
              </button>
              <span className="text-slate-300">·</span>
              <button
                onClick={() => {
                  sound.playPop();
                  onOpenSupport('familias');
                }}
                className="hover:text-blue-600 transition-colors"
              >
                Guía para Familias
              </button>
            </nav>

            {/* Quick Access Button & Copyright */}
            <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
              <button
                onClick={() => {
                  sound.playPop();
                  onOpenAccount();
                }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Acceso Rápido Aventureros
              </button>
              <p className="text-xs text-slate-400">
                © 2024 ABA Kids. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button "Mi Cuenta ABA ⭐" pinned to bottom-right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            sound.playGem();
            onOpenAccount();
          }}
          className="group relative flex items-center gap-2.5 px-6 py-3.5 bg-[#0052CC] hover:bg-[#0041A3] text-white font-extrabold text-sm sm:text-base rounded-full shadow-xl shadow-blue-500/25 btn-tactile-primary transition-all duration-150"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span>Mi Cuenta ABA</span>
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-[#002D72] text-xs font-black">
            ★
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-400 border-2 border-white"></span>
          </span>
        </button>
      </div>
    </>
  );
};
