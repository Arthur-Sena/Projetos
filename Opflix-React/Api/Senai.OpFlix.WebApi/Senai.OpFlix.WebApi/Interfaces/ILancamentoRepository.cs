using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface ILancamentoRepository
    {
        List<Lancamento> ListarLancamentos();
        void CadastrarLancamento(Lancamento lancamento);
        Lancamento ListarId(int Id);
        void AtualizarLancamento(Lancamento lancamento);
        void DeletarLancamento(int id);
        List<Lancamento> BuscarPorDataC();
        List<Lancamento> BuscarPorDataD();
        Lancamento BuscarPorNome(string Nome);


    }
}
