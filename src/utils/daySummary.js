// Derives the display summary for a day (title, muscle groups, duration)
// from its workouts. If a day ever stores an explicit `title`, that wins.

const GROUP_TO_TITLE = {
  chest: 'Push',
  shoulders: 'Push',
  triceps: 'Push',
  back: 'Pull',
  biceps: 'Pull',
  'lower body': 'Legs',
  legs: 'Legs',
  'upper body': 'Upper',
  core: 'Core',
  conditioning: 'Cardio',
  cardio: 'Cardio',
  recovery: 'Rest',
}

// Rough time per working set including rest, used for the "~55min" estimate.
const MINUTES_PER_SET = 3

function mostCommon(values) {
  const counts = new Map()
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1)
  let best = null
  for (const [value, count] of counts) {
    if (!best || count > best.count) best = { value, count }
  }
  return best?.value ?? null
}

export function getDayTitle(day) {
  if (day.title) return day.title
  if (!day.workouts?.length) return 'Rest'

  const titles = day.workouts
    .map(w => GROUP_TO_TITLE[w.group?.toLowerCase()])
    .filter(Boolean)
  return mostCommon(titles) ?? day.workouts[0].group ?? 'Workout'
}

export function getMuscleGroups(day) {
  return [...new Set((day.workouts ?? []).map(w => w.group).filter(Boolean))]
}

export function getEstimatedMinutes(day) {
  const totalSets = (day.workouts ?? []).reduce((sum, w) => sum + (w.sets ?? 0), 0)
  return Math.round((totalSets * MINUTES_PER_SET) / 5) * 5
}
