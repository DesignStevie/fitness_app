import { useMemo, useState } from 'react'
import HomePage from './pages/HomePage/HomePage'
import WorkoutDetail from './pages/WorkoutDetail/WorkoutDetail'
import './App.css'

const workoutPlans = [
  [
    { name: 'Bench press', sets: 4, reps: 8, group: 'Upper body' },
    { name: 'Incline dumbbell press', sets: 3, reps: 10, group: 'Upper body' },
    { name: 'Triceps pushdown', sets: 3, reps: 12, group: 'Arms' },
  ],
  [
    { name: 'Back squat', sets: 4, reps: 6, group: 'Lower body' },
    { name: 'Romanian deadlift', sets: 3, reps: 8, group: 'Lower body' },
    { name: 'Walking lunge', sets: 3, reps: 10, group: 'Lower body' },
    { name: 'Standing calf raise', sets: 4, reps: 12, group: 'Lower body' },
  ],
  [
    { name: 'Shoulder press', sets: 4, reps: 8, group: 'Shoulders' },
    { name: 'Lateral raise', sets: 3, reps: 12, group: 'Shoulders' },
    { name: 'Face pull', sets: 3, reps: 12, group: 'Upper body' },
  ],
  [
    { name: 'Deadlift', sets: 3, reps: 8, group: 'Upper body' },
    { name: 'Pull-ups', sets: 3, reps: 8, group: 'Upper body' },
    { name: 'Seated cable row', sets: 3, reps: 8, group: 'Upper body' },
    { name: 'Rear delt fly', sets: 3, reps: 8, group: 'Upper body' },
    { name: 'Barbell', sets: 3, reps: 8, group: 'Upper body' },
    { name: 'Hammer curl', sets: 2, reps: 10, group: 'Upper body' },
  ],
  [
    { name: 'Hip thrust', sets: 4, reps: 10, group: 'Lower body' },
    { name: 'Leg press', sets: 4, reps: 10, group: 'Lower body' },
    { name: 'Hamstring curl', sets: 3, reps: 12, group: 'Lower body' },
  ],
  [
    { name: 'Bike intervals', sets: 6, reps: 1, group: 'Conditioning' },
    { name: 'Plank', sets: 3, reps: 45, group: 'Core' },
    { name: 'Hanging knee raise', sets: 3, reps: 12, group: 'Core' },
  ],
  [
    { name: 'Mobility flow', sets: 1, reps: 20, group: 'Recovery' },
    { name: 'Zone 2 walk', sets: 1, reps: 30, group: 'Cardio' },
  ],
]

const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getCurrentWeek() {
  const today = new Date()
  const mondayOffset = (today.getDay() + 6) % 7
  const monday = new Date(today)
  monday.setHours(0, 0, 0, 0)
  monday.setDate(today.getDate() - mondayOffset)

  return dayLabels.map((day, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)

    return {
      day,
      date: String(date.getDate()),
      workouts: workoutPlans[index],
    }
  })
}

function getTodayIndex() {
  return (new Date().getDay() + 6) % 7
}

function App() {
  const week = useMemo(() => getCurrentWeek(), [])
  const [selectedIndex, setSelectedIndex] = useState(getTodayIndex)
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [transitionDirection, setTransitionDirection] = useState('none')

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

  return (
    <main className="app-shell">
      <section className="app-panel" aria-label="Workout app">
        {selectedWorkout ? (
          <div className={`page-transition page-transition-${transitionDirection}`}>
            <WorkoutDetail workout={selectedWorkout} onBack={goBack} />
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
