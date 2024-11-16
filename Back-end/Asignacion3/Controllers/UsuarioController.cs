using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Asignacion3.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuario service;

        public UsuarioController(IUsuario service)
        {
            this.service = service;
        }

        [HttpGet("All-usuario")]
        public List<Usuario> GetUsuario()
        {
            return service.GetUsuario();
        }

        [HttpPost("New-usuario")]
        public string SetUsuario(Usuario model)
        {
            return service.SetUsuario(model);
        }

        [HttpPut("Update-usuario")]
        public string UpdateUsuario(Usuario model)
        {
            return service.UpdateUsuario(model);
        }

        [HttpDelete("Delete-usuario")]
        public string DeleteUsuario(int id)
        {
            return service.DeleteUsuario(id);
        }

        [HttpGet("Search-usuario")]
        public Usuario SearchUsuario(string usuario)
        {
            return service.SearchUsuario(usuario);
        }

        //Mejorar para que la excepción salga en CLI de la API
        [HttpPost("Login")]
        public IActionResult Login(string correo, string clave)
        {
            return service.Login(correo, clave);
        }


    }
}
