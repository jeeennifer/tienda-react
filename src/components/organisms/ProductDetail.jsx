import { Alert, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import { Price } from '../atoms/Price'
import { QuantityCounter } from '../molecules/QuantityCounter'

// ORGANISMO presentacional: detalle de un producto (ruta /producto/:id).
// Maneja los cuatro estados que le entrega su container: cargando, error, no encontrado y éxito.
export function ProductDetail({
  producto,
  loading = false,
  error = false,
  cantidad = 1,
  min = 1,
  max = 10,
  onIncrement,
  onDecrement,
  onAdd,
  agregado = false,
}) {
  if (loading) {
    return (
      <Container className="py-5 text-center" role="status">
        <Spinner animation="border" size="sm" className="me-2" aria-hidden="true" />
        <span>Cargando producto...</span>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">No se pudo cargar el producto</Alert>
      </Container>
    )
  }

  if (!producto) {
    return (
      <Container className="py-5">
        <Alert variant="warning">Producto no encontrado</Alert>
        <Button as={Link} to="/">
          Volver al inicio
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <Button as={Link} to="/" variant="link" className="px-0 mb-3">
        ← Volver a productos
      </Button>

      <Row className="g-4">
        <Col xs={12} md={6}>
          <Image src={producto.img} alt={producto.nombre} fluid rounded className="producto-img" />
        </Col>

        <Col xs={12} md={6}>
          <Badge>{producto.categoria}</Badge>
          <h1 className="h2 fw-bold mt-2">{producto.nombre}</h1>
          <p className="text-secondary">{producto.descripcion}</p>
          <Price value={producto.precio} className="d-block fs-3 fw-bold mb-4" />

          <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
            <QuantityCounter
              value={cantidad}
              min={min}
              max={max}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
            <Button size="lg" onClick={onAdd}>
              Agregar al carrito
            </Button>
          </div>

          {agregado && (
            <Alert variant="success" role="status">
              Producto agregado al carrito. <Link to="/carrito">Ver carrito</Link>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  )
}
