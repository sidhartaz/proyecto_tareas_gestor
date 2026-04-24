# Documentación de Uso de Inteligencia Artificial
## Proyecto: Gestor de Tareas Kanban — Evaluación N°2
**Alumno:** Carlos Sepúlveda  
**Correo:** csepulveda2025@alu.uct.cl  
**Asignatura:** Desarrollo Web  
**Modelo de IA utilizado:** Claude Sonnet 4.6 — claude.ai  

---

## 1. Introducción

Durante el desarrollo de este proyecto se utilizó el modelo de lenguaje **Claude Sonnet 4.6** como herramienta de apoyo. La IA fue consultada en distintas etapas del proceso: estructuración del HTML, estilización CSS y depuración de errores en JavaScript. Este documento registra los prompts reales utilizados, las respuestas obtenidas y los ajustes manuales realizados.

---

## 2. Errores de Lógica Encontrados y Resueltos

---

### Error 1 — Las tareas no se agregaban al tablero

**Prompt utilizado:**
> "no puedo agregar las tereas cual puede ser mi error explicame "

**Respuesta de la IA:**

La IA identificó que las 3 llamadas iniciales a `renderizarTareas` se ejecutaban antes de que el HTML estuviera cargado. La solución fue envolverlas en `DOMContentLoaded`:

```javascript
// ANTES — se ejecutaba antes de que el HTML estuviera listo
let tareas = [];
renderizarTareas("todo");
renderizarTareas("doing");
renderizarTareas("done");

// DESPUÉS — espera que el HTML cargue primero
let tareas = [];
document.addEventListener("DOMContentLoaded", function() {
    renderizarTareas("todo");
    renderizarTareas("doing");
    renderizarTareas("done");
    actualizarContadores();
});
---

### Error 2 — ReferenceError: función no definida

**Prompt utilizado:**
> "el script presenta un error explicame como solucinarlo"

**Error que aparecía en consola:**
```
Uncaught ReferenceError: agregarNuevaTarea is not defined
TypeError: "x" is (not) "y"
```

**Respuesta de la IA:**

La IA explicó que al poner todas las funciones dentro de `DOMContentLoaded`, estas quedaban encerradas en un ámbito local y el atributo `onsubmit` del HTML no podía acceder a ellas. La solución fue sacar las funciones afuera:

```javascript
// INCORRECTO — funciones atrapadas adentro, HTML no las ve
document.addEventListener("DOMContentLoaded", function() {
    function agregarNuevaTarea(e) { ... }
});

// CORRECTO — solo las llamadas iniciales adentro
document.addEventListener("DOMContentLoaded", function() {
    renderizarTareas("todo");
    renderizarTareas("doing");
    renderizarTareas("done");
    actualizarContadores();
});

// Funciones en el ámbito global, accesibles desde el HTML
function agregarNuevaTarea(e) { ... }
function renderizarTareas(estado) { ... }
function cambiarEstado(id, estadoAnterior) { ... }
function eliminarTarea(id) { ... }
function actualizarContadores() { ... }
```


---

### Error 3 — Columnas del tablero quedaban una encima de la otra

**Prompt utilizado:**
> "columnas apiladas verticalmente cual es el error explicame como solucionarlo"

**Respuesta de la IA:**

La IA identificó que el CSS tenía `display: inline` en lugar de `display: flex`. Además faltaba `flex-direction: row` y `min-width: 0` en las columnas:

```css
/* INCORRECTO */
#tablero {
    display: inline;
    gap: var(--espacio-sm);
}

/* CORRECTO */
.kanban {
    display: flex;
    flex-direction: row;
    gap: var(--espacio-sm);
    align-items: flex-start;
}

.columna {
    flex: 1;
    min-width: 0;
}
```
---

### Error 4 — Imagen del logo aparecía arriba en lugar de al lado del título

**Prompt utilizado:**
> "la imagen no se visualiza que error tiene mi codigo"

**Respuesta de la IA:**

La IA identificó que el `<img>` estaba dentro del `<head>` del HTML en lugar de dentro del `<div class="logo">`. El `<head>` es solo para configuración, las imágenes siempre van dentro del `<body>`:

```html
<!-- INCORRECTO — imagen dentro del head -->
<head>
    <link rel="stylesheet" href="assets/css/style.css">
    <img src="assets/img/Sin título.png" alt="Logo" class="logo-img">
</head>

<!-- CORRECTO — imagen dentro del logo en el header -->
<header>
    <div class="logo">
        <img src="assets/img/Sin título.png" alt="Logo" class="logo-img">
        <h1>Flujo de Tarea</h1>
    </div>
    <nav>...</nav>
</header>
```
---

### Error 5 — Tag `<spam>` en lugar de `<span>`

**Prompt utilizado:**
> (detectado durante revisión del HTML completo por la IA)

**Respuesta de la IA:**

Al revisar el HTML completo, la IA detectó un error tipográfico en la columna "En Progreso". El tag `<spam>` no existe en HTML, por lo que el contador no se actualizaba:

```html
<!-- INCORRECTO -->
<h3>En Progreso <spam class="contador">0</spam></h3>

<!-- CORRECTO -->
<h3>En Progreso <span class="contador">0</span></h3>
```
---

## 3. Reflexión Crítica

**Aspectos positivos:**
- La IA explicó con claridad los conceptos de ámbito (scope) en JavaScript, permitiendo entender por qué las funciones no eran accesibles desde el HTML.
- Fue útil para detectar errores tipográficos como `<spam>` y problemas de ubicación de elementos HTML.
- Las explicaciones comparaban siempre el código incorrecto con el correcto, lo que facilitó la comprensión.

**Aspectos a mejorar:**
- La IA propuso usar `DOMContentLoaded` encerrando todas las funciones adentro, lo que generó un nuevo error que requirió corrección posterior.
- Algunas soluciones debieron ajustarse manualmente ya que no consideraban el contexto exacto del proyecto.
- Fue necesario reformular los prompts varias veces para obtener la respuesta correcta.

**Conclusión:**  
La IA fue una herramienta de apoyo valiosa durante el desarrollo, pero no reemplaza la comprensión del código. Los errores más importantes fueron resueltos combinando las sugerencias de la IA con el análisis propio del alumno.

---