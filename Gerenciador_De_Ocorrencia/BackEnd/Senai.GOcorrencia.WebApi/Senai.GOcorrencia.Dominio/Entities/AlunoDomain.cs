using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Senai.GOcorrencia.Dominio.Entities
{
    [Table("Alunos")]
    public class AlunoDomain
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("NumeroMatricula", TypeName = "varchar(100)")]
        public string NumMatricula { get; set; }

        [Required]
        [Column("Nome", TypeName = "varchar(100)")]
        public string Nome { get; set; }

        [Required]
        [Column("Status", TypeName = "bit")]
        public bool Status { get; set; }

        [Required]
        [Column("Telefone", TypeName = "varchar(100)")]
        public string Telefone { get; set; }

        [Required]
        [Column("Celular", TypeName = "varchar(100)")]
        public string Celular { get; set; }

        [Required]
        [Column("TipoCurso", TypeName = "varchar(100)")]
        public string TipoCurso { get; set; }

        [Required]
        [Column("Curso", TypeName = "varchar(100)")]
        public string Curso { get; set; }

        [Required]
        [Column("Turma", TypeName = "varchar(100)")]
        public string Turma { get; set; }

        [Required]
        [Column("Turno", TypeName = "varchar(100)")]
        public string Turno { get; set; }

        [Required]
        [Column("Termo", TypeName = "varchar(100)")]
        public string Termo { get; set; }

        [Column("Imagem", TypeName = "varchar(3000)")]
        public string Imagem { get; set; }

    }
}
