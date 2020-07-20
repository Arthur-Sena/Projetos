using Microsoft.EntityFrameworkCore;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class LancamentoRepository : ILancamentoRepository
    {
        //-------------------//
        opflixContext ctx = new opflixContext();
        //-------------------//


        public List<Lancamento> ListarLancamentos()
        {
            return ctx.Lancamento.Include(x => x.IdTipoNavigation).Include(y => y.IdGeneroNavigation).ToList();
        }



        public Lancamento ListarId(int id)
        {
            return ctx.Lancamento.FirstOrDefault(x => x.IdLancamentos == id);
        }



        public void AtualizarLancamento(Lancamento lancamento)
        {
            Lancamento LancamentoBuscado = ctx.Lancamento.FirstOrDefault(x => x.IdLancamentos == lancamento.IdLancamentos);
            LancamentoBuscado.Nome = lancamento.Nome;
            ctx.Lancamento.Update(LancamentoBuscado);
            ctx.SaveChanges();
        }



        public void CadastrarLancamento(Lancamento lancamento)
        {
            ctx.Lancamento.Add(lancamento);
            ctx.SaveChanges();
        }



        public void DeletarLancamento(int id)
        {
            Lancamento lancamento = ctx.Lancamento.Find(id);
            ctx.Lancamento.Remove(lancamento);
            ctx.SaveChanges();
        }

        //Extra
        //1-) Usuario Podera Filtrar Por Data
        public List<Lancamento> BuscarPorDataC()
        {
            return ctx.Lancamento.FromSql("Select Top(5) * from Lancamento order by DataLancamento asc").ToList();
        }

        public List<Lancamento> BuscarPorDataD()
        {
            return ctx.Lancamento.FromSql("Select Top(5) * from Lancamento order by DataLancamento desc").ToList();
        }

        public Lancamento BuscarPorNome(string Titulo)
        {
            return ctx.Lancamento.FirstOrDefault(x => x.Nome == Titulo);

            //return ctx.Lancamento.FromSql("SELECT * FROM Lancamento").ToList();
        }
    }
}
