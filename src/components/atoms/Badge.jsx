import { Badge as BsBadge } from 'react-bootstrap'

// ÁTOMO: etiqueta pequeña (categoría, contador del carrito, estado...).
export function Badge({ children, bg = 'secondary', ...props }) {
  return (
    <BsBadge bg={bg} {...props}>
      {children}
    </BsBadge>
  )
}
