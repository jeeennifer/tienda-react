import { Button } from '../atoms/Button'

// MOLÉCULA: patrón de Contador visual  [ − ]  3  [ + ]
// No guarda el valor: lo recibe y avisa con onIncrement / onDecrement (ver hooks/useCounter).
export function QuantityCounter({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max = 99,
  label = 'Cantidad',
}) {
  return (
    <div className="d-inline-flex align-items-center gap-2" role="group" aria-label={label}>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={onDecrement}
        disabled={value <= min}
        aria-label="Disminuir cantidad"
      >
        −
      </Button>
      <output className="fw-bold px-2" aria-live="polite">
        {value}
      </output>
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={onIncrement}
        disabled={value >= max}
        aria-label="Aumentar cantidad"
      >
        +
      </Button>
    </div>
  )
}
