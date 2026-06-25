import './DayPill.css'

function DayPill({ day, date, selected, onSelect }) {
  return (
    <button
      className={`day-pill ${selected ? 'selected' : ''}`}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span>{day}</span>
      <strong>{date}</strong>
    </button>
  )
}

export default DayPill
