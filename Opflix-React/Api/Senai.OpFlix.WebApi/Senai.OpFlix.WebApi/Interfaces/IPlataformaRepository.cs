using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface IPlataformaRepository
    {
        void CadastrarPlataforma(Plataforma plataforma);
        List<Plataforma> ListarPlataforma();
        void AtualizarPlataforma(Plataforma plataforma);
        //Extra :
        Plataforma ListarId(int Id);
        Plataforma ListarPorNome(string Nome);

    }
}
