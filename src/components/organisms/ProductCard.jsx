import { Card, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import { Price } from '../atoms/Price'

// ORGANISMO: tarjeta de producto. No define cuántas columnas ocupa:
// eso lo decide el padre (ProductGrid) con <Col xs md lg>.
export function ProductCard({ producto, onAddToCart }) {
  return (
    <Card className="product-card h-100 shadow-sm">
      <Image
        src={producto.img}
        alt={producto.nombre}
        fluid
        className="producto-img card-img-top"
        loading="lazy"
      />

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <Badge>{producto.categoria}</Badge>
        </div>
        <Card.Title as="h3">{producto.nombre}</Card.Title>
        <Card.Text>{producto.descripcion}</Card.Text>

        <div className="mt-auto">
          <Price value={producto.precio} className="d-block fs-5 fw-bold mb-3" />
          <div className="d-grid gap-2">
            <Button as={Link} to={`/producto/${producto.id}`} variant="outline-primary">
              Ver producto
            </Button>
            <Button onClick={() => onAddToCart(producto, 1)}>Agregar al carrito</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}
