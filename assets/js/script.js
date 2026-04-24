let tareas = [];

document.addEventListener("DOMContentLoaded", function() {
    renderizarTareas("todo");
    renderizarTareas("doing");
    renderizarTareas("done");
    actualizarContadores();
});

function agregarNuevaTarea(e) {
    e.preventDefault();

    let descripcion = document.getElementById("descripcion").value;
    let prioridad = document.getElementById("prioridad").value;
    let fecha = document.getElementById("fecha").value;

    if (!descripcion || !prioridad || !fecha) {
        alert("Por favor completa todos los campos");
        return;
    }

    const nuevaTarea = {
        id: tareas.length + 1,
        descripcion: descripcion,
        prioridad: prioridad,
        fecha: fecha,
        estado: "todo"
    };

    tareas.push(nuevaTarea);
    renderizarTareas("todo");
    actualizarContadores();
    document.getElementById("nuevaTareaFormulario").reset();
}

function renderizarTareas(estado) {
    let tareasFiltradas = tareas.filter(tarea => tarea.estado === estado);
    let tareasHTML = "";

    tareasFiltradas.forEach(tarea => {
        let botonAvanzar = "";

        if (estado === "todo" || estado === "doing") {
            let textoBoton = estado === "todo" ? "→ En Progreso" : "→ Completada";
            botonAvanzar = `<button class="btn-avanzar" onclick="cambiarEstado(${tarea.id}, '${tarea.estado}')">${textoBoton}</button>`;
        }

        tareasHTML += `
            <div class="tarjeta prioridad-${tarea.prioridad}">
                <span class="badge badge-${tarea.prioridad}">${tarea.prioridad}</span>
                <p>${tarea.descripcion}</p>
                <div class="info">Fecha límite: ${tarea.fecha}</div>
                <div class="tarjeta-botones">
                    ${botonAvanzar}
                    <button class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
                </div>
            </div>`;
    });

    document.getElementById(estado + "Container").innerHTML = tareasHTML;
}

function cambiarEstado(id, estadoAnterior) {
    let indice = tareas.findIndex(tarea => tarea.id === id);

    let nuevoEstado;
    if (estadoAnterior === "todo") {
        nuevoEstado = "doing";
    } else if (estadoAnterior === "doing") {
        nuevoEstado = "done";
    }

    tareas[indice].estado = nuevoEstado;
    renderizarTareas(estadoAnterior);
    renderizarTareas(nuevoEstado);
    actualizarContadores();
}

function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    renderizarTareas("todo");
    renderizarTareas("doing");
    renderizarTareas("done");
    actualizarContadores();
}

function actualizarContadores() {
    document.querySelector("#pendientes .contador").textContent =
        tareas.filter(t => t.estado === "todo").length;

    document.querySelector("#en-progreso .contador").textContent =
        tareas.filter(t => t.estado === "doing").length;

    document.querySelector("#completadas .contador").textContent =
        tareas.filter(t => t.estado === "done").length;
}