using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Genero
    {
        public Genero()
        {
            Lancamento = new HashSet<Lancamento>();
        }

        public int IdGenero { get; set; }
        public string Nome { get; set; }

        public ICollection<Lancamento> Lancamento { get; set; }
    }
}
