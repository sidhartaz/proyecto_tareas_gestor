# Documentación de Uso de Inteligencia Artificial
## Proyecto: Gestor de Tareas Kanban — Evaluación N°2
**Alumno:** Carlos Sepúlveda  
**Correo:** csepulveda2025@alu.uct.cl  
**Asignatura:** Desarrollo Web  
**Modelo de IA utilizado:** Claude Sonnet 4.6 — claude.ai  

---

## 1. Introducción

Durante el desarrollo de este proyecto se utilizó el modelo de lenguaje **Claude Sonnet 4.6** como herramienta de apoyo. La IA fue consultada en distintas etapas del proceso: estructuración del HTML, estilización CSS y depuración de errores en JavaScript. Este documento registra los errores de lógica más relevantes encontrados, los prompts utilizados, las respuestas obtenidas y los ajustes manuales realizados.

---

## 2. Errores de Lógica Encontrados y Resueltos

---

### Error 1 — ReferenceError: función no definida

**Descripción del error:**  
Al intentar enviar el formulario, el navegador arrojaba el siguiente error en la consola:

```
Uncaught ReferenceError: agregarTarea is not defined
    onsubmit http://127.0.0.1:5500/index.html:1
```

**Causa del error:**  
El atributo `onsubmit` del formulario en el HTML llamaba a una función con nombre distinto al definido en el archivo JavaScript. El HTML tenía:

```html
<form id="nuevaTarea" onsubmit="agregarTarea(event)">
```

Mientras que en `script.js` la función se llamaba:

```javascript
function agregarNuevaTarea(e) { ... }
```

El navegador buscaba `agregarTarea` y no la encontraba porque no existía con ese nombre exacto.

**Prompt utilizado:**
> "Uncaught ReferenceError: agregarTarea is not defined onsubmit — por qué no agrega las tareas"

**Respuesta de la IA:**  
La IA identificó que el nombre de la función en el `onsubmit` no coincidía con el nombre definido en el JS, y que además el `id` del formulario era diferente al que el JS intentaba resetear.

**Solución aplicada:**  
Se corrigió el HTML para que el nombre de la función y el id del formulario coincidieran exactamente:

```html
<!-- ANTES (incorrecto) -->
<form id="nuevaTarea" onsubmit="agregarTarea(event)">

<!-- DESPUÉS (correcto) -->
<form id="nuevaTareaFormulario" onsubmit="agregarNuevaTarea(event)">
```

> 📸 **[INSERTAR CAPTURA: Consola del navegador mostrando el ReferenceError]**  
> 📸 **[INSERTAR CAPTURA: Código corregido en VS Code]**

---

### Error 2 — Las funciones no eran accesibles desde el HTML

**Descripción del error:**  
Luego de envolver el código inicial en `DOMContentLoaded`, el formulario dejó de funcionar completamente. La consola mostraba:

```
TypeError: agregarNuevaTarea is not defined
```

**Causa del error:**  
Al colocar todas las funciones dentro del bloque `DOMContentLoaded`, estas quedaban encerradas en un ámbito local (scope) y el atributo `onsubmit` del HTML no podía acceder a ellas, ya que `onsubmit` solo puede llamar funciones del ámbito global.

```javascript
// INCORRECTO — funciones atrapadas adentro
document.addEventListener("DOMContentLoaded", function() {
    function agregarNuevaTarea(e) { ... }  // no accesible desde HTML
});
```

**Prompt utilizado:**
> "TypeError: agregarNuevaTarea is not defined — las funciones están dentro del DOMContentLoaded"

**Respuesta de la IA:**  
La IA explicó el concepto de ámbito (scope) en JavaScript: las funciones declaradas dentro de un bloque no son visibles desde fuera. La solución fue sacar las funciones al ámbito global y dejar solo las llamadas iniciales dentro del evento.

**Solución aplicada:**

```javascript
// CORRECTO — solo las llamadas iniciales adentro
document.addEventListener("DOMContentLoaded", function() {
    renderizarTareas("todo");
    renderizarTareas("doing");
    renderizarTareas("done");
    actualizarContadores();
});

// Funciones en el ámbito global
function agregarNuevaTarea(e) { ... }
function renderizarTareas(estado) { ... }
function cambiarEstado(id, estadoAnterior) { ... }
function eliminarTarea(id) { ... }
function actualizarContadores() { ... }
```

> 📸 **[INSERTAR CAPTURA: Error en consola mostrando TypeError]**  
> 📸 **[INSERTAR CAPTURA: Código corregido con funciones en ámbito global]**

---

### Error 3 — Columnas del tablero quedaban una encima de la otra

**Descripción del error:**  
Las 3 columnas del tablero Kanban no se mostraban lado a lado, sino apiladas verticalmente una encima de la otra.

**Causa del error:**  
El CSS tenía `display: inline` en el contenedor `.kanban`, lo cual no permite distribuir elementos en fila. Además faltaba `min-width: 0` en las columnas, lo que impedía que `flex` funcionara correctamente.

