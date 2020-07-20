using Senai.OpFlix.WebApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface ILocalizacaoRepository
    {
        void Cadastrar(Localizacoes localizacoes);

        List<Localizacoes> Listar();
    }
}
