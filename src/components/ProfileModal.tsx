import React, { useState } from 'react';
import { UserStats } from '../types';
import { ASSETS } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userStats,
  onUpdateStats
}) => {
  const [weight, setWeight] = useState(userStats.currentWeight);
  const [hydrationTarget, setHydrationTarget] = useState(userStats.targetHydrationLiters);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateStats({
      currentWeight: weight,
      targetHydrationLiters: hydrationTarget
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div 
        className="w-full max-w-sm bg-[#1c2028] border border-[#262a33] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-[#262a33] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={ASSETS.profile}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#c3f400]"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="font-headline-sm text-base font-bold text-white">
                {userStats.name} Morantes
              </h3>
              <p className="text-xs text-[#c3f400] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                {userStats.streakDays} días en racha activa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#181c24] text-[#8e9379] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Biometrics Settings Form */}
        <div className="p-5 space-y-4">
          <div className="p-3 rounded-xl bg-[#181c24] border border-[#262a33] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#4cd7f6] text-[20px]">
                military_tech
              </span>
              <div>
                <span className="text-[10px] text-[#8e9379] uppercase font-bold block">Rango de Atleta</span>
                <span className="text-xs font-bold text-white">
                  Nivel {userStats.level} • {userStats.levelTitle}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#c3f400]/20 text-[#c3f400]">
              TOP 5%
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1">
              Peso Corporal Actual (kg)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="flex-1 h-11 px-3 bg-[#181c24] border border-[#262a33] rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#c3f400]"
              />
              <button
                type="button"
                onClick={() => setWeight((w) => +(w - 0.2).toFixed(1))}
                className="w-10 h-11 bg-[#262a33] text-white rounded-xl text-sm font-bold hover:bg-[#31353e]"
              >
                -
              </button>
              <button
                type="button"
                onClick={() => setWeight((w) => +(w + 0.2).toFixed(1))}
                className="w-10 h-11 bg-[#262a33] text-white rounded-xl text-sm font-bold hover:bg-[#31353e]"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#8e9379] mb-1">
              Meta Diaria de Hidratación (Litros)
            </label>
            <input
              type="number"
              step="0.25"
              value={hydrationTarget}
              onChange={(e) => setHydrationTarget(parseFloat(e.target.value) || 0)}
              className="w-full h-11 px-3 bg-[#181c24] border border-[#262a33] rounded-xl text-sm font-bold text-white focus:outline-none focus:border-[#c3f400]"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleSave}
              type="button"
              className="w-full h-12 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] font-bold text-xs uppercase tracking-wider rounded-full shadow-[0_0_12px_rgba(195,244,0,0.3)] transition-transform active:scale-95"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
