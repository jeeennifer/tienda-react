import { MainTemplate } from '../templates/MainTemplate'
import { Header } from '../organisms/Header'
import { Footer } from '../organisms/Footer'
import { ContactContainer } from '../../containers/ContactContainer'

// PAGE (ruta "/contacto").
export function ContactPage({ cart }) {
  return (
    <MainTemplate header={<Header cartCount={cart.cantidadTotal} />} footer={<Footer />}>
      <ContactContainer />
    </MainTemplate>
  )
}
