import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

// Test de un ÁTOMO: render con props + eventos, sin mocks.
describe('Button', () => {
  it('renderiza el texto recibido', () => {
    render(<Button>Guardar</Button>)

    expect(screen.getByRole('button', { name: 'Guardar' })).toBeInTheDocument()
  })

  it('llama a onClick al hacer clic', async () => {
    // vi.fn() crea una función "espía": registra si la llamaron y cuántas veces
    const onClick = vi.fn()
    const usuario = userEvent.setup()
    render(<Button onClick={onClick}>Guardar</Button>)

    await usuario.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
