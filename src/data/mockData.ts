import { Routine, PersonalRecord, DailyWorkload, UserStats, Exercise } from '../types';

export const ASSETS = {
  logo: 'https://lh3.googleusercontent.com/aida/AEtjO1WVHQleShIITDP40d5SrHB8BMHohgS00IA7UinQaSNFmyxldIGUOtYJnPaDxMXXwu0RZsJfFeAzoK1cXIffLQM5KudoxMVE5EPyCLTgqVyqHDdPXjMLb3lyUVhyLOa2HqORW62PjDPchuFvSgcWErOusyI9g1wIUB7Zbn4oDZJeLb0muHGUONjLMrMb2_-O7LxULhdm4aO5vvmyh1bOaOszkrbhZs_nWCHfqRJySG1lUW_MyzKiAuI8bA',
  profile: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvluEPotPMEjmW9Mm_sSzUgCRbLQkvMz7LA5a4KdFqPfDVmL0sbx6CWeg3N5II2dyxSf7a20DzV6Cli6nwIYox6RxdLnzLdifMgID65sqBDzWSPvNXRn8DnbnfqkEX4aa4HMLsnjFOtNcXzxLip_x8VjXeTjYzLO3v-LVxmne5M6WAu6dUsvF6mcH_wpAtI4Ua4D_B_BQgpjjWMi2mi7RGrxmINq40WQkRsnPYtVTEHyUVgQq5gTg',
  ambientAthlete: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrwfxIj-pGaypt_iIo35B9wo8JR1dLNKvxkC8itFRkw2mvyU5x5FkcP8I1eY8mUieO7yVlqX6fn8fUd8uEjNu7IVdiv07l2X_TFfb1uhSxuhHVlAS2uQau6eImpcgKZqeYIoT2t3Z1RrWooUsLlZrtPDicfJREbwec0mSYL0RbvhhjpIyUXV7IQQzhivVif-Bseg-qg4VIoYRl-bDALxFt4lgF8NeGiD53sN9Ywic7OZIz9X0BqXk',
  pushWorkout: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClc9bl1CAUO9ELqRmKLn8UiGNzp5WqDswynXtVfH_4G22BjWDcrITpZlAY7hspNrn0TeL6HrYk9jIEwaGnL1K-e0BnpQw3oKRiWJWGmoLtGKeB2rLazkUmVxatvZgGaagbMHBE07qh0V4VtLy2ac0EhpLOq2YHZotZmfEyG4Vc0P0MNKcJvsy6Z0nFG-_4GLqrPRk98rzIS06RGTf_gXLt-HbSQu-M1uEcUuzsIUMvQu6UZaHWtEg',
  pullWorkout: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyP6f4vrCw60ER2jnYUTIFRo35OaZDo-2D-NqCc9XU-e0KygmbtZKNSZuQDORXH7bY_tREjnRchyIFQyGdnFmMpLZI18odQCnSqMYfpWMmfLm0peaKlJ9LUoYk8qdYw8xiJc1Oi44i33QkWyrvWCDb-BB_4nFHF2uXBTU_jqDz1_Pq1pWZLcZwg1wfBh7ioPn4lxmBHuiBXhOwGosDzlg-0GhgmdHeO07uBsW23day2PNLiSNbyQM',
  legsWorkout: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI5G_laEjT72B7ufsi-9xtdoE4DvICwo5T_YWOQIyArPxdCrxmZOjZad47FegVUc6cB_6PG27Ujvs32hgBJ7FUWmwMpRS0lfRxiR6VPdCBBrqjhkevth7xwvJi8eq3jdA39BmUi1sK8nYUvk6d-PgCtyJz8JL6COPzHQAG0yeI5GZu2QCXNw9anvbkyKXcclX1hTlle9YtGyR98qDHbSCIhoTMr4EqZkXZ6XeE_MZXe23gvlsS3zo',
  hiitWorkout: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV0fcE5ilo7AlUkjq_n4kBMtFByibuyE3H5e5axFdP3w2-fbg_4ZRYcFqx8jT4hEpOKIp5wSq4u4BhCJMjmexngHijoG7ssGUmPKOHYReC4-H3ZxAYXaVPIDJ9_-hY-myG0ufA1cNJxazDNhHj8gixykAz8pVjn9q7H1l6LEvg65PS-rWgq7euUr9o2u6U_mbsidFMBt_6Z9OdRsLANP8jYIJ4HPygI8triJQBcTO-Zhv8jScyZ7c',
  homeHero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-bobRGH_t7Ti0LXQPp2p3hJu3qC0H3O2-6hQYbJUN1CZy-0S54DLJYuSWt-atYv_THF6nC9FwyeUPi8dCnJNABNgNHrkAMTvLZvaaVn8ydLz1GLAWahsX4qv8OEiB0ArMenj-Pywwv3yMi_82YRZdUPW4A_7_4mU_QW7he3DTyBu5L0jULiDADH6VAr-3ESo2eGNO5aVANvTEcEHrEXn3DwonUDvudzACC4hSI1D4bEOU3xOcTR0',
  benchPressLive: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAxC4loKMezXSVjkEiTzNtmMPX6OjFUCpf1eHcRmSLCcUXCTCRFvbguRRzPT4vZeW76TOTYr7zVKoQTjTCpHgPNApwmJA3wf9GsinbDx4ftlDSpZfOFA2_uVdXjg4rgeNjsSpYYMTq4IIzEBsq27Wsjb-knZ4aBlZU4L4C6d_1BrvRFuEqXiSVo4Yefhosaq31j6Ll89ZqL-exGmUxBMCzDIUYGkygbjwLoVVuO1hrWEYSEzNPQS2Q'
};

