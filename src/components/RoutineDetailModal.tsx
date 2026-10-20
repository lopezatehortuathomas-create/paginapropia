import React from 'react';
import { Routine } from '../types';

interface RoutineDetailModalProps {
  routine: Routine | null;
  onClose: () => void;
  onStartRoutine: (routine: Routine) => void;
  onToggleBookmark: (routineId: string) => void;
}

export const RoutineDetailModal: React.FC<RoutineDetailModalProps> = ({
  routine,
  onClose,
  onStartRoutine,
  onToggleBookmark
}) => {
  if (!routine) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md transition-opacity">
      <div 
        className="w-full max-w-lg max-h-[90vh] bg-[#1c2028] border border-[#262a33] rounded-t-3xl sm:rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Image */}
        <div className="relative w-full h-48 bg-[#0a0e16] shrink-0">
          <img
            src={routine.image}
            alt={routine.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c2028] via-[#1c2028]/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0a0e16]/80 text-[#dfe2ee] hover:bg-[#262a33] flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          {/* Badges */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0a0e16]/80 backdrop-blur-md text-[#ffb4ab] text-xs font-bold uppercase tracking-wider">
                {routine.level}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#0a0e16]/80 backdrop-blur-md text-[#4cd7f6] text-xs font-bold uppercase tracking-wider">
                {routine.category}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#c3f400] bg-[#0a0e16]/80 backdrop-blur-md px-2.5 py-0.5 rounded-md text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">timer</span>
              <span>{routine.durationMinutes} min</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="font-headline-md text-xl font-bold text-[#dfe2ee]">
                {routine.title}
              </h2>
              <p className="text-xs text-[#c4c9ac] flex items-center gap-1.5 mt-1">
                <span className="material-symbols-outlined text-[16px] text-[#c3f400]">ads_click</span>
                Foco: {routine.focus}
              </p>
            </div>
            <button
              onClick={() => onToggleBookmark(routine.id)}
              type="button"
              className={`p-2.5 rounded-full border transition-colors ${
                routine.isBookmarked
                  ? 'bg-[#c3f400]/20 border-[#c3f400] text-[#c3f400]'
                  : 'bg-[#181c24] border-[#262a33] text-[#8e9379] hover:text-[#dfe2ee]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: routine.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#181c24] border border-[#262a33]">
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] uppercase text-[#8e9379] font-bold">Ejercicios</span>
              <span className="font-headline-sm text-base text-[#dfe2ee] font-bold mt-0.5">
                {routine.exerciseCount}
              </span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-[#262a33]">
              <span className="text-[10px] uppercase text-[#8e9379] font-bold">Equipamiento</span>
              <span className="text-xs text-[#4cd7f6] font-bold capitalize mt-0.5">
                {routine.equipment === 'gym' ? 'Gimnasio' : routine.equipment}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[10px] uppercase text-[#8e9379] font-bold">Completaron</span>
              <span className="font-headline-sm text-base text-[#c3f400] font-bold mt-0.5">
                {routine.completedCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* List of exercises */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#8e9379]">
              Estructura de la Sesión ({routine.exercises.length} movimientos)
            </h3>
            <div className="space-y-2">
              {routine.exercises.map((ex, index) => (
                <div
                  key={ex.id || index}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#181c24] border border-[#262a33]/60 hover:border-[#262a33]"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#262a33] text-[#c3f400] font-bold text-xs flex items-center justify-center shrink-0">
                      0{index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#dfe2ee] leading-tight">
                        {ex.name}
                      </h4>
                      <p className="text-[11px] text-[#8e9379]">
                        {ex.muscleGroup} • {ex.sets.length} series
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#8e9379] px-2 py-1 rounded bg-[#262a33]">
                    {ex.defaultRestSeconds}s descanso
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#262a33] bg-[#181c24] flex items-center gap-3">
          <button
            onClick={onClose}
            type="button"
            className="flex-1 h-12 rounded-full border border-[#262a33] text-sm font-semibold text-[#dfe2ee] hover:bg-[#262a33] transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onStartRoutine(routine);
              onClose();
            }}
            type="button"
            className="flex-[2] h-12 rounded-full bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(195,244,0,0.3)] transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
            <span>Iniciar Rutina</span>
          </button>
        </div>
      </div>
    </div>
  );
};
