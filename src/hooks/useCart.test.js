import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCart } from './useCart'

// Productos de prueba, con la misma forma que los de public/productos.json
const teclado = { id: 1, nombre: 'Teclado', precio: 20000, img: '/teclado.jpg' }
const audifonos = { id: 2, nombre: 'Audífonos', precio: 50000, img: '/audifonos.jpg' }
const monitor = { id: 3, nombre: 'Monitor', precio: 250000, img: '/monitor.jpg' }

// Test de un HOOK: renderHook lo ejecuta sin necesidad de un componente,
// y act() agrupa los cambios de estado igual que lo haría un clic real.
describe('useCart', () => {
  it('agrega productos, acumula cantidades y calcula el subtotal', () => {
    const { result } = renderHook(() => useCart())

    act(() => {
      result.current.agregar(audifonos, 1)
      result.current.agregar(audifonos, 2) // mismo producto: suma cantidad, no duplica
      result.current.agregar(teclado)
    })

    expect(result.current.items).toHaveLength(2)
    expect(result.current.cantidadTotal).toBe(4)
    expect(result.current.subtotal).toBe(170000) // 3 × 50.000 + 1 × 20.000
    expect(result.current.descuentoPorcentaje).toBe(0) // bajo el umbral de 200.000
    expect(result.current.total).toBe(170000)
  })

  it('aplica 10 % de descuento sobre el umbral y quita el producto al decrementar a 0', () => {
    const { result } = renderHook(() => useCart())

    act(() => result.current.agregar(monitor))

    expect(result.current.subtotal).toBe(250000)
    expect(result.current.descuentoPorcentaje).toBe(10)
    expect(result.current.total).toBe(225000)

    act(() => result.current.decrementar(monitor.id))

    expect(result.current.items).toEqual([])
    expect(result.current.cantidadTotal).toBe(0)
    expect(result.current.total).toBe(0)
  })
})
