import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Configuración de las pruebas (Vitest) — el único framework de testing del proyecto
  test: {
    environment: 'jsdom', // simula un navegador para poder "dibujar" componentes
    globals: true, // permite usar describe, it y expect sin importarlos
    setupFiles: './src/setupTests.js', // se ejecuta antes de todas las pruebas
  },
})
