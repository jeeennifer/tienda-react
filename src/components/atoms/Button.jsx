import { Button as BsButton } from 'react-bootstrap'

// ÁTOMO: recibe todo por props. No conoce rutas, stores ni datos del negocio.
// Con la prop `as` puede renderizarse como otro elemento (por ejemplo un <Link>),
// sin que el átomo tenga que importar el router. En ese caso se anuncia como
// "enlace" para los lectores de pantalla (React Bootstrap usaría role="button").
export function Button({ children, variant = 'primary', as, ...props }) {
  return (
    <BsButton as={as} variant={variant} role={as ? 'link' : undefined} {...props}>
      {children}
    </BsButton>
  )
}
