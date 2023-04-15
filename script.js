// Definimos un array vacío para guardar los personajes
let personajes = [];

// Función que agrega un personaje a la lista
function agregarPersonaje() {
  // Obtenemos los valores de los inputs
  const nombre = document.getElementById("nombre").value;
  const combate = document.getElementById("combate").value;
  const iniciativa = document.getElementById("iniciativa").value;
  const CA = document.getElementById("CA").value;
  // Creamos un objeto con los valores
  const personaje = {
    nombre: nombre,
    combate: combate,
    iniciativa: iniciativa,
    CA: CA
  };

  // Agregamos el objeto al array
  personajes.push(personaje);

  // Limpiamos los inputs
  document.getElementById("nombre").value = "";
  document.getElementById("combate").value = "";
  document.getElementById("iniciativa").value = "";
  document.getElementById("CA").value = "";
  

  // Ordenamos el array por iniciativa de mayor a menor
  personajes.sort((a, b) => b.iniciativa - a.iniciativa);

  // Actualizamos la lista de personajes
  actualizarLista();
}

// Función que actualiza la lista de personajes
function actualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  // Recorremos el array de personajes y creamos un elemento li por cada uno
  personajes.forEach((personaje, index) => {
    const li = document.createElement("li");
    
    li.innerHTML = `
      <span>${personaje.nombre} - Iniciativa: ${personaje.iniciativa} - CA ${personaje.CA} </span>
      <span>
        <button onclick="restarCombate(${index})">-</button>
        Puntos de Golpe:${personaje.combate}
        <button onclick="sumarCombate(${index})">+</button>
      </span>
    <label for="Estado"></label>
    <input type="" placeholder ="Estado" id="Estado" name="Estado">
    <label for="Estado"></label>
    <input type="" placeholder ="PG Temporales" id="Temporal" name="Temporal">
      <button onclick="eliminarPersonaje(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Función que resta puntos de combate a un personaje
function restarCombate(index) {
  // Verificamos que el índice sea válido
  if (index >= 0 && index < personajes.length) {
    // Restamos 1 a los puntos de combate del personaje
    personajes[index].combate--;

    // Actualizamos la lista de personajes
    actualizarLista();
  }
}

// Función que suma puntos de combate a un personaje
function sumarCombate(index) {
  // Verificamos que el índice sea válido
  if (index >= 0 && index < personajes.length) {
    // Sumamos 1 a los puntos de combate del personaje
    personajes[index].combate++;

    // Actualizamos la lista de personajes
    actualizarLista();
  }
}

// Función que elimina un personaje de la lista
function eliminarPersonaje(index) {
  // Verificamos que el índice sea válido
  if (index >= 0 && index < personajes.length) {
    // Eliminamos el personaje del array
    personajes.splice(index, 1);

    // Actualizamos la lista de personajes
    actualizarLista();
  }
}

const cambiarTurnoBtn = document.getElementById("cambiar-turno");
let turnoActual = 0;

function cambiarTurno() {
  const personajes = document.querySelectorAll("li");
  personajes[turnoActual].classList.remove("resaltado");
  turnoActual = (turnoActual + 1) % personajes.length;
  personajes[turnoActual].classList.add("resaltado");
}

cambiarTurnoBtn.addEventListener("click", cambiarTurno);

