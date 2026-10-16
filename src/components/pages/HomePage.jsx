import { MainTemplate } from '../templates/MainTemplate'
import { Header } from '../organisms/Header'
import { Hero } from '../organisms/Hero'
import { Footer } from '../organisms/Footer'
import { ProductsContainer } from '../../containers/ProductsContainer'

// PAGE (ruta "/"): instancia el template con datos reales y conecta el container.
export function HomePage({ cart }) {
  return (
    <MainTemplate
      header={<Header cartCount={cart.cantidadTotal} />}
      hero={
        <Hero
          eyebrow="React + React Bootstrap"
          titulo="Diseñando sitios web responsivos"
          texto="Un mismo sitio que reorganiza su contenido para móvil, tablet y escritorio."
          ctaTexto="Ver producto destacado"
          ctaTo="/producto/1"
        />
      }
      footer={<Footer />}
    >
      <ProductsContainer onAddToCart={cart.agregar} />
    </MainTemplate>
  )
}
