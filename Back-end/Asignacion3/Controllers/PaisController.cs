using Asignacion3.Interfaces;
using Asignacion3.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Asignacion3.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PaisController : ControllerBase
    {
        private readonly IPais service;

        public PaisController(IPais service) 
        {
            this.service = service;
        }

        [HttpGet("All-pais")]
        public List<Pais> GetPais() 
        {
            return service.GetPais();
        }

        [HttpPost("New-pais")]
        public string SetPais(Pais model) 
        {
            return service.SetPais(model);
        }
       
        [HttpPut("Update-pais")]
        public string UpdatePais(Pais model) 
        {
            return service.UpdatePais(model);
        }
        
        [HttpDelete("Delete-pais")]
        public string DeletePais(int id) 
        {
            return service.DeletePais(id);
        }

        [HttpGet("search-pais")]
        public Pais SearchPais(string pais) 
        {
            return service.SearchPais(pais);
        }


    }
}
