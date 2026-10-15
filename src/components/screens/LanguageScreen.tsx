import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../../types';
import { sound } from '../../utils/audio';
import { 
  ArrowLeft, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  Check, 
  RotateCcw, 
  Star, 
  Lightbulb,
  Zap
} from 'lucide-react';

interface LanguageScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onAddXp: (amount: number, gems: number) => void;
}

interface StoryParagraph {
  text: string;
  question?: {
    q: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

const STORY = {
  title: 'El Pequeño Cometa Curioso',
  author: 'Universo ABA Cuentos',
  paragraphs: [
    {
      text: 'En una esquina resplandeciente de la Vía Láctea vivía Pipo, un cometa pequeñito con una cola de polvo dorado. A diferencia de los cometas mayores que viajaban en línea recta sin detenerse, a Pipo le encantaba frenar a saludar a cada asteroide.',
    },
    {
      text: 'Un día, una vieja estrella sabia le dijo: "El universo está lleno de misterios esperando ser descubiertos por quienes saben hacer buenas preguntas". Pipo encendió su brillo con entusiasmo y prometió aprender una palabra nueva cada día.',
      question: {
        q: '¿Qué le aconsejó la estrella sabia a Pipo?',
        options: [
          'Viajar lo más rápido posible sin mirar a los lados',
          'Aprender y hacer buenas preguntas para descubrir misterios',
          'Esconder su brillo para que nadie lo viera',
        ],
        correct: 1,
        explanation: '¡Exacto! La curiosidad y las preguntas son la clave para aprender en ABA.',
      },
    },
    {
      text: 'Desde entonces, Pipo vuela sonriente creando constelaciones de letras brillantes en el firmamento para que todos los niños del planeta Tierra puedan leer cuentos maravillosos antes de dormir.',
    },
  ],
};

const WORDS_TO_SPELL = [
  { target: 'ESTRELLA', hint: 'Cuerpo celeste que brilla en la noche' },
  { target: 'PLANETA', hint: 'Mundo redondo que gira alrededor del sol' },
  { target: 'COHETE', hint: 'Vehículo espacial que viaja al espacio' },
  { target: 'GALAXIA', hint: 'Gran espiral llena de millones de estrellas' },
];

export const LanguageScreen: React.FC<LanguageScreenProps> = ({ onNavigate, user, onAddXp }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'words'>('story');
  
  // Story comprehension state
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);

  // Floating letters game state
  const [wordIdx, setWordIdx] = useState(0);
  const currentWordObj = WORDS_TO_SPELL[wordIdx];
  const [assembled, setAssembled] = useState<string[]>([]);
  const [wordCompleted, setWordCompleted] = useState(false);

  // Scramble the target word letters
  const scrambled = React.useMemo(() => {
    return currentWordObj.target.split('').sort(() => 0.5 - Math.random());
  }, [wordIdx]);

  const handleSelectQuiz = (idx: number) => {
    if (quizAnswered) return;
    setSelectedQuizIdx(idx);
    setQuizAnswered(true);
    if (idx === STORY.paragraphs[1].question?.correct) {
      sound.playSuccess();
      onAddXp(40, 1);
    } else {
      sound.playPop();
    }
  };

  const handleLetterClick = (letter: string) => {
    if (wordCompleted) return;
    sound.playPop();
    const nextAssembled = [...assembled, letter];
    setAssembled(nextAssembled);

    // Check if fully spelled
    if (nextAssembled.length === currentWordObj.target.length) {
      const spelled = nextAssembled.join('');
      if (spelled === currentWordObj.target) {
        sound.playSuccess();
        setWordCompleted(true);
        onAddXp(50, 1);
      } else {
        // Reset after short delay
        setTimeout(() => {
          setAssembled([]);
        }, 600);
      }
    }
  };

  const handleNextWord = () => {
    sound.playPop();
    setAssembled([]);
    setWordCompleted(false);
    setWordIdx((prev) => (prev + 1) % WORDS_TO_SPELL.length);
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
          <ArrowLeft className="w-4 h-4 text-teal-600" />
          <span>Volver al Universo ABA</span>
        </button>

        <div className="flex items-center gap-2 bg-[#E6FAF7] p-1 rounded-full border border-teal-200">
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('story');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'story'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-teal-900 hover:bg-white/60'
            }`}
          >
            Fábulas & Cuentos
          </button>
          <button
            onClick={() => {
              sound.playPop();
              setActiveTab('words');
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'words'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-teal-900 hover:bg-white/60'
            }`}
          >
            Letras Flotantes
          </button>
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <BookOpen className="w-3.5 h-3.5 text-teal-200" />
            Estación de Lenguaje & Expresión
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Cuentos & Letras Mágicas
          </h1>
          <p className="text-teal-100 text-sm sm:text-base max-w-xl font-medium">
            Desarrolla tu vocabulario, comprensión lectora e imaginación en cada historia.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white shrink-0">
          <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          <div>
            <p className="text-xs font-bold text-teal-100">Palabras Dominadas</p>
            <p className="text-xl font-black font-display tabular-nums">4 / 4 Estelares</p>
          </div>
        </div>
      </div>

