using Asignacion3.Contexto;
using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
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

            return "Deleted person.";
        }

        public List<Usuario> GetUsuario()
        {
            return context.Usuario.ToList();
        }


        public IActionResult Login(string correo, string clave)
        {
            try
            {
                if (string.IsNullOrEmpty(correo) || string.IsNullOrEmpty(clave))
                    return new BadRequestObjectResult(new
                    {
                        ok = false,
                        message = "Please enter email and password."
                    });

                var user = context.Usuario.FirstOrDefault(u => (u.Correo.Equals(correo) && u.Clave.Equals(clave)));

                if (user == null)
                    return new UnauthorizedObjectResult(new
                    {
                        ok = false,
                        message = "Invalid credentials. Please verify your email and password."
                    });

                return new OkObjectResult(new
                {
                    ok = true,
                    data = new
                    {
                        Id = user.Id,
                        Nombre = user.Nombre,
                        Correo = user.Correo,
                        Clave = user.Clave,
                        Estatus = user.Estatus
                    }
                });
            }
            catch (Exception ex) 
            {
                return new ObjectResult(new
                {
                    ok = false,
                    message = "Internal Server Error. Please try again later.",
                    error = ex.Message
                })
                { 
                    StatusCode = 500
                };
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

            return "Saved person.";
        }

        public string UpdateUsuario(Usuario model)
        {
            context.Entry(model).State = EntityState.Modified;
            context.SaveChanges();

            return "Modified person.";
        }
    }
}
