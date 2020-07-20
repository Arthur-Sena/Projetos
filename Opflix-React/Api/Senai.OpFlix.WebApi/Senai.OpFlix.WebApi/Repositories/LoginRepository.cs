using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using Senai.OpFlix.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class LoginRepository : ILoginRepository
    {

        opflixContext ctx = new opflixContext();
        private string StringConexao = "Data Source=localhost;Initial Catalog=T_OpFlix;User Id=sa;Pwd=132;";



        public Usuario BuscarPorEmailESenha(LoginViewModel login)
        {
            Usuario UsuarioBuscado = ctx.Usuario.FirstOrDefault(x => x.Email == login.Email && x.Senha == login.Senha);
            if (UsuarioBuscado == null)
            {
                return null;
            }
            return UsuarioBuscado;
        }

        public void CadastrarCLIENTE(Usuario usuario)
        {
            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                string Query = "INSERT INTO Usuario (Nome , Email, Senha, Id_TipoUsuario) VALUES (@Nome, @Email,@Senha, 1)";
                SqlCommand cmd = new SqlCommand(Query, con);
                cmd.Parameters.AddWithValue("@Nome", usuario.Nome);
                cmd.Parameters.AddWithValue("@Email", usuario.Email);
                cmd.Parameters.AddWithValue("@Senha", usuario.Senha);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }

        public void CadastrarADM(Usuario usuario)
        {
            using (SqlConnection con = new SqlConnection(StringConexao))
            {
                string Query = "INSERT INTO Usuario (Nome , Email, Senha, Id_TipoUsuario) VALUES (@Nome, @Email,@Senha, 2)";
                SqlCommand cmd = new SqlCommand(Query, con);
                cmd.Parameters.AddWithValue("@Nome", usuario.Nome);
                cmd.Parameters.AddWithValue("@Email", usuario.Email);
                cmd.Parameters.AddWithValue("@Senha", usuario.Senha);
                con.Open();
                cmd.ExecuteNonQuery();
            }
        }
    }
}

