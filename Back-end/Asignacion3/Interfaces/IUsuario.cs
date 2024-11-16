using Asignacion3.Models;
using Microsoft.AspNetCore.Mvc;

namespace Asignacion3.Interfaces
{
    public interface IUsuario
    {
        List<Usuario> GetUsuario();
        string SetUsuario(Usuario model);
        string UpdateUsuario(Usuario model);
        string DeleteUsuario(int id);
        Usuario SearchUsuario(string usuario);
        IActionResult Login(string correo, string clave);

    }
}
