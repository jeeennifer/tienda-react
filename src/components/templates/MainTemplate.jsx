// TEMPLATE: el esqueleto de la página con "slots". Estructura pura: sin datos ni lógica.
//   header   -> barra superior (la pone la page)
//   hero     -> banner opcional
//   children -> contenido principal
//   footer   -> pie de página
// El footer queda siempre abajo aunque el contenido sea corto (flex + min-vh-100).
export function MainTemplate({ header, hero, children, footer }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {header}
      <main className="flex-grow-1">
        {hero}
        {children}
      </main>
      {footer}
    </div>
  )
}
