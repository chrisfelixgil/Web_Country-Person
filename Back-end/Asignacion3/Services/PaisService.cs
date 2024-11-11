using Asignacion3.Contexto;
using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.EntityFrameworkCore;

namespace Asignacion3.Services
{
    public class PaisService : IPais
    {
        private readonly Asignacion3Context context;

        public PaisService(Asignacion3Context context)
        {
            this.context = context;
        }

        public string DeletePais(int id)
        {
            var registro = context.Pais.Find(id);
            context.Pais.Remove(registro);
            context.SaveChanges();

            return "Registro eliminado";
        }

        public List<Pais> GetPais()
        {
            return context.Pais.ToList();
        }

        public Pais SearchPais(string pais)
        {
            var registro = context.Pais.FirstOrDefault(p => p.Nombre.Equals(pais));

            return new Pais 
            {
                Id = registro.Id,
                Nombre = registro.Nombre,
                Gentilicio = registro.Gentilicio,
                Capital = registro.Capital,
                Estatus = registro.Estatus
            };
        }

        public string SetPais(Pais model)
        {
            context.Pais.Add(model);
            context.SaveChanges();

            return "Agregado satisfactoriamente";

        }

        public string UpdatePais(Pais model)
        {
            context.Entry(model).State = EntityState.Modified;
            context.SaveChanges();

            return "Actualizado correctamente";

        }
    }
}
