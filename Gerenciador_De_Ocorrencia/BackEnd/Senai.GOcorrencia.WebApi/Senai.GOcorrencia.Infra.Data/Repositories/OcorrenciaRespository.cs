using Microsoft.EntityFrameworkCore;
using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Senai.GOcorrencia.Infra.Data.Repositories
{
    public class OcorrenciaRespository : IOcorreciaRepository
    {
        GOcorrenciaContext ctx = new GOcorrenciaContext();

        public OcorrenciaDomain CadastrarOcorrencia(OcorrenciaDomain ocorrencia)
        {
            try
            {
                ctx.Ocorrencias.Add(ocorrencia);
                ctx.SaveChanges();

                return ocorrencia;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public List<OcorrenciaDomain> ListarOcorrencias()
        {
            return ctx.Ocorrencias.ToList();
        }
    }
}
