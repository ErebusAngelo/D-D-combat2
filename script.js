
// Definimos un array vacío para guardar los personajes
let personajes = [];

// Función que agrega un personaje a la lista
function agregarPersonaje() {
  // Obtenemos los valores de los inputs
  const nombre = document.getElementById("nombre").value;
  let combate = document.getElementById("combate").value;
  let iniciativa = document.getElementById("iniciativa").value;
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
      <span>${personaje.nombre} - Iniciativa <input type="number" id="ini" min="0" value="${personaje.iniciativa}" onchange="modificarAtributo(${index}, 'iniciativa', event.target.value)"> - CA: ${personaje.CA} </span>
      <span>
        <button onclick="modificarPG(${index}, -1)">-</button>
        Puntos de Golpe: ${personaje.combate}
        <button onclick="modificarPG(${index}, 1)">+</button>
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

// Función que modifica los puntos de golpe de un personaje en el array y actualiza la lista
function modificarPG(index, cantidad) {
  // Obtenemos el valor actual de los puntos de golpe del personaje
  let pgActual = parseInt(personajes[index].combate);

  // Actualizamos el valor de los puntos de golpe
  pgActual += cantidad;

  // Verificamos que los puntos de golpe no sean negativos
  if (pgActual < 0) {
    pgActual = 0;
  }

  // Actualizamos los puntos de golpe del personaje en el array
  personajes[index].combate = pgActual.toString();

  // Actualizamos la lista de personajes
  actualizarLista();
}
// Función que modifica un atributo de un personaje en el array y actualiza la lista
function modificarAtributo(index, atributo, valor) {
  // Actualizamos el valor del atributo
  personajes[index][atributo] = valor;

  // Ordenamos el array por iniciativa de mayor a menor
  personajes.sort((a, b) => b.iniciativa - a.iniciativa);

  // Actualizamos la lista de personajes
  actualizarLista();
}

// Función que maneja el evento de presionar el botón "-" para disminuir los puntos de golpe
function restarPuntosDeGolpe(index) {
  const personaje = personajes[index];
  if (personaje.combate > 0) {
    personaje.combate--;
    actualizarLista();
  }
}

// Función que maneja el evento de presionar el botón "+" para aumentar los puntos de golpe
function sumarPuntosDeGolpe(index) {
  const personaje = personajes[index];
  personaje.combate++;
  actualizarLista();
}

// Función que elimina un personaje del array y actualiza la lista
function eliminarPersonaje(index) {
  // Eliminamos el personaje del array
  personajes.splice(index, 1);

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
      <span>${personaje.nombre} - Iniciativa <input type="number" id="ini" min="0" value="${personaje.iniciativa}" onchange="modificarAtributo(${index}, 'iniciativa', event.target.value)"> - CA: ${personaje.CA} </span>
      <span>
        <button onclick="restarPuntosDeGolpe(${index})">-</button>
        Puntos de Golpe: ${personaje.combate}
        <button onclick="sumarPuntosDeGolpe(${index})">+</button>
      </span>
      <label for="Estado"></label>
      <input type="" placeholder ="Estado" id="Estado" name="Estado">
      <label for="Temporal"></label>
      <input type="" placeholder ="PG Temporales" id="Temporal" name="Temporal">
      <button onclick="eliminarPersonaje(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
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

