import { useParams } from 'react-router-dom'
import { MainTemplate } from '../templates/MainTemplate'
import { Header } from '../organisms/Header'
import { Footer } from '../organisms/Footer'
import { ProductDetailContainer } from '../../containers/ProductDetailContainer'

// PAGE (ruta "/producto/:id"): lee el id de la URL y se lo entrega al container.
// El `key` reinicia el container (y su contador) cuando cambia de producto.
export function ProductDetailPage({ cart }) {
  const { id } = useParams()

  return (
    <MainTemplate header={<Header cartCount={cart.cantidadTotal} />} footer={<Footer />}>
      <ProductDetailContainer key={id} id={id} onAddToCart={cart.agregar} />
    </MainTemplate>
  )
}
