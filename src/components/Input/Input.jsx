import './Input.css'

function Input({ className = '', unit, ...props }) {
  if (unit) {
    return (
      <label className={`input input-with-unit ${className}`.trim()}>
        <input {...props} />
        <span>{unit}</span>
      </label>
    )
  }

  return <input className={`input ${className}`.trim()} {...props} />
}

export default Input
