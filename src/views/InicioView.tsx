import React, { useState } from 'react';
import { UserStats, Routine, DailyWorkload } from '../types';
import { ASSETS } from '../data/mockData';

interface InicioViewProps {
  userStats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
  dailyWorkloads: DailyWorkload[];
  onStartRoutine: (routine?: Routine) => void;
  onOpenHistory: () => void;
  onOpenRoutineDetail: (routine: Routine) => void;
  featuredRoutine: Routine;
}

export const InicioView: React.FC<InicioViewProps> = ({
  userStats,
  onUpdateStats,
  dailyWorkloads,
  onStartRoutine,
  onOpenHistory,
  onOpenRoutineDetail,
  featuredRoutine
}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(4); // Friday (Viernes 28)
  const [waterBounce, setWaterBounce] = useState(false);
  const [editingWeight, setEditingWeight] = useState(false);
  const [tempWeight, setTempWeight] = useState(userStats.currentWeight.toString());

  const handleAddWater = () => {
    const nextWater = Math.min(4.0, +(userStats.hydrationLiters + 0.25).toFixed(2));
    onUpdateStats({ hydrationLiters: nextWater });
    setWaterBounce(true);
    setTimeout(() => setWaterBounce(false), 200);
  };

  const handleSaveWeight = () => {
    const val = parseFloat(tempWeight);
    if (!isNaN(val) && val > 30 && val < 250) {
      onUpdateStats({ currentWeight: val });
    }
    setEditingWeight(false);
  };

  const selectedDay = dailyWorkloads[selectedDayIndex] || dailyWorkloads[4];

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-4 sm:px-5 pb-24 gap-5">
      {/* Saludo & Racha Activa */}
      <div className="flex items-start justify-between gap-3 pt-2">
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-xs uppercase text-[#4cd7f6] tracking-widest flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping"></span>
            Sesión activa • Modo Bestia
          </span>
          <h1 className="font-headline-xl-mobile text-3xl font-extrabold text-[#dfe2ee] tracking-tight mt-1 truncate">
            ¡A darlo todo, {userStats.name}!
          </h1>
        </div>

        {/* Streak Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1c2028] border border-[#262a33] rounded-full shadow-lg shrink-0">
          <span
            className="material-symbols-outlined text-[#c3f400] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <div className="flex flex-col items-start leading-none">
            <span className="font-label-sm text-[11px] font-bold text-[#c3f400] uppercase tracking-wider">
              {userStats.streakDays} DÍAS
            </span>
            <span className="text-[9px] font-semibold text-[#8e9379] uppercase">
              En racha
            </span>
          </div>
        </div>
      </div>

      {/* Selector Semanal Dinámico */}
      <div className="flex flex-col gap-2 bg-[#181c24] border border-[#262a33] p-4 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8e9379]">
            Semana {userStats.currentWeek} • {userStats.currentPhase}
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 bg-[#c3f400]/15 text-[#c3f400] border border-[#c3f400]/30 rounded-full">
            Hoy: {selectedDay.focusText.split('(')[0]}
          </span>
        </div>

        {/* 7 Días Calendario */}
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {dailyWorkloads.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            const isToday = day.isToday;

            return (
              <button
                key={day.shortDay}
                onClick={() => setSelectedDayIndex(idx)}
                type="button"
                className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                  isToday
                    ? 'bg-[#c3f400] text-[#161e00] shadow-[0_0_15px_-2px_rgba(195,244,0,0.5)] transform scale-105 z-10 font-bold'
                    : isSelected
                    ? 'bg-[#262a33] text-white border border-[#c3f400]/40'
                    : day.status === 'completed'
                    ? 'bg-[#1c2028] text-[#dfe2ee] hover:bg-[#262a33]'
                    : day.isRest
                    ? 'bg-[#0a0e16]/60 text-[#8e9379] opacity-50 hover:opacity-80'
                    : 'bg-[#0a0e16] text-[#8e9379] opacity-70 hover:opacity-100'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold ${isToday ? 'text-[#161e00]' : 'text-[#8e9379]'}`}>
                  {day.shortDay}
                </span>
                <span className={`font-headline-sm text-base mt-0.5 ${isToday ? 'text-[#161e00] font-extrabold' : 'text-[#dfe2ee]'}`}>
                  {day.dateNum}
                </span>
                {day.status === 'completed' ? (
                  <span
                    className="material-symbols-outlined text-[14px] mt-1 text-[#c3f400]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                ) : isToday ? (
                  <span className="material-symbols-outlined text-[14px] mt-1 text-[#161e00] font-bold">
                    radio_button_checked
                  </span>
                ) : day.isRest ? (
                  <span className="material-symbols-outlined text-[14px] mt-1 text-[#8e9379]">
                    hotel
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[14px] mt-1 text-[#8e9379]">
                    radio_button_unchecked
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected day prompt info */}
        <div className="pt-2 mt-1 border-t border-[#262a33] flex items-center justify-between text-xs text-[#8e9379]">
          <span className="truncate">
            <strong className="text-[#dfe2ee]">{selectedDay.day} {selectedDay.dateNum}:</strong> {selectedDay.focusText}
          </span>
          {selectedDay.tonnage > 0 && (
            <span className="text-[#c3f400] font-bold shrink-0 ml-2">
              {selectedDay.tonnage}t estimadas
            </span>
          )}
        </div>
      </div>

      {/* Tarjeta de Rutina de Hoy (Hero Card) */}
      <div className="relative overflow-hidden rounded-2xl bg-[#262a33] border border-[#31353e] shadow-xl p-4 sm:p-5 flex flex-col gap-4">
        {/* Atmospheric Accent Glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#c3f400]/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1c2028] border border-[#31353e] rounded-full">
            <span className="material-symbols-outlined text-[#c3f400] text-[16px]">
              fitness_center
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#c3f400]">
              Enfoque Principal
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#c4c9ac] bg-[#1c2028] border border-[#31353e] px-2.5 py-1 rounded-full">
            {featuredRoutine.level}
          </span>
        </div>

        {/* Routine Visual & Title */}
        <div 
          onClick={() => onOpenRoutineDetail(featuredRoutine)}
          className="flex gap-4 items-center cursor-pointer group"
        >
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#0a0e16] ring-1 ring-[#31353e] group-hover:ring-[#c3f400] transition-all">
            <img
              className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
              alt="Torso Superior: Potencia y Fuerza"
              src={featuredRoutine.image}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c2028] via-transparent to-transparent"></div>
          </div>

          <div className="flex flex-col min-w-0">
            <h2 className="font-headline-md text-xl font-bold text-[#dfe2ee] tracking-tight leading-snug group-hover:text-white transition-colors">
              {featuredRoutine.title}
            </h2>
            <div className="flex items-center gap-3 mt-1 text-[#8e9379]">
              <span className="text-xs flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[15px] text-[#4cd7f6]">timer</span>
                {featuredRoutine.durationMinutes} min
              </span>
              <span className="text-xs">•</span>
              <span className="text-xs flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[15px] text-[#4cd7f6]">fitness_center</span>
                {featuredRoutine.exerciseCount} ejercicios
              </span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onStartRoutine(featuredRoutine)}
          type="button"
          className="w-full h-13 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] rounded-full font-headline-sm text-sm uppercase font-extrabold flex items-center justify-center gap-2 shadow-[0_0_20px_-3px_rgba(195,244,0,0.4)] transition-all active:scale-[0.98]"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
          <span>Iniciar Rutina</span>
        </button>
      </div>

      {/* Resumen de Progreso Semanal */}
      <div className="flex flex-col p-4 sm:p-5 rounded-2xl bg-[#1c2028] border border-[#262a33] shadow-md gap-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8e9379]">
              Meta Semanal
            </span>
            <span className="font-headline-sm text-lg font-bold text-[#dfe2ee] mt-0.5">
              {userStats.weeklyWorkoutsDone} de {userStats.weeklyWorkoutsTarget} entrenamientos
            </span>
          </div>
          <span className="font-headline-md text-2xl font-extrabold text-[#c3f400]">
            {Math.round((userStats.weeklyWorkoutsDone / userStats.weeklyWorkoutsTarget) * 100)}%
          </span>
        </div>

        {/* Neon Progress Track */}
        <div className="w-full h-2.5 bg-[#0a0e16] rounded-full overflow-hidden p-0.5 flex items-center">
          <div
            className="h-full bg-[#c3f400] rounded-full shadow-[0_0_12px_rgba(195,244,0,0.6)] transition-all duration-500"
            style={{
              width: `${Math.min(100, (userStats.weeklyWorkoutsDone / userStats.weeklyWorkoutsTarget) * 100)}%`
            }}
          ></div>
        </div>

        {/* Telemetry Badges Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#181c24] border border-[#262a33]">
            <div className="w-10 h-10 rounded-full bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 flex items-center justify-center text-[#ffb4ab] shrink-0">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#8e9379] tracking-wider">
                Calorías
              </span>
              <span className="font-headline-sm text-base text-[#dfe2ee] font-bold">
                {userStats.caloriesBurned.toLocaleString()}{' '}
                <span className="text-[10px] text-[#8e9379] font-normal">kcal</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#181c24] border border-[#262a33]">
            <div className="w-10 h-10 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/20 flex items-center justify-center text-[#4cd7f6] shrink-0">
              <span className="material-symbols-outlined text-[20px]">
                pace
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase font-bold text-[#8e9379] tracking-wider">
                Tiempo Total
              </span>
              <span className="font-headline-sm text-base text-[#dfe2ee] font-bold">
                {userStats.totalTimeMinutes}{' '}
                <span className="text-[10px] text-[#8e9379] font-normal">min</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Actividad Reciente / Logros */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs uppercase tracking-wider text-[#dfe2ee] font-bold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[18px]">
              workspace_premium
            </span>
            Últimos Logros
          </span>
          <button
            onClick={onOpenHistory}
            type="button"
            className="text-[11px] text-[#4cd7f6] font-bold uppercase hover:underline cursor-pointer"
          >
            Ver historial
          </button>
        </div>

        {/* Card de Récord Personal */}
        <div 
          onClick={onOpenHistory}
          className="p-4 rounded-2xl bg-[#181c24] border border-[#262a33] shadow-sm flex items-center justify-between gap-3 relative overflow-hidden cursor-pointer hover:border-[#c3f400]/40 transition-colors"
        >
          {/* Glow Accent Line */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c3f400] shadow-[0_0_8px_#c3f400]"></div>
          
          <div className="flex items-center gap-3 min-w-0 pl-1">
            <div className="w-10 h-10 rounded-full bg-[#c3f400]/15 flex items-center justify-center text-[#c3f400] shrink-0 shadow-[0_0_10px_rgba(195,244,0,0.2)]">
              <span className="material-symbols-outlined text-[22px]">trophy</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-headline-sm text-base text-[#dfe2ee] font-bold truncate">
                  Press de Banca
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#c3f400]/20 text-[#c3f400] font-bold uppercase tracking-wider shrink-0">
                  +5 kg
                </span>
              </div>
              <span className="text-xs text-[#8e9379]">
                Nuevo récord personal: <strong className="text-white">90 kg</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end shrink-0 text-right">
            <span className="text-[11px] text-[#8e9379] uppercase font-semibold">Ayer</span>
            <span className="text-[11px] text-[#c3f400] font-bold uppercase tracking-wider mt-0.5">
              Top 15%
            </span>
          </div>
        </div>
      </div>

      {/* Acceso Rápido: Biometría & Registro Diario */}
      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-[#8e9379] px-1">
          Registro Rápido de Hoy
        </span>
        <div className="grid grid-cols-2 gap-3">
          {/* Tarjeta Peso Corporal */}
          <div className="p-4 rounded-2xl bg-[#1c2028] border border-[#262a33] flex flex-col justify-between gap-3 shadow-sm hover:border-[#31353e] transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#262a33] flex items-center justify-center text-[#4cd7f6]">
                <span className="material-symbols-outlined text-[18px]">monitor_weight</span>
              </div>
              <button
                onClick={() => setEditingWeight(!editingWeight)}
                type="button"
                className="w-7 h-7 rounded-full bg-[#262a33] hover:bg-[#4cd7f6] hover:text-[#003640] flex items-center justify-center text-[#dfe2ee] transition-colors"
                title="Actualizar peso"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {editingWeight ? 'check' : 'edit'}
                </span>
              </button>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e9379]">
                Peso Actual
              </span>
              {editingWeight ? (
                <div className="flex items-center gap-1 mt-1">
                  <input
                    type="number"
                    step="0.1"
                    value={tempWeight}
                    onChange={(e) => setTempWeight(e.target.value)}
                    onBlur={handleSaveWeight}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveWeight()}
                    autoFocus
                    className="w-16 h-8 px-2 bg-[#0a0e16] border border-[#c3f400] rounded text-sm font-bold text-white focus:outline-none"
                  />
                  <span className="text-xs text-[#8e9379]">kg</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="font-headline-md text-2xl font-bold text-[#dfe2ee]">
                    {userStats.currentWeight}
                  </span>
                  <span className="text-xs font-semibold text-[#8e9379]">kg</span>
                </div>
              )}
            </div>
          </div>

          {/* Tarjeta Hidratación */}
          <div className="p-4 rounded-2xl bg-[#1c2028] border border-[#262a33] flex flex-col justify-between gap-3 shadow-sm hover:border-[#31353e] transition-colors">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-lg bg-[#262a33] flex items-center justify-center text-[#4cd7f6]">
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
              </div>
              <button
                onClick={handleAddWater}
                type="button"
                className={`w-7 h-7 rounded-full bg-[#03b5d3]/20 text-[#4cd7f6] hover:bg-[#4cd7f6] hover:text-[#003640] flex items-center justify-center transition-transform ${
                  waterBounce ? 'scale-125' : ''
                }`}
                title="Añadir 250ml (+0.25L)"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8e9379]">
                Hidratación
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-md text-2xl font-bold text-[#4cd7f6]">
                  {userStats.hydrationLiters.toFixed(2)}
                </span>
                <span className="text-xs font-semibold text-[#8e9379]">
                  / {userStats.targetHydrationLiters.toFixed(1)} L
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
