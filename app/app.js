let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

const container = document.getElementById("taskContainer");
const modal = document.getElementById("modal");
const form = document.getElementById("taskForm");

document.getElementById("btnNueva").onclick = () => abrirModal();
document.getElementById("cerrar").onclick = cerrarModal;

function guardarLocal() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function render() {
  container.innerHTML = "";

  tareas.forEach(t => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <span class="badge ${t.prioridad}">${t.prioridad}</span>
      <h3>${t.titulo}</h3>
      <small>${t.materia} • ${t.fechaEntrega}</small>
      <p>${t.descripcion.substring(0, 80)}...</p>

      <div class="actions-card">
        <button onclick="editar('${t.id}')">✏️</button>
        <button onclick="eliminar('${t.id}')">🗑️</button>
      </div>
    `;

    container.appendChild(card);
  });
}

form.onsubmit = e => {
  e.preventDefault();

  const id = document.getElementById("taskId").value;

  const tarea = {
    id: id || crypto.randomUUID(),
    titulo: titulo.value,
    descripcion: descripcion.value,
    materia: materia.value,
    fechaEntrega: fecha.value,
    prioridad: prioridad.value,
    estado: "Pendiente"
  };

  if (id) {
    tareas = tareas.map(t => t.id === id ? tarea : t);
  } else {
    tareas.push(tarea);
  }

  guardarLocal();
  render();
  cerrarModal();
};

function editar(id) {
  const t = tareas.find(t => t.id === id);

  taskId.value = t.id;
  titulo.value = t.titulo;
  descripcion.value = t.descripcion;
  materia.value = t.materia;
  fecha.value = t.fechaEntrega;
  prioridad.value = t.prioridad;

  abrirModal("Editar tarea");
}

function eliminar(id) {
  if (confirm("¿Eliminar esta tarea?")) {
    tareas = tareas.filter(t => t.id !== id);
    guardarLocal();
    render();
  }
}

function abrirModal(title = "Nueva tarea") {
  document.getElementById("modalTitle").innerText = title;
  modal.classList.remove("hidden");
}

function cerrarModal() {
  form.reset();
  taskId.value = "";
  modal.classList.add("hidden");
}

render();
