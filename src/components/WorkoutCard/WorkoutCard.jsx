import ChevronRight from '../icons/ChevronRight/ChevronRight'
import './WorkoutCard.css'

function WorkoutCard({ workout, onSelect }) {
  return (
    <button
      className="workout-card"
      type="button"
      aria-label={`${workout.name} details`}
      onClick={onSelect}
    >
      <span>
        <strong>{workout.name}</strong>
        <small>
          {workout.sets} Sets&nbsp; &bull;&nbsp; {workout.reps} Reps&nbsp; &bull;&nbsp; {workout.group}
        </small>
      </span>
      <ChevronRight className="card-arrow" />
    </button>
  )
}

export default WorkoutCard
