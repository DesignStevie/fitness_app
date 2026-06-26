import defaultPlans from '../data/workoutPlans.json'

const STORAGE_KEY = 'fitness_app_schedule'

export function getSchedule() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // corrupted storage — fall through to seed
  }
  const seeded = defaultPlans
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
  return seeded
}

export function saveSchedule(schedule) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule))
}

export function saveWorkoutSets(dayIndex, workoutName, setData) {
  const schedule = getSchedule()
  const workout = schedule[dayIndex]?.workouts.find(w => w.name === workoutName)
  if (workout) {
    workout.setData = setData
    saveSchedule(schedule)
  }
}

export function resetSchedule() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlans))
  return defaultPlans
}
