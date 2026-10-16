import { Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Button } from '../atoms/Button'
import { Price } from '../atoms/Price'
import { QuantityCounter } from './QuantityCounter'

// MOLÉCULA: una línea del carrito (imagen + nombre + contador + subtotal + quitar).
// Mobile-first: apila en xs y se reparte las 12 columnas desde md (2 + 4 + 3 + 2 + 1).
export function CartItem({ item, onIncrement, onDecrement, onRemove }) {
  return (
    <ListGroup.Item>
      <Row className="align-items-center g-3">
        <Col xs={4} md={2}>
          <Image src={item.img} alt={item.nombre} fluid rounded />
        </Col>
        <Col xs={8} md={4}>
          <h3 className="h6 mb-1">{item.nombre}</h3>
          <Price value={item.precio} className="text-secondary" />
        </Col>
        <Col xs={12} md={3}>
          <QuantityCounter
            value={item.cantidad}
            onIncrement={() => onIncrement(item.id)}
            onDecrement={() => onDecrement(item.id)}
            label={`Cantidad de ${item.nombre}`}
          />
        </Col>
        <Col xs={8} md={2} className="fw-bold text-md-end">
          <Price value={item.precio * item.cantidad} />
        </Col>
        <Col xs={4} md={1} className="text-end">
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onRemove(item.id)}
            aria-label={`Eliminar ${item.nombre}`}
          >
            ✕
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}
