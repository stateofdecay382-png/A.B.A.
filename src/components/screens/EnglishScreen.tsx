import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../../types';
import { sound } from '../../utils/audio';
import { 
  ArrowLeft, 
  Globe2, 
  Volume2, 
  Sparkles, 
  Check, 
  Smile, 
  RotateCw,
  Zap,
  Music
} from 'lucide-react';

interface EnglishScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onAddXp: (amount: number, gems: number) => void;
}

interface EnglishCard {
  word: string;
  translation: string;
  emoji: string;
  sentence: string;
  sentenceTranslation: string;
}

const VOCABULARY: EnglishCard[] = [
  {
    word: 'Rocket',
    translation: 'Cohete',
    emoji: '🚀',
    sentence: 'The rocket flies to Mars!',
    sentenceTranslation: '¡El cohete vuela hacia Marte!',
  },
  {
    word: 'Star',
    translation: 'Estrella',
    emoji: '⭐',
    sentence: 'Look at that bright star!',
    sentenceTranslation: '¡Mira esa estrella brillante!',
  },
  {
    word: 'Astronaut',
    translation: 'Astronauta',
    emoji: '🧑‍🚀',
    sentence: 'The astronaut walks on the moon.',
    sentenceTranslation: 'El astronauta camina sobre la luna.',
  },
  {
    word: 'Earth',
    translation: 'Tierra',
    emoji: '🌍',
    sentence: 'Earth is our blue home.',
    sentenceTranslation: 'La Tierra es nuestro hogar azul.',
  },
  {
    word: 'Friend',
    translation: 'Amigo / Amiga',
    emoji: '🤝',
    sentence: 'Hello, my cosmic friend!',
    sentenceTranslation: '¡Hola, mi amigo cósmico!',
  },
];

export const EnglishScreen: React.FC<EnglishScreenProps> = ({ onNavigate, user, onAddXp }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = VOCABULARY[currentIdx];

  const speakText = (text: string) => {
    sound.playPop();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextCard = () => {
    sound.playPop();
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIdx((prev) => (prev + 1) % VOCABULARY.length);
  };

  const handleCheckQuiz = (choice: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(choice);
    const correct = choice === current.translation;
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      onAddXp(35, 1);
    } else {
      sound.playPop();
    }
  };

  // Generate 4 randomized choices including the correct translation
  const choices = React.useMemo(() => {
    const list = [current.translation];
    const others = VOCABULARY.filter(v => v.translation !== current.translation)
      .map(v => v.translation)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [...list, ...others].sort(() => 0.5 - Math.random());
  }, [currentIdx]);

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
          <ArrowLeft className="w-4 h-4 text-sky-600" />
          <span>Volver al Universo ABA</span>
        </button>

        <span className="px-3.5 py-1 bg-sky-50 text-sky-700 rounded-full text-xs font-black uppercase tracking-wider border border-sky-200">
          Global Kids
        </span>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <Globe2 className="w-3.5 h-3.5 text-sky-200" />
            Estación de Inglés
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Space English Academy
          </h1>
          <p className="text-sky-100 text-sm sm:text-base max-w-xl font-medium">
            Aprende pronunciación en inglés con tarjetas sonoras, canciones y frases para conversar con exploradores del mundo.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-white text-center shrink-0">
          <p className="text-xs font-bold text-sky-100">Tarjeta Activa</p>
          <p className="text-2xl font-black font-display tabular-nums">
            {currentIdx + 1} / {VOCABULARY.length}
          </p>
        </div>
      </div>

      {/* Flashcard Showcase & Interactive Quiz */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Tactile English Flashcard */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-sm flex flex-col items-center text-center space-y-6">
          <span className="text-6xl sm:text-7xl p-6 bg-sky-50 rounded-3xl border border-sky-100 shadow-inner">
            {current.emoji}
          </span>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
                {current.word}
              </h2>
              <button
                onClick={() => speakText(current.word)}
                className="p-2.5 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors shadow-xs"
                title="Escuchar en inglés"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-lg font-bold text-slate-400">
              {current.translation}
            </p>
          </div>

          {/* Example Sentence Box */}
          <div 
            onClick={() => speakText(current.sentence)}
            className="w-full bg-slate-50 hover:bg-sky-50/60 border border-slate-200 rounded-2xl p-4 cursor-pointer transition-colors text-left"
          >
            <div className="flex items-center justify-between text-xs font-bold text-sky-600 mb-1">
              <span>Frase de Ejemplo (Toca para escuchar):</span>
              <Volume2 className="w-3.5 h-3.5" />
            </div>
            <p className="text-base font-extrabold text-slate-800">"{current.sentence}"</p>
            <p className="text-xs text-slate-500 font-semibold mt-0.5">{current.sentenceTranslation}</p>
          </div>

          {/* Flashcard actions */}
          <div className="w-full flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => speakText(`${current.word}. ${current.sentence}`)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-extrabold text-slate-600 hover:bg-slate-100 border border-slate-200"
            >
              <Music className="w-3.5 h-3.5 text-blue-600" />
              <span>Pronunciar todo</span>
            </button>

            <button
              onClick={handleNextCard}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold bg-[#0052CC] hover:bg-[#0041A3] text-white btn-tactile-primary transition-all"
            >
              <span>Siguiente Tarjeta</span>
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Quick Match Challenge */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">Mini Reto de Memoria</h3>
              <p className="text-xs text-slate-500 font-semibold">¿Qué significa en español?</p>
            </div>
          </div>

          <p className="text-sm font-bold text-slate-800">
            Selecciona la traducción correcta para: <span className="text-blue-600 font-black">"{current.word}"</span>
          </p>

          <div className="space-y-2.5">
            {choices.map((choice) => {
              const isSelected = selectedAnswer === choice;
              const isRight = choice === current.translation;

              let style = "bg-slate-50 hover:bg-sky-50 border-slate-200 text-slate-700";
              if (selectedAnswer !== null) {
                if (isRight) style = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                else if (isSelected) style = "bg-rose-50 border-rose-400 text-rose-900";
              }

              return (
                <button
                  key={choice}
                  onClick={() => handleCheckQuiz(choice)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-3.5 rounded-2xl border text-sm font-bold text-left transition-all flex items-center justify-between ${style}`}
                >
                  <span>{choice}</span>
                  {selectedAnswer !== null && isRight && (
                    <Check className="w-4 h-4 text-emerald-600" />
                  )}
                </button>
              );
            })}
          </div>

          {isCorrect !== null && (
            <div className={`p-4 rounded-2xl border text-xs sm:text-sm font-bold ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'}`}>
              {isCorrect ? '¡Correcto! Has ganado +35 XP y 1 Gema Estelar ⭐' : '¡Casi! Sigue practicando.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
