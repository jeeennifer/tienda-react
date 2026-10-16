import { useEffect, useState } from 'react'
import { ProductGrid } from '../components/organisms/ProductGrid'
import { SearchForm } from '../components/molecules/SearchForm'
import { normalizarTexto } from '../utils/format'
import { URL_PRODUCTOS } from '../utils/constants'

// CONTAINER: el que "piensa". Hace el fetch, guarda el estado (productos, cargando, error,
// búsqueda) y se lo pasa por props al componente presentacional. No tiene clases ni textos.
export function ProductsContainer({ onAddToCart }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    // Evita actualizar el estado si el componente se desmontó antes de recibir la respuesta.
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

  const filtrados = productos.filter((producto) =>
    normalizarTexto(producto.nombre).includes(normalizarTexto(busqueda)),
  )

  return (
    <ProductGrid
      titulo="Productos"
      descripcion="Cambia el ancho de la ventana para observar la grilla responsiva."
      toolbar={<SearchForm onSearch={setBusqueda} />}
      productos={filtrados}
      loading={cargando}
      error={error}
      onAddToCart={onAddToCart}
    />
  )
}
