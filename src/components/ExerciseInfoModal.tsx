import React from 'react';
import { Exercise } from '../types';

interface ExerciseInfoModalProps {
  exercise: Exercise | null;
  onClose: () => void;
}

export const ExerciseInfoModal: React.FC<ExerciseInfoModalProps> = ({ exercise, onClose }) => {
  if (!exercise) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-[#1c2028] border border-[#262a33] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-44 bg-[#0a0e16]">
          <img
            src={exercise.image}
            alt={exercise.name}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c2028] via-[#1c2028]/40 to-transparent"></div>
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0a0e16]/80 text-[#dfe2ee] hover:bg-[#262a33] flex items-center justify-center backdrop-blur-md"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[11px] font-bold text-[#c3f400] uppercase tracking-wider">
              {exercise.muscleGroup}
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-white">
              {exercise.name}
            </h3>
          </div>
        </div>

        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          {/* Target muscles */}
          <div>
            <h4 className="text-xs font-bold text-[#8e9379] uppercase tracking-wider mb-2">
              Músculos Principales Reclutados
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {exercise.targetMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="px-2.5 py-1 rounded-lg bg-[#262a33] text-[#4cd7f6] text-xs font-semibold"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Form and Execution Guide */}
          <div>
            <h4 className="text-xs font-bold text-[#8e9379] uppercase tracking-wider mb-2">
              Puntos Clave de Ejecución
            </h4>
            <ul className="space-y-2">
              {exercise.instructions.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-[#dfe2ee] leading-relaxed">
                  <span className="w-4 h-4 rounded-full bg-[#c3f400]/20 text-[#c3f400] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Biomechanical cue / tip */}
          {exercise.tips && (
            <div className="p-3 rounded-xl bg-[#181c24] border border-[#c3f400]/20 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-[#c3f400] text-[18px] shrink-0 mt-0.5">
                tips_and_updates
              </span>
              <div className="text-xs text-[#c4c9ac]">
                <strong className="text-[#dfe2ee] font-semibold block mb-0.5">
                  Consejo Biomecánico Pro
                </strong>
                {exercise.tips}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-[#181c24] border-t border-[#262a33]">
          <button
            onClick={onClose}
            type="button"
            className="w-full h-11 bg-[#262a33] hover:bg-[#31353e] text-[#dfe2ee] font-bold text-xs uppercase tracking-wider rounded-full transition-colors"
          >
            Entendido, volver a la sesión
          </button>
        </div>
      </div>
    </div>
  );
};
