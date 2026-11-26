import { useEffect, useRef, useState } from 'react'
import arrowBack from '../../assets/icons/arrow-back.svg'
import divider from '../../assets/icons/divider.svg'
import Button from '../../components/Button/Button'
import Stepper from '../../components/Stepper/Stepper'
import './WorkoutDetail.css'

const WEIGHT_STEP_KG = 2.5

function WorkoutDetail({ workout, dayTitle, position, total, onBack, onSaveSets }) {
  const [sets, setSets] = useState(() =>
    Array.from({ length: workout.sets }, (_, i) => ({
      reps: workout.setData?.[i]?.reps ?? workout.reps,
      weight: workout.setData?.[i]?.weight ?? 0,
    }))
  )
  const [activeSet, setActiveSet] = useState(0)
  const [saving, setSaving] = useState(false)

  // Track unsaved edits so switching day mid-edit still persists them.
  const dirty = useRef(false)
  const latest = useRef({ sets, onSaveSets })
  latest.current = { sets, onSaveSets }

  useEffect(() => () => {
    if (dirty.current) latest.current.onSaveSets(latest.current.sets)
  }, [])

  function updateSet(field, value) {
    dirty.current = true
    setSets(prev =>
      prev.map((s, i) => {
        if (i !== activeSet) return s
        const next = typeof value === 'function' ? value(s[field]) : value
        return { ...s, [field]: next }
      })
    )
  }

  async function exit() {
    if (dirty.current) {
      setSaving(true)
      dirty.current = false
      await onSaveSets(sets)
    }
    onBack()
  }

  const current = sets[activeSet]

  return (
    <article className="workout-detail">
      <div className="workout-detail__body">
        <header className="workout-detail__header">
          <button className="workout-detail__back" type="button" aria-label="Back to exercises" onClick={exit}>
            <img src={arrowBack} width="20" height="20" alt="" />
          </button>
          <div className="workout-detail__heading">
            <p className="workout-detail__eyebrow">
              {dayTitle} • {position} of {total}
            </p>
            <h2 className="workout-detail__name">{workout.name}</h2>
          </div>
        </header>

        <div className="set-tabs" role="tablist" aria-label="Sets">
          {sets.map((_, i) => (
            <button
              key={i}
              className={`set-tab${i === activeSet ? ' is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={i === activeSet}
              onClick={() => setActiveSet(i)}
            >
              Set {i + 1}
            </button>
          ))}
        </div>

        <div className="set-editor" role="tabpanel" aria-label={`Set ${activeSet + 1}`}>
          <Stepper
            label="Weight"
            unit="KG"
            decimal
            step={WEIGHT_STEP_KG}
            value={current.weight}
            onChange={v => updateSet('weight', v)}
          />
          <img className="set-editor__divider" src={divider} width="334" height="1" alt="" />
          <Stepper
            label="Reps"
            unit="REPS"
            value={current.reps}
            onChange={v => updateSet('reps', v)}
          />
        </div>
      </div>

      <Button className="workout-detail__finish" onClick={exit} disabled={saving}>
        Finished
      </Button>
    </article>
  )
}

export default WorkoutDetail
