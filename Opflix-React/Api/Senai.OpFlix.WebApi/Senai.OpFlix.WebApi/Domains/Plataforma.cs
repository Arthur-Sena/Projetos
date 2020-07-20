using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Plataforma
    {
        public Plataforma()
        {
            Lancamento = new HashSet<Lancamento>();
        }

        public int IdPlataforma { get; set; }
        public string Plataforma1 { get; set; }

        public ICollection<Lancamento> Lancamento { get; set; }
    }
}
