import { MainTemplate } from '../templates/MainTemplate'
import { Header } from '../organisms/Header'
import { CartList } from '../organisms/CartList'
import { Footer } from '../organisms/Footer'

// PAGE (ruta "/carrito"): el estado del carrito vive en App (useCart) y llega por props.
export function CartPage({ cart }) {
  return (
    <MainTemplate header={<Header cartCount={cart.cantidadTotal} />} footer={<Footer />}>
      <CartList
        items={cart.items}
        subtotal={cart.subtotal}
        descuentoPorcentaje={cart.descuentoPorcentaje}
        total={cart.total}
        umbralDescuento={cart.umbralDescuento}
        onIncrement={cart.incrementar}
        onDecrement={cart.decrementar}
        onRemove={cart.eliminar}
        onClear={cart.vaciar}
      />
    </MainTemplate>
  )
}
