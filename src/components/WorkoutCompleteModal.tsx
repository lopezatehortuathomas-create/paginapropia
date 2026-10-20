import React from 'react';

interface WorkoutCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionTimeFormatted: string;
  totalVolumeKg: number;
  completedSetsCount: number;
  caloriesBurned: number;
}

export const WorkoutCompleteModal: React.FC<WorkoutCompleteModalProps> = ({
  isOpen,
  onClose,
  sessionTimeFormatted,
  totalVolumeKg,
  completedSetsCount,
  caloriesBurned
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-sm bg-[#1c2028] border border-[#c3f400]/40 rounded-3xl p-6 text-center shadow-[0_0_40px_rgba(195,244,0,0.2)] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration icon with glow */}
        <div className="relative w-20 h-20 mx-auto mb-4 rounded-full bg-[#c3f400]/20 border-2 border-[#c3f400] flex items-center justify-center text-[#c3f400] shadow-[0_0_20px_rgba(195,244,0,0.5)]">
          <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            military_tech
          </span>
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c3f400] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#c3f400]"></span>
          </span>
        </div>

        <span className="text-xs font-bold text-[#c3f400] uppercase tracking-widest">
          ¡Sesión Completada con Éxito!
        </span>
        <h2 className="font-headline-md text-2xl font-bold text-white mt-1">
          Rendimiento Élite
        </h2>
        <p className="text-xs text-[#c4c9ac] mt-1">
          Has superado el volumen programado con una adherencia técnica del 96%.
        </p>

        {/* Workout telemetry stats grid */}
        <div className="grid grid-cols-2 gap-2.5 my-5 text-left">
          <div className="p-3 rounded-xl bg-[#181c24] border border-[#262a33]">
            <span className="text-[10px] text-[#8e9379] uppercase font-bold block">Tiempo Total</span>
            <span className="font-headline-sm text-lg font-bold text-white mt-0.5 block">
              {sessionTimeFormatted}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#181c24] border border-[#262a33]">
            <span className="text-[10px] text-[#8e9379] uppercase font-bold block">Volumen Total</span>
            <span className="font-headline-sm text-lg font-bold text-[#c3f400] mt-0.5 block">
              {totalVolumeKg.toLocaleString()} <span className="text-xs text-[#8e9379]">kg</span>
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#181c24] border border-[#262a33]">
            <span className="text-[10px] text-[#8e9379] uppercase font-bold block">Series Efectivas</span>
            <span className="font-headline-sm text-lg font-bold text-[#4cd7f6] mt-0.5 block">
              {completedSetsCount} series
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[#181c24] border border-[#262a33]">
            <span className="text-[10px] text-[#8e9379] uppercase font-bold block">Calorías Est.</span>
            <span className="font-headline-sm text-lg font-bold text-[#ffb4ab] mt-0.5 block">
              {caloriesBurned} <span className="text-xs text-[#8e9379]">kcal</span>
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          type="button"
          className="w-full h-12 rounded-full bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(195,244,0,0.4)] transition-transform active:scale-95"
        >
          Guardar y Ver Progreso
        </button>
      </div>
    </div>
  );
};
