import { formatearPrecio } from '../../utils/format'

// ÁTOMO: muestra un número como precio en pesos chilenos (usa la función pura de utils).
export function Price({ value, className = '', ...props }) {
  return (
    <span className={className} {...props}>
      {formatearPrecio(value)}
    </span>
  )
}
