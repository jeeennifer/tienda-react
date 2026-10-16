import { useState } from 'react'
import { Alert, Col, Container, Form, Row } from 'react-bootstrap'
import { Button } from '../atoms/Button'
import { FormField } from '../molecules/FormField'

const VALORES_INICIALES = { nombre: '', email: '', mensaje: '' }

// Validación simple del formulario: devuelve un objeto { campo: 'mensaje de error' }.
function validar({ nombre, email, mensaje }) {
  const errores = {}
  if (nombre.trim() === '') errores.nombre = 'El nombre es obligatorio'
  if (!email.includes('@')) errores.email = 'El correo no es válido'
  if (mensaje.trim() === '') errores.mensaje = 'El mensaje es obligatorio'
  return errores
}

// ORGANISMO: formulario de contacto = FormField × 3 + Button.
// Guarda solo estado de UI (valores y errores); al enviar avisa con onSubmit(datos).
export function ContactForm({ onSubmit, enviado = false, nombreEnviado = '' }) {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})

  function handleChange(evento) {
    const { name, value } = evento.target
    setValores((anteriores) => ({ ...anteriores, [name]: value }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    const nuevosErrores = validar(valores)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) {
      onSubmit(valores)
    }
  }

  return (
    <Container className="py-5">
      <Row>
        <Col xs={12} lg={6} className="mx-auto">
          <h1 className="fw-bold mb-4">Contacto</h1>

          {enviado ? (
            <Alert variant="success" role="status">
              ¡Gracias, {nombreEnviado}! Te responderemos pronto.
            </Alert>
          ) : (
            <Form noValidate onSubmit={handleSubmit}>
              <FormField
                id="nombre"
                name="nombre"
                label="Nombre"
                value={valores.nombre}
                onChange={handleChange}
                error={errores.nombre}
              />
              <FormField
                id="email"
                name="email"
                type="email"
                label="Correo"
                value={valores.email}
                onChange={handleChange}
                error={errores.email}
              />
              <FormField
                id="mensaje"
                name="mensaje"
                as="textarea"
                rows={4}
                label="Mensaje"
                value={valores.mensaje}
                onChange={handleChange}
                error={errores.mensaje}
              />
              <Button type="submit" className="w-100">
                Enviar
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  )
}
