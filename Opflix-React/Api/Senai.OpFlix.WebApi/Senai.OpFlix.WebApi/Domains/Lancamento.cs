using System;
using System.Collections.Generic;

namespace Senai.OpFlix.WebApi.Domains
{
    public partial class Lancamento
    {
        public int IdLancamentos { get; set; }
        public string Nome { get; set; }
        public string Sinopse { get; set; }
        public string Duracao { get; set; }
        public DateTime DataLancamento { get; set; }
        public int IdPlataforma { get; set; }
        public int IdTipo { get; set; }
        public int IdGenero { get; set; }
        public string ClassificacaoIndicativa { get; set; }

        public Genero IdGeneroNavigation { get; set; }
        public Plataforma IdPlataformaNavigation { get; set; }
        public Tipo IdTipoNavigation { get; set; }
    }
}
