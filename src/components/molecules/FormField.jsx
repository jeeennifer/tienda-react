import { Input } from '../atoms/Input'
import { Label } from '../atoms/Label'

// MOLÉCULA: Label + Input + mensaje de error = "un campo de formulario".
// Cualquier prop extra (name, type, value, onChange, as="textarea"...) pasa al Input.
export function FormField({ id, label, error, ...inputProps }) {
  return (
    <div className="mb-3">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        isInvalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block" role="alert">
          {error}
        </div>
      )}
    </div>
  )
}
