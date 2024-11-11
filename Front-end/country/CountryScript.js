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
