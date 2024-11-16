//Completar la tabla con la API
allPersons();

function allPersons(){
  
const HTMLTable = document.querySelector(".table-error-msg");

fetch("https://localhost:7137/Usuario/All-usuario")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((usuario) => mostrarDatos(usuario))
  .catch((error) => {
    console.error("Error al consumir la API: ", error);
    HTMLTable.textContent =
      "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
  });

const mostrarDatos = (usuario) => {
  let body = "";
  for (let i = 0; i < usuario.length; i++) {
    body += `<tr><td>${usuario[i].id}</td><td>${usuario[i].nombre}</td><td>${usuario[i].correo}</td><td>${usuario[i].clave}</td></tr>`;
  }

  document.querySelector(".data").innerHTML = body;
};
}


//Barra de busqueda
function searchPerson() {
  const HTMLTabla = document.querySelector(".table-error-msg");
  const searchBar = document.querySelector(".search-bar");

  searchBar.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que el navegador recargue la página

    const datosform = new FormData(searchBar);
    const datos = Object.fromEntries(datosform);
    const name = datos.nombre;

    // Verificar si 'name' está vacío llamar a 'allPersons' si es necesario
    if(!name){
      allPersons();
      return;
    }

    console.log(name);

    fetch(`https://localhost:7137/Usuario/Search-usuario?usuario=${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((usuario) => {
        console.log(usuario);
        mostrarDatos(usuario);
      })
      .catch((error) => {
        console.error("Error al consumir la API: ", error);
        HTMLTabla.textContent =
          "Hubo un error al cargar los datos. Por favor, intenta nuevamente.";
      });
  });

  // Define la función mostrarDatos fuera del evento submit
  const mostrarDatos = (usuario) => {
    let body = `<tr><td>${usuario.id}</td><td>${usuario.nombre}</td><td>${usuario.correo}</td><td>${usuario.clave}</td></tr>`;

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


//Generar el formulario al presionar el botón new person y crear nueva persona
function newPerson() {
  if (document.querySelector('.new-form')) {
    return; 
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement('form');
  formulario.setAttribute('action', 'post');
  formulario.classList.add('new-form');
  formulario.innerHTML = `
    <input name="id" type="number" placeholder="id" value="0" class="hidden-input" />
    <label for="person-name">Name</label>
    <input name="nombre" type="text" placeholder="Enter name" id="person-name" />
    <label for="correo">Demonym</label>
    <input name="correo" type="text" placeholder="Enter E-mail" id="correo" />
    <label for="password">Password</label>
    <input name="clave" type="text" placeholder="Enter password" id="password" />
    <label for="status">Status</label>
    <input name="estatus" type="text" placeholder="Active or Non Active" id="status" />
    <button type="submit" class="action-buttons" id="new-button">New Person</button>
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
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

  fetch("https://localhost:7137/Usuario/New-usuario", {
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

//Generar el formulario al presionar el botón update person y actualizar una persona
function updatePerson() {
  if (document.querySelector('.new-form')) {
    return; 
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement('form');
  formulario.setAttribute('action', 'post');
  formulario.classList.add('new-form');
  formulario.innerHTML = `
    <label for="id">ID Number</label>
    <input name="id" type="number" placeholder="Enter id" id="id"/>
    <label for="person-name">Name</label>
    <input name="nombre" type="text" placeholder="Enter name" id="person-name" />
    <label for="correo">Demonym</label>
    <input name="correo" type="text" placeholder="Enter E-mail" id="correo" />
    <label for="password">Password</label>
    <input name="clave" type="text" placeholder="Enter password" id="password" />
    <label for="status">Status</label>
    <input name="estatus" type="text" placeholder="Active or Non Active" id="status" />
    <button type="submit" class="action-buttons" id="new-button">Update Person</button>
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
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

  fetch("https://localhost:7137/Usuario/Update-usuario", {
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

//Generar el formulario al presionar el botón delete person y borar nueva persona
function deletePerson() {
  if (document.querySelector('.new-form')) {
    return; 
  }

  // Crear el formulario dinámicamente
  const formulario = document.createElement('form');
  formulario.setAttribute('action', 'post');
  formulario.classList.add('new-form');
  formulario.innerHTML = `
    <label for="id-number">ID Number</label>
    <input name="id" type="number" placeholder="Enter ID" id="id-number"/>
    <button type="submit" class="action-buttons" id="delete-button">Delete Person</button>
    <button class="action-buttons" type="button" onclick="ocultarFormulario()">Hide form</button>
  `;

  // Insertar el formulario en el contenedor
  document.getElementById('contenedor-formulario').appendChild(formulario);

  //Obtener datos del formulario generado
const elementoformulario = document.querySelector(".new-form");

elementoformulario.addEventListener("submit", (event) => {
  event.preventDefault(); //Esto evita que el navegador recargue la pagina raro

  const datosform = new FormData(elementoformulario);
  const datos = Object.fromEntries(datosform);
  const id = datos.id;
  console.log(id);

  fetch(`https://localhost:7137/Usuario/Delete-usuario?id=${id}`, {
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