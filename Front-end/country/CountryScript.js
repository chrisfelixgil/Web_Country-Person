//Completar la tabla con la API
allCountry();

function allCountry() {
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
}

//Barra de busqueda
function searchCountry() {
  const HTMLTabla = document.querySelector(".table-error-msg");
  const searchBar = document.querySelector(".search-bar");

  searchBar.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que el navegador recargue la página

    const datosform = new FormData(searchBar);
    const datos = Object.fromEntries(datosform);
    const name = datos.nombre;

    // Verificar si 'name' está vacío llamar a 'allCountry' si es necesario
    if (!name) {
      allCountry();
      return;
    }

    console.log(name);

    fetch(`https://localhost:7137/Pais/search-pais?pais=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((country) => {
        console.log(country);
        mostrarDatos(country);
      })
      .catch((error) => {
        console.error("Error al consumir la API: ", error);
        HTMLTabla.textContent =
          "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
      });
  });

  // Define la función mostrarDatos fuera del evento submit
  const mostrarDatos = (country) => {
    let body = `<tr><td>${country.id}</td><td>${country.nombre}</td><td>${country.gentilicio}</td><td>${country.capital}</td></tr>`;

    document.querySelector(".data").innerHTML = body;
  };
}


//Botón ocultar formulario
function ocultarFormulario() {
  const contenedorFormulario = document.getElementById("contenedor-formulario");
  if (contenedorFormulario.firstChild) {
    contenedorFormulario.innerHTML = ""; // Borra el contenido del div
  }
}


//Generar el formulario al presionar el botón new country
function mostrarFormulario() {
  const contenedorFormulario = document.getElementById("contenedor-formulario");

  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement("form");
  formulario.setAttribute("action", "post");
  formulario.classList.add("new-form");
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
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
    
  `;
    
  // Insertar el formulario en el contenedor
  contenedorFormulario.appendChild(formulario);

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

//Generar el formulario al presionar el botón update country y actualizar una country
function updateCountry() {
  const contenedorFormulario = document.getElementById("contenedor-formulario");

  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement("form");
  formulario.setAttribute("action", "post");
  formulario.classList.add("new-form");
  formulario.innerHTML = `
    <label for="id">ID Number</label>
    <input name="id" type="number" placeholder="Enter id" id="id"/>
    <label for="country-name">Country</label>
    <input name="nombre" type="text" placeholder="Enter country" id="country-name" />
    <label for="demonym">Demonym</label>
    <input name="gentilicio" type="text" placeholder="Enter demonym" id="demonym" />
    <label for="capital">Capital</label>
    <input name="capital" type="text" placeholder="Enter capital" id="capital" />
    <label for="status">Status</label>
    <input name="estatus" type="text" placeholder="Active or Close" id="status" />
    <button type="submit" class="action-buttons" id="new-button">Update Country</button>
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
  `;

  // Insertar el formulario en el contenedor
  contenedorFormulario.appendChild(formulario);

  //Obtener datos del formulario generado
  const elementoformulario = document.querySelector(".new-form");

  elementoformulario.addEventListener("submit", (event) => {
    event.preventDefault(); //Esto evita que el navegador recargue la pagina raro

    const datosform = new FormData(elementoformulario);
    const datos = Object.fromEntries(datosform);
    console.log(datos);

    fetch("https://localhost:7137/Pais/Update-pais", {
      method: "PUT",
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

//Generar el formulario al presionar el botón delete country y borar nueva country
function deleteCountry() {
  const contenedorFormulario = document.getElementById("contenedor-formulario");

  if (document.querySelector(".new-form")) {
    return;
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement("form");
  formulario.setAttribute("action", "post");
  formulario.classList.add("new-form");
  formulario.innerHTML = `
    <label for="id-counrty">ID Number</label>
    <input name="id" type="number" placeholder="Enter id" id="id-counrty"/>
    <button type="submit" class="action-buttons" id="delete-button">Delete Country</button>
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
  `;

  // Insertar el formulario en el contenedor
  contenedorFormulario.appendChild(formulario);

  //Obtener datos del formulario generado
  const elementoformulario = document.querySelector(".new-form");

  elementoformulario.addEventListener("submit", (event) => {
    event.preventDefault(); //Esto evita que el navegador recargue la pagina raro

    const datosform = new FormData(elementoformulario);
    const datos = Object.fromEntries(datosform);
    const id = datos.id;
    console.log(id);

    fetch(`https://localhost:7137/Pais/Delete-pais?id=${id}`, {
      method: "DELETE",
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