      {activeTab === 'story' ? (
        /* Fábulas & Cuentos View */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-sm space-y-8">
          <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Cuento Ilustrado</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                {STORY.title}
              </h2>
            </div>
            <button
              onClick={() => sound.playPop()}
              className="p-2.5 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 transition-colors"
              title="Escuchar narración"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 font-medium text-base sm:text-lg leading-relaxed">
            <p>{STORY.paragraphs[0].text}</p>
            <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-100 text-teal-950 font-serif italic text-lg text-center">
              "El universo está lleno de misterios esperando ser descubiertos por quienes saben hacer buenas preguntas."
            </div>
            <p>{STORY.paragraphs[1].text}</p>

            {/* In-story Comprehension checkpoint */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50/60 border-2 border-sky-200 rounded-3xl p-6 not-prose my-6">
              <div className="flex items-center gap-2 text-blue-700 font-black text-sm mb-3">
                <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Desafío de Comprensión Lectora (+40 XP)</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-900 font-display mb-4">
                {STORY.paragraphs[1].question?.q}
              </p>

              <div className="space-y-2.5">
                {STORY.paragraphs[1].question?.options.map((opt, idx) => {
                  const isSelected = selectedQuizIdx === idx;
                  const isCorrect = idx === STORY.paragraphs[1].question?.correct;

                  let style = "bg-white hover:bg-sky-100/70 border border-slate-200 text-slate-800";
                  if (quizAnswered) {
                    if (isCorrect) style = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                    else if (isSelected) style = "bg-rose-50 border-rose-400 text-rose-900";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuiz(idx)}
                      disabled={quizAnswered}
                      className={`w-full p-3.5 rounded-xl text-left text-sm font-semibold transition-all flex items-center justify-between ${style}`}
                    >
                      <span>{opt}</span>
                      {quizAnswered && isCorrect && <Check className="w-5 h-5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>

              {quizAnswered && (
                <div className="mt-4 text-xs sm:text-sm font-bold text-teal-800 bg-teal-100/60 p-3 rounded-xl">
                  {STORY.paragraphs[1].question?.explanation}
                </div>
              )}
            </div>

            <p>{STORY.paragraphs[2].text}</p>
          </div>
        </div>
      ) : (
        /* Letras Flotantes Word Game */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-sm space-y-8 text-center">
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Desafío de Ortografía</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
              Construye la Palabra Cósmica
            </h2>
            <p className="text-slate-500 font-semibold text-sm mt-1">
              Pista: {currentWordObj.hint}
            </p>
          </div>

          {/* Word Slots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-6 flex-wrap">
            {currentWordObj.target.split('').map((char, idx) => {
              const filledChar = assembled[idx];
              return (
                <div
                  key={idx}
                  className={`w-12 h-14 sm:w-14 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-black font-display transition-all ${
                    filledChar
                      ? 'bg-teal-600 border-teal-700 text-white shadow-md scale-105'
                      : 'bg-slate-50 border-dashed border-slate-300 text-slate-300'
                  }`}
                >
                  {filledChar || '_'}
                </div>
              );
            })}
          </div>

          {/* Available Letter Tiles */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400">Toca las letras en el orden correcto:</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {scrambled.map((letter, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLetterClick(letter)}
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-sky-50 hover:bg-sky-100 text-blue-700 font-black text-xl sm:text-2xl rounded-2xl border-2 border-sky-200 btn-tactile-cyan transition-all"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {wordCompleted && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto text-emerald-900">
              <p className="font-extrabold text-base">¡Palabra completada con éxito! 🎉</p>
              <p className="text-xs font-semibold mt-1">Has desbloqueado +50 XP y 1 Gema Estelar.</p>
              <button
                onClick={handleNextWord}
                className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs shadow-xs transition-colors"
              >
                Siguiente Palabra →
              </button>
            </div>
          )}

          <div className="pt-4 flex justify-center">
            <button
              onClick={() => {
                sound.playPop();
                setAssembled([]);
                setWordCompleted(false);
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 p-2 rounded-xl"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Limpiar letras</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
