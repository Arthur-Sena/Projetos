using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Repositories;
using Senai.GOcorrencia.Servico.ViewModels;

namespace Senai.GOcorrencia.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private IUsuarioRepository  UsuarioRepository { get; set; }

        public UsuariosController()
        {
            UsuarioRepository = new UsuarioRepository();
        }

        // Esse e o metodo que possibilitara o Usuario de logar no site e mexer nas suas principais funcoes
        [HttpPost("login")]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                UsuarioDomain usuarioBuscado = UsuarioRepository.BuscarNifSenha(login);
                if (usuarioBuscado == null)
                {
                    return NotFound(new { mensagem = "UsuarioBuscado" });
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, usuarioBuscado.NIF),
                    new Claim(JwtRegisteredClaimNames.Jti, usuarioBuscado.Id.ToString()),
                    new Claim(ClaimTypes.Role, usuarioBuscado.Tipo),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("gocorrencia-token"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                  issuer: "GOcorrencia.WebApi",
                  audience: "GOcorrencia.WebApi",
                  claims: claims,
                  expires: DateTime.Now.AddMinutes(30),
                  signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }

            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Infeizmente algo deu errado!" + ex.Message });
            }
        }

        [HttpPost]

        public IActionResult CadastrarUsuario(UsuarioDomain usuario)
        {
            try
            {
                return Ok(UsuarioRepository.CadastrarUsuario(usuario));

            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Tente novamente mais tarde!" + ex.Message });
            }
        }

      }
  }        
    

