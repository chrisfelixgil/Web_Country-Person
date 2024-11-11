using Asignacion3.Models;
using Microsoft.EntityFrameworkCore;



namespace Asignacion3.Contexto
{
    public class Asignacion3Context : DbContext
    {
        public Asignacion3Context(DbContextOptions<Asignacion3Context> db): base(db) 
        {
            
        }

        public DbSet<Pais> Pais { get; set; }
        public DbSet<Usuario> Usuario { get; set; }

    }
}
