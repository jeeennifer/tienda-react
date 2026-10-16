import { MainTemplate } from '../templates/MainTemplate'
import { Header } from '../organisms/Header'
import { NotFound } from '../organisms/NotFound'
import { Footer } from '../organisms/Footer'

// PAGE (ruta "*"): cualquier dirección que no coincida con las anteriores.
export function NotFoundPage({ cart }) {
  return (
    <MainTemplate header={<Header cartCount={cart.cantidadTotal} />} footer={<Footer />}>
      <NotFound />
    </MainTemplate>
  )
}
