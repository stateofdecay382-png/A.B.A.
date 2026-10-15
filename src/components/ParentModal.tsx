import React from 'react';
import { sound } from '../utils/audio';
import { X, ShieldCheck, HeartHandshake, HelpCircle, Lock } from 'lucide-react';

interface ParentModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
}

export const ParentModal: React.FC<ParentModalProps> = ({ isOpen, onClose, topic }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
            {topic === 'privacidad' ? <Lock className="w-6 h-6" /> : 
             topic === 'familias' ? <HeartHandshake className="w-6 h-6" /> : 
             <HelpCircle className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 font-display">
              {topic === 'privacidad' ? 'Protección Infantil y Privacidad' :
               topic === 'familias' ? 'Guía para Familias y Educadores' :
               'Centro de Soporte ABA Kids'}
            </h3>
            <p className="text-xs font-bold text-slate-500">Compromiso de Aprendizaje Seguro</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
          {topic === 'privacidad' && (
            <>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                <p className="font-extrabold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  0 Anuncios, 0 Rastreadores, 100% Protegido
                </p>
                <p className="text-xs">
                  En ABA Kids no recopilamos datos personales sensibles ni mostramos publicidad invasiva. Todo el progreso se almacena localmente de forma segura.
                </p>
              </div>
              <p>
                Diseñado bajo directrices internacionales de privacidad para menores (COPPA y GDPR-K). Los niños pueden interactuar con libertad sin riesgos de navegación externa.
              </p>
            </>
          )}

          {topic === 'familias' && (
            <>
              <p>
                <strong>¿Cómo apoya ABA el aprendizaje autónomo?</strong>
              </p>
              <p>
                A través del refuerzo positivo gamificado, desafíos graduados y retroalimentación inmediata sin penalizaciones frustrantes. Cada sesión fortalece la autoconfianza y la perseverancia.
              </p>
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 text-sky-950 space-y-1 text-xs">
                <p className="font-bold">Recomendación para padres:</p>
                <p>Establecer sesiones breves de 15 a 25 minutos al día para mantener alta la concentración y el entusiasmo natural.</p>
              </div>
            </>
          )}

          {topic === 'soporte' && (
            <>
              <p>
                ¿Tienes preguntas o sugerencias para nuevos minijuegos o cápsulas científicas?
              </p>
              <p>
                Nuestro equipo pedagógico y de ingeniería está atento para enriquecer el universo de aprendizaje de tus pequeños.
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-800 text-xs">
                <p className="font-bold">Contacto Educativo:</p>
                <p className="mt-1 font-mono text-blue-700">soporte@abakids.edu · Respuesta en menos de 24 horas</p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-6 py-2.5 bg-[#0052CC] hover:bg-[#0041A3] text-white font-extrabold rounded-full text-xs transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
