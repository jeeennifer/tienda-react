import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { Badge } from '../atoms/Badge'

// ORGANISMO: Navbar responsive. Navegación real con React Router (sin anclas tipo #inicio).
// Bajo el breakpoint "lg" los enlaces se pliegan en el botón hamburguesa.
export function Header({ cartCount = 0, brand = 'Mi Tienda React' }) {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" collapseOnSelect sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {brand}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />

        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">
              Carrito{' '}
              <Badge bg="primary" pill>
                {cartCount}
              </Badge>
              <span className="visually-hidden"> artículos en el carrito</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
