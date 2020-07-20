using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.Repositories;
using Senai.OpFlix.WebApi.ViewModel;

namespace Senai.OpFlix.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public ILoginRepository LoginRepository { get; set; }

        //LoginRepository LoginRepository = new LoginRepository();

        public LoginController()
        {
            LoginRepository = new LoginRepository();
        }


        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuario Usuarios = LoginRepository.BuscarPorEmailESenha(login);
                if (Usuarios == null)
                {
                    return NotFound(new { mensagem = "Email ou senha inválidos." });
                }

                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Email, Usuarios.Email),
                    new Claim("chave", "valor"),
                    new Claim(JwtRegisteredClaimNames.Jti, Usuarios.IdUsuario.ToString()),
                    new Claim(ClaimTypes.Role, Usuarios.IdTipoUsuario.ToString()),
                    new Claim("permissao", Usuarios.IdTipoUsuario.ToString()),
                    new Claim("nome", Usuarios.Nome.ToString()),

                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("OpFlix-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "OpFlix.WebApi",
                    audience: "OpFlix.WebApi",
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
                return BadRequest(new { mensagem = "Erro." + ex.Message });
            }
        }


        [HttpPost("Cadastrar")]
        public IActionResult Cadastrar(Usuario usuario)
        {
            try
            {
                LoginRepository.CadastrarCLIENTE(usuario);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Erro Ao Cadastrar.Aguarde um momento" + ex.Message });
            }
        }

        [Authorize(Roles = "2")]
        [HttpPost("CadastrarADM")]
        public IActionResult CadastrarADM(Usuario usuario)
        {
            try
            {
                LoginRepository.CadastrarADM(usuario);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(new { mensagem = "Erro Ao Cadastrar.Aguarde um momento" + ex.Message });
            }
        }

    }
}