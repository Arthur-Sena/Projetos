using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Context;
using Senai.GOcorrencia.Servico.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Senai.GOcorrencia.Infra.Data.Repositories
{

    public class UsuarioRepository : IUsuarioRepository
    {
        GOcorrenciaContext ctx = new GOcorrenciaContext();

        /// <summary>
        /// Busca o Nif e a Senha para o Login
        /// </summary>
        /// <param name="nif">nif do usuario</param>
        /// <param name="senha">senha do usuario</param>
        /// <returns>Retorna o Nif e a Senha do Usuario</returns>
        public UsuarioDomain BuscarNifSenha(LoginViewModel login)
        {
            UsuarioDomain usuario = ctx.Usuarios.FirstOrDefault(x => x.NIF == login.NIF && x.Senha == login.Senha);

            if (usuario == null)
            {
                return null;
            }
            return usuario;
        }

        /// <summary>
        /// Verifica se um Usuario existe, e se existe, ira comparar o Nif e a Senha ineridos com a do Usuario para o Login
        /// </summary>
        /// <param name="nif">nif do usuario</param>
        /// <param name="senha">senha do usuario</param>
        /// <returns>Retorna um Usuario q exista no BD</returns>
        public UsuarioDomain EfetuarLogin(string nif, string senha)
        {
            try
            {
                return ctx.Usuarios.FirstOrDefault(x => x.NIF == nif && x.Senha == senha);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public UsuarioDomain CadastrarUsuario(UsuarioDomain usuario)
        {
            ctx.Usuarios.Add(usuario);
            ctx.SaveChanges();

            return usuario;
        }
    }
}
