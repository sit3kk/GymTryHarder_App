const TrainingSet1 = [
    { 
      id: 1,
      title: 'plecy + barki',
      name: 'Adrian',
      surname: 'Nowak Zalno',
      date: '2023-12-01',
      imageUri: require('../assets/zalno.jpeg'),
      exercises: ['bench press', 'one hand seated row', 'squat', 'leg extension', 'incline dumbell press', 'cable fly', ]
    },
    { 
      id: 2,
      title: 'klata bic ogien',
      name: 'Adrian',
      surname: 'Nowak Zalno',
      date: '2023-12-02',
      imageUri: require('../assets/zalno.jpeg'),
      exercises: ['bench press', 'one hand seated row', 'squat']
    },
    { 
      id: 3,
      title: 'zestaw dyskotekowy',
      name: 'Adrian',
      surname: 'Nowak Zalno',
      date: '2023-12-03',
      imageUri: require('../assets/zalno.jpeg'),
      exercises: ['bench press', 'one hand seated row', 'squat']
    },
  ];

  const TrainingSet2 = [
    {
      id: 4,
      title: 'plecy + barki',
      full_name: 'Chris Bumstead',
      date: '2023-12-01',
      imageUri: require('../assets/cbum.jpeg'),
      exercises: ['bench press', 'one hand seated row', 'squat']
    },
    {
      id: 5,
      title: 'klata bic ogien',
      full_name: 'Alice Smith',
      date: '2023-12-02',
      imageUri: require('../assets/fortnite_girl.webp'),
      exercises: ['bench press', 'one hand seated row', 'squat']
    },
    {
      id: 6,
      title: 'zestaw dyskotekowy',
      full_name: 'Chris Bumstead',
      date: '2023-12-03',
      imageUri: require('../assets/cbum.jpeg'),
      exercises: ['bench press', 'one hand seated row', 'squat']
    },
    {
      id: 7,
      title: 'trening nóg',
      full_name: 'Chris Bumstead',
      date: '2023-12-04',
      imageUri: require('../assets/cbum.jpeg'),
      exercises: ['leg press', 'lunges', 'calf raises']
    },
    {
      id: 8,
      title: 'trening ramion',
      full_name: 'Alice Smith',
      date: '2023-12-05',
      imageUri: require('../assets/fortnite_girl.webp'),
      exercises: ['shoulder press', 'side lateral raise', 'tricep dips']
    },
    {
      id: 9,
      title: 'trening klatki piersiowej',
      full_name: 'Alice Smith',
      date: '2023-12-06',
      imageUri: require('../assets/fortnite_girl.webp'),
      exercises: ['chest fly', 'push-ups', 'dumbbell pullover']
    },
    {
      id: 10,
      title: 'trening pleców',
      full_name: 'Chris Bumstead',
      date: '2023-12-07',
      imageUri: require('../assets/cbum.jpeg'),
      exercises: ['deadlift', 'lat pulldown', 'barbell row']
    },
  ];
  

const ExercisesSet1 = [
  {
    id: 1,
    title: "Push-ups",
    imageUri: require('../assets/bench_press.png'),
    description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
    muscles: ["Chest", "Shoulders", "Triceps"]
  },
  {
    id: 2,
    title: "Squats",
    imageUri: require('../assets/bench_press.png'),
    description: "A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.",
    muscles: ["Legs", "Glutes"]
  },
  {
    id: 3,
    title: "Plank",
    imageUri: require('../assets/bench_press.png'),
    description: "An isometric core exercise that strengthens the abdominal muscles and improves posture.",
    muscles: ["Abs"]
  },
  {
    id: 4,
    title: "Jumping Jacks",
    imageUri: require('../assets/bench_press.png'),
    description: "A cardiovascular exercise that engages the whole body and improves endurance.",
    muscles: ["Legs", "Cardio"]
  },
  {
    id: 5,
    title: "Bicycle Crunches",
    imageUri: require('../assets/bench_press.png'),
    description: "An effective abdominal exercise that targets the rectus abdominis and obliques.",
    muscles: ["Abs"]
  },
  {
    id: 6,
    title: "Deadlifts",
    imageUri: require('../assets/bench_press.png'),
    description: "A compound exercise that targets the back, hamstrings, and glutes.",
    muscles: ["Back", "Legs", "Glutes"]
  },
  {
    id: 7,
    title: "Shoulder Press",
    imageUri: require('../assets/bench_press.png'),
    description: "An overhead pressing exercise that targets the shoulders and triceps.",
    muscles: ["Shoulders", "Triceps"]
  },
  {
    id: 9,
    title: "Russian Twists",
    imageUri: require('../assets/bench_press.png'),
    description: "An abdominal exercise that targets the obliques.",
    muscles: ["Abs"]
  },
  {
    id: 10,
    title: "Pull-ups",
    imageUri: require('../assets/bench_press.png'),
    description: "An upper body exercise that targets the back and biceps.",
    muscles: ["Back", "Biceps"]
  },
  {
    id: 11,
    title: "Bench Press",
    imageUri: require('../assets/bench_press.png'),
    description: "To grow your chest",
    muscles: ["Chest", "Triceps"]
  },
]

const WorkoutTemplates = [
  {
    id: 1,
    title: 'Training Plan 1',
    exercises: [
      { exercise_id: 1, num_series: 3 },
      { exercise_id: 2, num_series: 2 },
      { exercise_id: 3, num_series: 4 },
    ]
  },
  {
    id: 2,
    title: 'Training Plan 2',
    exercises: [
      { exercise_id: 1, num_series: 3 },
      { exercise_id: 2, num_series: 2 },
      { exercise_id: 3, num_series: 4 },
    ]
  },
  {
    id: 3,
    title: 'Training Plan 3',
    exercises: [
      { exercise_id: 1, num_series: 3 },
      { exercise_id: 2, num_series: 2 },
      { exercise_id: 3, num_series: 4 },
    ]
  },
  {
    id: 4,
    title: 'Training Plan 4',
    exercises: [
      { exercise_id: 1, num_series: 3 },
      { exercise_id: 2, num_series: 2 },
      { exercise_id: 3, num_series: 4 },
    ]
  }
]

export { TrainingSet1, TrainingSet2, ExercisesSet1 };