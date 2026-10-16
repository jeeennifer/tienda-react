import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProductsContainer } from './ProductsContainer'
import { URL_PRODUCTOS } from '../utils/constants'

// Los tests NO deben depender de internet ni de public/productos.json:
// reemplazamos fetch por una versión falsa (un "mock") que responde lo que nosotros decidimos.
// Se prueban los tres estados del container: cargando, éxito y error.

const PRODUCTOS_FALSOS = [
  {
    id: 1,
    nombre: 'Notebook',
    descripcion: 'Equipo liviano para estudiar',
    precio: 699990,
    categoria: 'Computación',
    img: '/notebook.jpg',
  },
  {
    id: 2,
    nombre: 'Tablet',
    descripcion: 'Pantalla cómoda para leer',
    precio: 329990,
    categoria: 'Móviles',
    img: '/tablet.jpg',
  },
]

// Las tarjetas usan <Link>, por eso el container se renderiza dentro de un router de prueba.
function renderizarContainer() {
  return render(
    <MemoryRouter>
      <ProductsContainer onAddToCart={() => {}} />
    </MemoryRouter>,
  )
}

afterEach(() => {
  // Devuelve fetch a la normalidad después de cada prueba
  vi.unstubAllGlobals()
})

describe('ProductsContainer', () => {
  it('muestra "Cargando productos..." mientras espera la respuesta', () => {
    // fetch que nunca responde: así la pantalla queda en "cargando"
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))

    renderizarContainer()

    expect(screen.getByText('Cargando productos...')).toBeInTheDocument()
  })

  it('muestra los productos que entrega el fetch, con su precio y la grilla responsiva', async () => {
    // 1. Preparar: fetch falso que responde dos productos
    const fetchFalso = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(PRODUCTOS_FALSOS),
    })
    vi.stubGlobal('fetch', fetchFalso)

    // 2. Actuar
    renderizarContainer()

    // 3. Verificar: findBy... ESPERA a que el elemento aparezca
    expect(await screen.findByRole('heading', { name: 'Notebook' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tablet' })).toBeInTheDocument()
    expect(screen.getByText(/\$\s?699\.990/)).toBeInTheDocument()
    expect(fetchFalso).toHaveBeenCalledWith(URL_PRODUCTOS)

    // Grilla mobile-first: 1 por fila (xs), 2 (md) y 3 (lg)
    const columnas = screen.getAllByTestId('col-producto')
    expect(columnas).toHaveLength(2)
    expect(columnas[0].className).toContain('col-12')
    expect(columnas[0].className).toContain('col-md-6')
    expect(columnas[0].className).toContain('col-lg-4')
  })

  it('muestra un mensaje de error si la API falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))

    renderizarContainer()

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudieron cargar los productos')
  })
})
