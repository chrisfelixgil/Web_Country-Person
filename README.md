# Proyecto de Web API con ASP.NET Core, Entity Framework y SQL Server

Este repositorio contiene un proyecto de Web API desarrollado con **ASP.NET Core**, **Entity Framework Core** y **SQL Server**, acompañado de un frontend implementado con **HTML5**, **CSS3** y **JavaScript** para proporcionar una experiencia de usuario amigable y completa.

## Controladores Implementados

### 1. Controlador de Usuario (Registro e Inicio de Sesión)

**Entidad Usuario:**
- Campos: Nombre, Correo, Clave.

**Endpoints Implementados:**
- `POST /api/usuarios` - Crear un nuevo usuario.
- `PUT /api/usuarios/{id}` - Actualizar un usuario existente.
- `DELETE /api/usuarios/{id}` - Eliminar un usuario por ID.
- `GET /api/usuarios` - Obtener todos los usuarios.
- `GET /api/usuarios/{id}` - Buscar un usuario en particular por ID.
- `POST /api/usuarios/login` - Endpoint para el inicio de sesión de un usuario.

### 2. Controlador de País

**Entidad País:**
- Campos: Nombre, Gentilicio, Capital

**Endpoints Implementados:**
- `POST /api/paises` - Crear un nuevo país.
- `PUT /api/paises/{id}` - Actualizar un país existente.
- `DELETE /api/paises/{id}` - Eliminar un país por ID.
- `GET /api/paises` - Obtener todos los países.
- `GET /api/paises/{id}` - Buscar un país en particular por ID.

## Tecnologías Utilizadas

- **ASP.NET Core** para la creación de la Web API.
- **Entity Framework Core** para la gestión de la base de datos y las entidades.
- **SQL Server** como base de datos relacional.
- **HTML5** para la estructura del contenido del frontend.
- **CSS3** para la estilización y diseño de la interfaz.
- **JavaScript Vanilla** para la lógica de interacción y consumo de la API.

## Frontend del Proyecto

### Características del Frontend
- Interfaces amigables para la gestión de usuarios y países.
- Formularios interactivos para el registro, actualización y eliminación de datos.
- Funcionalidad de inicio de sesión con validación de usuario.
- Visualización de listas y detalles de usuarios y países.
- Respuestas y mensajes dinámicos para informar al usuario sobre las acciones realizadas.

### Consumo de la API
- Se utilizó `fetch` para realizar las solicitudes HTTP a la API.
- Manejo de respuestas y errores de manera clara para mejorar la experiencia del usuario.

## Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/chrisfelixgil/Web_Country-Person.git
   ```
2. **Configurar la base de datos:**
   - Asegúrate de tener **SQL Server** en ejecución y de configurar la cadena de conexión en `appsettings.json`.
3. **Ejecutar migraciones de Entity Framework:**
   ```bash
   dotnet ef database update
   ```
4. **Ejecutar la aplicación:**
   ```bash
   dotnet run
   ```
5. **Abrir el frontend:**
   - Navega al archivo `login.html` del frontend y ábrelo en tu navegador.

## Conclusión

Este proyecto proporciona una solución integral que incluye tanto la API como el frontend, ofreciendo un acceso intuitivo a las funcionalidades de creación, actualización, eliminación y búsqueda de usuarios y países, así como la gestión de inicio de sesión.
