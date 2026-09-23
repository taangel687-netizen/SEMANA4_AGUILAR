# 🐠 Acuario Virtual Interactivo

Proyecto de la **Guía Práctica Semana 04** — Desarrollo de Aplicaciones Web (IS093A).
Tema: JavaScript, Manipulación del DOM, Funciones Avanzadas (Closures, IIFE, Arrow),
Canvas API y Animaciones.

## Descripción

Acuario animado en `<canvas>` donde el usuario puede agregar peces, controlar la
animación y ver un panel de rendimiento en vivo. Construido en **JavaScript vanilla**,
sin frameworks ni librerías externas.

## Cómo ejecutar

1. Clona o descarga el repositorio.
2. Abre `index.html` con la extensión **Live Server** de VS Code (clic derecho → "Open with Live Server").
3. No requiere instalación de dependencias ni build (solo HTML + CSS + JS vanilla).

## Conceptos aplicados (Pasos de la guía)

| Paso | Concepto                               | Dónde está en el código                                                                                                   |
| ---- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1    | Setup HTML + Canvas, carga con `defer` | `index.html` (estructura, `<canvas>`, `<script defer>`)                                                                   |
| 2    | IIFE + Closures + Arrow Functions      | `app.js` — módulo `AcuarioState` (IIFE) y `crearPez()` (closure por pez)                                                  |
| 3    | Manipulación DOM + validación          | `app.js` — `querySelector`, `addEventListener`, `classList.toggle()`, validación de email con regex                       |
| 4    | Canvas API + `requestAnimationFrame`   | `app.js` — función `loop()`, uso de `dt` (delta time), `cancelAnimationFrame` en pausa/reset                              |
| 5    | Depuración y optimización              | Panel "Monitor de Rendimiento en Vivo": FPS, memoria aproximada, listeners activos, simulación y limpieza de memory leaks |

### Nota sobre closures (requerida por la guía)

Cada pez se crea con `crearPez()`, una función que declara variables privadas
(`x`, `y`, `vx`, `vy`) y retorna un objeto con métodos (`actualizar`, `dibujar`)
que **cierran sobre** esas variables. Así, cada pez "recuerda" su posición y
velocidad entre un frame de animación y el siguiente sin usar ninguna variable
global — es el patrón de closure aplicado a estado de animación.

## Evidencias

- Capturas de cada paso en VS Code: ver carpeta `/evidencias` (agregar tus propias capturas).
- Capturas de la página funcionando en local: ver carpeta `/evidencias`.
- Repositorio: agrega aquí el enlace a tu GitHub una vez subido.
