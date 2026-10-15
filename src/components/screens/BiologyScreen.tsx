import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../../types';
import { sound } from '../../utils/audio';
import { 
  ArrowLeft, 
  Microscope, 
  Sparkles, 
  ZoomIn, 
  Info, 
  CheckCircle2, 
  Layers, 
  Eye,
  Sliders
} from 'lucide-react';

interface BiologyScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onAddXp: (amount: number, gems: number) => void;
}

interface Specimen {
  id: string;
  name: string;
  category: string;
  description: string;
  bgColor: string;
  structures: {
    name: string;
    description: string;
    x: number;
    y: number;
  }[];
}

const SPECIMENS: Specimen[] = [
  {
    id: 'plant',
    name: 'Célula Vegetal (Hoja Verde)',
    category: 'Botánica',
    description: 'Posee una resistente pared celular de celulosa y cloroplastos verdes que convierten la luz solar en alimento.',
    bgColor: 'from-emerald-950 via-teal-950 to-slate-950',
    structures: [
      { name: 'Cloroplasto', description: 'Pequeñas fábricas verdes donde ocurre la fotosíntesis con luz solar.', x: 35, y: 40 },
      { name: 'Núcleo Celular', description: 'El centro de comando con las instrucciones genéticas de la planta.', x: 65, y: 35 },
      { name: 'Pared Celular', description: 'Estructura rígida que protege la célula y le da forma poligonal.', x: 50, y: 80 },
    ],
  },
  {
    id: 'animal',
    name: 'Célula Animal (Tejido)',
    category: 'Zoología',
    description: 'Célula flexible sin pared celular, equipada con mitocondrias para producir energía y un núcleo definido.',
    bgColor: 'from-purple-950 via-indigo-950 to-slate-950',
    structures: [
      { name: 'Mitocondria', description: 'Centrales energéticas de la célula que queman nutrientes para darnos fuerza.', x: 30, y: 55 },
      { name: 'Membrana Plasmática', description: 'Capa protectora que decide qué nutrientes entran y qué desechos salen.', x: 70, y: 65 },
      { name: 'Núcleo', description: 'Almacena el ADN que define cómo somos y crecemos.', x: 50, y: 30 },
    ],
  },
  {
    id: 'butterfly',
    name: 'Ala de Mariposa',
    category: 'Micro-Ecosistemas',
    description: 'Miles de diminutas escamas superpuestas como tejas en un tejado que reflejan la luz en colores iridiscentes.',
    bgColor: 'from-blue-950 via-sky-950 to-slate-950',
    structures: [
      { name: 'Escama Iridiscente', description: 'Estructuras microscópicas que descomponen la luz como un prisma.', x: 45, y: 45 },
      { name: 'Vena Alar', description: 'Conductos huecos que dan soporte y rigidez a las alas para volar.', x: 65, y: 70 },
    ],
  },
];

