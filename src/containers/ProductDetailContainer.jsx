import { useEffect, useState } from 'react'
import { ProductDetail } from '../components/organisms/ProductDetail'
import { useCounter } from '../hooks/useCounter'
import { CANTIDAD_MAXIMA, CANTIDAD_MINIMA, URL_PRODUCTOS } from '../utils/constants'

// CONTAINER del detalle (/producto/:id): hace el fetch, busca el producto por id
// y maneja el contador de cantidad con el hook useCounter.
export function ProductDetailContainer({ id, onAddToCart }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [agregado, setAgregado] = useState(false)
  const contador = useCounter({
    inicial: CANTIDAD_MINIMA,
    min: CANTIDAD_MINIMA,
    max: CANTIDAD_MAXIMA,
  })

  useEffect(() => {
    let cancelado = false

    fetch(URL_PRODUCTOS)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error('Error de servidor')
        return respuesta.json()
      })
      .then((datos) => {
        if (!cancelado) setProductos(datos)
      })
      .catch(() => {
        if (!cancelado) setError(true)
      })
      .finally(() => {
        if (!cancelado) setCargando(false)
      })

    return () => {
      cancelado = true
    }
  }, [])

  // Los parámetros de la URL llegan como texto: se comparan como texto.
  const producto = productos.find((p) => String(p.id) === String(id)) ?? null

  function handleAdd() {
    onAddToCart(producto, contador.valor)
    setAgregado(true)
  }

  return (
    <ProductDetail
      producto={producto}
      loading={cargando}
      error={error}
      cantidad={contador.valor}
      min={CANTIDAD_MINIMA}
      max={CANTIDAD_MAXIMA}
      onIncrement={contador.incrementar}
      onDecrement={contador.decrementar}
      onAdd={handleAdd}
      agregado={agregado}
    />
  )
}
