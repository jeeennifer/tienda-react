import { describe, it, expect } from 'vitest'
import { formatearPrecio, calcularTotal, aplicarDescuento } from './format'

// Test de funciones PURAS: entra un dato, sale un resultado. Casos: normal, límite y error.
describe('formatearPrecio', () => {
  it('agrega el signo $ y el punto de miles (pesos chilenos)', () => {
    expect(formatearPrecio(1990)).toBe('$1.990')
    expect(formatearPrecio(0)).toBe('$0')
    expect(formatearPrecio(1500000)).toBe('$1.500.000')
  })
})

describe('calcularTotal', () => {
  it('suma precio por cantidad, devuelve 0 si está vacío y falla con cantidades negativas', () => {
    // 1. Preparar
    const carrito = [
      { nombre: 'Café', precio: 1990, cantidad: 2 },
      { nombre: 'Medialuna', precio: 1200, cantidad: 1 },
    ]

    // 2. Actuar + 3. Verificar
    expect(calcularTotal(carrito)).toBe(5180)
    expect(calcularTotal([])).toBe(0)
    // Para probar errores, se pasa una FUNCIÓN a expect
    expect(() => calcularTotal([{ nombre: 'Café', precio: 1990, cantidad: -1 }])).toThrow(
      'La cantidad no puede ser negativa',
    )
  })
})

describe('aplicarDescuento', () => {
  it('aplica el porcentaje, respeta los límites 0 % y 100 % y rechaza valores fuera de rango', () => {
    expect(aplicarDescuento(10000, 15)).toBe(8500)
    expect(aplicarDescuento(10000, 0)).toBe(10000)
    expect(aplicarDescuento(10000, 100)).toBe(0)
    expect(aplicarDescuento(1990, 10)).toBe(1791)

    expect(() => aplicarDescuento(10000, 120)).toThrow()
    expect(() => aplicarDescuento(10000, -5)).toThrow()
  })
})
