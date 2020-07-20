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
    public class CategoriaController : ControllerBase
    {

        public ICategoriaRepository CategoriaRepository { get; set; }

        public CategoriaController()
        {
            CategoriaRepository = new CategoriaRepository();
        }

        //[Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(CategoriaRepository.ListarCategorias());
        }


        [Authorize(Roles = "2")]
        [HttpPut]
        public IActionResult Atualizar(Genero genero)
        {
            try
            {
                if (genero == null)
                {
                    return NotFound();
                }
                CategoriaRepository.AtualizarCategorias(genero);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro. Aguarde um momento." + ex.Message });
            }
        }


        [Authorize(Roles = "2")]
        [HttpPost]
        public IActionResult Cadastrar(Genero genero)
        {
            try
            {
                CategoriaRepository.CadastrarCategorias(genero);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Erro. Aguarde um momento." + ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult ListarPorId(int Id)
        {
            return Ok(CategoriaRepository.ListarId(Id));
        }
    }
}