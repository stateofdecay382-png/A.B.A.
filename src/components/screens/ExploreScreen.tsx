import React from 'react';
import { ScreenType, UserProfile } from '../../types';
import { sound } from '../../utils/audio';
import { 
  ArrowLeft, 
  Compass, 
  Calculator, 
  BookOpen, 
  Microscope, 
  Globe2, 
  Tv, 
  Trophy, 
  Sparkles,
  Rocket
} from 'lucide-react';

interface ExploreScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ onNavigate, user }) => {
  const planets = [
    {
      screen: 'math' as ScreenType,
      name: 'Planeta Numérico',
      subject: 'Matemáticas',
      desc: 'Operaciones cósmicas, dados y retos lógicos',
      icon: Calculator,
      color: 'from-blue-600 to-sky-400',
      bgColor: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      screen: 'language' as ScreenType,
      name: 'Galaxia Cuentacuentos',
      subject: 'Lenguaje',
      desc: 'Fábulas, aventuras y letras mágicas flotantes',
      icon: BookOpen,
      color: 'from-teal-600 to-emerald-400',
      bgColor: 'bg-teal-50 border-teal-200 text-teal-700',
    },
    {
      screen: 'biology' as ScreenType,
      name: 'Nebulosa Bio-Vida',
      subject: 'Biología',
      desc: 'Microscopio virtual y secretos de las células',
      icon: Microscope,
      color: 'from-purple-600 to-indigo-400',
      bgColor: 'bg-purple-50 border-purple-200 text-purple-700',
    },
    {
      screen: 'english' as ScreenType,
      name: 'Estación Global English',
      subject: 'Inglés',
      desc: 'Pronunciación divertida, flashcards y canciones',
      icon: Globe2,
      color: 'from-sky-500 to-blue-600',
      bgColor: 'bg-sky-50 border-sky-200 text-sky-700',
    },
    {
      screen: 'videos' as ScreenType,
      name: 'Cine Cósmico',
      subject: 'Videos Informativos',
      desc: 'Cápsulas científicas y documentales ilustrados',
      icon: Tv,
      color: 'from-emerald-600 to-teal-500',
      bgColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    },
    {
      screen: 'challenges' as ScreenType,
      name: 'Arena de Campeones',
      subject: 'Retos & Competencias',
      desc: 'Gemas estelares, copas de honor y misiones',
      icon: Trophy,
      color: 'from-indigo-600 to-violet-500',
      bgColor: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Volver al Inicio</span>
        </button>

        <span className="px-3.5 py-1 bg-cyan-50 text-cyan-800 rounded-full text-xs font-black uppercase tracking-wider border border-cyan-200">
          Mapa Estelar Interactivo
        </span>
      </div>

      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-extrabold">
          <Compass className="w-4 h-4 text-blue-600" />
          <span>Explorador Autónomo</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
          Elige tu Destino en el Cosmos
        </h1>
        <p className="text-base text-slate-600 font-medium">
          Cada estación espacial tiene misiones pensadas para que aprendas jugando y a tu propio ritmo.
        </p>
      </div>

      {/* Grid of Planets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planets.map((planet) => {
          const IconComponent = planet.icon;
          return (
            <div
              key={planet.screen}
              onClick={() => {
                sound.playPop();
                onNavigate(planet.screen);
              }}
              className="bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-sky-300 transition-all btn-tactile-card cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${planet.bgColor} group-hover:scale-105 transition-transform shadow-xs`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                    {planet.subject}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 font-display mb-1 group-hover:text-blue-600 transition-colors">
                  {planet.name}
                </h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  {planet.desc}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-black text-sm">
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Despegar ahora
                </span>
                <span>→</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
