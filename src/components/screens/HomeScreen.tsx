import React, { useState } from 'react';
import { ScreenType, UserProfile, SubjectModule } from '../../types';
import { sound } from '../../utils/audio';
import { 
  Rocket, 
  KeyRound, 
  Calculator, 
  BookOpen, 
  Microscope, 
  Globe2, 
  Tv, 
  Trophy, 
  ArrowRight, 
  PlayCircle, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  GraduationCap, 
  Users, 
  Flag, 
  Eye, 
  Compass, 
  HeartHandshake, 
  LayoutGrid,
  CheckCircle2,
  Sigma
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  onOpenAccount: () => void;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  user,
  onOpenAccount,
  onOpenAuth,
}) => {
  const [philosophyOpen, setPhilosophyOpen] = useState(true);

  const modules: SubjectModule[] = [
    {
      id: 'math',
      title: 'Matemáticas',
      tag: 'Lógica & Cifras',
      description: 'Desarrolla tu pensamiento lógico mediante operaciones y desafíos interactivos diseñados con dados cósmicos y retos numéricos.',
      icon: 'calculator',
      iconBg: 'bg-blue-50 border-blue-200 text-blue-600',
      iconColor: '#2563EB',
      progress: 62,
      buttonText: 'Explorar Números',
      targetScreen: 'math',
      accentColor: 'from-blue-500 to-sky-400',
    },
    {
      id: 'language',
      title: 'Lenguaje',
      tag: 'Expresión',
      description: 'Fortalece tus habilidades de comprensión y comunicación con fábulas animadas, letras flotantes y aventuras de vocabulario.',
      icon: 'book',
      iconBg: 'bg-teal-50 border-teal-200 text-teal-600',
      iconColor: '#0D9488',
      progress: 85,
      buttonText: 'Abrir Cuentos',
      targetScreen: 'language',
      accentColor: 'from-teal-500 to-emerald-400',
    },
    {
      id: 'biology',
      title: 'Biología',
      tag: 'Mundo Vivo',
      description: 'Descubre el mundo de los seres vivos y la naturaleza observando ecosistemas, microscopios virtuales y células llenas de color.',
      icon: 'microscope',
      iconBg: 'bg-purple-50 border-purple-200 text-purple-600',
      iconColor: '#7C3AED',
      progress: 58,
      buttonText: 'Explorar Naturaleza',
      targetScreen: 'biology',
      accentColor: 'from-purple-500 to-indigo-400',
    },
    {
      id: 'english',
      title: 'Inglés',
      tag: 'Global Kids',
      description: 'Aprende vocabulario y practica expresiones básicas a través de canciones divertidas, diálogos animados y juegos de pronunciación.',
      icon: 'globe',
      iconBg: 'bg-blue-50 border-sky-200 text-sky-600',
      iconColor: '#0284C7',
      progress: 42,
      buttonText: 'Start English',
      targetScreen: 'english',
      accentColor: 'from-sky-500 to-blue-500',
    },
    {
      id: 'videos',
      title: 'Videos Informativos',
      tag: 'Audiovisual',
      description: 'Explora nuevos temas y amplía tus conocimientos con minidocumentales ilustrados y cápsulas científicas de alta diversión.',
      icon: 'tv',
      iconBg: 'bg-teal-50 border-teal-200 text-emerald-600',
      iconColor: '#059669',
      progress: 74,
      buttonText: 'Ver Cápsulas',
      targetScreen: 'videos',
      accentColor: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'challenges',
      title: 'Retos y Competencias',
      tag: 'Desafíos',
      description: 'Pon a prueba tus habilidades, supera desafíos y observa tu progreso coleccionando gemas estelares y copas de honor.',
      icon: 'trophy',
      iconBg: 'bg-indigo-50 border-indigo-200 text-indigo-600',
      iconColor: '#4F46E5',
      progress: 90,
      buttonText: 'Entrar a la Arena',
      targetScreen: 'challenges',
      accentColor: 'from-indigo-600 to-violet-500',
    },
  ];

  const renderModuleIcon = (icon: string) => {
    switch (icon) {
      case 'calculator':
        return <Calculator className="w-6 h-6" />;
      case 'book':
        return <BookOpen className="w-6 h-6" />;
      case 'microscope':
        return <Microscope className="w-6 h-6" />;
      case 'globe':
        return <Globe2 className="w-6 h-6" />;
      case 'tv':
        return <Tv className="w-6 h-6" />;
      case 'trophy':
        return <Trophy className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full">
      {/* 1. TOP ANNOUNCEMENT PILL BADGE */}
      <section className="pt-6 pb-2 px-4 flex justify-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-sky-50/90 border border-sky-200 text-sky-900 shadow-xs hover:bg-sky-100 transition-colors">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]"></span>
          <span className="text-xs sm:text-sm font-bold tracking-tight">
            Temporada Espacial 2024 · ¡Misiones Desbloqueadas!
          </span>
          <span className="text-[11px] font-black uppercase px-2 py-0.5 rounded-md bg-[#2563EB]/15 text-[#0051D5]">
            Nivel {user.level}
          </span>
        </div>
      </section>

      {/* 2. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Call-to-actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <span className="text-xs sm:text-sm font-extrabold tracking-wider text-[#0284C7] uppercase font-display">
              APRENDIZAJE BÁSICO AUTÓNOMO
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.12] tracking-tight font-display">
              ¡Aprende Jugando en el{' '}
              <span className="text-[#0052CC] relative inline-block">
                Universo ABA!
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#00E5FF]/40 -z-10" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,8 Q50,0 100,8" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-semibold max-w-2xl leading-relaxed">
              Tu plataforma digital autónoma de aventuras, desafíos interactivos y aprendizaje divertido. Diseñada especialmente para despertar tu genialidad con misiones a tu propio ritmo.
            </p>

            {/* Tactile Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  sound.playPop();
                  onNavigate('explore');
                }}
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#0052CC] hover:bg-[#0043A8] text-white font-extrabold rounded-full text-base btn-tactile-primary transition-all duration-150 shadow-md group"
              >
                <Rocket className="w-5 h-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
                <span>¡Empezar Aventura Gratis!</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  onOpenAccount();
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-sky-50/80 hover:bg-sky-100/90 text-blue-700 font-extrabold rounded-full text-base border-2 border-sky-200 transition-all duration-150 hover:border-sky-300"
              >
                <KeyRound className="w-5 h-5 text-sky-600" />
                <span>Abrir Mi Cuenta</span>
              </button>
            </div>

            {/* 3 Stats Counters */}
            <div className="grid grid-cols-3 gap-4 pt-6 w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 text-center shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-blue-700 font-display tabular-nums">
                  +500
                </span>
                <span className="text-xs font-bold text-slate-500">Minijuegos</span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 text-center shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-emerald-600 font-display tabular-nums">
                  100%
                </span>
                <span className="text-xs font-bold text-slate-500">Autónomo</span>
              </div>

              <div className="bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 text-center shadow-xs">
                <span className="block text-2xl sm:text-3xl font-black text-indigo-600 font-display tabular-nums">
                  0 Ads
                </span>
                <span className="text-xs font-bold text-slate-500">Entorno Seguro</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cosmic Orbit & Astronaut Kid Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            <div className="relative w-full max-w-[420px] aspect-square flex items-center justify-center">
              {/* Outer Dashed Orbit Rings */}
              <div className="absolute inset-0 border-2 border-dashed border-sky-300/60 rounded-full animate-orbit pointer-events-none"></div>
              <div className="absolute inset-8 border border-sky-200/50 rounded-full pointer-events-none"></div>

              {/* Floating Badge 1: Top Right "Reto Numérico +150 XP" */}
              <div className="absolute -top-3 right-4 z-20 animate-float bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-sky-200 shadow-lg shadow-sky-500/10 flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 font-black text-sm">
                  <Sigma className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-500 leading-tight">Reto Numérico</p>
                  <p className="text-xs font-black text-cyan-600 tabular-nums">+150 XP</p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Right "Planeta Curiosidad" */}
              <div className="absolute -bottom-2 -right-2 z-20 animate-float bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-sky-200 shadow-lg shadow-sky-500/10 flex items-center gap-2.5" style={{ animationDelay: '1.5s' }}>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-amber-900 shadow-xs">
                  <Sparkles className="w-4 h-4 fill-amber-500 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-800 leading-tight">¡Planeta Curiosidad!</p>
                  <p className="text-[11px] font-bold text-emerald-600">Nivel Completado</p>
                </div>
              </div>

              {/* Orbit Compass Planet Node (Bottom Left) */}
              <div className="absolute bottom-8 left-2 z-20 w-10 h-10 rounded-full bg-gradient-to-tr from-[#0052CC] to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                <Compass className="w-5 h-5 text-cyan-200 animate-spin" style={{ animationDuration: '20s' }} />
              </div>

              {/* Center Cosmic Card with Kid Astronaut */}
              <div 
                onClick={() => {
                  sound.playPop();
                  onNavigate('explore');
                }}
                className="relative z-10 w-[82%] aspect-[4/3] rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-sky-900/15 cursor-pointer group transform group-hover:scale-105 transition-all duration-300"
              >
                <img
                  src="/src/assets/images/hero_space_kid_1792026339669.jpg"
                  alt="Aventurero espacial en el Universo ABA"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Title Overlay in card matching screenshot */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-3 py-1.5 inline-block w-fit">
                    <p className="text-[11px] font-black tracking-wider uppercase text-cyan-200 font-display">
                      ABA · Aprendizaje Básico Autónomo
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: "¿QUÉ OFRECEMOS EN EL UNIVERSO ABA?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold mb-3">
              <LayoutGrid className="w-3.5 h-3.5 text-cyan-600" />
              Nuestras Estaciones del Saber
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
              ¿Qué Ofrecemos en el Universo ABA?
            </h2>
            <p className="text-slate-600 font-semibold text-base mt-2 max-w-2xl">
              Un cosmos diseñado con seis dimensiones interactivas donde cada sesión se siente como subir de nivel en tu juego favorito.
            </p>
          </div>

          {/* Module Counter Badge */}
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-xs shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center font-black text-blue-700 text-sm tabular-nums">
              6/6
            </div>
            <div>
              <p className="text-xs font-extrabold text-slate-800">Módulos Activos</p>
              <p className="text-[11px] font-bold text-slate-500">Explora libremente sin límites</p>
            </div>
          </div>
        </div>

        {/* 6 Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div
              key={mod.id}
              onClick={() => {
                sound.playPop();
                onNavigate(mod.targetScreen);
              }}
              className="group bg-white rounded-3xl p-6 border-2 border-slate-100 hover:border-sky-300 transition-all duration-200 btn-tactile-card cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Icon + Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${mod.iconBg} group-hover:scale-105 transition-transform`}>
                    {renderModuleIcon(mod.icon)}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-sky-50 group-hover:text-sky-700 transition-colors">
                    {mod.tag}
                  </span>
                </div>

                {/* Subject Title */}
                <h3 className="text-2xl font-black text-slate-900 font-display mb-2.5">
                  {mod.title}
                </h3>

                {/* Subject Description */}
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  {mod.description}
                </p>
              </div>

              <div>
                {/* Progress Bar matching screenshot */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${mod.accentColor}`}
                    style={{ width: `${mod.progress}%` }}
                  ></div>
                </div>

                {/* Footer Action link with play circle + arrow */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-blue-600 font-extrabold text-sm group-hover:text-blue-700">
                  <span className="inline-flex items-center gap-2">
                    <PlayCircle className="w-4 h-4 text-blue-500" />
                    {mod.buttonText}
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SECTION: TRANSPARENCIA & FILOSOFÍA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="text-center mb-6">
          <span className="text-xs font-black tracking-widest text-[#0051D5] uppercase font-display">
            TRANSPARENCIA & FILOSOFÍA
          </span>
        </div>

        {/* Collapsible Main Container */}
        <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden transition-all">
          {/* Header Toggle Bar */}
          <div
            onClick={() => {
              sound.playPop();
              setPhilosophyOpen(!philosophyOpen);
            }}
            className="flex items-center justify-between p-5 bg-[#EEF4FF] hover:bg-[#E2EDFF] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-[#0052CC] text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5 fill-white text-white" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900 font-display">Conócenos</h4>
                <p className="text-xs font-semibold text-slate-600">
                  Conoce a fondo la iniciativa de Aprendizaje Básico Autónomo
                </p>
              </div>
            </div>

            <button 
              type="button" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-blue-700 bg-white/80 hover:bg-white border border-blue-200 transition-colors"
            >
              <span>{philosophyOpen ? 'Ocultar' : 'Mostrar'}</span>
              {philosophyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Collapsible Content */}
          {philosophyOpen && (
            <div className="p-6 sm:p-8 space-y-8 bg-white">
              {/* Document Subheader */}
              <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h5 className="text-xl font-black text-slate-900 font-display">
                    Conócenos — ABA
                  </h5>
                  <p className="text-xs font-bold text-slate-500">
                    Documento Institucional & Propósito Educativo
                  </p>
                </div>
              </div>

              {/* ¿Quiénes somos? */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-black text-base font-display">
                  <Users className="w-5 h-5 text-teal-600" />
                  <span>¿Quiénes somos?</span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                  Somos ABA (Aprendizaje Básico Autónomo), una iniciativa educativa que busca transformar el aprendizaje en una experiencia divertida, interactiva y accesible. A través de juegos, retos y videos informativos, queremos que aprender sea una actividad emocionante que despierte la curiosidad, la creatividad y las ganas de descubrir cosas nuevas.
                </p>
              </div>

              {/* 2-Column: Misión y Visión */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700 font-extrabold text-sm sm:text-base">
                    <Flag className="w-4 h-4 text-blue-600" />
                    <span>Nuestra misión</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Promover el aprendizaje autónomo mediante herramientas digitales interactivas que permitan fortalecer los conocimientos básicos de una manera entretenida, dinámica y accesible, aprovechando la tecnología como una aliada de la educación.
                  </p>
                </div>

                <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm sm:text-base">
                    <Eye className="w-4 h-4 text-indigo-600" />
                    <span>Nuestra visión</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                    Ser una alternativa educativa digital que motive a más personas a descubrir el valor de aprender jugando, fomentando la curiosidad, la creatividad y el desarrollo de conocimientos útiles para la vida cotidiana.
                  </p>
                </div>
              </div>

              {/* ¿Qué ofrecemos? List */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-black text-base font-display">
                  <LayoutGrid className="w-5 h-5 text-cyan-600" />
                  <span>¿Qué ofrecemos?</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-bold">
                  En ABA encontrarás actividades diseñadas para aprender mientras te diviertes:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <Calculator className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      <strong className="text-slate-900 font-extrabold">Matemáticas:</strong> desarrolla tu pensamiento lógico mediante operaciones y desafíos.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      <strong className="text-slate-900 font-extrabold">Lenguaje:</strong> fortalece tus habilidades de comprensión y comunicación.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <Microscope className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      <strong className="text-slate-900 font-extrabold">Biología:</strong> descubre el mundo de los seres vivos y la naturaleza.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <Globe2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      <strong className="text-slate-900 font-extrabold">Inglés:</strong> aprende vocabulario y practica expresiones básicas.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <Tv className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      <strong className="text-slate-900 font-extrabold">Videos informativos:</strong> explora nuevos temas y amplía tus conocimientos.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50/90 rounded-xl border border-slate-200/80 flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 font-medium">
                      <strong className="text-slate-900 font-extrabold">Retos y competencias:</strong> pon a prueba tus habilidades, supera desafíos y observa tu progreso.
                    </p>
                  </div>
                </div>
              </div>

              {/* Nuestro Propósito Banner */}
              <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-2 text-blue-700 font-black text-base font-display">
                  <HeartHandshake className="w-5 h-5 text-blue-600" />
                  <span>Nuestro propósito</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Creemos que la tecnología puede ir más allá del entretenimiento. Por eso, queremos ofrecer una experiencia digital que aproveche el tiempo frente a las pantallas para descubrir, practicar y aprender cosas nuevas.
                </p>

                <div className="bg-white border border-sky-200 rounded-xl p-4 text-center">
                  <p className="text-sm sm:text-base font-black text-blue-700 font-display">
                    ABA: aprende a tu ritmo, juega con propósito y descubre todo lo que puedes lograr.
                  </p>
                </div>
              </div>

              {/* Bottom collapse button */}
              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    sound.playPop();
                    setPhilosophyOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>Cerrar sección Conócenos</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
