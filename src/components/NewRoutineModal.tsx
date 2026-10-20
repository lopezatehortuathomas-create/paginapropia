import React, { useState } from 'react';
import { Routine } from '../types';
import { ASSETS } from '../data/mockData';

interface NewRoutineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoutine: (routine: Routine) => void;
}

export const NewRoutineModal: React.FC<NewRoutineModalProps> = ({
  isOpen,
  onClose,
  onCreateRoutine
}) => {
  const [title, setTitle] = useState('');
  const [focus, setFocus] = useState('Pectoral, Hombro y Tríceps');
  const [category, setCategory] = useState<'hipertrofia' | 'fuerza' | 'cardio' | 'movilidad'>('hipertrofia');
  const [level, setLevel] = useState<'Principiante' | 'Intermedio' | 'Avanzado'>('Intermedio');
  const [equipment, setEquipment] = useState<'gym' | 'dumbbells' | 'calisthenics'>('gym');
  const [duration, setDuration] = useState(45);
  const [exerciseCount, setExerciseCount] = useState(5);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRoutine: Routine = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      level,
      durationMinutes: duration,
      exerciseCount,
      focus: focus.trim() || 'Fuerza Global',
      equipment,
      image: category === 'cardio' ? ASSETS.hiitWorkout : (category === 'fuerza' ? ASSETS.pullWorkout : ASSETS.pushWorkout),
      completedCount: 1,
      isBookmarked: true,
      exercises: [
        {
          id: `cust-ex-1`,
          name: title.trim(),
          muscleGroup: focus.trim(),
          targetMuscles: ['Músculo principal', 'Estabilizadores'],
          equipment: equipment === 'gym' ? 'Barras y Máquinas' : 'Mancuernas',
          image: ASSETS.benchPressLive,
          instructions: ['3-4 series efectivas en rango de hipertrofia', 'Descanso controlado'],
          tips: 'Prioriza técnica y sobrecarga progresiva',
          defaultRestSeconds: 90,
          sets: [
            { id: 1, setNumber: 1, weight: 60, reps: 10, completed: false },
            { id: 2, setNumber: 2, weight: 65, reps: 8, completed: false },
            { id: 3, setNumber: 3, weight: 70, reps: 6, completed: false }
          ]
        }
      ]
    };

    onCreateRoutine(newRoutine);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-md bg-[#1c2028] border border-[#262a33] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#262a33] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400] text-[22px]">
              design_services
            </span>
            <h3 className="font-headline-sm text-lg font-bold text-[#dfe2ee]">
              Crear Rutina Personalizada
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#181c24] text-[#8e9379] hover:text-[#dfe2ee] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
              Nombre de la Rutina
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Push Explosivo & Pecho Superior"
              className="w-full h-11 px-3.5 bg-[#181c24] border border-[#262a33] rounded-xl text-sm text-[#dfe2ee] placeholder:text-[#444933] focus:outline-none focus:border-[#c3f400] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
              Enfoque Muscular / Objetivo
            </label>
            <input
              type="text"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="Ej: Pectoral, Hombro y Tríceps"
              className="w-full h-11 px-3.5 bg-[#181c24] border border-[#262a33] rounded-xl text-sm text-[#dfe2ee] placeholder:text-[#444933] focus:outline-none focus:border-[#c3f400] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-11 px-3 bg-[#181c24] border border-[#262a33] rounded-xl text-xs text-[#dfe2ee] focus:outline-none focus:border-[#c3f400]"
              >
                <option value="hipertrofia">Hipertrofia</option>
                <option value="fuerza">Fuerza</option>
                <option value="cardio">Cardio / HIIT</option>
                <option value="movilidad">Movilidad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
                Nivel
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full h-11 px-3 bg-[#181c24] border border-[#262a33] rounded-xl text-xs text-[#dfe2ee] focus:outline-none focus:border-[#c3f400]"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
                Equipamiento
              </label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value as any)}
                className="w-full h-11 px-3 bg-[#181c24] border border-[#262a33] rounded-xl text-xs text-[#dfe2ee] focus:outline-none focus:border-[#c3f400]"
              >
                <option value="gym">Gimnasio Completo</option>
                <option value="dumbbells">Mancuernas</option>
                <option value="calisthenics">Calistenia</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
                Duración (min)
              </label>
              <input
                type="number"
                min={15}
                max={120}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-11 px-3.5 bg-[#181c24] border border-[#262a33] rounded-xl text-xs text-[#dfe2ee] focus:outline-none focus:border-[#c3f400]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(195,244,0,0.3)] transition-all active:scale-95"
            >
              Guardar y Añadir a Biblioteca
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
