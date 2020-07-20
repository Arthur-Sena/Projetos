using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Senai.GOcorrencia.Teste.XUnit.Repositories
{
    public class TestUsuario
    {
        private IUsuarioRepository UsuarioRepository { get; set; }

        public TestUsuario()
        {
            UsuarioRepository = new UsuarioRepository();
        }

        // Esse teste verificara que o usuario existe
        [Fact]
        public void UsuarioValido()
        {
            var usuarioTest = UsuarioRepository.EfetuarLogin("123456789", "123456");

            Assert.NotNull(usuarioTest);
        }

        // Esse teste verificara que um usuario que nao existe retornara vazio
        [Fact]
        public void UsuarioInvalido()
        {
            var usuarioTest = UsuarioRepository.EfetuarLogin("987123456", "651234");

            Assert.Null(usuarioTest);
        }

        // Esse teste ira comparar o usuario inserido com um modelo
        [Fact]
        public void UsuarioValidoCorreto()
        {
            UsuarioDomain usuarioTest = new UsuarioDomain()
            {
                NIF = "123456789",
                Senha = "123456",
            };

            var usuarioRetornado = UsuarioRepository.EfetuarLogin(usuarioTest.NIF, usuarioTest.Senha);

            Assert.Equal(usuarioRetornado.NIF, usuarioTest.NIF);
            Assert.Equal(usuarioRetornado.Senha, usuarioTest.Senha);
        }

        [Fact]
        public void CadastrarUsuario()
        {
            UsuarioDomain usuario = new UsuarioDomain()
            {
                Nome = "Teste 2",
                NIF = "987654321",
                Senha = "654321",
                Tipo = "COMUM"
            };

            var usuarioCadstrado = UsuarioRepository.CadastrarUsuario(usuario);

            Assert.NotNull(usuario);
        }

    }
}
