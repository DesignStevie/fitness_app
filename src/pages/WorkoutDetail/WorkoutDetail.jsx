import { useState } from 'react'
import Button from '../../components/Button/Button'
import ChevronLeft from '../../components/icons/ChevronLeft/ChevronLeft'
import Input from '../../components/Input/Input'
import './WorkoutDetail.css'

function WorkoutDetail({ workout, onBack, onSaveSets }) {
  const [setData, setSetData] = useState(() =>
    Array.from({ length: workout.sets }, (_, i) => ({
      id: i + 1,
      reps: workout.setData?.[i]?.reps ?? workout.reps,
      weight: workout.setData?.[i]?.weight ?? 20,
    }))
  )

  function handleChange(index, field, value) {
    setSetData(prev =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    )
  }

  function handleBlur() {
    onSaveSets(setData)
  }

  async function handleBack() {
    await onSaveSets(setData)
    onBack()
  }

  async function handleComplete() {
    await onSaveSets(setData)
    onBack()
  }

  return (
    <article className="workout-detail">
      <Button className="back-button" variant="text" onClick={handleBack}>
        <ChevronLeft className="back-icon" />
        Back
      </Button>

      <header className="detail-header">
        <h1>{workout.name}</h1>
        <p>{workout.group}</p>
      </header>

      <div className="set-card" aria-label={`${workout.name} sets`}>
        {setData.map((set, index) => (
          <div className="set-row" key={set.id}>
            <span>Set {set.id}</span>
            <Input
              aria-label={`Set ${set.id} reps`}
              inputMode="numeric"
              value={set.reps}
              onChange={e => handleChange(index, 'reps', Number(e.target.value))}
              onBlur={handleBlur}
              onFocus={e => e.target.select()}
            />
            <span className="set-multiply">x</span>
            <Input
              aria-label={`Set ${set.id} weight`}
              inputMode="decimal"
              unit="kg"
              value={set.weight}
              onChange={e => handleChange(index, 'weight', Number(e.target.value))}
              onBlur={handleBlur}
              onFocus={e => e.target.select()}
            />
          </div>
        ))}
      </div>

      <Button className="complete-button" onClick={handleComplete}>
        Mark as complete
      </Button>
    </article>
  )
}

export default WorkoutDetail
