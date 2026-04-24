# proyecto_tareas_gestor
# 📋 Gestor de Tareas Kanban

**Desarrollo Web**

---

## 📌 Descripción

Aplicación web de gestión de tareas basada en el método **Kanban**. Permite organizar el trabajo en tres estados visuales: **Pendientes**, **En Progreso** y **Completadas**. Cada tarea incluye descripción, nivel de prioridad y fecha límite, con indicadores de color para identificarlas rápidamente.

---

## 🚀 Funcionalidades

- ✅ Agregar tareas con descripción, prioridad y fecha límite
- 🔄 Cambiar estado de tarea: Pendiente → En Progreso → Completada
- 🗑️ Eliminar tareas individualmente
- 🔢 Contadores automáticos por columna
- ⚠️ Validación de campos obligatorios en el formulario
- 📱 Diseño responsive para escritorio, tablet y móvil

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de la página |
| CSS3 | Variables, Flexbox, estilos visuales |
| CSS Responsive | Breakpoints para distintos tamaños de pantalla |
| JavaScript Vanilla | Lógica de la aplicación sin frameworks |

---

## 📁 Estructura del proyecto

```
proyecto_tareas_gestor/
├── index.html              ← Estructura principal
├── README.md               ← Este archivo
├── assets/
│   ├── css/
│   │   ├── style.css       ← Estilos principales y variables CSS
│   │   └── responsive.css  ← Diseño adaptable (3 breakpoints)
│   ├── js/
│   │   └── script.js       ← Lógica JavaScript
│   ├── img/
│   │   └── logo.png        ← Logo de la aplicación
│   └── fonts/
└── docs/
    └── uso_ia.md           ← Documentación del uso de IA
```

---

## 🎨 Variables CSS utilizadas

```css
:root {
    --color-primario:   #2563eb;   /* Azul principal */
    --color-secundario: #7c3aed;   /* Morado */
    --color-terciario:  #10b981;   /* Verde */
    --color-pendiente:  #3b82f6;   /* Columna pendientes */
    --color-progreso:   #f59e0b;   /* Columna en progreso */
    --color-completado: #10b981;   /* Columna completadas */
    --fuente-principal: 'Segoe UI', system-ui, sans-serif;
    --tamano-base:      16px;
    --espacio-xs:       0.5rem;
    --espacio-sm:       1rem;
    --espacio-md:       1.5rem;
    --espacio-lg:       2rem;
}
```

---

## ⚙️ Funciones JavaScript

| Función | Descripción |
|---|---|
| `agregarNuevaTarea(e)` | Captura el formulario, valida y crea la tarea |
| `renderizarTareas(estado)` | Dibuja las tarjetas en la columna correspondiente |
| `cambiarEstado(id, estadoAnterior)` | Mueve la tarea a la siguiente columna |
| `eliminarTarea(id)` | Elimina la tarea del arreglo y actualiza la vista |
| `actualizarContadores()` | Actualiza el número de tareas en cada columna |

---

## 💻 Cómo usar

1. Clona o descarga el repositorio
2. Abre `index.html` directamente en tu navegador
3. Completa el formulario con descripción, prioridad y fecha
4. Haz clic en **Agregar Tarea**
5. Usa el botón **→ En Progreso** o **→ Completada** para avanzar
6. Usa el botón **Eliminar** para borrar una tarea

---

## 📥 Instalación

```bash
git clone https://github.com/sidhartaz/proyecto_tareas_gestor.git
cd proyecto_tareas_gestor
```

No requiere instalación adicional. Abre `index.html` en cualquier navegador moderno.

---

## 🤖 Uso de Inteligencia Artificial

Este proyecto fue desarrollado con apoyo del modelo **Claude Sonnet 4.6**. La documentación completa del proceso, prompts utilizados y errores resueltos se encuentra en:

📄 [`docs/uso_ia.md`](docs/uso_ia.md)

---

## 👤 Autor

**Carlos Sepúlveda**  
📧 csepulveda2025@alu.uct.cl  
📚 Desarrollo Web 