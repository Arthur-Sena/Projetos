using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizationController : ControllerBase
    {
        public ILocalizacaoRepository LocalizacaoRepository { get; set; }

        public LocalizationController()
        {
            LocalizacaoRepository = new LocalizacaoRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(Localizacoes localizacoes)
        {
            try
            {
                LocalizacaoRepository.Cadastrar(localizacoes);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(new { mensagem = e.Message });
            }
        }

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(LocalizacaoRepository.Listar());
        }

    }
}