```css
/* INCORRECTO */
#tablero {
    display: inline;
    gap: var(--espacio-sm);
}
```

**Prompt utilizado:**
> "Las columnas quedan una encima de la otra, cómo las pongo lado a lado"

**Respuesta de la IA:**  
La IA explicó que `display: inline` no soporta `gap` ni distribuye elementos en fila. La solución correcta es `display: flex` con `flex-direction: row`.

**Solución aplicada:**

```css
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

> 📸 **[INSERTAR CAPTURA: Tablero con columnas apiladas (antes)]**  
> 📸 **[INSERTAR CAPTURA: Tablero con columnas en fila (después)]**

---

### Error 4 — Tag HTML incorrecto `<spam>` en lugar de `<span>`

**Descripción del error:**  
El contador de tareas en la columna "En Progreso" no se actualizaba y la función `actualizarContadores()` fallaba silenciosamente.

**Causa del error:**  
El tag `<spam>` es incorrecto y no existe en HTML. El navegador no lo reconoce como `<span>`, por lo que el selector CSS `.contador` no aplicaba estilos y el JavaScript no podía encontrar el elemento.

```html
<!-- INCORRECTO -->
<h3>En Progreso <spam class="contador">0</spam></h3>

<!-- CORRECTO -->
<h3>En Progreso <span class="contador">0</span></h3>
```

**Prompt utilizado:**
> "El contador de en-progreso no se actualiza"

**Respuesta de la IA:**  
Al revisar el HTML completo, la IA detectó el error tipográfico `<spam>` y explicó que el navegador no lo interpreta como un elemento válido conocido, por lo que el querySelector no lo encontraba.

**Solución aplicada:**  
Se corrigió el tag a `<span>` en la columna "En Progreso".

> 📸 **[INSERTAR CAPTURA: HTML con el error spam en VS Code]**  
> 📸 **[INSERTAR CAPTURA: HTML corregido con span]**

---

### Error 5 — id del contenedor con mayúscula incorrecta

**Descripción del error:**  
Las tareas completadas nunca aparecían en la tercera columna aunque el JS las procesaba correctamente.

**Causa del error:**  
El `id` del contenedor en el HTML tenía la letra `c` en minúscula (`donecontainer`), pero el JavaScript construía el selector con `C` mayúscula (`doneContainer`). JavaScript distingue entre mayúsculas y minúsculas, por lo que `getElementById("doneContainer")` no encontraba el elemento.

```html
<!-- INCORRECTO -->
<div class="tareas-container" id="donecontainer"></div>

<!-- CORRECTO -->
<div class="tareas-container" id="doneContainer"></div>
```

**Prompt utilizado:**
> "Las tareas completadas no aparecen en la tercera columna"

**Respuesta de la IA:**  
La IA revisó los `id` del HTML y los comparó con los que el JavaScript buscaba mediante `getElementById(estado + "Container")`, detectando la diferencia de mayúscula.

**Solución aplicada:**  
Se corrigió el `id` a `doneContainer` con C mayúscula.

> 📸 **[INSERTAR CAPTURA: HTML con el id incorrecto]**  
> 📸 **[INSERTAR CAPTURA: HTML corregido]**

---

## 3. Ajustes Manuales Realizados

Los siguientes cambios fueron realizados manualmente por el alumno sin asistencia de la IA:

- Personalización del nombre del proyecto a "Flujo de Tarea"
- Ingreso de datos personales en el footer (nombre y correo)
- Ajuste de colores del CSS según preferencia visual
- Organización de la estructura de carpetas del proyecto
- Inicialización del repositorio Git y conexión con GitHub

---

## 4. Reflexión Crítica

El uso de la IA fue de gran utilidad durante el desarrollo, especialmente en la etapa de depuración. Sin embargo, se identificaron las siguientes limitaciones:

**Aspectos positivos:**
- La IA explicó con claridad los conceptos de ámbito (scope) en JavaScript, lo que permitió comprender por qué las funciones no eran accesibles desde el HTML.
- Fue eficiente para detectar errores tipográficos en el HTML como el tag `<spam>` y la diferencia de mayúsculas en los `id`.
- Las explicaciones fueron progresivas y adaptadas al nivel del proyecto.

**Aspectos a mejorar:**
- La IA en ocasiones propuso soluciones que generaban nuevos errores, como encerrar todas las funciones dentro de `DOMContentLoaded`, lo que requirió una corrección posterior.
- Fue necesario revisar manualmente cada sugerencia antes de implementarla, ya que no todas consideraban el contexto completo del proyecto.
- El alumno debió identificar algunos errores por su cuenta antes de poder formular el prompt correcto.

**Conclusión:**  
La IA es una herramienta de apoyo valiosa, pero no reemplaza la comprensión del código. Los errores más importantes fueron resueltos gracias a la combinación entre las sugerencias de la IA y el análisis crítico del alumno.

---

*Documento generado como parte de la Evaluación N°2 — Desarrollo Web 2025*
