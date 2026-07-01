const defaultPlans = [
  {
    day: 'Mon',
    workouts: [
      { name: 'Bench press', sets: 4, reps: 8, group: 'Upper body' },
      { name: 'Incline dumbbell press', sets: 3, reps: 10, group: 'Upper body' },
      { name: 'Triceps pushdown', sets: 3, reps: 12, group: 'Arms' },
    ],
  },
  {
    day: 'Tue',
    workouts: [
      { name: 'Barbell bench press', sets: 4, reps: 5, group: 'Chest' },
      { name: 'Incline dumbbell press', sets: 3, reps: 8, group: 'Chest' },
      { name: 'Seated dumbbell shoulder press', sets: 3, reps: 8, group: 'Shoulders' },
      { name: 'Cable lateral raise', sets: 3, reps: 12, group: 'Shoulders' },
      { name: 'Dips', sets: 3, reps: 8, group: 'Upper body' },
      { name: 'Overhead cable tricep extension', sets: 2, reps: 10, group: 'Arms' },
    ],
  },
  {
    day: 'Wed',
    workouts: [
      { name: 'Deadlift or barbell row', sets: 4, reps: 5, group: 'Back' },
      { name: 'Pull-ups or lat pulldown', sets: 3, reps: 6, group: 'Back' },
      { name: 'Seated cable row', sets: 3, reps: 8, group: 'Back' },
      { name: 'Rear delt fly', sets: 3, reps: 12, group: 'Shoulders' },
      { name: 'Barbell or EZ-bar curl', sets: 3, reps: 8, group: 'Arms' },
      { name: 'Hammer curl', sets: 2, reps: 10, group: 'Arms' },
    ],
  },
  {
    day: 'Thu',
    workouts: [
      { name: 'Back squat', sets: 4, reps: 5, group: 'Lower body' },
      { name: 'Romanian deadlift', sets: 3, reps: 8, group: 'Lower body' },
      { name: 'Leg press', sets: 3, reps: 10, group: 'Lower body' },
      { name: 'Walking lunges', sets: 2, reps: 10, group: 'Lower body' },
      { name: 'Leg curl', sets: 3, reps: 10, group: 'Lower body' },
      { name: 'Standing calf raise', sets: 3, reps: 12, group: 'Lower body' },
    ],
  },
  {
    day: 'Fri',
    workouts: [
      { name: 'Hip thrust', sets: 4, reps: 10, group: 'Lower body' },
      { name: 'Leg press', sets: 4, reps: 10, group: 'Lower body' },
      { name: 'Hamstring curl', sets: 3, reps: 12, group: 'Lower body' },
    ],
  },
  {
    day: 'Sat',
    workouts: [
      { name: 'Bike intervals', sets: 6, reps: 1, group: 'Conditioning' },
      { name: 'Plank', sets: 3, reps: 45, group: 'Core' },
      { name: 'Hanging knee raise', sets: 3, reps: 12, group: 'Core' },
    ],
  },
  {
    day: 'Sun',
    workouts: [
      { name: 'Mobility flow', sets: 1, reps: 20, group: 'Recovery' },
      { name: 'Zone 2 walk', sets: 1, reps: 30, group: 'Cardio' },
    ],
  },
]

module.exports = { defaultPlans }