export const BiologyScreen: React.FC<BiologyScreenProps> = ({ onNavigate, user, onAddXp }) => {
  const [selectedSpecimen, setSelectedSpecimen] = useState<Specimen>(SPECIMENS[0]);
  const [zoom, setZoom] = useState<'10x' | '40x' | '100x'>('40x');
  const [focus, setFocus] = useState<number>(50);
  const [activeHotspot, setActiveHotspot] = useState<{ name: string; description: string } | null>(null);
  const [discovered, setDiscovered] = useState<string[]>([]);

  const handleSelectHotspot = (item: { name: string; description: string }) => {
    sound.playGem();
    setActiveHotspot(item);
    if (!discovered.includes(item.name)) {
      setDiscovered((prev) => [...prev, item.name]);
      onAddXp(30, 1);
    }
  };

  const getZoomScale = () => {
    switch (zoom) {
      case '10x': return 'scale-90';
      case '40x': return 'scale-110';
      case '100x': return 'scale-135';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-purple-600" />
          <span>Volver al Universo ABA</span>
        </button>

        <span className="px-3.5 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-black uppercase tracking-wider border border-purple-200">
          Mundo Vivo
        </span>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-sky-600 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <Microscope className="w-3.5 h-3.5 text-purple-200" />
            Estación de Biología
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Microscopio Virtual & Células
          </h1>
          <p className="text-purple-100 text-sm sm:text-base max-w-xl font-medium">
            Observa muestras biológicas en alta resolución, ajusta aumentos y descubre los secretos del mundo vivo.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white text-center shrink-0">
          <p className="text-xs font-bold text-purple-100">Estructuras Descubiertas</p>
          <p className="text-2xl font-black font-display tabular-nums">
            {discovered.length} / 8 ⭐
          </p>
        </div>
      </div>

      {/* Microscope Viewport & Control Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Microscope Circular Lens Stage */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-6 sm:p-8 border-4 border-slate-800 shadow-xl flex flex-col items-center justify-between relative overflow-hidden">
          <div className="w-full flex items-center justify-between text-slate-300 text-xs font-mono mb-4 z-10">
            <span className="flex items-center gap-1.5 font-sans font-bold text-cyan-400">
              <Eye className="w-4 h-4" />
              Lente Ocular: {zoom}
            </span>
            <span className="font-sans font-bold">Muestra: {selectedSpecimen.name}</span>
          </div>

          {/* Circular Lens Stage */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-8 border-slate-700 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center my-4">
            {/* Specimen Cellular Backdrop */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${selectedSpecimen.bgColor} transition-all duration-500 ${getZoomScale()}`}
              style={{
                filter: `blur(${Math.abs(focus - 50) * 0.12}px)`,
              }}
            >
              {/* Organic procedural patterns */}
              <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400 via-transparent to-transparent"></div>
              
              {/* Hotspot buttons inside lens */}
              {selectedSpecimen.structures.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleSelectHotspot(item)}
                  style={{ top: `${item.y}%`, left: `${item.x}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-cyan-500 border-2 border-white items-center justify-center text-[10px] font-black text-slate-900 shadow-md">
                      +
                    </span>
                  </span>
                  <span className="absolute left-8 top-0 whitespace-nowrap bg-black/80 backdrop-blur-sm text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-md border border-cyan-500/40 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Lens Grid Crosshairs */}
            <div className="absolute inset-0 border border-cyan-500/10 rounded-full pointer-events-none"></div>
            <div className="absolute w-full h-[1px] bg-cyan-400/20 pointer-events-none"></div>
            <div className="absolute h-full w-[1px] bg-cyan-400/20 pointer-events-none"></div>
          </div>

          {/* Lens Bottom HUD */}
          <div className="w-full flex items-center justify-between text-xs text-slate-400 z-10 pt-2 border-t border-slate-800">
            <span>Toca los puntos (+) para analizar</span>
            <span className="text-emerald-400 font-bold">Enfoque: {focus === 50 ? 'Óptimo 100%' : `${100 - Math.abs(focus - 50) * 2}%`}</span>
          </div>
        </div>

        {/* Right: Specimen Rack & Hotspot Inspection Deck */}
        <div className="lg:col-span-4 space-y-6">
          {/* Specimen Slide Selector */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-xs space-y-3">
            <h4 className="text-sm font-black text-slate-900 font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" />
              Portaobjetos (Muestras)
            </h4>

            <div className="space-y-2">
              {SPECIMENS.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedSpecimen(spec);
                    setActiveHotspot(null);
                  }}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-bold transition-all border flex items-center justify-between ${
                    selectedSpecimen.id === spec.id
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <p className="font-extrabold text-sm">{spec.name}</p>
                    <p className="text-[11px] text-slate-500 font-semibold">{spec.category}</p>
                  </div>
                  {selectedSpecimen.id === spec.id && (
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Controls: Zoom & Focus */}
          <div className="bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-xs space-y-4">
            <div>
              <label className="text-xs font-extrabold text-slate-700 block mb-2">
                Aumento del Objetivo:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['10x', '40x', '100x'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      sound.playPop();
                      setZoom(lvl);
                    }}
                    className={`py-2 text-xs font-black rounded-xl border transition-all ${
                      zoom === lvl
                        ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 mb-1">
                <span>Tornillo Micrométrico (Enfoque):</span>
                <span className="tabular-nums font-mono text-purple-600">{focus}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={focus}
                onChange={(e) => setFocus(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400 mt-1">Alinea al 50 para máxima nitidez visual</p>
            </div>
          </div>

          {/* Active Hotspot Inspector card */}
          {activeHotspot && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-3xl p-5 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 text-purple-800 font-black text-sm">
                <Info className="w-4 h-4 text-purple-600" />
                <span>Estructura: {activeHotspot.name}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {activeHotspot.description}
              </p>
              <div className="pt-2">
                <span className="inline-block text-[11px] font-extrabold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  +30 XP y 1 Gema desbloqueada
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