export const INITIAL_USER_STATS: UserStats = {
  name: 'Carlos',
  streakDays: 14,
  currentWeek: 12,
  currentPhase: 'Fase Hipertrofia',
  currentWeight: 74.8,
  targetWeight: 76.5,
  hydrationLiters: 2.25,
  targetHydrationLiters: 3.0,
  weeklyWorkoutsDone: 4,
  weeklyWorkoutsTarget: 5,
  caloriesBurned: 1850,
  totalTimeMinutes: 210,
  level: 3,
  levelTitle: 'Semana de Acero'
};

export const INITIAL_DAILY_WORKLOADS: DailyWorkload[] = [
  { day: 'Lunes', shortDay: 'L', dateNum: 24, tonnage: 1.8, status: 'completed', focusText: 'Empuje Torso (Pecho y Tríceps)' },
  { day: 'Martes', shortDay: 'M', dateNum: 25, tonnage: 2.1, status: 'completed', focusText: 'Tracción e Isquios' },
  { day: 'Miércoles', shortDay: 'X', dateNum: 26, tonnage: 3.4, isPeak: true, status: 'completed', focusText: 'Pierna Completa & Sentadilla Pesada' },
  { day: 'Jueves', shortDay: 'J', dateNum: 27, tonnage: 1.4, status: 'completed', focusText: 'Recuperación Activa y Hombros' },
  { day: 'Viernes', shortDay: 'V', dateNum: 28, tonnage: 2.6, isToday: true, status: 'active', focusText: 'Torso Superior: Potencia y Fuerza' },
  { day: 'Sábado', shortDay: 'S', dateNum: 29, tonnage: 3.6, isPeak: true, status: 'upcoming', focusText: 'Espalda y Brazos (Hipertrofia Extrema)' },
  { day: 'Domingo', shortDay: 'D', dateNum: 30, tonnage: 0, isRest: true, status: 'rest', focusText: 'Descanso Total / Descompresión Articular' }
];

export const INITIAL_PRS: PersonalRecord[] = [
  {
    id: 'pr-1',
    exerciseName: 'Press de Banca',
    repsText: 'Serie de 3 reps',
    weight: 90,
    weightUnit: 'kg',
    status: 'NUEVO PR',
    icon: 'fitness_center',
    iconColor: '#c3f400',
    date: 'Ayer'
  },
  {
    id: 'pr-2',
    exerciseName: 'Sentadilla Trasera',
    repsText: 'Serie de 5 reps',
    weight: 125,
    weightUnit: 'kg',
    status: 'IGUALADO',
    icon: 'directions_run',
    iconColor: '#4cd7f6',
    date: 'Hace 3 días'
  },
  {
    id: 'pr-3',
    exerciseName: 'Dominadas Lastradas',
    repsText: 'Serie de 6 reps',
    weight: 15,
    weightUnit: 'kg',
    status: 'NUEVO PR',
    icon: 'vertical_align_top',
    iconColor: '#c3f400',
    date: 'Hace 5 días'
  }
];

