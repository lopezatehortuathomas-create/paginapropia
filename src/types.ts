export type TabType = 'inicio' | 'rutinas' | 'progreso' | 'en-vivo';

export interface ExerciseSet {
  id: number;
  setNumber: number;
  weight: number;
  reps: number;
  completed: boolean;
  isWarmup?: boolean;
  rpe?: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  targetMuscles: string[];
  equipment: string;
  image: string;
  instructions: string[];
  tips: string;
  sets: ExerciseSet[];
  defaultRestSeconds: number;
}

export interface Routine {
  id: string;
  title: string;
  category: 'hipertrofia' | 'fuerza' | 'cardio' | 'movilidad';
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  durationMinutes: number;
  exerciseCount: number;
  focus: string;
  equipment: 'gym' | 'dumbbells' | 'calisthenics';
  image: string;
  completedCount: number;
  isBookmarked?: boolean;
  exercises: Exercise[];
}

export interface PersonalRecord {
  id: string;
  exerciseName: string;
  repsText: string;
  weight: number;
  weightUnit: string;
  status: 'NUEVO PR' | 'IGUALADO' | 'TOP 15%';
  icon: string;
  iconColor: string;
  date: string;
}

export interface DailyWorkload {
  day: string;
  shortDay: string;
  dateNum: number;
  tonnage: number;
  isPeak?: boolean;
  isToday?: boolean;
  isRest?: boolean;
  status: 'completed' | 'active' | 'rest' | 'upcoming';
  focusText: string;
}

export interface UserStats {
  name: string;
  streakDays: number;
  currentWeek: number;
  currentPhase: string;
  currentWeight: number;
  targetWeight: number;
  hydrationLiters: number;
  targetHydrationLiters: number;
  weeklyWorkoutsDone: number;
  weeklyWorkoutsTarget: number;
  caloriesBurned: number;
  totalTimeMinutes: number;
  level: number;
  levelTitle: string;
}
