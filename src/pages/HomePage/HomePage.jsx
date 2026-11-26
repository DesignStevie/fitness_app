import DayPill from '../../components/DayPill/DayPill'
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard'
import WorkoutDetail from '../WorkoutDetail/WorkoutDetail'
import { getDayTitle, getEstimatedMinutes, getMuscleGroups } from '../../utils/daySummary'
import './HomePage.css'

function HomePage({
  week,
  selectedIndex,
  selectedWorkout,
  transitionDirection,
  onSelectDay,
  onSelectWorkout,
  onBack,
  onSaveSets,
}) {
  const selectedDay = week[selectedIndex]
  const workouts = selectedDay.workouts ?? []
  const groups = getMuscleGroups(selectedDay)
  const dayTitle = getDayTitle(selectedDay)
  const workoutPosition = selectedWorkout
    ? workouts.findIndex(w => w.name === selectedWorkout.name) + 1
    : 0

  return (
    <div className="home">
      <header className="home__header">
        <nav className="week-selector" aria-label="Select workout day">
          {week.map((item, index) => (
            <DayPill
              key={item.day}
              day={item.day}
              date={item.date}
              label={getDayTitle(item)}
              selected={index === selectedIndex}
              onSelect={() => onSelectDay(index)}
            />
          ))}
        </nav>
      </header>

      <section className="home__summary" aria-live="polite">
        <h1 className="home__title">{dayTitle}</h1>
        <div className="home__meta">
          {groups.length > 0 && <p>{groups.join(' • ')}</p>}
          <p>
            {workouts.length > 0
              ? `${workouts.length} exercise${workouts.length === 1 ? '' : 's'} • ~${getEstimatedMinutes(selectedDay)}min`
              : 'Rest day'}
          </p>
        </div>
      </section>

      <section className="home__sheet" aria-label="Exercises">
        <div
          key={selectedWorkout?.name ?? 'list'}
          className={`home__sheet-content page-transition page-transition-${transitionDirection}`}
        >
          {selectedWorkout ? (
            <WorkoutDetail
              workout={selectedWorkout}
              dayTitle={dayTitle}
              position={workoutPosition}
              total={workouts.length}
              onBack={onBack}
              onSaveSets={setData => onSaveSets(selectedIndex, selectedWorkout.name, setData)}
            />
          ) : workouts.length === 0 ? (
            <div className="home__rest">
              <p className="home__rest-title">Recovery day</p>
              <p className="home__rest-body">No exercises scheduled. Rest up and come back stronger.</p>
            </div>
          ) : (
            <div className="workout-list">
              {workouts.map(workout => (
                <WorkoutCard
                  key={workout.name}
                  workout={workout}
                  onSelect={() => onSelectWorkout(workout)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default HomePage
