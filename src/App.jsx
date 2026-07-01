import { useEffect, useState } from 'react'
import HomePage from './pages/HomePage/HomePage'
import WorkoutDetail from './pages/WorkoutDetail/WorkoutDetail'
import { getSchedule, saveWorkoutSets } from './services/workoutService'
import './App.css'

function buildWeek(schedule) {
  const today = new Date()
  const mondayOffset = (today.getDay() + 6) % 7
  const monday = new Date(today)
  monday.setHours(0, 0, 0, 0)
  monday.setDate(today.getDate() - mondayOffset)

  return schedule.map((entry, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    return {
      day: entry.day,
      date: String(date.getDate()),
      workouts: entry.workouts,
    }
  })
}

function getTodayIndex() {
  return (new Date().getDay() + 6) % 7
}

function App() {
  const [week, setWeek] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(getTodayIndex)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [transitionDirection, setTransitionDirection] = useState('none')

  useEffect(() => {
    getSchedule()
      .then(schedule => {
        setWeek(buildWeek(schedule))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  function selectDay(index) {
    setSelectedIndex(index)
    setSelectedWorkout(null)
  }

  function selectWorkout(workout) {
    setTransitionDirection('forward')
    setSelectedWorkout(workout)
  }

  function goBack() {
    setTransitionDirection('back')
    setSelectedWorkout(null)
  }

  async function saveSets(setData) {
    await saveWorkoutSets(selectedIndex, selectedWorkout.name, setData)
    setWeek(prev =>
      prev.map((day, i) => {
        if (i !== selectedIndex) return day
        return {
          ...day,
          workouts: day.workouts.map(w =>
            w.name === selectedWorkout.name ? { ...w, setData } : w
          ),
        }
      })
    )
  }

  if (loading) return null
  if (error) return (
    <main className="app-shell">
      <section className="app-panel" aria-label="Workout app">
        <p style={{ color: 'var(--color-muted)', padding: '24px 0' }}>
          Failed to load: {error}
        </p>
      </section>
    </main>
  )

  return (
    <main className="app-shell">
      <section className="app-panel" aria-label="Workout app">
        {selectedWorkout ? (
          <div className={`page-transition page-transition-${transitionDirection}`}>
            <WorkoutDetail workout={selectedWorkout} onBack={goBack} onSaveSets={saveSets} />
          </div>
        ) : (
          <div className={`page-transition page-transition-${transitionDirection}`}>
            <HomePage
              week={week}
              selectedIndex={selectedIndex}
              onSelectDay={selectDay}
              onSelectWorkout={selectWorkout}
            />
          </div>
        )}
      </section>
    </main>
  )
}

export default App
