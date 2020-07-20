using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Repositories;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LancamentoController : ControllerBase
    {

        LancamentoRepository LancamentoRepository = new LancamentoRepository();



        [Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(LancamentoRepository.ListarLancamentos());
        }

        [Authorize(Roles = "2")]
        [HttpPut]
        public IActionResult Atualizar(Lancamento lancamento)
        {
            try
            {
                if (lancamento == null)
                {
                    return NotFound();
                }
                LancamentoRepository.AtualizarLancamento(lancamento);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro. Aguarde um momento. " + ex.Message });
            }
        }

        [Authorize(Roles = "2")]
        [HttpPost]
        public IActionResult Cadastrar(Lancamento lancamento)
        {
            try
            {
                LancamentoRepository.CadastrarLancamento(lancamento);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Erro ao Cadastrar. Aguarde um momento. " + ex.Message });
            }
        }

        
        //[Authorize(Roles = "2")]
        [HttpDelete("{id}")]
        public IActionResult Deletar(int id)
        {
            LancamentoRepository.DeletarLancamento(id);
            return Ok();
        }

        //Extra
        [Authorize]
        [HttpGet("DataC")]
        public IActionResult BuscarPorData()
        {
            return Ok(LancamentoRepository.BuscarPorDataC());
        }

        [Authorize]
        [HttpGet("DataD")]
        public IActionResult BuscarPorDataD()
        {
            return Ok(LancamentoRepository.BuscarPorDataD());
        }

        [HttpGet("{Nome}")]
        public IActionResult BuscarPorNome(string Nome)
        {
            return Ok(LancamentoRepository.BuscarPorNome(Nome));
        }
    }
}