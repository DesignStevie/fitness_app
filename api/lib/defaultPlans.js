const defaultPlans = [
  {
    day: 'Mon',
    title: 'Push',
    workouts: [
      { name: 'Barbell bench press', sets: 4, reps: 5, group: 'Chest' },
      { name: 'Incline dumbbell press', sets: 3, reps: 8, group: 'Chest' },
      { name: 'Seated dumbbell shoulder press', sets: 3, reps: 8, group: 'Shoulders' },
      { name: 'Cable lateral raise', sets: 3, reps: 12, group: 'Shoulders' },
      { name: 'Dips', sets: 3, reps: 8, group: 'Upper body' },
      { name: 'Overhead cable tricep extension', sets: 2, reps: 10, group: 'Arms' },
    ],
  },
  { day: 'Tue', title: 'Rest', workouts: [] },
  {
    day: 'Wed',
    title: 'Legs',
    workouts: [
      { name: 'Back squat', sets: 4, reps: 5, group: 'Lower body' },
      { name: 'Romanian deadlift', sets: 3, reps: 8, group: 'Lower body' },
      { name: 'Leg press', sets: 3, reps: 10, group: 'Lower body' },
      { name: 'Walking lunges', sets: 2, reps: 10, group: 'Lower body' },
      { name: 'Leg curl', sets: 3, reps: 10, group: 'Lower body' },
      { name: 'Standing calf raise', sets: 3, reps: 12, group: 'Lower body' },
    ],
  },
  { day: 'Thu', title: 'Rest', workouts: [] },
  {
    day: 'Fri',
    title: 'Pull',
    workouts: [
      { name: 'Deadlift or barbell row', sets: 4, reps: 5, group: 'Back' },
      { name: 'Pull-ups or lat pulldown', sets: 3, reps: 6, group: 'Back' },
      { name: 'Seated cable row', sets: 3, reps: 8, group: 'Back' },
      { name: 'Rear delt fly', sets: 3, reps: 12, group: 'Shoulders' },
      { name: 'Barbell or EZ-bar curl', sets: 3, reps: 8, group: 'Arms' },
      { name: 'Hammer curl', sets: 2, reps: 10, group: 'Arms' },
    ],
  },
  { day: 'Sat', title: 'Rest', workouts: [] },
  { day: 'Sun', title: 'Rest', workouts: [] },
]

module.exports = { defaultPlans }
