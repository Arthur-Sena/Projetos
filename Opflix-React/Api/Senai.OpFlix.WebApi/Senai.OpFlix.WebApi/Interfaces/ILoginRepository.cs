using Senai.OpFlix.WebApi.Domains;
using Senai.OpFlix.WebApi.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.OpFlix.WebApi.Interfaces
{
    public interface ILoginRepository
    {
        Usuario BuscarPorEmailESenha(LoginViewModel login);
        void CadastrarCLIENTE(Usuario usuario);
        void CadastrarADM(Usuario usuario);
    }
}