export const WORKOUT_EXERCISES_SAMPLE: Exercise[] = [
  {
    id: 'ex-1',
    name: 'Calentamiento Específico Manguito Rotador',
    muscleGroup: 'Hombros & Estabilizadores',
    targetMuscles: ['Deltoides anterior', 'Infraespinoso', 'Subescapular'],
    equipment: 'Polea / Mancuerna ligera',
    image: ASSETS.homeHero,
    instructions: [
      'Rotaciones externas en polea a 90 grados.',
      'Control excéntrico de 3 segundos en cada repetición.',
      '2 series ligeras para aumentar temperatura intraarticular.'
    ],
    tips: 'Mantén el codo pegado al torso para evitar compensaciones del trapecio.',
    defaultRestSeconds: 45,
    sets: [
      { id: 101, setNumber: 1, weight: 5, reps: 15, completed: true, isWarmup: true },
      { id: 102, setNumber: 2, weight: 7.5, reps: 12, completed: true, isWarmup: true }
    ]
  },
  {
    id: 'ex-2',
    name: 'Press de Banca Plano',
    muscleGroup: 'Pectoral & Tríceps',
    targetMuscles: ['Pectoral mayor esternal', 'Tríceps braquial', 'Deltoides anterior'],
    equipment: 'Barra Olímpica & Banco',
    image: ASSETS.benchPressLive,
    instructions: [
      'Retracción escapular activa y apoyo firme de pies en el suelo.',
      'Baja la barra de forma controlada hasta la línea media del esternón.',
      'Empuja con explosividad bloqueando el arco lumbar neutro.'
    ],
    tips: 'Mantén los codos en un ángulo de 45 a 70 grados respecto al torso.',
    defaultRestSeconds: 90,
    sets: [
      { id: 1, setNumber: 1, weight: 70, reps: 12, completed: true },
      { id: 2, setNumber: 2, weight: 80, reps: 10, completed: true },
      { id: 3, setNumber: 3, weight: 85, reps: 8, completed: false },
      { id: 4, setNumber: 4, weight: 90, reps: 6, completed: false }
    ]
  },
  {
    id: 'ex-3',
    name: 'Jalón al Pecho',
    muscleGroup: 'Dorsales & Bíceps',
    targetMuscles: ['Dorsal ancho', 'Redondo mayor', 'Bíceps'],
    equipment: 'Máquina de Jalón / Polea Alta',
    image: ASSETS.pullWorkout,
    instructions: [
      'Agarre prono ligeramente más ancho que los hombros.',
      'Inicia el movimiento deprimiendo las escápulas.',
      'Lleva la barra a la clavícula manteniendo el pecho erguido.'
    ],
    tips: 'Imagina llevar los codos hacia tus bolsillos traseros para máxima activación dorsal.',
    defaultRestSeconds: 75,
    sets: [
      { id: 201, setNumber: 1, weight: 65, reps: 12, completed: false },
      { id: 202, setNumber: 2, weight: 72.5, reps: 10, completed: false },
      { id: 203, setNumber: 3, weight: 80, reps: 8, completed: false }
    ]
  },
  {
    id: 'ex-4',
    name: 'Press Inclinado con Mancuernas',
    muscleGroup: 'Pectoral Superior',
    targetMuscles: ['Porción clavicular del pectoral', 'Tríceps', 'Deltoides anterior'],
    equipment: 'Mancuernas & Banco Inclinado (30°)',
    image: ASSETS.pushWorkout,
    instructions: [
      'Banco posicionado a 30 grados para enfatizar la porción clavicular.',
      'Desciende con un tempo excéntrico de 2-3 segundos sintiendo el estiramiento.',
      'Extiende hacia arriba sin chocar violentamente las mancuernas.'
    ],
    tips: 'Un ángulo mayor a 45 grados traslada demasiada carga al hombro anterior.',
    defaultRestSeconds: 90,
    sets: [
      { id: 301, setNumber: 1, weight: 30, reps: 10, completed: false },
      { id: 302, setNumber: 2, weight: 32.5, reps: 8, completed: false },
      { id: 303, setNumber: 3, weight: 35, reps: 8, completed: false }
    ]
  },
  {
    id: 'ex-5',
    name: 'Fondos en Paralelas Lastrados',
    muscleGroup: 'Pectoral Inferior & Tríceps',
    targetMuscles: ['Pectoral inferior', 'Tríceps braquial'],
    equipment: 'Barras Paralelas / Cinturón Lastre',
    image: ASSETS.ambientAthlete,
    instructions: [
      'Inclina levemente el torso hacia adelante para cargar el pectoral.',
      'Baja hasta que los hombros estén ligeramente por debajo del codo.',
      'Empuja con fuerza estabilizando el core.'
    ],
    tips: 'No permitas que los hombros se adelanten ni se encorven en el punto de máxima flexión.',
    defaultRestSeconds: 90,
    sets: [
      { id: 401, setNumber: 1, weight: 10, reps: 10, completed: false },
      { id: 402, setNumber: 2, weight: 15, reps: 8, completed: false },
      { id: 403, setNumber: 3, weight: 20, reps: 6, completed: false }
    ]
  }
];

