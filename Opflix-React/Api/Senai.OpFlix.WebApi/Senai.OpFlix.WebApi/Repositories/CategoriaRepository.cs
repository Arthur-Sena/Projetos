using Microsoft.EntityFrameworkCore;
using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        //-------------------//
        opflixContext ctx = new opflixContext();
        //-------------------//

        public void AtualizarCategorias(Genero genero)
        {
            Genero GeneroBuscado = ctx.Genero.FirstOrDefault(x => x.IdGenero == genero.IdGenero);
            GeneroBuscado.Nome = genero.Nome;
            ctx.Genero.Update(GeneroBuscado);
            ctx.SaveChanges();
        }


        public void CadastrarCategorias(Genero genero)
        {
            ctx.Genero.Add(genero);
            ctx.SaveChanges();
        }


        public List<Genero> ListarCategorias()
        {
            return ctx.Genero.Include(x => x.Lancamento).ToList();
        }

        public Genero ListarId(int Id)
        {
            return ctx.Genero.Include(x => x.Lancamento).FirstOrDefault(x => x.IdGenero == Id);
        }
    }
}
