using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Senai.GOcorrencia.Dominio.Entities
{
    [Table("Usuarios")]
    public class UsuarioDomain
    {
        // Essas sao as informacoes que o usuario tera, e que serao usadas para todo o projeto. Utilizando o metodo de Code First, essa tambem sera minha tabela no BD 

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        // Nome do usuario
        [Required]
        [Column("Nome", TypeName = "varchar(100)")]
        public string Nome { get; set; }

        // Numero de identificacao de cada usuario no trabalho
        [Required]
        [Column("NIF", TypeName = "varchar(100)")]
        public string NIF { get; set; }

        // Sua senha para o login
        [Required]
        [Column("Senha", TypeName = "varchar(100)")]
        public string Senha { get; set; }

        // Tipo do usuario: Administrador ou Comum
        [Required]
        [Column("Tipo", TypeName = "varchar(30)")]
        public string Tipo { get; set; }
    }
}