export const INITIAL_ROUTINES: Routine[] = [
  {
    id: 'rt-push',
    title: 'Push Power Hypertrophy',
    category: 'hipertrofia',
    level: 'Avanzado',
    durationMinutes: 50,
    exerciseCount: 6,
    focus: 'Pectoral & Tríceps',
    equipment: 'gym',
    image: ASSETS.pushWorkout,
    completedCount: 1420,
    isBookmarked: true,
    exercises: WORKOUT_EXERCISES_SAMPLE
  },
  {
    id: 'rt-pull',
    title: 'Pull & Back Destroyer',
    category: 'fuerza',
    level: 'Intermedio',
    durationMinutes: 45,
    exerciseCount: 5,
    focus: 'Dorsales & Bíceps',
    equipment: 'gym',
    image: ASSETS.pullWorkout,
    completedCount: 980,
    isBookmarked: false,
    exercises: [
      WORKOUT_EXERCISES_SAMPLE[2],
      {
        id: 'ex-pull-2',
        name: 'Remo con Barra Pendlay',
        muscleGroup: 'Espalda Media & Dorsales',
        targetMuscles: ['Dorsal ancho', 'Romboides', 'Trapecios'],
        equipment: 'Barra Olímpica',
        image: ASSETS.pullWorkout,
        instructions: ['Espalda paralela al suelo', 'Tirón explosivo al pecho bajo'],
        tips: 'Detén la barra en el piso entre repeticiones.',
        defaultRestSeconds: 90,
        sets: [
          { id: 501, setNumber: 1, weight: 70, reps: 8, completed: false },
          { id: 502, setNumber: 2, weight: 80, reps: 6, completed: false },
          { id: 503, setNumber: 3, weight: 85, reps: 6, completed: false }
        ]
      }
    ]
  },
  {
    id: 'rt-legs',
    title: 'Leg Day Elite & Core',
    category: 'hipertrofia',
    level: 'Avanzado',
    durationMinutes: 55,
    exerciseCount: 7,
    focus: 'Cuádriceps & Glúteos',
    equipment: 'gym',
    image: ASSETS.legsWorkout,
    completedCount: 2110,
    isBookmarked: false,
    exercises: [
      {
        id: 'ex-squat',
        name: 'Sentadilla Trasera con Barra',
        muscleGroup: 'Piernas & Glúteos',
        targetMuscles: ['Cuádriceps', 'Glúteo mayor', 'Core'],
        equipment: 'Rack y Barra Olímpica',
        image: ASSETS.legsWorkout,
        instructions: ['Pies al ancho de hombros', 'Rompe el paralelo con control'],
        tips: 'Mantén la presión intraabdominal con respiración diafragmática.',
        defaultRestSeconds: 120,
        sets: [
          { id: 601, setNumber: 1, weight: 100, reps: 8, completed: false },
          { id: 602, setNumber: 2, weight: 115, reps: 6, completed: false },
          { id: 603, setNumber: 3, weight: 125, reps: 5, completed: false }
        ]
      }
    ]
  },
  {
    id: 'rt-hiit',
    title: 'HIIT Quema Grasa Extremo',
    category: 'cardio',
    level: 'Principiante',
    durationMinutes: 30,
    exerciseCount: 8,
    focus: 'Resistencia & Quema Calórica',
    equipment: 'calisthenics',
    image: ASSETS.hiitWorkout,
    completedCount: 3450,
    isBookmarked: true,
    exercises: [
      {
        id: 'ex-burpee',
        name: 'Burpees Box Jump',
        muscleGroup: 'Cuerpo Completo & Metabólico',
        targetMuscles: ['Cardiovascular', 'Piernas', 'Pectoral'],
        equipment: 'Cajón Pliométrico',
        image: ASSETS.hiitWorkout,
        instructions: ['Drop a flexión', 'Salto explosivo sobre el cajón'],
        tips: 'Aterriza con rodillas suaves.',
        defaultRestSeconds: 45,
        sets: [
          { id: 701, setNumber: 1, weight: 0, reps: 15, completed: false },
          { id: 702, setNumber: 2, weight: 0, reps: 15, completed: false }
        ]
      }
    ]
  }
];

export const RPE_DESCRIPTIONS: Record<number, string> = {
  1: '1 • Mínimo esfuerzo (recuperación activa)',
  2: '2 • Muy ligero (calentamiento aeróbico suave)',
  3: '3 • Ligero (activación neuromuscular)',
  4: '4 • Moderado bajo (cadencia constante)',
  5: '5 • Moderado (4-5 reps en recámara / RIR 4)',
  6: '6 • Esfuerzo medio (3-4 reps en recámara)',
  7: '7 • Vigoroso (3 reps en recámara)',
  8: '8 • Exigente (2 reps en recámara)',
  9: '9 • Muy pesado (1 rep en recámara)',
  10: '10 • Esfuerzo máximo absoluto (fallo muscular técnico)'
};
