using Senai.GOcorrencia.Dominio.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Senai.GOcorrencia.Dominio.Interfaces.Repositories
{
    public interface IOcorreciaRepository
    {
        List<OcorrenciaDomain> ListarOcorrencias();

        OcorrenciaDomain CadastrarOcorrencia(OcorrenciaDomain ocorrencia);
    }
}
