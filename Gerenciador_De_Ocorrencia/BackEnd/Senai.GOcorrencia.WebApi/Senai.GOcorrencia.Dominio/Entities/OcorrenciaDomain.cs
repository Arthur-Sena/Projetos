using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;
using System.Linq;
using System.Text;

namespace Senai.GOcorrencia.Dominio.Entities
{
    public class OcorrenciaDomain
    { 
        public int Id { get; set; }

        public int IdAluno { get; set; }

        public string Descricao { get; set; }
    }
}