using Asignacion3.Contexto;
using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;

namespace Asignacion3.Services
{
    public class UsuarioService : IUsuario
    {
        private readonly Asignacion3Context context;

        public UsuarioService(Asignacion3Context context) 
        {
            this.context = context;
        }
        public string DeleteUsuario(int id)
        {
            var registro = context.Usuario.Find(id);
            context.Usuario.Remove(registro);
            context.SaveChanges();

            return "Registro eliminado";
        }

        public List<Usuario> GetUsuario()
        {
            return context.Usuario.ToList();
        }

        public Usuario Login(string correo, string password)
        {
            try 
            {
                if (string.IsNullOrEmpty(correo) && string.IsNullOrEmpty(password))
                    throw new ArgumentException("Favor introducir correo y clave");

                var user = context.Usuario.FirstOrDefault(u => (u.Correo.Equals(correo) && u.Clave.Equals(password)));

                if (user == null)
                    throw new ArgumentException("Correo o clave invalidos");

                return new Usuario
                {
                    Id = user.Id,
                    Nombre = user.Nombre,
                    Correo = user.Correo,
                    Clave = user.Clave,
                    Estatus = user.Estatus
                };
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Error de validación: {ex.Message}");
                return null;
            }
        }

        public Usuario SearchUsuario(string usuario)
        {
            var registro = context.Usuario.FirstOrDefault(u => u.Nombre.Equals(usuario));

            return new Usuario
            {
                Id = registro.Id,
                Nombre = registro.Nombre,
                Correo = registro.Correo,
                Clave = registro.Clave,
                Estatus = registro.Estatus
            };
        }

        public string SetUsuario(Usuario model)
        {
            context.Usuario.Add(model);
            context.SaveChanges();

            return "Registro guardado";
        }

        public string UpdateUsuario(Usuario model)
        {
            context.Entry(model).State = EntityState.Modified;
            context.SaveChanges();

            return "Registro modificado";
        }
    }
}
