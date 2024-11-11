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