import { Alert, Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button } from '../atoms/Button'
import { Price } from '../atoms/Price'
import { CartItem } from '../molecules/CartItem'
import { formatearPrecio } from '../../utils/format'

// ORGANISMO presentacional: lista del carrito + resumen de compra.
// Todos los números (subtotal, descuento, total) llegan ya calculados desde useCart.
export function CartList({
  items = [],
  subtotal = 0,
  descuentoPorcentaje = 0,
  total = 0,
  umbralDescuento,
  onIncrement,
  onDecrement,
  onRemove,
  onClear,
}) {
  if (items.length === 0) {
    return (
      <Container className="py-5">
        <h1 className="fw-bold mb-4">Tu carrito</h1>
        <Alert variant="info">Tu carrito está vacío.</Alert>
        <Button as={Link} to="/">
          Ir a la tienda
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Tu carrito</h1>

      <Row className="g-4">
        <Col xs={12} lg={8}>
          <ListGroup>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onRemove={onRemove}
              />
            ))}
          </ListGroup>
        </Col>

        <Col xs={12} lg={4}>
          <Card>
            <Card.Body>
              <Card.Title as="h2" className="h5 mb-3">
                Resumen
              </Card.Title>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <Price value={subtotal} />
              </div>

              {descuentoPorcentaje > 0 ? (
                <div className="d-flex justify-content-between mb-2 text-success">
                  <span>Descuento ({descuentoPorcentaje}%)</span>
                  <span>−{formatearPrecio(subtotal - total)}</span>
                </div>
              ) : (
                umbralDescuento !== undefined && (
                  <p className="small text-secondary">
                    Compras sobre {formatearPrecio(umbralDescuento)} reciben descuento.
                  </p>
                )
              )}

              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                <span>Total</span>
                <Price value={total} />
              </div>

              <Button variant="outline-danger" className="w-100" onClick={onClear}>
                Vaciar carrito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
