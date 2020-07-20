using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Tipo
    {
        public Tipo()
        {
            Lancamento = new HashSet<Lancamento>();
        }

        public int IdTipo { get; set; }
        public string Tipo1 { get; set; }

        public ICollection<Lancamento> Lancamento { get; set; }
    }
}
