import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button } from '../atoms/Button'

// ORGANISMO: pantalla para rutas que no existen (se usa con path="*").
export function NotFound() {
  return (
    <Container className="py-5 text-center">
      <p className="display-1 fw-bold text-secondary mb-0">404</p>
      <h1 className="h3 mb-3">Página no encontrada</h1>
      <p className="text-secondary mb-4">La dirección que buscas no existe.</p>
      <Button as={Link} to="/">
        Volver al inicio
      </Button>
    </Container>
  )
}
