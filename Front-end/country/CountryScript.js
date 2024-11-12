
//Completar la tabla con la API
const HTMLTable = document.querySelector(".table-error-msg");

fetch("https://localhost:7137/Pais/All-pais")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((country) => mostrarDatos(country))
  .catch((error) => {
    console.error("Error al consumir la API: ", error);
    HTMLTable.textContent =
      "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
  });

const mostrarDatos = (country) => {
  let body = "";
  for (let i = 0; i < country.length; i++) {
    body += `<tr><td>${country[i].id}</td><td>${country[i].nombre}</td><td>${country[i].gentilicio}</td><td>${country[i].capital}</td></tr>`;
  }

  document.querySelector(".data").innerHTML = body;
};

//Generar el formulario al presionar el botón new country
function mostrarFormulario() {
  if (document.querySelector('.new-form')) {
    return; 
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement('form');
  formulario.setAttribute('action', 'post');
  formulario.classList.add('new-form');
  formulario.innerHTML = `
    <input name="id" type="number" placeholder="id" value="0" class="hidden-input" />
    <label for="country-name">Country</label>
    <input name="nombre" type="text" placeholder="Enter country" id="country-name" />
    <label for="demonym">Demonym</label>
    <input name="gentilicio" type="text" placeholder="Enter demonym" id="demonym" />
    <label for="capital">Capital</label>
    <input name="capital" type="text" placeholder="Enter capital" id="capital" />
    <label for="status">Status</label>
    <input name="estatus" type="text" placeholder="Active or Close" id="status" />
    <button type="submit" class="action-buttons" id="new-button">New Country</button>
  `;

  // Insertar el formulario en el contenedor
  document.getElementById('contenedor-formulario').appendChild(formulario);

  //Obtener datos del formulario generado
const elementoformulario = document.querySelector(".new-form");

elementoformulario.addEventListener("submit", (event) => {
  event.preventDefault(); //Esto evita que el navegador recargue la pagina raro

  const datosform = new FormData(elementoformulario);
  const datos = Object.fromEntries(datosform);
  console.log(datos);

  fetch("https://localhost:7137/Pais/New-pais", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.text();
    })
    .then((TextoRespuesta) => {
      alert(TextoRespuesta);
      location.reload(); //recarga la pagina para que se llene la tabla
    })
    .catch((error) => {
      console.error("Error al enviar los datos a la API: ", error);
    });
});

}




