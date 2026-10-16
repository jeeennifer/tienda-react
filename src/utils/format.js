// Funciones "puras": reciben datos y devuelven un resultado,
// sin tocar la pantalla ni la red. Son las más fáciles de probar.

/**
 * Convierte un número en un precio en pesos chilenos.
 * formatearPrecio(1990) -> "$1.990"
 */
export function formatearPrecio(numero) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(numero)
}

/**
 * Suma precio x cantidad de cada producto del carrito.
 * Lanza un error si alguna cantidad es negativa.
 * calcularTotal([{ precio: 1990, cantidad: 2 }]) -> 3980
 */
export function calcularTotal(productos) {
  let total = 0
  for (const producto of productos) {
    if (producto.cantidad < 0) {
      throw new Error('La cantidad no puede ser negativa')
    }
    total += producto.precio * producto.cantidad
  }
  return total
}

/**
 * Aplica un descuento (en porcentaje) y redondea al peso.
 * aplicarDescuento(10000, 15) -> 8500
 */
export function aplicarDescuento(total, porcentaje) {
  if (porcentaje < 0 || porcentaje > 100) {
    throw new Error('El porcentaje debe estar entre 0 y 100')
  }
  return Math.round(total - (total * porcentaje) / 100)
}

/**
 * Pasa a minúsculas y quita tildes, para buscar "audifonos" y encontrar "Audífonos".
 * normalizarTexto('Audífonos') -> "audifonos"
 */
export function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}
