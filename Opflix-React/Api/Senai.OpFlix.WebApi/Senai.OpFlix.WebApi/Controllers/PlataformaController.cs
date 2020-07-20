using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]

    public class PlataformaController : ControllerBase
    {
        public IPlataformaRepository PlataformaRepository { get; set; }

        //PlataformaRepository PlataformaRepository = new PlataformaRepository();

        public PlataformaController()
        {
            PlataformaRepository = new PlataformaRepository();
        }

        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(PlataformaRepository.ListarPlataforma());
        }


        [Authorize(Roles = "2")]
        [HttpPut]
        public IActionResult Atualizar(Plataforma plataforma)
        {
            try
            {
                if (plataforma == null)
                {
                    return NotFound();
                }
                PlataformaRepository.AtualizarPlataforma (plataforma);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro ao Atualizar. Aguarde um momento. " + ex.Message });
            }
        }

        [Authorize(Roles = "2")]
        [HttpPost]
        public IActionResult Cadastrar(Plataforma plataforma)
        {
            try
            {
                PlataformaRepository.CadastrarPlataforma(plataforma);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Erro ao Cadastrar Plataforma. Aguarde um momento. " + ex.Message });
            }
        }

        //EXTRA

        //1-) Filtrar  Plataforma Por Id
        //[Authorize]
        [HttpGet("{id}")]
        public IActionResult ListarPorId(int Id)
        {
            return Ok(PlataformaRepository.ListarId(Id));
        }
        //1.1-) Filtrar Plataforma Por Nome 
        //[Authorize]
        [HttpGet("Nome/{nome}")]
        public IActionResult ListarPorNome(string Nome)
        {
            //PlataformaRepository.ListarPorNome(Nome);
            
            return Ok(PlataformaRepository.ListarPorNome(Nome));
        }
    }
}