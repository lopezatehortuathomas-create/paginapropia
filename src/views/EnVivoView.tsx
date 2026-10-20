import React, { useState, useEffect } from 'react';
import { Routine, Exercise } from '../types';
import { RPE_DESCRIPTIONS } from '../data/mockData';

interface EnVivoViewProps {
  activeRoutine: Routine;
  onFinishWorkout: (sessionStats: {
    durationFormatted: string;
    totalVolumeKg: number;
    completedSetsCount: number;
    caloriesBurned: number;
  }) => void;
  onOpenExerciseInfo: (exercise: Exercise) => void;
}

export const EnVivoView: React.FC<EnVivoViewProps> = ({
  activeRoutine,
  onFinishWorkout,
  onOpenExerciseInfo
}) => {
  // Global workout session stopwatch
  const [sessionSeconds, setSessionSeconds] = useState(1458); // default around 24:18 matching screenshot
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Exercise selection
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(1); // 1 = Press de Banca Plano (Ejercicio 2 de 5)
  const currentExercise = activeRoutine.exercises[currentExerciseIndex] || activeRoutine.exercises[0];

  // Dynamic set state for current exercise
  const [sets, setSets] = useState(() => currentExercise.sets);

  // When current exercise changes, sync sets
  useEffect(() => {
    if (currentExercise) {
      setSets(currentExercise.sets);
    }
  }, [currentExerciseIndex]);

  // Active set index (first uncompleted set)
  const activeSetIndex = sets.findIndex((s) => !s.completed);
  const currentActiveSet = activeSetIndex !== -1 ? sets[activeSetIndex] : null;

  // Kinetic weight and reps controls for active set
  const [activeWeight, setActiveWeight] = useState(85);
  const [activeReps, setActiveReps] = useState(8);

  useEffect(() => {
    if (currentActiveSet) {
      setActiveWeight(currentActiveSet.weight || 85);
      setActiveReps(currentActiveSet.reps || 8);
    }
  }, [currentActiveSet?.id]);

  // Rest timer
  const [restSeconds, setRestSeconds] = useState(75);
  const [restInitialTarget, setRestInitialTarget] = useState(90);
  const [isRestRunning, setIsRestRunning] = useState(true);

  // Selected RPE
  const [selectedRpe, setSelectedRpe] = useState<number>(8);

  // Global workout stopwatch ticking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Tactical rest countdown ticking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRestRunning && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestRunning, restSeconds]);

  // Format MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Adjust active set values
  const adjustActiveWeight = (delta: number) => {
    setActiveWeight((prev) => Math.max(0, +(prev + delta).toFixed(1)));
  };

  const adjustActiveReps = (delta: number) => {
    setActiveReps((prev) => Math.max(1, prev + delta));
  };

  // Complete active set
  const handleCompleteActiveSet = () => {
    if (activeSetIndex === -1) return;

    setSets((prev) => {
      const updated = [...prev];
      updated[activeSetIndex] = {
        ...updated[activeSetIndex],
        weight: activeWeight,
        reps: activeReps,
        completed: true,
        rpe: selectedRpe
      };
      return updated;
    });

    // Reset rest countdown to target
    const target = currentExercise.defaultRestSeconds || 90;
    setRestInitialTarget(target);
    setRestSeconds(target);
    setIsRestRunning(true);
  };

  // Toggle set completed directly
  const handleToggleSet = (index: number) => {
    setSets((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        completed: !updated[index].completed
      };
      return updated;
    });
  };

  // Add new set
  const handleAddSet = () => {
    setSets((prev) => [
      ...prev,
      {
        id: Date.now(),
        setNumber: prev.length + 1,
        weight: activeWeight,
        reps: activeReps,
        completed: false
      }
    ]);
  };

  // Modify rest timer
  const handleModifyRest = (delta: number) => {
    setRestSeconds((prev) => Math.max(0, prev + delta));
  };

  const handleSkipRest = () => {
    setRestSeconds(0);
  };

  // Navigation between exercises
  const nextExerciseIndex = (currentExerciseIndex + 1) % activeRoutine.exercises.length;
  const nextExercise = activeRoutine.exercises[nextExerciseIndex];

  const handleNextExercise = () => {
    setCurrentExerciseIndex(nextExerciseIndex);
    setRestSeconds(90);
    setIsRestRunning(false);
  };

  // Calculate routine progress
  const completedSetsCount = sets.filter((s) => s.completed).length;
  const progressPercent = Math.min(
    100,
    Math.round(
      ((currentExerciseIndex * 4 + completedSetsCount) /
        (activeRoutine.exercises.length * 4)) *
        100
    )
  );

  // Total volume calculation
  const totalVolumeKg = sets
    .filter((s) => s.completed)
    .reduce((sum, s) => sum + s.weight * s.reps, 0) + (currentExerciseIndex * 1800);

  const handleFinish = () => {
    setIsTimerRunning(false);
    onFinishWorkout({
      durationFormatted: formatTime(sessionSeconds),
      totalVolumeKg: Math.max(3200, totalVolumeKg),
      completedSetsCount: Math.max(8, completedSetsCount + currentExerciseIndex * 3),
      caloriesBurned: Math.round((sessionSeconds / 60) * 8.5)
    });
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-4 sm:px-5 pb-24 gap-4">
      {/* Cabecera de Telemetría Global */}
      <section className="bg-[#1c2028] border border-[#262a33] rounded-2xl p-4 shadow-md flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#c3f400] animate-ping"></span>
            <span className="text-[10px] font-bold text-[#c3f400] uppercase tracking-wider">
              En Vivo • {activeRoutine.title.replace('Hypertrophy', '').trim()}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              type="button"
              className="font-headline-xl-mobile text-3xl font-extrabold text-[#dfe2ee] tracking-tight hover:text-[#c3f400] transition-colors"
              title={isTimerRunning ? 'Pausar cronómetro' : 'Reanudar cronómetro'}
            >
              {formatTime(sessionSeconds)}
            </button>
            <span className="text-[10px] font-bold text-[#8e9379] uppercase">
              Tiempo Total
            </span>
          </div>
        </div>

        <button
          onClick={handleFinish}
          type="button"
          className="bg-[#262a33] hover:bg-[#31353e] active:scale-95 transition-all text-[#ffb4ab] border border-[#ffb4ab]/30 text-xs font-bold uppercase px-3.5 py-2 rounded-full flex items-center gap-1.5 shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">stop_circle</span>
          <span>Finalizar</span>
        </button>
      </section>

      {/* Tarjeta de Ejercicio Actual */}
      <section className="bg-[#1c2028] border border-[#262a33] rounded-2xl overflow-hidden shadow-lg flex flex-col">
        {/* Vista Previa / Ilustración del Ejercicio */}
        <div className="relative w-full h-44 bg-[#0a0e16] flex items-center justify-center overflow-hidden">
          <img
            src={currentExercise.image}
            alt={currentExercise.name}
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          {/* Degradado de Legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c2028] via-[#1c2028]/35 to-transparent"></div>

          {/* Badge de Estado del Ejercicio */}
          <div className="absolute top-3 left-3 bg-[#0a0e16]/80 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm border border-white/5">
            <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider">
              Ejercicio {currentExerciseIndex + 1} de {activeRoutine.exercises.length}
            </span>
          </div>

          {/* Control de Guía de Forma */}
          <button
            onClick={() => onOpenExerciseInfo(currentExercise)}
            type="button"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0a0e16]/80 backdrop-blur-md text-[#dfe2ee] flex items-center justify-center hover:bg-[#262a33] active:scale-90 transition-all border border-white/5"
            title="Ver guía biomecánica y consejos"
          >
            <span className="material-symbols-outlined text-[20px]">info</span>
          </button>

          {/* Nombre del Ejercicio */}
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-bold text-[#c3f400] uppercase tracking-wider">
              {currentExercise.muscleGroup}
            </span>
            <h2 className="font-headline-md text-xl font-bold text-white leading-tight mt-0.5">
              {currentExercise.name}
            </h2>
          </div>
        </div>

        {/* Tabla Interactiva de Series */}
        <div className="p-4 flex flex-col gap-2">
          <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-[#8e9379] uppercase pb-1 px-2">
            <span className="col-span-2">Serie</span>
            <span className="col-span-4 text-center">Peso</span>
            <span className="col-span-4 text-center">Reps</span>
            <span className="col-span-2 text-right">Check</span>
          </div>

          {/* Render Sets */}
          {sets.map((s, idx) => {
            const isActive = idx === activeSetIndex;

            if (isActive) {
              return (
                /* Active Set with Kinetic Controls */
                <div
                  key={s.id || idx}
                  className="grid grid-cols-12 gap-2 items-center bg-[#262a33] border border-[#c3f400]/40 p-2.5 rounded-xl shadow-md"
                >
                  <div className="col-span-2 flex flex-col">
                    <span className="font-headline-sm text-base font-bold text-[#c3f400]">
                      0{s.setNumber}
                    </span>
                    <span className="text-[9px] uppercase font-bold text-[#c3f400] tracking-wider">
                      Activa
                    </span>
                  </div>

                  {/* Ajuste Peso */}
                  <div className="col-span-4 flex items-center justify-between bg-[#0a0e16] border border-[#31353e] rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => adjustActiveWeight(-2.5)}
                      className="w-6 h-6 rounded bg-[#262a33] text-[#dfe2ee] font-bold flex items-center justify-center active:scale-90"
                    >
                      -
                    </button>
                    <div className="flex items-baseline justify-center">
                      <span className="font-headline-sm text-sm font-bold text-white">
                        {activeWeight}
                      </span>
                      <span className="text-[9px] text-[#8e9379] ml-0.5">k</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustActiveWeight(2.5)}
                      className="w-6 h-6 rounded bg-[#262a33] text-[#dfe2ee] font-bold flex items-center justify-center active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  {/* Ajuste Reps */}
                  <div className="col-span-4 flex items-center justify-between bg-[#0a0e16] border border-[#31353e] rounded-lg p-1">
                    <button
                      type="button"
                      onClick={() => adjustActiveReps(-1)}
                      className="w-6 h-6 rounded bg-[#262a33] text-[#dfe2ee] font-bold flex items-center justify-center active:scale-90"
                    >
                      -
                    </button>
                    <div className="flex items-baseline justify-center">
                      <span className="font-headline-sm text-sm font-bold text-white">
                        {activeReps}
                      </span>
                      <span className="text-[9px] text-[#8e9379] ml-0.5">r</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustActiveReps(1)}
                      className="w-6 h-6 rounded bg-[#262a33] text-[#dfe2ee] font-bold flex items-center justify-center active:scale-90"
                    >
                      +
                    </button>
                  </div>

                  {/* Botón Completar Serie Activa */}
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleCompleteActiveSet}
                      className="w-9 h-9 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center shadow-lg shadow-[#c3f400]/30 active:scale-95 transition-transform"
                      title="Registrar serie y activar descanso"
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        done
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            if (s.completed) {
              return (
                /* Completed Set */
                <div
                  key={s.id || idx}
                  className="grid grid-cols-12 gap-2 items-center bg-[#181c24] border border-[#262a33] p-2.5 rounded-xl text-[#8e9379]"
                >
                  <div className="col-span-2 flex items-center gap-1">
                    <span className="font-headline-sm text-sm font-bold text-[#8e9379]">
                      0{s.setNumber}
                    </span>
                  </div>
                  <div className="col-span-4 text-center">
                    <span className="text-sm font-semibold text-[#dfe2ee] line-through opacity-70">
                      {s.weight}
                    </span>
                    <span className="text-[10px] text-[#8e9379] ml-0.5">kg</span>
                  </div>
                  <div className="col-span-4 text-center">
                    <span className="text-sm font-semibold text-[#dfe2ee] line-through opacity-70">
                      {s.reps}
                    </span>
                    <span className="text-[10px] text-[#8e9379] ml-0.5">reps</span>
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleToggleSet(idx)}
                      className="w-8 h-8 rounded-full bg-[#262a33] flex items-center justify-center text-[#c3f400] shadow-sm hover:scale-105"
                      title="Desmarcar serie"
                    >
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              /* Pending Set */
              <div
                key={s.id || idx}
                className="grid grid-cols-12 gap-2 items-center bg-[#181c24]/60 border border-[#262a33]/60 p-2.5 rounded-xl text-[#8e9379] opacity-60 hover:opacity-100 transition-opacity"
              >
                <div className="col-span-2">
                  <span className="font-headline-sm text-sm font-bold text-[#8e9379]">
                    0{s.setNumber}
                  </span>
                </div>
                <div className="col-span-4 text-center">
                  <span className="text-sm font-semibold text-[#dfe2ee]">{s.weight}</span>
                  <span className="text-[10px] text-[#8e9379] ml-0.5">kg</span>
                </div>
                <div className="col-span-4 text-center">
                  <span className="text-sm font-semibold text-[#dfe2ee]">{s.reps}</span>
                  <span className="text-[10px] text-[#8e9379] ml-0.5">reps</span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleToggleSet(idx)}
                    className="w-8 h-8 rounded-full bg-[#0a0e16] flex items-center justify-center text-[#8e9379]/40 hover:text-[#c3f400]"
                    title="Marcar como completada"
                  >
                    <span className="material-symbols-outlined text-[16px]">radio_button_unchecked</span>
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-1 flex justify-end">
            <button
              onClick={handleAddSet}
              type="button"
              className="text-[11px] font-bold text-[#4cd7f6] uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
              Añadir Serie
            </button>
          </div>
        </div>
      </section>

      {/* Temporizador de Descanso Táctico (Interactivo) */}
      <section className="bg-[#262a33] border border-[#31353e] rounded-2xl p-4 shadow-md flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#4cd7f6]/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">
              timer
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4cd7f6]">
              Descanso entre series
            </span>
          </div>
          <span className="text-xs text-[#8e9379]">
            Objetivo: {restInitialTarget}s
          </span>
        </div>

        {/* Contador Principal */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-xl-mobile text-3xl font-extrabold text-[#acedff] tracking-tight">
              {formatTime(restSeconds)}
            </span>
            <span className="text-[10px] font-bold text-[#4cd7f6] uppercase tracking-wider">
              Restante
            </span>
          </div>

          {/* Acciones de Tiempo */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleModifyRest(-15)}
              type="button"
              className="bg-[#31353e] hover:bg-[#353942] active:scale-90 transition-all text-[#dfe2ee] text-xs font-bold px-2.5 py-1.5 rounded-lg border border-[#31353e]"
            >
              -15s
            </button>
            <button
              onClick={() => handleModifyRest(15)}
              type="button"
              className="bg-[#31353e] hover:bg-[#353942] active:scale-90 transition-all text-[#dfe2ee] text-xs font-bold px-2.5 py-1.5 rounded-lg border border-[#31353e]"
            >
              +15s
            </button>
            <button
              onClick={handleSkipRest}
              type="button"
              className="bg-[#03b5d3] hover:bg-[#4cd7f6] active:scale-90 transition-all text-[#001f26] text-xs font-extrabold px-3 py-1.5 rounded-lg"
            >
              Saltar
            </button>
          </div>
        </div>

        {/* Barra de progreso descanso */}
        <div className="w-full bg-[#0a0e16] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#4cd7f6] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#4cd7f6]"
            style={{
              width: `${Math.min(100, Math.max(0, (restSeconds / restInitialTarget) * 100))}%`
            }}
          ></div>
        </div>
      </section>

      {/* Selector de RPE (Esfuerzo Percibido 1 al 10) */}
      <section className="bg-[#1c2028] border border-[#262a33] rounded-2xl p-4 shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400] text-[20px]">
              speed
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#dfe2ee]">
              RPE (Esfuerzo Percibido)
            </span>
          </div>
          <span className="text-[11px] text-[#c3f400] font-bold uppercase">
            {RPE_DESCRIPTIONS[selectedRpe] || `${selectedRpe} • Seleccionado`}
          </span>
        </div>

        {/* Botones de la escala 1-10 */}
        <div className="grid grid-cols-10 gap-1 mt-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val) => {
            const isSelected = selectedRpe === val;
            return (
              <button
                key={val}
                onClick={() => setSelectedRpe(val)}
                type="button"
                className={`h-9 rounded-lg font-headline-sm text-xs font-bold flex items-center justify-center transition-all ${
                  isSelected
                    ? val === 10
                      ? 'bg-[#ffb4ab] text-[#690005] shadow-md scale-105'
                      : 'bg-[#c3f400] text-[#161e00] shadow-md shadow-[#c3f400]/25 scale-105'
                    : val === 10
                    ? 'bg-[#181c24] text-[#ffb4ab] hover:bg-[#262a33]'
                    : 'bg-[#181c24] text-[#8e9379] hover:bg-[#262a33] hover:text-[#dfe2ee]'
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>
      </section>

      {/* Navegación & Progreso de la Sesión */}
      <section className="flex flex-col gap-3 pt-1">
        {/* Barra de progreso del workout completo */}
        <div className="bg-[#1c2028] border border-[#262a33] rounded-2xl p-3 flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center justify-between text-xs font-bold px-1">
            <span className="text-[#8e9379] uppercase tracking-wider">
              Progreso de la Rutina
            </span>
            <span className="text-[#c3f400]">
              {progressPercent}% COMPLETADO
            </span>
          </div>
          <div className="w-full bg-[#0a0e16] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#c3f400] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#c3f400]"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Botón de Siguiente Ejercicio */}
        <button
          onClick={handleNextExercise}
          type="button"
          className="w-full h-14 bg-[#c3f400] hover:bg-[#abd600] active:scale-[0.98] transition-all rounded-full flex items-center justify-between px-5 shadow-xl shadow-[#c3f400]/20 text-[#161e00]"
        >
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
              Siguiente Movimiento ({nextExerciseIndex + 1}/{activeRoutine.exercises.length})
            </span>
            <span className="font-headline-sm text-sm font-extrabold truncate max-w-[260px]">
              {nextExercise.name}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#161e00]/15 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
          </div>
        </button>
      </section>
    </div>
  );
};
