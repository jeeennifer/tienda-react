import { Form } from 'react-bootstrap'

// ÁTOMO: campo de texto. Todas las props (value, onChange, type...) llegan desde afuera.
export function Input(props) {
  return <Form.Control {...props} />
}
