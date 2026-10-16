import { useCallback, useState } from 'react'

/**
 * Patrón de Contador reutilizable (cantidad de un producto, clics, etc.).
 * Respeta un mínimo y un máximo para que el valor nunca se salga de rango.
 */
export function useCounter({ inicial = 0, min = -Infinity, max = Infinity } = {}) {
  const [valor, setValor] = useState(inicial)

  const incrementar = useCallback(() => setValor((actual) => Math.min(actual + 1, max)), [max])
  const decrementar = useCallback(() => setValor((actual) => Math.max(actual - 1, min)), [min])
  const reiniciar = useCallback(() => setValor(inicial), [inicial])

  return {
    valor,
    incrementar,
    decrementar,
    reiniciar,
    enMinimo: valor <= min,
    enMaximo: valor >= max,
  }
}
