import { Form } from 'react-bootstrap'

// ÁTOMO: etiqueta de un campo. Usa htmlFor para enlazarse con el id del Input.
export function Label({ children, ...props }) {
  return <Form.Label {...props}>{children}</Form.Label>
}
