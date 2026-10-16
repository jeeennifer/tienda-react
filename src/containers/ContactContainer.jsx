import { useState } from 'react'
import { ContactForm } from '../components/organisms/ContactForm'

// CONTAINER del formulario de contacto: decide qué hacer con los datos enviados.
export function ContactContainer() {
  const [datosEnviados, setDatosEnviados] = useState(null)

  function handleSubmit(datos) {
    // En el proyecto semestral aquí irá el POST al backend vía REST.
    setDatosEnviados(datos)
  }

  return (
    <ContactForm
      onSubmit={handleSubmit}
      enviado={datosEnviados !== null}
      nombreEnviado={datosEnviados?.nombre ?? ''}
    />
  )
}
