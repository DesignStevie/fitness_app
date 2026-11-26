import './DayPill.css'

function DayPill({ day, date, label, selected, onSelect }) {
  return (
    <button
      className={`day-pill${selected ? ' selected' : ''}`}
      type="button"
      aria-pressed={selected}
      aria-label={`${day} ${date}, ${label}`}
      onClick={onSelect}
    >
      <span className="day-pill__day" aria-hidden="true">{day.charAt(0)}</span>
      <span className="day-pill__date" aria-hidden="true">{date}</span>
      <span
        className={`day-pill__label${label.toLowerCase() === 'rest' ? ' day-pill__label--rest' : ''}`}
        aria-hidden="true"
      >
        {label}
      </span>
    </button>
  )
}

export default DayPill
