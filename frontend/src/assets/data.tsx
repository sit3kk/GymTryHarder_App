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
      imageUri: require('../assets/girl.png'),
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
      imageUri: require('../assets/girl.png'),
      exercises: ['shoulder press', 'side lateral raise', 'tricep dips']
    },
    {
      id: 9,
      title: 'trening klatki piersiowej',
      full_name: 'Alice Smith',
      date: '2023-12-06',
      imageUri: require('../assets/girl.png'),
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
    {
      id: 11,
      title: 'prep',
      full_name: 'Chris Bumstead',
      date: '2023-12-08',
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
      description: "A fundamental lower body exercise that targets the hamstrings, and glutes.",
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
      muscles: ["Legs"]
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
    {
      id: 12,
      title: "Lunges",
      imageUri: require('../assets/bench_press.png'),
      description: "A lower body exercise that targets the hamstrings, and glutes.",
      muscles: ["Legs", "Glutes"]
    },
    {
      id: 13,
      title: "Mountain Climbers",
      imageUri: require('../assets/bench_press.png'),
      description: "A cardiovascular exercise that engages the core and improves endurance.",
      muscles: ["Abs"]
    },
    // Dodane ćwiczenia
    {
      id: 14,
      title: "Cable Fly",
      imageUri: require('../assets/bench_press.png'),
      description: "An isolation exercise that targets the chest using cable resistance.",
      muscles: ["Chest"]
    },
    {
      id: 15,
      title: "Incline Dumbbell Press",
      imageUri: require('../assets/bench_press.png'),
      description: "A variation of the bench press performed on an incline bench.",
      muscles: ["Chest", "Shoulders", "Triceps"]
    },
    {
      id: 16,
      title: "Rope Pushdown",
      imageUri: require('../assets/bench_press.png'),
      description: "A triceps exercise using a rope attachment on a cable machine.",
      muscles: ["Triceps"]
    },
    {
      id: 17,
      title: "Dumbbell Curl",
      imageUri: require('../assets/bench_press.png'),
      description: "An isolation exercise that targets the biceps using dumbbells.",
      muscles: ["Biceps"]
    },
    {
      id: 18,
      title: "Lat Pulldown",
      imageUri: require('../assets/bench_press.png'),
      description: "An upper body exercise that targets the back using a cable machine.",
      muscles: ["Back"]
    },
    {
      id: 19,
      title: "Neutral Grip Pulldown",
      imageUri: require('../assets/bench_press.png'),
      description: "A variation of the lat pulldown with a neutral grip.",
      muscles: ["Back"]
    },
    {
      id: 20,
      title: "Face Pull",
      imageUri: require('../assets/bench_press.png'),
      description: "A rear deltoid exercise using a cable machine.",
      muscles: ["Shoulders"]
    },
    {
      id: 21,
      title: "Hack Squat Machine",
      imageUri: require('../assets/bench_press.png'),
      description: "A machine-based squat variation that targets the hamstrings.",
      muscles: ["Legs"]
    },
    {
      id: 22,
      title: "Lying Leg Curl",
      imageUri: require('../assets/bench_press.png'),
      description: "A hamstring exercise using a machine.",
      muscles: ["Legs"]
    },
    {
      id: 23,
      title: "Leg Extension",
      imageUri: require('../assets/bench_press.png'),
      description: "An isolation exercise that targets the quadriceps.",
      muscles: ["Legs"]
    },
    {
      id: 24,
      title: "Shoulder Cable Raise",
      imageUri: require('../assets/bench_press.png'),
      description: "A shoulder exercise using a cable machine.",
      muscles: ["Shoulders"]
    },
  ];
  
  

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