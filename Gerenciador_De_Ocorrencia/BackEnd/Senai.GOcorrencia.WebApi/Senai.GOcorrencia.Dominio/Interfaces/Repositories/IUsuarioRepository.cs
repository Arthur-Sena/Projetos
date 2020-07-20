using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Servico.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Senai.GOcorrencia.Dominio.Interfaces.Repositories
{
    public interface IUsuarioRepository
    {
        // Metodo que sera implementado no repositorio para efetuar o login, comparando o nif e a senha inseridos no formulario com o do BD
        UsuarioDomain EfetuarLogin(string nif, string senha);

        // Metodo que sera implementado no repositorio para buscar o nif e a senha no BD
        UsuarioDomain BuscarNifSenha(LoginViewModel login);

        // Metodo que ira cadastrar novos usuarios
        UsuarioDomain CadastrarUsuario(UsuarioDomain usuario);
    }
}
