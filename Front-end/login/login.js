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
            console.log(person.data);
            alert("Successful login")
            window.location.href = "/index.html";
        }
        
    })
    .catch((error) => {
      console.error("Error inesperado: ", error);
      alert(error.message || "An unexpected error occurred. Please try again.");
    });
});
