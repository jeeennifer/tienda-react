# Mi Tienda React

Proyecto base de una **tienda responsiva** para la Evaluación Parcial 2. Une en un solo proyecto los tres ejemplos de la asignatura:

| Ejemplo | Qué se tomó |
|---|---|
| `mi-primer-test` | Funciones de cálculo (`calcularTotal`, `aplicarDescuento`), patrón de **Contador** y la configuración mínima de Vitest |
| `sitio-vitest` | `formatearPrecio`, el **mock de `fetch`** (`vi.stubGlobal`), formulario con validación y tests con `userEvent` |
| Código de la tienda (texto) | `NavBar`, `Hero`, `CardProducto`, grilla `xs/md/lg`, `Footer` y los estilos mobile-first |

**Stack obligatorio:** React + Vite · Vitest · Atomic Design · patrón Container/Presentational · Git/GitHub.
Además: React Router (navegación real) y React Bootstrap (diseño responsivo mobile-first).

---

## 1. Cómo levantarlo

Requisito: **Node.js 20.19 o superior** (revisa con `node -v`).

```bash
npm install        # descarga las librerías (solo la primera vez)
npm run dev        # abre la tienda en http://localhost:5173
npm test           # ejecuta los tests y se queda vigilando cambios (q para salir)
```

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias de `package.json` |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm test` | Vitest en modo vigilancia: re-ejecuta al guardar un archivo |
| `npm run test:run` | Ejecuta todos los tests **una sola vez** y termina |
| `npm test -- Button` | Ejecuta solo los archivos de test cuyo nombre contiene "Button" |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción para probarla |
| `npm run lint` | Revisa el código con oxlint |

> **Solo se usa Vitest.** No hay Jasmine ni Karma en el proyecto.

---

## 2. Estructura de carpetas

```
src/
├── components/
│   ├── atoms/          Button · Input · Label · Badge · Price         (+ Button.test.jsx)
│   ├── molecules/      SearchForm · FormField · QuantityCounter · CartItem
│   ├── organisms/      Header · Hero · ProductCard · ProductGrid · ProductDetail
│   │                   CartList · ContactForm · NotFound · Footer
│   ├── templates/      MainTemplate        (esqueleto con slots: header, hero, children, footer)
│   └── pages/          HomePage · ProductDetailPage · CartPage · ContactPage · NotFoundPage
├── containers/         ProductsContainer · ProductDetailContainer · ContactContainer
│                       (+ ProductsContainer.test.jsx, con fetch simulado)
├── hooks/              useCart · useCounter                           (+ useCart.test.js)
├── utils/              format.js · constants.js                       (+ format.test.js)
├── App.jsx             tabla de rutas y estado del carrito
├── main.jsx            punto de entrada (BrowserRouter + CSS de Bootstrap)
├── setupTests.js       carga jest-dom para Vitest
└── index.css           estilos propios, mobile-first
public/
└── productos.json      "API" de productos que consume el fetch
```

**Reglas de carpeta:** un archivo = un componente · la carpeta indica el nivel · el test vive junto al componente (`Button.jsx` y `Button.test.jsx`).

---

## 3. Arquitectura

### Atomic Design (5 niveles)

| Nivel | Qué es | Ejemplos aquí | ¿Puede tener estado? |
|---|---|---|---|
| **Átomos** | Pieza mínima con sentido propio | `Button`, `Input`, `Badge`, `Price` | No (solo visual) |
| **Moléculas** | Pocos átomos con una sola función | `SearchForm` (Input + Button), `FormField` (Label + Input + error), `QuantityCounter` | A lo sumo, estado de UI (texto del input) |
| **Organismos** | Sección completa y reconocible | `Header`, `ProductCard`, `ProductGrid`, `Footer` | Presentacionales: reciben todo por props |
| **Templates** | Esqueleto de la página, sin datos | `MainTemplate` | No |
| **Pages** | Template instanciado con datos reales | `HomePage`, `ProductDetailPage` | Aquí se conectan los containers |

**Regla de oro: las importaciones fluyen en una sola dirección** — `pages → templates → organisms → molecules → atoms`. Un átomo nunca importa una molécula; una molécula nunca importa un organismo. Un átomo que importa `react-router-dom` o hace `fetch` ya no es un átomo. (Los organismos sí pueden componerse entre sí, como `ProductGrid` = `ProductCard` × n.)

### Container / Presentational

| Container (el que piensa) | Presentacional (el que se muestra) |
|---|---|
| Hace `fetch`, maneja estado y efectos | Recibe datos por props y avisa con callbacks |
| Casi no tiene markup, ni clases, ni textos | No sabe de dónde vienen los datos |
| `ProductsContainer` → `ProductGrid` | Se prueba con datos inventados, sin red |
| `ProductDetailContainer` → `ProductDetail` | |
| `ContactContainer` → `ContactForm` | |

La lógica reutilizable (sin JSX) vive en **hooks**: `useCart` (carrito con totales y descuento) y `useCounter` (patrón de contador con mínimo y máximo).

### Rutas (React Router)

| Ruta | Page | Contenido |
|---|---|---|
| `/` | `HomePage` | Hero + listado de productos con buscador |
| `/producto/:id` | `ProductDetailPage` | Detalle, contador de cantidad y botón "Agregar al carrito" |
| `/carrito` | `CartPage` | Productos, cantidades, subtotal, descuento y total |
| `/contacto` | `ContactPage` | Formulario con validación |
| `*` | `NotFoundPage` | Página 404 |

No se usa navegación por anclas (`href="#inicio"`): todos los enlaces son rutas reales (`Link` / `NavLink`).
El carrito vive en `App.jsx` (`useCart`) para conservarse al cambiar de página.

### Lógica de la tienda

`src/utils/format.js` — funciones puras:

| Función | Ejemplo |
|---|---|
| `formatearPrecio(1990)` | `"$1.990"` |
| `calcularTotal([{ precio: 1990, cantidad: 2 }])` | `3980` (lanza error si una cantidad es negativa) |
| `aplicarDescuento(10000, 15)` | `8500` (lanza error si el porcentaje no está entre 0 y 100) |

Regla de negocio (en `utils/constants.js`): compras desde **$200.000** reciben **10 %** de descuento.

---

## 4. Tests con Vitest

Hay **10 tests** en total (el enunciado pide un máximo de 8 a 10), repartidos por nivel con la estrategia adecuada:

| Archivo | Tests | Estrategia |
|---|---|---|
| `atoms/Button.test.jsx` | 2 | Átomo: render con props + evento (`vi.fn()` y `userEvent`) |
| `utils/format.test.js` | 3 | Funciones puras: caso normal, límite y error |
| `hooks/useCart.test.js` | 2 | Hook con `renderHook` y `act`: acumula cantidades, descuento, quitar al llegar a 0 |
| `containers/ProductsContainer.test.jsx` | 3 | Container con **`fetch` simulado** (`vi.stubGlobal`): cargando, éxito y error |

Cada test sigue **Preparar → Actuar → Verificar** y busca elementos como lo haría una persona (`getByRole`, `getByText`).
Los tests no dependen de internet ni de `productos.json`: el `fetch` es falso y responde lo que el test decide.

La configuración está en `vite.config.js` (sección `test`: `jsdom`, `globals`, `setupFiles`) y `src/setupTests.js`.

<details>
<summary>Ideas para ampliar los tests (si la profesora lo permite)</summary>

- `ProductCard`: muestra nombre, precio y llama a `onAddToCart` al hacer clic.
- `QuantityCounter`: deshabilita "−" en el mínimo y "+" en el máximo.
- `useCounter`: respeta mínimo y máximo.
- `ContactForm`: muestra errores si se envía vacío y llama a `onSubmit` si es válido.
- `ProductsContainer`: filtra productos al buscar (`userEvent.type` en el buscador).

</details>

---

## 5. Diseño responsivo (mobile-first)

- `index.html` incluye `<meta name="viewport" content="width=device-width, initial-scale=1" />`.
- Jerarquía **Container → Row → Col** en todas las secciones.
- Listado de productos: `xs={12} md={6} lg={4}` → 1, 2 y 3 tarjetas por fila.
- `Navbar expand="lg" collapseOnSelect`: se pliega en menú hamburguesa bajo 992 px.
- Imágenes fluidas (`fluid`), títulos con `clamp()` y botones de ~44 px para el dedo.
- Estilos propios con `min-width` (la base es la versión móvil).

**Checklist de verificación** (DevTools: `F12` → modo dispositivo `Ctrl + Shift + M`), en **360×740**, **768×1024** y **1440×900**:

- [ ] No hay barra de desplazamiento horizontal.
- [ ] El menú colapsa en hamburguesa y se puede abrir.
- [ ] Las imágenes no desbordan su columna.
- [ ] Botones y enlaces son cómodos para el dedo.
- [ ] Ningún contenido esencial desaparece en pantallas chicas.

---

## 6. Convenciones de Git

El historial del repositorio es parte de la evaluación: **debe evidenciar el aporte individual de cada integrante** (equipos de máximo 3).

### Ramas

- `main` es la rama estable: **no se hacen commits directos**, solo por Pull Request.
- **Una rama por funcionalidad**, con el nombre `tipo/descripcion-corta` en minúsculas y con guiones:

| Prefijo | Para | Ejemplo |
|---|---|---|
| `feature/` | Funcionalidad nueva | `feature/atoms-button`, `feature/products-container` |
| `fix/` | Corregir un error | `fix/navbar-colapso-movil` |
| `test/` | Agregar o ajustar tests | `test/use-cart` |
| `refactor/` | Reordenar código sin cambiar su comportamiento | `refactor/user-card-container` |
| `docs/` | Documentación | `docs/readme-git` |

### Commits

Pequeños y descriptivos: el mensaje explica **qué** cambió y **por qué**. Formato:

```
tipo(alcance): resumen en infinitivo o presente, en minúscula y sin punto final
```

- **Tipos:** `feat`, `fix`, `test`, `refactor`, `style`, `docs`, `chore`.
- **Alcance** (opcional): el nivel o carpeta — `atoms`, `molecules`, `organisms`, `templates`, `pages`, `containers`, `hooks`, `utils`, `router`, `config`.

```
feat(atoms): agrega Button con variantes de Bootstrap
feat(containers): carga productos con fetch y maneja estados de error
test(hooks): prueba que useCart acumula cantidades
fix(organisms): corrige el colapso del Navbar en pantallas chicas
docs: agrega las convenciones de Git al README
```

Cada integrante **commitea lo suyo con su propio usuario**:

```bash
git config user.name "Tu Nombre"
git config user.email "tu-correo@ejemplo.cl"
```

No se suben `node_modules/` ni `dist/` (ya están en `.gitignore`).

### Flujo de trabajo

```bash
git switch main && git pull                  # 1. partir de main actualizado
git switch -c feature/atoms-button           # 2. crear tu rama
git add src/components/atoms                 # 3. agregar solo lo tuyo
git commit -m "feat(atoms): agrega Button"   # 4. commits pequeños
git push -u origin feature/atoms-button      # 5. subir la rama
# 6. abrir el Pull Request en GitHub → un compañero lo revisa → merge a main
git switch main && git pull                  # 7. volver a main y actualizar
```

### Checklist antes de abrir un Pull Request

- [ ] ¿En qué nivel atómico vive el componente? ¿Importa solo niveles inferiores?
- [ ] ¿Quién piensa y quién se muestra? ¿El presentacional solo usa props?
- [ ] ¿Es responsivo y reutilizable?
- [ ] ¿Su test está a su lado y `npm run test:run` termina en verde?
- [ ] ¿Verifiqué la interfaz en móvil, tablet y escritorio?
- [ ] ¿Mis commits son propios y descriptivos? ¿Puedo explicar mi código?

---

## 7. Errores frecuentes

| Lo que ves | Qué significa | Cómo arreglarlo |
|---|---|---|
| `document is not defined` | Falta el navegador simulado | Revisa `environment: 'jsdom'` en `vite.config.js` |
| `Invalid Chai property: toBeInTheDocument` | No se cargó `setupTests.js` | Revisa `setupFiles` en `vite.config.js` |
| `Failed to resolve import` | Ruta o mayúsculas incorrectas en un import | Revisa la carpeta, el nombre y el `./` inicial |
| `Unable to find ...` justo después de un clic | Falta `await` en la acción | Test `async` y `await` en cada acción de `userEvent` |
| Las imágenes no cargan | Las fotos vienen de `picsum.photos` | Necesitan internet; el resto de la tienda funciona sin conexión |
