import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button } from '../atoms/Button'

// ORGANISMO: banner principal. Los textos y el destino del botón llegan por props.
export function Hero({ eyebrow, titulo, texto, ctaTexto, ctaTo }) {
  return (
    <section className="hero">
      <Container className="py-5 text-center">
        {eyebrow && <p className="text-uppercase fw-semibold mb-2">{eyebrow}</p>}
        <h1 className="hero-title fw-bold">{titulo}</h1>
        {texto && <p className="lead mx-auto hero-text">{texto}</p>}
        {ctaTexto && (
          <Button as={Link} to={ctaTo} size="lg">
            {ctaTexto}
          </Button>
        )}
      </Container>
    </section>
  )
}
