using Microsoft.EntityFrameworkCore;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class PlataformaRepository : IPlataformaRepository
    {
        //-------------------//
        opflixContext ctx = new opflixContext();
        private string StringConexao = "Data Source=localhost;Initial Catalog=T_OpFlix;User Id=sa;Pwd=132;";

        //-------------------//

        public void AtualizarPlataforma(Plataforma plataforma)
        {
            Plataforma PlataformaB = ctx.Plataforma.FirstOrDefault(x => x.IdPlataforma == plataforma.IdPlataforma);
            PlataformaB.Plataforma1 = plataforma.Plataforma1;
            ctx.Plataforma.Update(PlataformaB);
            ctx.SaveChanges();
        }


        public void CadastrarPlataforma(Plataforma plataforma)
        {
            ctx.Plataforma.Add(plataforma);
            ctx.SaveChanges();
        }


        public List<Plataforma> ListarPlataforma()
        {
            return ctx.Plataforma.Include(x => x.Lancamento).ToList();
        }

        //Extra

        //1-) Filtrar Por Plataforma Id
        public Plataforma ListarId(int Id)
        {
            return ctx.Plataforma.Include(x => x.Lancamento).FirstOrDefault(x => x.IdPlataforma == Id);
        }
        //1.1-) Filtrar Por Plataforma Nome
        public Plataforma ListarPorNome(string Nome)
        {
            //var Nomep = Nome;

            //var plataforma = ctx.Plataforma
            //    .FromSql("SELECT * FROM Plataforma WHERE Plataforma Like '%{0}%'", Nome)
            //    .ToList();      
            return ctx.Plataforma.Include(x => x.Lancamento).FirstOrDefault(x => x.Plataforma1 == Nome);
        }
    }
}
