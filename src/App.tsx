/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, Routine, Exercise, PersonalRecord, UserStats } from './types';
import {
  INITIAL_USER_STATS,
  INITIAL_ROUTINES,
  INITIAL_PRS,
  INITIAL_DAILY_WORKLOADS
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { InicioView } from './views/InicioView';
import { RutinasView } from './views/RutinasView';
import { ProgresoView } from './views/ProgresoView';
import { EnVivoView } from './views/EnVivoView';
import { RoutineDetailModal } from './components/RoutineDetailModal';
import { ExerciseInfoModal } from './components/ExerciseInfoModal';
import { NewRoutineModal } from './components/NewRoutineModal';
import { ProfileModal } from './components/ProfileModal';
import { NewPRModal } from './components/NewPRModal';
import { WorkoutCompleteModal } from './components/WorkoutCompleteModal';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');

  // Application Data States
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [routines, setRoutines] = useState<Routine[]>(INITIAL_ROUTINES);
  const [personalRecords, setPersonalRecords] = useState<PersonalRecord[]>(INITIAL_PRS);
  const [dailyWorkloads] = useState(INITIAL_DAILY_WORKLOADS);

  // Active Live Session State
  const [activeRoutine, setActiveRoutine] = useState<Routine>(INITIAL_ROUTINES[0]);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);

  // Modal States
  const [selectedRoutineDetail, setSelectedRoutineDetail] = useState<Routine | null>(null);
  const [selectedExerciseInfo, setSelectedExerciseInfo] = useState<Exercise | null>(null);
  const [isNewRoutineOpen, setIsNewRoutineOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isNewPROpen, setIsNewPROpen] = useState<boolean>(false);
  const [completedWorkoutStats, setCompletedWorkoutStats] = useState<{
    durationFormatted: string;
    totalVolumeKg: number;
    completedSetsCount: number;
    caloriesBurned: number;
  } | null>(null);

  // Handlers
  const handleUpdateStats = (newStats: Partial<UserStats>) => {
    setUserStats((prev) => ({ ...prev, ...newStats }));
  };

  const handleStartRoutine = (routine?: Routine) => {
    if (routine) {
      setActiveRoutine(routine);
    }
    setIsLiveActive(true);
    setCurrentTab('en-vivo');
  };

  const handleToggleBookmark = (routineId: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === routineId ? { ...r, isBookmarked: !r.isBookmarked } : r
      )
    );
  };

  const handleCreateRoutine = (newRoutine: Routine) => {
    setRoutines((prev) => [newRoutine, ...prev]);
  };

  const handleAddPR = (newPR: PersonalRecord) => {
    setPersonalRecords((prev) => [newPR, ...prev]);
  };

  const handleFinishWorkout = (stats: {
    durationFormatted: string;
    totalVolumeKg: number;
    completedSetsCount: number;
    caloriesBurned: number;
  }) => {
    setCompletedWorkoutStats(stats);
    setIsLiveActive(false);
    setUserStats((prev) => ({
      ...prev,
      weeklyWorkoutsDone: Math.min(prev.weeklyWorkoutsTarget, prev.weeklyWorkoutsDone + 1),
      caloriesBurned: prev.caloriesBurned + stats.caloriesBurned,
      totalTimeMinutes: prev.totalTimeMinutes + Math.round(parseInt(stats.durationFormatted.split(':')[0], 10) || 45)
    }));
  };

  const handleCloseWorkoutComplete = () => {
    setCompletedWorkoutStats(null);
    setCurrentTab('progreso');
  };

  return (
    <div className="min-h-screen bg-[#0f131b] text-[#dfe2ee] flex flex-col selection:bg-[#c3f400] selection:text-[#161e00]">
      {/* Top Application Header */}
      <Header
        currentTab={currentTab}
        onOpenProfile={() => setIsProfileOpen(true)}
        isLiveActive={isLiveActive}
      />

      {/* Main View Area */}
      <main className="flex-1 w-full pt-20 pb-20 overflow-x-hidden">
        {currentTab === 'inicio' && (
          <InicioView
            userStats={userStats}
            onUpdateStats={handleUpdateStats}
            dailyWorkloads={dailyWorkloads}
            onStartRoutine={handleStartRoutine}
            onOpenHistory={() => setCurrentTab('progreso')}
            onOpenRoutineDetail={(r) => setSelectedRoutineDetail(r)}
            featuredRoutine={routines[0] || INITIAL_ROUTINES[0]}
          />
        )}

        {currentTab === 'rutinas' && (
          <RutinasView
            routines={routines}
            onOpenRoutineDetail={(r) => setSelectedRoutineDetail(r)}
            onStartRoutine={handleStartRoutine}
            onToggleBookmark={handleToggleBookmark}
            onOpenNewRoutineModal={() => setIsNewRoutineOpen(true)}
          />
        )}

        {currentTab === 'progreso' && (
          <ProgresoView
            personalRecords={personalRecords}
            dailyWorkloads={dailyWorkloads}
            onOpenNewPR={() => setIsNewPROpen(true)}
            onOpenRoutineDetail={() => setCurrentTab('rutinas')}
          />
        )}

        {currentTab === 'en-vivo' && (
          <EnVivoView
            activeRoutine={activeRoutine}
            onFinishWorkout={handleFinishWorkout}
            onOpenExerciseInfo={(ex) => setSelectedExerciseInfo(ex)}
          />
        )}
      </main>

      {/* Bottom Floating Navigation */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isLiveActive={isLiveActive}
      />

      {/* Interactive Modals */}
      <RoutineDetailModal
        routine={selectedRoutineDetail}
        onClose={() => setSelectedRoutineDetail(null)}
        onStartRoutine={handleStartRoutine}
        onToggleBookmark={handleToggleBookmark}
      />

      <ExerciseInfoModal
        exercise={selectedExerciseInfo}
        onClose={() => setSelectedExerciseInfo(null)}
      />

      <NewRoutineModal
        isOpen={isNewRoutineOpen}
        onClose={() => setIsNewRoutineOpen(false)}
        onCreateRoutine={handleCreateRoutine}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userStats={userStats}
        onUpdateStats={handleUpdateStats}
      />

      <NewPRModal
        isOpen={isNewPROpen}
        onClose={() => setIsNewPROpen(false)}
        onAddPR={handleAddPR}
      />

      <WorkoutCompleteModal
        isOpen={!!completedWorkoutStats}
        onClose={handleCloseWorkoutComplete}
        sessionTimeFormatted={completedWorkoutStats?.durationFormatted || '00:00'}
        totalVolumeKg={completedWorkoutStats?.totalVolumeKg || 0}
        completedSetsCount={completedWorkoutStats?.completedSetsCount || 0}
        caloriesBurned={completedWorkoutStats?.caloriesBurned || 0}
      />
    </div>
  );
}
