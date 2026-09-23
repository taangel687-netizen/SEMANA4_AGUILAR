# 🛸 Space Mission Control — Semana 4

**Asignatura:** Desarrollo de Aplicaciones Web (IS093A)  
**Universidad Nacional del Centro del Perú**  
**Facultad de Ingeniería de Sistemas**  
**Departamento Académico de Ingeniería de Sistemas**  
**Programa de Ingeniería de Sistemas**

---

## 📋 Descripción del Proyecto

**Space Mission Control** es una aplicación web tipo _dashboard_ que simula un panel de control de una misión espacial. Fue desarrollada como parte de la **Guía Práctica Semana 4** de la asignatura, aplicando los 5 temas exigidos:

1. Setup HTML + UI con Canvas y Controles
2. IIFE + Closures + Arrow Functions
3. Manipulación DOM + Validación de Inputs
4. Canvas API + requestAnimationFrame + Delta Time
5. Monitor de Rendimiento en Vivo

Todo el desarrollo es **Vanilla JS/TS puro**, sin frameworks ni librerías externas (no React, no Vue, no jQuery, no Bootstrap).

---

## 🎯 Aplicación de las 5 Fases de la Guía

### 🧩 FASE 1 — Setup HTML + UI con Canvas y Controles

**Módulo 01: Identificación del Operador**

| Concepto clave             | Aplicación en el proyecto                                              |
| -------------------------- | ---------------------------------------------------------------------- |
| Integración JS con `defer` | `<script src="app.js" defer></script>` al final del body               |
| Estructura DOM             | Sidebar, navbar, 5 secciones `<section class="fase">`                  |
| Elemento `<canvas>`        | `<canvas id="canvasFase1">` de 600x250 px                              |
| Controles interactivos     | Inputs de nombre/misión, slider de velocidad, botones Play/Pause/Reset |
| Sin frameworks             | 100% Vanilla JS                                                        |

**Evidencia:** El canvas dibuja en tiempo real la **credencial del operador** con su nombre, misión, velocidad y un indicador animado con forma de anillo cuando está activo.

---

### 🧩 FASE 2 — IIFE + Closures + Arrow Functions

**Módulo 02: Telemetría de la Misión**

| Concepto clave  | Aplicación en el proyecto                                                                           |
| --------------- | --------------------------------------------------------------------------------------------------- |
| IIFE            | Todo el `app.js` está dentro de `(function(){ 'use strict'; ... })();`                              |
| Closures        | La función `crearTelemetria()` retiene `frames`, `comandos`, `energia`, `temperatura` e `historial` |
| Arrow Functions | Todos los handlers: `btnComando.addEventListener('click', () => {...})`                             |
| Scope aislado   | Las variables del closure **no son globales** (verificable en DevTools)                             |

**Evidencia:** Los contadores de frames y comandos suben en vivo. La energía disminuye. En la consola de DevTools, escribir `frames` da error → demuestra que el closure protege el estado.

---

### 🧩 FASE 3 — Manipulación DOM + Validación

**Módulo 03: Control de Sistemas**

| Concepto clave                       | Aplicación en el proyecto                                                 |
| ------------------------------------ | ------------------------------------------------------------------------- |
| `querySelector` / `querySelectorAll` | Selección de tarjetas de sistemas (motor, escudos, comunicaciones, armas) |
| `addEventListener`                   | Cada botón toggle tiene su listener                                       |
| `classList.toggle()`                 | En lugar de `style` inline → evita reflows innecesarios                   |
| Variables CSS                        | Estado activo se controla con `--success` en `:root`                      |
| Validación de inputs                 | Email con regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`                            |
| Validación de código                 | Exactamente 6 dígitos con `/^\d{6}$/`                                     |
| Botón condicional                    | "Acceder" se habilita solo si ambos campos son válidos                    |

**Evidencia:** Las tarjetas se iluminan en verde sin usar estilos inline. Los mensajes de validación cambian de color según el input.

---

### 🧩 FASE 4 — Canvas API + requestAnimationFrame

**Módulo 04: Radar de Asteroides**

| Concepto clave             | Aplicación en el proyecto                                  |
| -------------------------- | ---------------------------------------------------------- |
| Contexto 2D                | `canvas.getContext('2d')`                                  |
| `requestAnimationFrame`    | Loop de animación (prohibido `setInterval`)                |
| Delta time (dt)            | `const dt = (timestamp - ultimoTiempo) / 1000`             |
| Movimiento uniforme        | Velocidad multiplicada por `dt` → independiente de FPS     |
| Dibujo básico              | `arc()`, `fillRect()`, `stroke()`, `createConicGradient()` |
| Sincronización con display | RAF se sincroniza con el refresh del monitor               |

**Evidencia:** Los asteroides se mueven y rotan; el radar barre en círculo. Al cambiar el zoom del navegador, la velocidad se mantiene constante gracias al delta time.

---

### 🧩 FASE 5 — Monitor de Rendimiento en Vivo

**Módulo 05: Monitor de Rendimiento**

| Concepto clave         | Aplicación en el proyecto                              |
| ---------------------- | ------------------------------------------------------ |
| FPS counter            | Contador con `requestAnimationFrame` en vivo           |
| Gráfico de FPS         | Historial de los últimos 60 segundos en canvas         |
| `performance.memory`   | Heap usado en MB y % del límite                        |
| Listeners activos      | `document.querySelectorAll('*').length`                |
| Detección de leaks     | Simulación con array de 5000 objetos retenidos         |
| `cancelAnimationFrame` | Liberación de recursos al detener animaciones          |
| Estado de salud        | Badge dinámico: ✅ SALUDABLE / ⚠ MODERADO / 🔴 CRÍTICO |

**Evidencia:** El monitor muestra FPS, memoria, listeners y leaks en vivo. Los botones de simular/limpiar memoria alteran las métricas visiblemente.

---

## 🗂️ Estructura del Proyecto
