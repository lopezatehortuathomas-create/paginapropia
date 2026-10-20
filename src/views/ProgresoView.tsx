import React, { useState } from 'react';
import { PersonalRecord, DailyWorkload } from '../types';
import { ASSETS } from '../data/mockData';

interface ProgresoViewProps {
  personalRecords: PersonalRecord[];
  dailyWorkloads: DailyWorkload[];
  onOpenNewPR: () => void;
  onOpenRoutineDetail: (routineId: string) => void;
}

export const ProgresoView: React.FC<ProgresoViewProps> = ({
  personalRecords,
  dailyWorkloads,
  onOpenNewPR
}) => {
  const [period, setPeriod] = useState<'semana' | 'mes' | 'año'>('semana');
  const [confettiActive, setConfettiActive] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [showOverloadDetail, setShowOverloadDetail] = useState(false);

  const handleConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 900);
  };

  // Dynamic period metrics multiplier
  const mult = period === 'mes' ? 4.2 : period === 'año' ? 52 : 1;
  const volumeKg = Math.round(14250 * mult);
  const totalHours = period === 'mes' ? '17h 40m' : period === 'año' ? '215h' : '4h 15m';
  const totalKcal = Math.round(2340 * mult);
  const frequencyText = period === 'mes' ? '21/24' : period === 'año' ? '248/280' : '5/6';

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto px-4 sm:px-5 pb-24 gap-5">
      {/* Selector de Período */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8e9379]">
            Rendimiento Biomecánico
          </span>
          <h1 className="font-headline-md text-2xl font-bold text-[#dfe2ee]">
            Progreso {period === 'semana' ? 'Semanal' : period === 'mes' ? 'Mensual' : 'Anual'}
          </h1>
        </div>

        {/* Time Segmented Buttons */}
        <div className="inline-flex p-1 rounded-full bg-[#181c24] border border-[#262a33] shadow-inner">
          <button
            onClick={() => setPeriod('semana')}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              period === 'semana'
                ? 'bg-[#c3f400] text-[#161e00] shadow-sm'
                : 'text-[#c4c9ac] hover:text-[#dfe2ee]'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setPeriod('mes')}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              period === 'mes'
                ? 'bg-[#c3f400] text-[#161e00] shadow-sm'
                : 'text-[#c4c9ac] hover:text-[#dfe2ee]'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setPeriod('año')}
            type="button"
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
              period === 'año'
                ? 'bg-[#c3f400] text-[#161e00] shadow-sm'
                : 'text-[#c4c9ac] hover:text-[#dfe2ee]'
            }`}
          >
            Año
          </button>
        </div>
      </div>

      {/* Recompensa de Consistencia / Momento de Deleite */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#262a33] via-[#1c2028] to-[#262a33] border border-[#31353e] p-4 shadow-lg transition-all duration-300 ${
        confettiActive ? 'ring-2 ring-[#c3f400] shadow-[0_0_25px_rgba(195,244,0,0.3)]' : ''
      }`}>
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#c3f400]/15 blur-2xl pointer-events-none"></div>

        <div className="relative flex items-center gap-3.5">
          <div className="relative flex-shrink-0 w-12 h-12 rounded-full bg-[#c3f400]/20 border border-[#c3f400]/30 flex items-center justify-center text-[#c3f400]">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              military_tech
            </span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c3f400] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c3f400]"></span>
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#c3f400] tracking-wider">
                Hito Desbloqueado
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#c3f400]/20 text-[#c3f400] text-[9px] font-extrabold uppercase">
                NIVEL 3
              </span>
            </div>
            <p className="font-headline-sm text-base font-bold text-[#dfe2ee] truncate mt-0.5">
              Semana de Acero
            </p>
            <p className="text-xs text-[#c4c9ac] truncate">
              5 de 6 sesiones ejecutadas con éxito
            </p>
          </div>

          <button
            onClick={handleConfetti}
            type="button"
            className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#31353e] text-[#dfe2ee] flex items-center justify-center hover:bg-[#c3f400] hover:text-[#161e00] transition-transform ${
              confettiActive ? 'scale-125 bg-[#c3f400] text-[#161e00]' : 'active:scale-95'
            }`}
            title="Celebrar hito"
          >
            <span className="material-symbols-outlined text-[20px]">
              celebration
            </span>
          </button>
        </div>
      </div>

      {/* Métricas Clave Grid 2x2 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Volumen Total */}
        <div className="rounded-2xl bg-[#181c24] border border-[#262a33] p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#8e9379] uppercase tracking-wider">
              Volumen
            </span>
            <span className="inline-flex items-center text-[#c3f400] text-xs font-bold gap-0.5">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>+8%
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#dfe2ee] tracking-tight">
                {volumeKg.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[#8e9379]">kg</span>
            </div>
            <p className="text-[11px] text-[#444933] mt-0.5 font-semibold">
              +{Math.round(1050 * mult).toLocaleString()} kg vs anterior
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c3f400] shadow-[0_0_8px_#c3f400]"></div>
        </div>

        {/* Tiempo Activo */}
        <div className="rounded-2xl bg-[#181c24] border border-[#262a33] p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#8e9379] uppercase tracking-wider">
              Tiempo Zona
            </span>
            <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">
              pace
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#dfe2ee] tracking-tight">
                {totalHours}
              </span>
            </div>
            <p className="text-[11px] text-[#444933] mt-0.5 font-semibold">
              85% en RPE 7-9
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#4cd7f6] shadow-[0_0_8px_#4cd7f6]"></div>
        </div>

        {/* Calorías */}
        <div className="rounded-2xl bg-[#181c24] border border-[#262a33] p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#8e9379] uppercase tracking-wider">
              Energía
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-[#ffb4ab]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#dfe2ee] tracking-tight">
                {totalKcal.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-[#8e9379]">kcal</span>
            </div>
            <p className="text-[11px] text-[#444933] mt-0.5 font-semibold">
              Prom. 468 kcal/sesión
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#353942]"></div>
        </div>

        {/* Días Completados */}
        <div className="rounded-2xl bg-[#181c24] border border-[#262a33] p-4 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#8e9379] uppercase tracking-wider">
              Frecuencia
            </span>
            <span
              className="material-symbols-outlined text-[16px] text-[#c3f400]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-1">
              <span className="font-headline-md text-2xl font-extrabold text-[#dfe2ee] tracking-tight">
                {frequencyText}
              </span>
              <span className="text-xs font-bold text-[#8e9379]">días</span>
            </div>
            <p className="text-[11px] text-[#444933] mt-0.5 font-semibold">
              Resta 1 para objetivo
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#abd600]"></div>
        </div>
      </div>

      {/* Gráfico de Carga Semanal Estilizado */}
      <div className="rounded-2xl bg-[#181c24] border border-[#262a33] p-4 sm:p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-base font-bold text-[#dfe2ee]">
              Carga Diaria de Trabajo
            </h3>
            <p className="text-xs text-[#8e9379]">
              Intensidad relativa por jornada
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] shadow-[0_0_6px_#c3f400]"></span>
            <span className="text-xs font-bold text-[#8e9379]">Picos</span>
          </div>
        </div>

        {/* Barras Visuales */}
        <div className="grid grid-cols-7 gap-2 items-end h-44 pt-4 px-1">
          {dailyWorkloads.map((day) => {
            const isPeak = day.isPeak;
            const isOff = day.isRest;
            const heightPercent = isOff
              ? 12
              : Math.min(100, Math.round((day.tonnage / 3.6) * 100));

            return (
              <div
                key={day.shortDay}
                onMouseEnter={() => setHoveredDay(day.day)}
                onMouseLeave={() => setHoveredDay(null)}
                className="flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                <span
                  className={`text-[10px] mb-1 font-bold transition-opacity ${
                    isPeak
                      ? 'text-[#c3f400] opacity-100 font-extrabold'
                      : 'text-[#8e9379] opacity-80 group-hover:opacity-100'
                  }`}
                >
                  {isOff ? 'OFF' : `${day.tonnage}t`}
                </span>

                <div
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    isPeak
                      ? 'bg-[#c3f400] shadow-[0_0_12px_rgba(195,244,0,0.5)]'
                      : isOff
                      ? 'bg-[#0a0e16]/60 border border-[#262a33]'
                      : 'bg-[#31353e] group-hover:bg-[#4cd7f6]'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                ></div>

                <span
                  className={`text-xs font-bold mt-2 ${
                    isPeak ? 'text-[#c3f400]' : isOff ? 'text-[#444933]' : 'text-[#8e9379]'
                  }`}
                >
                  {day.shortDay}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#1c2028] border border-[#262a33]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">
              info
            </span>
            <span className="text-xs text-[#dfe2ee]">
              {hoveredDay
                ? `Mostrando detalles de ${hoveredDay}`
                : 'Pico máximo registrado el Sábado (Espalda y Brazos).'}
            </span>
          </div>
        </div>
      </div>

      {/* Desglose por Grupo Muscular */}
      <div className="rounded-2xl bg-[#181c24] border border-[#262a33] p-4 sm:p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline-sm text-base font-bold text-[#dfe2ee]">
              Distribución Muscular
            </h3>
            <p className="text-xs text-[#8e9379]">
              Porcentaje de series efectivas
            </p>
          </div>
          <span className="material-symbols-outlined text-[#8e9379]">
            donut_large
          </span>
        </div>

        {/* Barra combinada horizontal */}
        <div className="w-full h-3 rounded-full overflow-hidden flex bg-[#31353e]">
          <div
            className="h-full bg-[#c3f400] transition-all"
            style={{ width: '35%' }}
            title="Pecho: 35%"
          ></div>
          <div
            className="h-full bg-[#4cd7f6] transition-all"
            style={{ width: '25%' }}
            title="Espalda: 25%"
          ></div>
          <div
            className="h-full bg-[#98da27] transition-all"
            style={{ width: '25%' }}
            title="Piernas: 25%"
          ></div>
          <div
            className="h-full bg-[#353942] transition-all"
            style={{ width: '15%' }}
            title="Brazos/Hombros: 15%"
          ></div>
        </div>

        {/* Lista de desglose en grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          {/* Pecho */}
          <button
            onClick={() => setSelectedMuscle(selectedMuscle === 'pecho' ? null : 'pecho')}
            type="button"
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
              selectedMuscle === 'pecho'
                ? 'bg-[#1c2028] border-[#c3f400]'
                : 'bg-[#1c2028] border-[#262a33] hover:border-[#31353e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] flex-shrink-0"></span>
              <span className="text-xs font-semibold text-[#dfe2ee] truncate">Pecho</span>
            </div>
            <span className="text-xs font-extrabold text-[#c3f400]">35%</span>
          </button>

          {/* Espalda */}
          <button
            onClick={() => setSelectedMuscle(selectedMuscle === 'espalda' ? null : 'espalda')}
            type="button"
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
              selectedMuscle === 'espalda'
                ? 'bg-[#1c2028] border-[#4cd7f6]'
                : 'bg-[#1c2028] border-[#262a33] hover:border-[#31353e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4cd7f6] flex-shrink-0"></span>
              <span className="text-xs font-semibold text-[#dfe2ee] truncate">Espalda</span>
            </div>
            <span className="text-xs font-extrabold text-[#4cd7f6]">25%</span>
          </button>

          {/* Piernas */}
          <button
            onClick={() => setSelectedMuscle(selectedMuscle === 'piernas' ? null : 'piernas')}
            type="button"
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
              selectedMuscle === 'piernas'
                ? 'bg-[#1c2028] border-[#98da27]'
                : 'bg-[#1c2028] border-[#262a33] hover:border-[#31353e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#98da27] flex-shrink-0"></span>
              <span className="text-xs font-semibold text-[#dfe2ee] truncate">Piernas</span>
            </div>
            <span className="text-xs font-extrabold text-[#98da27]">25%</span>
          </button>

          {/* Brazos & Hombros */}
          <button
            onClick={() => setSelectedMuscle(selectedMuscle === 'brazos' ? null : 'brazos')}
            type="button"
            className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-colors ${
              selectedMuscle === 'brazos'
                ? 'bg-[#1c2028] border-[#dfe2ee]'
                : 'bg-[#1c2028] border-[#262a33] hover:border-[#31353e]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#353942] flex-shrink-0"></span>
              <span className="text-xs font-semibold text-[#dfe2ee] truncate">Brazos/Homb.</span>
            </div>
            <span className="text-xs font-extrabold text-[#8e9379]">15%</span>
          </button>
        </div>
      </div>

      {/* Récords Personales (PRs) */}
      <div className="rounded-2xl bg-[#181c24] border border-[#262a33] p-4 sm:p-5 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#c3f400]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              trophy
            </span>
            <h3 className="font-headline-sm text-base font-bold text-[#dfe2ee]">
              Récords Personales (PRs)
            </h3>
          </div>
          <button
            onClick={onOpenNewPR}
            type="button"
            className="text-[11px] font-bold text-[#c3f400] uppercase hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            Añadir PR
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {personalRecords.map((pr) => (
            <div
              key={pr.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#1c2028] border border-[#262a33] hover:border-[#31353e] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#262a33] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: pr.iconColor }}
                  >
                    {pr.icon}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-[#dfe2ee] font-bold truncate">
                    {pr.exerciseName}
                  </p>
                  <p className="text-xs text-[#8e9379]">
                    {pr.repsText}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end flex-shrink-0 pl-2">
                <span className="font-headline-sm text-base font-bold text-[#dfe2ee]">
                  {pr.weight > 0 ? (pr.exerciseName.includes('Lastradas') ? `+${pr.weight}` : pr.weight) : ''}{' '}
                  <span className="text-[11px] text-[#8e9379] font-normal">{pr.weightUnit}</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold mt-0.5 ${
                    pr.status === 'NUEVO PR'
                      ? 'bg-[#c3f400] text-[#161e00]'
                      : 'bg-[#262a33] text-[#c4c9ac]'
                  }`}
                >
                  {pr.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Atleta en Acción / Visual Ambient Proyección de Sobrecarga */}
      <div className="rounded-2xl overflow-hidden relative bg-[#181c24] border border-[#262a33] p-4 flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0 ring-1 ring-[#262a33]"
          alt="Atleta en acción"
          src={ASSETS.ambientAthlete}
          referrerPolicy="no-referrer"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-headline-sm text-sm font-bold text-[#dfe2ee]">
            Proyección de Sobrecarga
          </h4>
          <p className="text-xs text-[#8e9379] truncate mt-0.5">
            Siguiente microciclo programado para +2.5% de volumen.
          </p>
        </div>
        <button
          onClick={() => setShowOverloadDetail(!showOverloadDetail)}
          type="button"
          className="w-10 h-10 rounded-full bg-[#c3f400] text-[#161e00] flex items-center justify-center flex-shrink-0 shadow-md shadow-[#c3f400]/25 transition-transform active:scale-95"
          title="Ver proyección de sobrecarga"
        >
          <span className="material-symbols-outlined text-[20px]">
            {showOverloadDetail ? 'expand_less' : 'arrow_forward'}
          </span>
        </button>
      </div>

      {showOverloadDetail && (
        <div className="p-4 rounded-2xl bg-[#1c2028] border border-[#c3f400]/30 animate-in fade-in duration-200">
          <h5 className="text-xs font-bold uppercase text-[#c3f400] tracking-wider mb-1">
            Algoritmo de Progresión RIR/RPE
          </h5>
          <p className="text-xs text-[#dfe2ee] leading-relaxed">
            Basado en tus 5 sesiones completadas y un promedio de RPE 8.2 en series principales, la carga recomendada para la siguiente semana de banca aumentará a <strong>92.5 kg</strong> (+2.5 kg) manteniendo 3 repeticiones de alta aceleración concéntrica.
          </p>
        </div>
      )}
    </div>
  );
};
