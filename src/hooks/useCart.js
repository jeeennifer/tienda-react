import { useCallback, useReducer } from 'react'
import { aplicarDescuento, calcularTotal } from '../utils/format'
import { PORCENTAJE_DESCUENTO, UMBRAL_DESCUENTO } from '../utils/constants'

/**
 * Reducer del carrito: función pura (estado anterior + acción -> estado nuevo).
 * Cada item guarda lo mínimo que necesita el carrito: { id, nombre, precio, img, cantidad }.
 */
export function cartReducer(items, accion) {
  switch (accion.type) {
    case 'agregar': {
      const { producto, cantidad } = accion
      const existe = items.some((item) => item.id === producto.id)

      if (existe) {
        return items.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item,
        )
      }
      const { id, nombre, precio, img } = producto
      return [...items, { id, nombre, precio, img, cantidad }]
    }

    case 'incrementar':
      return items.map((item) =>
        item.id === accion.id ? { ...item, cantidad: item.cantidad + 1 } : item,
      )

    case 'decrementar':
      // Si la cantidad llega a 0, el producto sale del carrito.
      return items
        .map((item) => (item.id === accion.id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)

    case 'eliminar':
      return items.filter((item) => item.id !== accion.id)

    case 'vaciar':
      return []

    default:
      return items
  }
}

/**
 * Hook del carrito de compras (lógica reutilizable, sin JSX).
 * Devuelve los items, los totales ya calculados y las acciones para modificarlos.
 */
export function useCart() {
  const [items, dispatch] = useReducer(cartReducer, [])

  const agregar = useCallback(
    (producto, cantidad = 1) => dispatch({ type: 'agregar', producto, cantidad }),
    [],
  )
  const incrementar = useCallback((id) => dispatch({ type: 'incrementar', id }), [])
  const decrementar = useCallback((id) => dispatch({ type: 'decrementar', id }), [])
  const eliminar = useCallback((id) => dispatch({ type: 'eliminar', id }), [])
  const vaciar = useCallback(() => dispatch({ type: 'vaciar' }), [])

  // Valores derivados: se calculan en cada render a partir de "items".
  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0)
  const subtotal = calcularTotal(items)
  const descuentoPorcentaje = subtotal >= UMBRAL_DESCUENTO ? PORCENTAJE_DESCUENTO : 0
  const total = aplicarDescuento(subtotal, descuentoPorcentaje)

  return {
    items,
    cantidadTotal,
    subtotal,
    descuentoPorcentaje,
    total,
    umbralDescuento: UMBRAL_DESCUENTO,
    agregar,
    incrementar,
    decrementar,
    eliminar,
    vaciar,
  }
}
