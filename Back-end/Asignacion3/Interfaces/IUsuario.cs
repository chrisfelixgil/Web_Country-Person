using Asignacion3.Models;

namespace Asignacion3.Interfaces
{
    public interface IUsuario
    {
        List<Usuario> GetUsuario();
        string SetUsuario(Usuario model);
        string UpdateUsuario(Usuario model);
        string DeleteUsuario(int id);
        Usuario SearchUsuario(string usuario);
        Usuario Login(string correo, string password);

    }
}
