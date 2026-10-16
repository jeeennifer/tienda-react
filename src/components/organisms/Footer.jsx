import { Container } from 'react-bootstrap'

// ORGANISMO: pie de página.
export function Footer({ nombre = 'Mi Tienda React' }) {
  return (
    <footer className="bg-dark text-white mt-4">
      <Container className="py-4 text-center">
        <p className="mb-1 fw-semibold">{nombre}</p>
        <small>Ejemplo académico de diseño responsivo con React Bootstrap.</small>
      </Container>
    </footer>
  )
}
