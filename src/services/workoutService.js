export async function getSchedule() {
  const res = await fetch('/api/schedule')
  if (!res.ok) throw new Error('Failed to load schedule')
  return res.json()
}

export async function saveWorkoutSets(dayIndex, workoutName, setData) {
  await fetch('/api/schedule', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dayIndex, workoutName, setData }),
  })
}
