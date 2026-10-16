import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import { ProductCard } from './ProductCard'

// ORGANISMO: sección con la grilla responsiva de productos. Es PRESENTACIONAL:
// no hace fetch; recibe productos / loading / error por props (los entrega un container).
//
// Grilla mobile-first:  xs={12} -> 1 por fila · md={6} -> 2 por fila · lg={4} -> 3 por fila
// `toolbar` es un "slot": el container puede insertar aquí un SearchForm u otra cosa.
export function ProductGrid({
  titulo = 'Productos',
  descripcion,
  toolbar,
  productos = [],
  loading = false,
  error = false,
  onAddToCart,
}) {
  return (
    <section aria-labelledby="titulo-productos">
      <Container className="py-5">
        <div className="mb-4">
          <h2 id="titulo-productos" className="fw-bold">
            {titulo}
          </h2>
          {descripcion && <p className="text-secondary">{descripcion}</p>}
          {toolbar}
        </div>

        {loading && (
          <div className="text-center py-5" role="status">
            <Spinner animation="border" size="sm" className="me-2" aria-hidden="true" />
            <span>Cargando productos...</span>
          </div>
        )}

        {error && <Alert variant="danger">No se pudieron cargar los productos</Alert>}

        {!loading && !error && productos.length === 0 && (
          <Alert variant="info">No se encontraron productos.</Alert>
        )}

        {!loading && !error && productos.length > 0 && (
          <Row className="g-4">
            {productos.map((producto) => (
              <Col key={producto.id} xs={12} md={6} lg={4} data-testid="col-producto">
                <ProductCard producto={producto} onAddToCart={onAddToCart} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  )
}
