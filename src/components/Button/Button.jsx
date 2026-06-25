import './Button.css'

function Button({ children, className = '', variant = 'primary', type = 'button', ...props }) {
  return (
    <button className={`button button-${variant} ${className}`.trim()} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
