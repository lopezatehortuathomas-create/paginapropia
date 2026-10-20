import React from 'react';
import { ASSETS } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onOpenProfile: () => void;
  isLiveActive?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onOpenProfile, isLiveActive }) => {
  const tabTitles: Record<TabType, string> = {
    inicio: 'Inicio',
    rutinas: 'Rutinas',
    progreso: 'Progreso',
    'en-vivo': 'En Vivo'
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-safe bg-[#0f131b]/85 backdrop-blur-xl border-b border-[#1c2028]/60 shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
      <div className="max-w-4xl mx-auto h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <img
            alt="PulseFit Logo"
            className="h-8 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(195,244,0,0.3)]"
            src={ASSETS.logo}
            referrerPolicy="no-referrer"
          />
          <div className="flex items-center gap-2">
            <span className="font-headline-sm text-[18px] uppercase font-bold text-white tracking-wider">
              PulseFit
            </span>
            {isLiveActive && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c3f400]/15 text-[#c3f400] text-[10px] font-bold tracking-wider uppercase border border-[#c3f400]/30 animate-pulse">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c3f400]"></span>
                En Vivo
              </span>
            )}
          </div>
        </div>

        {/* Current Tab Indicator (Desktop / subtle) & User Profile */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8e9379] hidden md:inline-block">
            {tabTitles[currentTab]}
          </span>

          {/* Profile Trigger */}
          <button
            onClick={onOpenProfile}
            type="button"
            className="group relative flex items-center gap-2 p-1 rounded-full bg-[#181c24] hover:bg-[#262a33] border border-[#262a33] transition-all active:scale-95"
            title="Ver perfil de atleta y métricas"
          >
            <div className="relative">
              <img
                alt="Carlos - Atleta PulseFit"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#c3f400]/40 group-hover:ring-[#c3f400] transition-all"
                src={ASSETS.profile}
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#c3f400] ring-2 ring-[#0f131b]"></span>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold text-[#dfe2ee] pr-2">
              Carlos M.
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
