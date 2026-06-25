import Button from '../../components/Button/Button'
import ChevronLeft from '../../components/icons/ChevronLeft/ChevronLeft'
import Input from '../../components/Input/Input'
import './WorkoutDetail.css'

function WorkoutDetail({ workout, onBack }) {
  const sets = Array.from({ length: workout.sets }, (_, index) => ({
    id: index + 1,
    reps: workout.reps,
    weight: 20,
  }))

  return (
    <article className="workout-detail">
      <Button className="back-button" variant="text" onClick={onBack}>
        <ChevronLeft className="back-icon" />
        Back
      </Button>

      <header className="detail-header">
        <h1>{workout.name}</h1>
        <p>{workout.group}</p>
      </header>

      <div className="set-card" aria-label={`${workout.name} sets`}>
        {sets.map((set) => (
          <div className="set-row" key={set.id}>
            <span>Set {set.id}</span>
            <Input aria-label={`Set ${set.id} reps`} defaultValue={set.reps} inputMode="numeric" />
            <span className="set-multiply">x</span>
            <Input
              aria-label={`Set ${set.id} weight`}
              defaultValue={set.weight}
              inputMode="decimal"
              unit="kg"
            />
          </div>
        ))}
      </div>

      <Button className="complete-button">
        Mark as complete
      </Button>
    </article>
  )
}

export default WorkoutDetail
