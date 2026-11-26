import { useState } from 'react'
import addIcon from '../../assets/icons/add.svg'
import removeIcon from '../../assets/icons/remove.svg'
import './Stepper.css'

function formatValue(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)))
}

// Large numeric value with −/+ buttons. The number itself is an input,
// so you can also tap it and type an exact value.
function Stepper({ label, unit, value, step = 1, min = 0, decimal = false, onChange }) {
  const [draft, setDraft] = useState(null)

  const clamp = next => Math.max(min, Number.isFinite(next) ? next : min)

  // Functional update so rapid taps never read a stale value.
  function commit(next) {
    onChange(typeof next === 'function' ? prev => clamp(next(prev)) : clamp(next))
  }

  function handleInput(e) {
    const pattern = decimal ? /[^0-9.]/g : /[^0-9]/g
    setDraft(e.target.value.replace(pattern, ''))
  }

  function handleBlur() {
    if (draft !== null) commit(parseFloat(draft))
    setDraft(null)
  }

  const display = draft ?? formatValue(value)

  return (
    <div className="stepper" role="group" aria-label={label}>
      <button
        className="stepper__button"
        type="button"
        aria-label={`Decrease ${label.toLowerCase()}`}
        disabled={value <= min}
        onClick={() => commit(v => v - step)}
      >
        <img src={removeIcon} width="32" height="32" alt="" />
      </button>

      <label className="stepper__value">
        <input
          className="stepper__input"
          type="text"
          inputMode={decimal ? 'decimal' : 'numeric'}
          aria-label={label}
          value={display}
          style={{ width: `${Math.max(display.length, 1)}ch` }}
          onFocus={e => { setDraft(formatValue(value)); e.target.select() }}
          onChange={handleInput}
          onBlur={handleBlur}
          onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
        />
        <span className="stepper__unit">{unit}</span>
      </label>

      <button
        className="stepper__button"
        type="button"
        aria-label={`Increase ${label.toLowerCase()}`}
        onClick={() => commit(v => v + step)}
      >
        <img src={addIcon} width="32" height="32" alt="" />
      </button>
    </div>
  )
}

export default Stepper
