import DayPill from '../../components/DayPill/DayPill'
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard'
import './HomePage.css'

function HomePage({ week, selectedIndex, onSelectDay, onSelectWorkout }) {
  const selectedSchedule = week[selectedIndex]

  return (
    <>
      <nav className="week-selector" aria-label="Select workout day">
        {week.map((item, index) => (
          <DayPill
            key={item.day}
            day={item.day}
            date={item.date}
            selected={index === selectedIndex}
            onSelect={() => onSelectDay(index)}
          />
        ))}
      </nav>

      <div className="workout-list" aria-live="polite">
        {selectedSchedule.workouts.map((workout) => (
          <WorkoutCard
            key={workout.name}
            workout={workout}
            onSelect={() => onSelectWorkout(workout)}
          />
        ))}
      </div>
    </>
  )
}

export default HomePage
