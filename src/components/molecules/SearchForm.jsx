import { useState } from 'react'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'

// MOLÉCULA: Input + Button = "buscar".
// Su único estado es el texto del input (estado de UI); avisa hacia afuera con onSearch.
export function SearchForm({ onSearch, placeholder = 'Buscar productos...' }) {
  const [q, setQ] = useState('')

  function handleSubmit(evento) {
    evento.preventDefault()
    onSearch(q.trim())
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="d-flex gap-2">
      <Input
        type="search"
        value={q}
        onChange={(evento) => setQ(evento.target.value)}
        placeholder={placeholder}
        aria-label="Buscar productos"
      />
      <Button type="submit" variant="outline-primary">
        Buscar
      </Button>
    </form>
  )
}
