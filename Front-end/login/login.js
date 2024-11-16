const loginElement = document.getElementById("login-id");

loginElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const datosForm = new FormData(loginElement);
  const datos = Object.fromEntries(datosForm);
  const correo = datos.correo;
  const clave = datos.clave;
  

  fetch(`https://localhost:7137/Usuario/Login?correo=${correo}&clave=${clave}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo: datos.correo, clave: datos.clave }) // Envía el cuerpo en formato JSON
    })
    .then(async (res) => {
      if (!res.ok) {
        // Maneja errores HTTP (como 400, 401, 500)
        const errorData = await res.json().catch(() => null);
        const errorMessage = errorData?.message || `HTTP error! Status: ${res.status}`;        
        throw new Error(errorMessage);
      }
      return res.json();
    })
    .then((person) => {
        if (!person.ok){
            alert(person.message);
        } else {
            console.log("Datos del usuario: ", person.data);
            alert("Inicio de sessión exitoso")
            window.location.href = "/index.html";
        }
        
    })
    .catch((error) => {
      console.error("Error al consumir APIP: ", error);
      alert("Ocurrió un error al iniciar sessión. Por favor, intente de nuevo.")
    });
});
