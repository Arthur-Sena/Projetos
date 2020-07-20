using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Senai.GOcorrencia.Servico.ViewModels
{
    public class LoginViewModel
    {
        // Essas serao as informacoes do usuario que serao utilizadas para efetuar o login

        [Required]
        public string NIF { get; set; }

        [Required]
        public string Senha { get; set; }
    }
}
