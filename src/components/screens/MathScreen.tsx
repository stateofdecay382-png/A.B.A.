import React, { useState } from 'react';
import { ScreenType, UserProfile } from '../../types';
import { sound } from '../../utils/audio';
import { 
  ArrowLeft, 
  Calculator, 
  Sparkles, 
  Dice5, 
  Trophy, 
  RefreshCw, 
  CheckCircle, 
  HelpCircle,
  Zap,
  Star
} from 'lucide-react';

interface MathScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onAddXp: (amount: number, gems: number) => void;
}

interface Question {
  id: number;
  question: string;
  options: number[];
  answer: number;
  explanation: string;
  xp: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'En la nave ABA viajan 7 astronautas y se unen 6 más en la estación orbital. ¿Cuántos viajan en total?',
    options: [11, 13, 14, 12],
    answer: 13,
    explanation: '¡Excelente! 7 + 6 = 13 exploradores cósmicos.',
    xp: 35,
  },
  {
    id: 2,
    question: 'Si cada planeta tiene 4 lunas brillantes y visitamos 5 planetas, ¿cuántas lunas exploramos?',
    options: [20, 16, 24, 18],
    answer: 20,
    explanation: '¡Genial! 5 × 4 = 20 lunas descubiertas.',
    xp: 40,
  },
  {
    id: 3,
    question: 'Observa la secuencia estelar: 4, 8, 12, 16, ¿cuál es el siguiente cometa?',
    options: [18, 20, 22, 24],
    answer: 20,
    explanation: '¡Magnífico! Sumamos 4 en cada salto: 16 + 4 = 20.',
    xp: 45,
  },
  {
    id: 4,
    question: 'Recolectamos 24 cristales de energía y los repartimos en 3 cápsulas iguales. ¿Cuántos van en cada una?',
    options: [6, 7, 8, 9],
    answer: 8,
    explanation: '¡Brillante cálculo! 24 ÷ 3 = 8 cristales.',
    xp: 50,
  },
];

export const MathScreen: React.FC<MathScreenProps> = ({ onNavigate, user, onAddXp }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [diceRoll, setDiceRoll] = useState<{ d1: number; d2: number; sum: number } | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const q = QUESTIONS[currentIdx];

  const handleSelect = (option: number) => {
    if (answered) return;
    setSelectedOption(option);
    setAnswered(true);

    if (option === q.answer) {
      sound.playSuccess();
      onAddXp(q.xp, 1);
    } else {
      sound.playPop();
    }
  };

  const handleNext = () => {
    sound.playPop();
    setSelectedOption(null);
    setAnswered(false);
    setCurrentIdx((prev) => (prev + 1) % QUESTIONS.length);
  };

  const handleRollDice = () => {
    sound.playPop();
    setIsRolling(true);
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDiceRoll({ d1, d2, sum: d1 + d2 });
      setIsRolling(false);
      sound.playGem();
      onAddXp(15, 0);
    }, 450);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header & Breadcrumbs */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={() => {
            sound.playPop();
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Volver al Universo ABA</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-wider border border-blue-200">
            Lógica & Cifras
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-xs font-bold border border-amber-200">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Nivel 1 Activo</span>
          </div>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-3xl p-6 sm:p-8 shadow-md mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black">
            <Calculator className="w-3.5 h-3.5 text-cyan-200" />
            Estación de Matemáticas
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-display tracking-tight">
            Desafíos & Dados Cósmicos
          </h1>
          <p className="text-sky-100 text-sm sm:text-base max-w-xl font-medium">
            Entrena tu pensamiento matemático con enigmas espaciales interactivos y gana gemas estelares.
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shrink-0">
          <span className="text-xs font-bold text-sky-100">Progreso de Estación</span>
          <div className="text-2xl font-black font-display tabular-nums">
            {currentIdx + 1} / {QUESTIONS.length}
          </div>
          <div className="w-28 bg-white/30 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-white h-full rounded-full transition-all duration-300" 
              style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Interactive Grid: Quiz Challenge & Cosmic Dice Minigame */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Math Question Card */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase text-blue-600 tracking-wider">
                Misión #{q.id}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <Zap className="w-3 h-3 text-emerald-500 fill-emerald-500" />
                +{q.xp} XP al resolver
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-8 font-display">
              {q.question}
            </h3>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {q.options.map((opt) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === q.answer;
                
                let btnStyle = "bg-slate-50 hover:bg-sky-50/70 border-2 border-slate-200 text-slate-800";
                if (answered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-900 shadow-sm";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-50 border-2 border-rose-400 text-rose-900";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    disabled={answered}
                    className={`p-5 rounded-2xl font-black text-xl font-display transition-all duration-150 transform active:scale-95 flex items-center justify-between ${btnStyle}`}
                  >
                    <span className="tabular-nums">{opt}</span>
                    {answered && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Feedback alert */}
            {answered && (
              <div
                className={`p-4 rounded-2xl border mb-6 flex items-start gap-3 transition-all ${
                  selectedOption === q.answer
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}
              >
                <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                <div>
                  <p className="font-bold text-sm">
                    {selectedOption === q.answer ? '¡Misión Cumplida! ⭐' : '¡Casi lo logras! Inténtalo en la próxima:'}
                  </p>
                  <p className="text-xs sm:text-sm mt-1">{q.explanation}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-[#0052CC] hover:bg-[#0041A3] text-white font-extrabold rounded-full text-sm btn-tactile-primary transition-all flex items-center gap-2"
            >
              <span>{currentIdx < QUESTIONS.length - 1 ? 'Siguiente Desafío' : 'Reiniciar Desafíos'}</span>
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Cosmic Dice Minigame */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Dice5 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-display text-slate-900">Dados Cósmicos</h4>
              <p className="text-xs text-slate-500 font-semibold">Tira y calcula al instante</p>
            </div>
          </div>

          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-5 text-center space-y-4">
            <div className="flex items-center justify-center gap-4 py-2">
              <div className={`w-16 h-16 rounded-2xl bg-white border-2 border-sky-300 shadow-md flex items-center justify-center text-3xl font-black text-blue-700 font-display ${isRolling ? 'animate-bounce' : ''}`}>
                {diceRoll ? diceRoll.d1 : '🎲'}
              </div>
              <span className="text-2xl font-black text-slate-400">+</span>
              <div className={`w-16 h-16 rounded-2xl bg-white border-2 border-sky-300 shadow-md flex items-center justify-center text-3xl font-black text-blue-700 font-display ${isRolling ? 'animate-bounce' : ''}`}>
                {diceRoll ? diceRoll.d2 : '🎲'}
              </div>
            </div>

            {diceRoll && (
              <div className="bg-white rounded-xl p-3 border border-sky-200">
                <p className="text-xs font-bold text-slate-500">Suma total obtenida:</p>
                <p className="text-2xl font-black text-blue-600 font-display tabular-nums">
                  {diceRoll.d1} + {diceRoll.d2} = {diceRoll.sum}
                </p>
                <span className="text-[11px] font-bold text-emerald-600">+15 XP sumados</span>
              </div>
            )}

            <button
              onClick={handleRollDice}
              disabled={isRolling}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-extrabold rounded-full text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Dice5 className="w-4 h-4" />
              <span>{isRolling ? 'Lanzando...' : '¡Lanzar Dados Cósmicos!'}</span>
            </button>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-800">💡 Tip de Aprendizaje Autónomo:</p>
            <p>Jugar con números estimula el cálculo mental rápido. ¡Prueba sumar o multiplicar el resultado de tus dados!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
