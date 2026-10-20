import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isLiveActive?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, isLiveActive }) => {
  const tabs: Array<{ id: TabType; label: string; icon: string; highlight?: boolean }> = [
    { id: 'inicio', label: 'Inicio', icon: 'home' },
    { id: 'rutinas', label: 'Rutinas', icon: 'fitness_center' },
    { id: 'progreso', label: 'Progreso', icon: 'bar_chart' },
    { id: 'en-vivo', label: 'En Vivo', icon: 'local_fire_department', highlight: isLiveActive }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#0a0e16]/95 backdrop-blur-2xl border-t border-[#1c2028] shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              type="button"
              className={`relative flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[48px] py-1 transition-all active:scale-95 ${
                isActive
                  ? 'text-[#c3f400]'
                  : 'text-[#8e9379] hover:text-[#dfe2ee]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[23px] transition-transform"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0"
                  }}
                >
                  {tab.icon}
                </span>

                {/* Subtle pulse badge for En Vivo if active */}
                {tab.id === 'en-vivo' && isLiveActive && !isActive && (
                  <span className="absolute -top-1 -right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c3f400] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c3f400]"></span>
                  </span>
                )}
              </div>

              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                isActive ? 'text-[#c3f400] font-extrabold' : 'text-[#8e9379]'
              }`}>
                {tab.label}
              </span>

              {/* Active bottom volt line */}
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 rounded-full bg-[#c3f400] shadow-[0_0_8px_#c3f400]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
