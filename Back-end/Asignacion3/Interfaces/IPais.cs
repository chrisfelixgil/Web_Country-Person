using Asignacion3.Models;

namespace Asignacion3.Interfaces
{
    public interface IPais
    {
        List<Pais> GetPais();
        string SetPais(Pais model);
        string UpdatePais(Pais model);
        string DeletePais(int id);
        Pais SearchPais(string pais);
    }
}
