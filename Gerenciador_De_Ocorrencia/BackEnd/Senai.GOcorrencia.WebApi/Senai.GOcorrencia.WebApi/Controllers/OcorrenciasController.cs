using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Repositories;

namespace Senai.GOcorrencia.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class OcorrenciasController : ControllerBase
    {
        private IOcorreciaRepository OcorrenciaRepository { get; set; }

        public OcorrenciasController()
        {
            OcorrenciaRepository = new OcorrenciaRespository();
        }

        [HttpGet]
        public IActionResult ListarOcorrencias()
        {
            return Ok(OcorrenciaRepository.ListarOcorrencias());
        }

        [HttpPost]
        public IActionResult CadastrarOccorrencia(OcorrenciaDomain ocorrencia)
        {
            try
            {
                return Ok(OcorrenciaRepository.CadastrarOcorrencia(ocorrencia));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Tente novamente mais tarde!" + ex.Message });
            }
        }
    }
}