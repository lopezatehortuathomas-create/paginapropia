import React, { useState, useMemo } from 'react';
import { Routine } from '../types';

interface RutinasViewProps {
  routines: Routine[];
  onOpenRoutineDetail: (routine: Routine) => void;
  onStartRoutine: (routine: Routine) => void;
  onToggleBookmark: (routineId: string) => void;
  onOpenNewRoutineModal: () => void;
}

export const RutinasView: React.FC<RutinasViewProps> = ({
  routines,
  onOpenRoutineDetail,
  onStartRoutine,
  onToggleBookmark,
  onOpenNewRoutineModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'hipertrofia', label: 'Hipertrofia' },
    { id: 'fuerza', label: 'Fuerza' },
    { id: 'cardio', label: 'Cardio / HIIT' },
    { id: 'movilidad', label: 'Movilidad' }
  ];

  const equipments = [
    { id: 'all', label: 'Cualquiera', icon: 'tune' },
    { id: 'gym', label: 'Gimnasio Completo', icon: 'fitness_center' },
    { id: 'dumbbells', label: 'Mancuernas', icon: 'sports_martial_arts' },
    { id: 'calisthenics', label: 'Calistenia', icon: 'accessibility_new' }
  ];

  const filteredRoutines = useMemo(() => {
    return routines.filter((r) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        selectedCategory === 'all' || r.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesEq =
        selectedEquipment === 'all' || r.equipment === selectedEquipment;

      return matchesSearch && matchesCat && matchesEq;
    });
  }, [routines, searchQuery, selectedCategory, selectedEquipment]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedEquipment('all');
  };

  const activeCategoryLabel =
    categories.find((c) => c.id === selectedCategory)?.label || 'Todos';

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-4 sm:px-5 pb-24 gap-5">
      {/* Search & Metric Ribbon */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#abd600]">
              Biblioteca de Élite
            </span>
            <h1 className="font-headline-md text-2xl font-bold text-[#dfe2ee]">
              Explorador de Rutinas
            </h1>
          </div>
          <div className="flex items-center gap-1.5 bg-[#262a33] px-3 py-1.5 rounded-full border border-[#31353e] shadow-sm">
            <span
              className="material-symbols-outlined text-[16px] text-[#c3f400]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span className="font-label-md text-xs font-bold text-[#c3f400]">
              {routines.length + 120} Activas
            </span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[#8e9379] text-[20px] pointer-events-none">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar ejercicio, músculo o rutina..."
            className="w-full h-12 pl-11 pr-10 bg-[#262a33] text-[#dfe2ee] font-body-md text-sm rounded-xl outline-none focus:ring-1 focus:ring-[#c3f400] placeholder:text-[#8e9379] border border-[#31353e] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              type="button"
              className="absolute right-3 text-[#8e9379] hover:text-[#dfe2ee] p-1"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Primary Category Filter (Scrollable Chips) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8e9379]">
            Objetivo de Entrenamiento
          </span>
          <span className="text-[11px] font-bold text-[#4cd7f6]">
            {activeCategoryLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                type="button"
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase whitespace-nowrap transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#c3f400] text-[#161e00] shadow-md shadow-[#c3f400]/20'
                    : 'bg-[#262a33] text-[#c4c9ac] hover:text-[#dfe2ee] border border-[#31353e]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Equipment Filter Chips */}
      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#8e9379]">
          Equipamiento Disponible
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {equipments.map((eq) => {
            const isActive = selectedEquipment === eq.id;
            return (
              <button
                key={eq.id}
                onClick={() => setSelectedEquipment(eq.id)}
                type="button"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#03b5d3] text-[#001f26] shadow-sm'
                    : 'bg-[#262a33] text-[#c4c9ac] hover:text-[#dfe2ee] border border-[#31353e]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{eq.icon}</span>
                <span>{eq.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Routines List */}
      <div className="flex flex-col gap-4">
        {filteredRoutines.length > 0 ? (
          filteredRoutines.map((routine) => (
            <article
              key={routine.id}
              className="flex flex-col bg-[#1c2028] border border-[#262a33] rounded-2xl overflow-hidden shadow-lg transition-all hover:translate-y-[-2px] hover:border-[#31353e]"
            >
              <div 
                onClick={() => onOpenRoutineDetail(routine)}
                className="relative w-full h-38 overflow-hidden cursor-pointer group"
              >
                <img
                  src={routine.image}
                  alt={routine.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c2028] via-[#1c2028]/40 to-transparent"></div>

                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0a0e16]/80 backdrop-blur-md text-[#ffb4ab] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]"></span>
                    {routine.level}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#0a0e16]/80 backdrop-blur-md text-[#4cd7f6] text-[10px] font-bold uppercase tracking-wider border border-white/5">
                    {routine.category}
                  </span>
                </div>

                <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[#c3f400] bg-[#0a0e16]/80 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-bold border border-white/5">
                  <span className="material-symbols-outlined text-[14px]">timer</span>
                  <span>{routine.durationMinutes} min</span>
                </div>
              </div>

              <div className="flex flex-col p-4 gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 
                      onClick={() => onOpenRoutineDetail(routine)}
                      className="font-headline-sm text-lg font-bold text-[#dfe2ee] tracking-tight hover:text-white cursor-pointer"
                    >
                      {routine.title}
                    </h3>
                    <p className="text-xs text-[#c4c9ac] flex items-center gap-1.5 mt-0.5 font-medium">
                      <span className="material-symbols-outlined text-[15px] text-[#abd600]">ads_click</span>
                      Foco: {routine.focus}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <span className="font-headline-sm text-lg text-[#c3f400] font-bold">
                      {routine.exerciseCount}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-[#8e9379]">
                      {routine.category === 'cardio' ? 'Intervalos' : 'Ejercicios'}
                    </span>
                  </div>
                </div>

                {/* Telemetry Social / Completion Metric */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-[#8e9379] text-xs">
                    <div className="flex -space-x-1.5 overflow-hidden">
                      <span className="inline-block w-5 h-5 rounded-full bg-[#353942] ring-1 ring-[#1c2028] text-[9px] text-[#dfe2ee] font-bold flex items-center justify-center">
                        JD
                      </span>
                      <span className="inline-block w-5 h-5 rounded-full bg-[#03b5d3] ring-1 ring-[#1c2028] text-[9px] text-[#001f26] font-bold flex items-center justify-center">
                        MR
                      </span>
                      <span className="inline-block w-5 h-5 rounded-full bg-[#c3f400] ring-1 ring-[#1c2028] text-[9px] text-[#161e00] font-bold flex items-center justify-center">
                        KC
                      </span>
                    </div>
                    <span>
                      <strong className="text-[#dfe2ee] font-bold">{routine.completedCount.toLocaleString()}</strong> completaron esta semana
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 pt-1">
                  <button
                    onClick={() => onStartRoutine(routine)}
                    type="button"
                    className="flex-1 h-11 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] rounded-full font-headline-sm text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-[#c3f400]/20"
                  >
                    <span>Ver Rutina</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => onToggleBookmark(routine.id)}
                    type="button"
                    className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
                      routine.isBookmarked
                        ? 'bg-[#c3f400]/20 border-[#c3f400] text-[#c3f400]'
                        : 'bg-[#262a33] border-[#31353e] text-[#8e9379] hover:text-[#c3f400]'
                    }`}
                    title={routine.isBookmarked ? 'Quitar de favoritos' : 'Guardar en favoritos'}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: routine.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          /* Empty Search State */
          <div className="flex flex-col items-center justify-center text-center p-8 bg-[#1c2028] border border-[#262a33] rounded-2xl gap-3">
            <div className="w-12 h-12 rounded-full bg-[#262a33] flex items-center justify-center text-[#8e9379]">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <h3 className="font-headline-sm text-base font-bold text-[#dfe2ee]">
              Sin resultados para esta búsqueda
            </h3>
            <p className="text-xs text-[#8e9379] max-w-xs leading-relaxed">
              Intenta ajustar los filtros de equipamiento o utiliza palabras clave como &quot;Pectoral&quot;, &quot;HIIT&quot; o &quot;Fuerza&quot;.
            </p>
            <button
              onClick={handleResetFilters}
              type="button"
              className="mt-1 px-4 py-2 bg-[#262a33] hover:bg-[#31353e] text-[#c3f400] font-bold text-xs uppercase tracking-wider rounded-full border border-[#31353e]"
            >
              Reiniciar Filtros
            </button>
          </div>
        )}
      </div>

      {/* Custom Routine Creation Call-to-Action Panel */}
      <section className="relative flex flex-col p-5 bg-[#262a33] border border-[#31353e] rounded-2xl overflow-hidden shadow-xl gap-4">
        {/* Decorative Ambient Glow */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#c3f400]/10 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full bg-[#4cd7f6]/10 blur-2xl pointer-events-none"></div>

        <div className="flex items-start gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-[#c3f400] text-[#161e00] flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[24px]">design_services</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#c3f400]">
              Diseño a Medida
            </span>
            <h4 className="font-headline-sm text-lg font-bold text-[#dfe2ee]">
              Crea tu propia rutina personalizada
            </h4>
            <p className="text-xs text-[#c4c9ac] mt-1 leading-relaxed">
              Elige series, pesos objetivo, cadencias de descanso y superseries ajustadas a tu biotipo.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={onOpenNewRoutineModal}
            type="button"
            className="w-full h-12 bg-[#c3f400] hover:bg-[#abd600] text-[#161e00] rounded-full font-headline-sm text-xs uppercase font-extrabold tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#c3f400]/25 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            <span>+ Nueva Rutina</span>
          </button>
        </div>
      </section>
    </div>
  );
};
