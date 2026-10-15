import React, { useState, useEffect } from 'react';
import { ScreenType, UserProfile } from '../../types';
import { sound } from '../../utils/audio';
import { 
  ArrowLeft, 
  Tv, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Share2,
  Film
} from 'lucide-react';

interface VideosScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onAddXp: (amount: number, gems: number) => void;
}

interface VideoCapsule {
  id: string;
  title: string;
  duration: string;
  topic: string;
  summary: string;
  gradient: string;
  fact: string;
  question: {
    text: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const CAPSULES: VideoCapsule[] = [
  {
    id: 'stars',
    title: '¿Por qué brillan las estrellas en la noche?',
    duration: '2:15',
    topic: 'Astronomía Infantil',
    summary: 'Las estrellas son gigantescos hornos cósmicos que fusionan hidrógeno para crear helio, liberando luz y calor radiante a través del espacio infinito.',
    gradient: 'from-blue-900 via-indigo-900 to-purple-900',
    fact: 'El Sol es la estrella más cercana a nosotros y tarda 8 minutos en enviarnos su luz.',
    question: {
      text: '¿Qué producen las estrellas en su interior para brillar?',
      options: ['Queman madera', 'Fusionan átomos liberando luz y energía', 'Reflejan espejos gigantes'],
      correct: 1,
      explanation: '¡Exacto! La fusión nuclear en el núcleo estelar libera energía en forma de luz.',
    },
  },
  {
    id: 'water',
    title: 'El gran viaje circular de una gota de agua',
    duration: '1:45',
    topic: 'Ciencias de la Tierra',
    summary: 'Desde los océanos hacia el cielo en vapor, formando nubes esponjosas, hasta caer como lluvia y alimentar ríos de vuelta al mar.',
    gradient: 'from-cyan-900 via-blue-900 to-teal-900',
    fact: 'El agua que bebes hoy puede haber sido bebida por un dinosaurio hace millones de años.',
    question: {
      text: '¿Cómo se llama cuando el agua líquida se convierte en vapor con el calor del sol?',
      options: ['Evaporación', 'Congelación', 'Fotosíntesis'],
      correct: 0,
      explanation: '¡Brillante! El calor del sol evapora el agua líquida hacia la atmósfera.',
    },
  },
  {
    id: 'trees',
    title: '¿Cómo se comunican los árboles bajo tierra?',
    duration: '2:30',
    topic: 'Ecosistemas & Bosques',
    summary: 'A través de redes de hongos subterráneas llamadas micorrizas, los árboles comparten azúcares, agua y avisos de peligro como un Internet natural.',
    gradient: 'from-emerald-900 via-teal-950 to-slate-900',
    fact: '¡Los científicos llaman a esta red subterránea el "Wood Wide Web"!',
    question: {
      text: '¿Qué usan los árboles para enviarse nutrientes y mensajes bajo la tierra?',
      options: ['Redes de hongos microscópicos', 'Cables telefónicos antiguos', 'Burbujas de aire'],
      correct: 0,
      explanation: '¡Excelente! La red micorrízica conecta las raíces de todo el bosque.',
    },
  },
];

export const VideosScreen: React.FC<VideosScreenProps> = ({ onNavigate, user, onAddXp }) => {
  const [selectedCapsule, setSelectedCapsule] = useState<VideoCapsule>(CAPSULES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            sound.playSuccess();
            onAddXp(25, 0);
            return 100;
          }
          return prev + 2;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectVideo = (capsule: VideoCapsule) => {
    sound.playPop();
    setSelectedCapsule(capsule);
    setIsPlaying(false);
    setProgress(0);
    setQuizAnswered(false);
    setSelectedOption(null);
  };

  const handleQuizAnswer = (idx: number) => {
    if (quizAnswered) return;
    setSelectedOption(idx);
    setQuizAnswered(true);

    if (idx === selectedCapsule.question.correct) {
      sound.playSuccess();
      onAddXp(40, 1);
    } else {
      sound.playPop();
    }
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
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>Volver al Universo ABA</span>
        </button>

        <span className="px-3.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider border border-emerald-200">
          Audiovisual & Cápsulas
        </span>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <Tv className="w-3.5 h-3.5 text-emerald-200" />
            Estación Audiovisual
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Cápsulas Científicas Ilustradas
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl font-medium">
            Minidocumentales y explicaciones animadas para descubrir los misterios de la ciencia y la naturaleza.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white text-center shrink-0">
          <Film className="w-6 h-6 text-yellow-300 mx-auto mb-1" />
          <p className="text-xs font-bold text-emerald-100">Cápsulas Disponibles</p>
          <p className="text-xl font-black font-display tabular-nums">3 Módulos</p>
        </div>
      </div>

      {/* Main Video Theatre & Playlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Simulated Video Player */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm space-y-6">
          {/* Video Screen Box */}
          <div className={`relative aspect-video rounded-3xl overflow-hidden bg-gradient-to-br ${selectedCapsule.gradient} shadow-2xl flex flex-col justify-between p-6 text-white border-4 border-slate-900`}>
            {/* Ambient Animated Cosmos particles */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/60 pointer-events-none"></div>

            {/* Video Header HUD */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-cyan-300 border border-white/10">
                {selectedCapsule.topic}
              </span>
              <span className="text-xs font-mono bg-black/40 px-2.5 py-1 rounded-full">
                {selectedCapsule.duration}
              </span>
            </div>

            {/* Center Play Graphic and Title */}
            <div className="relative z-10 text-center my-auto space-y-3">
              <button
                onClick={() => {
                  sound.playPop();
                  setIsPlaying(!isPlaying);
                }}
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/30 transform hover:scale-110 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
              </button>
              <h3 className="text-xl sm:text-2xl font-black font-display tracking-tight max-w-lg mx-auto">
                {selectedCapsule.title}
              </h3>
            </div>

            {/* Video Progress Bar & Controls */}
            <div className="relative z-10 space-y-2 pt-2">
              <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-cyan-400 h-full rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/80">
                <span className="font-mono">{progress}% reproducido</span>
                <button
                  onClick={() => {
                    sound.playPop();
                    setProgress(0);
                    setIsPlaying(true);
                  }}
                  className="hover:text-white flex items-center gap-1 font-bold"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reiniciar
                </button>
              </div>
            </div>
          </div>

          {/* Video Description and Fun Fact */}
          <div className="space-y-4 pt-2">
            <div>
              <h4 className="text-lg font-black text-slate-900 font-display">Resumen Educativo</h4>
              <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed mt-1">
                {selectedCapsule.summary}
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-emerald-900 uppercase">Dato Curioso ABA</p>
                <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-0.5">
                  {selectedCapsule.fact}
                </p>
              </div>
            </div>
          </div>

          {/* Mini Checkpoint Quiz */}
          <div className="bg-sky-50/60 border-2 border-sky-100 rounded-2xl p-5 space-y-3">
            <p className="text-xs font-black uppercase text-blue-700">Comprueba lo que aprendiste (+40 XP):</p>
            <p className="text-sm sm:text-base font-extrabold text-slate-800">
              {selectedCapsule.question.text}
            </p>

            <div className="space-y-2">
              {selectedCapsule.question.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isRight = idx === selectedCapsule.question.correct;

                let style = "bg-white hover:bg-sky-100/60 border-slate-200 text-slate-700";
                if (quizAnswered) {
                  if (isRight) style = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                  else if (isSelected) style = "bg-rose-50 border-rose-300 text-rose-900";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx)}
                    disabled={quizAnswered}
                    className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-semibold text-left transition-all flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    {quizAnswered && isRight && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </button>
                );
              })}
            </div>

            {quizAnswered && (
              <p className="text-xs font-bold text-emerald-800 bg-emerald-100/70 p-3 rounded-xl">
                {selectedCapsule.question.explanation}
              </p>
            )}
          </div>
        </div>

        {/* Right: Playlist */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 border-2 border-slate-100 shadow-sm space-y-4">
          <h4 className="text-sm font-black text-slate-900 font-display flex items-center gap-2">
            <Film className="w-4 h-4 text-emerald-600" />
            Cápsulas del Cosmos
          </h4>

          <div className="space-y-3">
            {CAPSULES.map((cap) => (
              <div
                key={cap.id}
                onClick={() => handleSelectVideo(cap)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedCapsule.id === cap.id
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-1">
                  <span>{cap.topic}</span>
                  <span className="font-mono">{cap.duration}</span>
                </div>
                <h5 className="font-extrabold text-sm text-slate-900 font-display leading-snug">
                  {cap.title}
                </h5>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600">
            <p className="font-bold text-slate-800 mb-1">✨ Diseñado para Niños</p>
            <p>Contenido educativo libre de anuncios, seguro y validado pedagógicamente para incentivar el autoaprendizaje.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
