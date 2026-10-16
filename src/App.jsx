import { Route, Routes } from 'react-router-dom'
import { useCart } from './hooks/useCart'
import { HomePage } from './components/pages/HomePage'
import { ProductDetailPage } from './components/pages/ProductDetailPage'
import { CartPage } from './components/pages/CartPage'
import { ContactPage } from './components/pages/ContactPage'
import { NotFoundPage } from './components/pages/NotFoundPage'

// Tabla de rutas. El carrito vive aquí (arriba de todas las páginas) para que
// se conserve al navegar entre ellas; cada page lo recibe por props.
export default function App() {
  const cart = useCart()

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />} />
      <Route path="/producto/:id" element={<ProductDetailPage cart={cart} />} />
      <Route path="/carrito" element={<CartPage cart={cart} />} />
      <Route path="/contacto" element={<ContactPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage cart={cart} />} />
    </Routes>
  )
}
