import chevronForward from '../../assets/icons/chevron-forward.svg'
import './WorkoutCard.css'

function WorkoutCard({ workout, onSelect }) {
  return (
    <button
      className="workout-card"
      type="button"
      aria-label={`${workout.name}, ${workout.sets} sets of ${workout.reps} reps`}
      onClick={onSelect}
    >
      <span className="workout-card__text">
        <strong className="workout-card__title">{workout.name}</strong>
        <small className="workout-card__meta">
          {workout.sets} sets &bull; {workout.reps} Reps
        </small>
      </span>
      <img className="workout-card__chevron" src={chevronForward} width="24" height="24" alt="" />
    </button>
  )
}

export default WorkoutCard
