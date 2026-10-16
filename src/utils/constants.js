// Constantes compartidas por containers, hooks y componentes.

// Los productos se "sirven" desde public/productos.json (simula una API REST).
// BASE_URL permite que funcione aunque la app se publique en una subcarpeta.
export const URL_PRODUCTOS = `${import.meta.env.BASE_URL}productos.json`

// Regla de negocio: compras desde este monto reciben un descuento.
export const UMBRAL_DESCUENTO = 200000
export const PORCENTAJE_DESCUENTO = 10

// Límites del contador de cantidad (detalle de producto).
export const CANTIDAD_MINIMA = 1
export const CANTIDAD_MAXIMA = 10
