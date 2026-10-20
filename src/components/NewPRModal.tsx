import React, { useState } from 'react';
import { PersonalRecord } from '../types';

interface NewPRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPR: (pr: PersonalRecord) => void;
}

export const NewPRModal: React.FC<NewPRModalProps> = ({ isOpen, onClose, onAddPR }) => {
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState(100);
  const [reps, setReps] = useState(3);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;

    const newPR: PersonalRecord = {
      id: `pr-${Date.now()}`,
      exerciseName: exerciseName.trim(),
      repsText: `Serie de ${reps} reps`,
      weight,
      weightUnit: 'kg',
      status: 'NUEVO PR',
      icon: 'fitness_center',
      iconColor: '#c3f400',
      date: 'Hoy'
    };

    onAddPR(newPR);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-sm bg-[#1c2028] border border-[#262a33] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#262a33] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c3f400] text-[22px]">
              emoji_events
            </span>
            <h3 className="font-headline-sm text-base font-bold text-white">
              Registrar Récord Personal
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#181c24] text-[#8e9379] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
              Ejercicio
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Peso Muerto Rumano"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="w-full h-11 px-3.5 bg-[#181c24] border border-[#262a33] rounded-xl text-sm text-[#dfe2ee] placeholder:text-[#444933] focus:outline-none focus:border-[#c3f400]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full h-11 px-3.5 bg-[#181c24] border border-[#262a33] rounded-xl text-sm text-[#dfe2ee] focus:outline-none focus:border-[#c3f400]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1.5">
                Repeticiones
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value, 10) || 1)}
                className="w-full h-11 px-3.5 bg-[#181c24] border border-[#262a33] rounded-xl text-sm text-[#dfe2ee] focus:outline-none focus:border-[#c3f400]"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_0_12px_rgba(195,244,0,0.3)] transition-transform active:scale-95"
            >
              Guardar Nuevo PR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
