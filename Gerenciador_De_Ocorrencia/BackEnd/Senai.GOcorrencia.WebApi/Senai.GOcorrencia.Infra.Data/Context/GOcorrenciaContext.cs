using Microsoft.EntityFrameworkCore;
using Senai.GOcorrencia.Dominio.Entities;

namespace Senai.GOcorrencia.Infra.Data.Context
{
    public class GOcorrenciaContext : DbContext
    {
        public DbSet<UsuarioDomain> Usuarios { get; set; }
        public DbSet<AlunoDomain> Alunos { get; set; }
        public DbSet<OcorrenciaDomain> Ocorrencias { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.\\SQLEXPRESS3TT; Initial Catalog=GerenciadorOcorrencia; user id=sa; password=sa132");

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsuarioDomain>().HasData(
            new UsuarioDomain()
            {
                Id = 1,
                Nome = "Teste",
                NIF = "123456789",
                Senha = "123456",
                Tipo = "ADMINISTRADOR"
            });

            modelBuilder.Entity<AlunoDomain>().HasData(
            new AlunoDomain()
            {
                Id = 1,
                NumMatricula = "12345678",
                Nome = "Teste",
                Status = true,
                Telefone = "(11)12341234",
                Celular = "(11)912341234",
                TipoCurso = "Curso Teste",
                Curso = "Testando",
                Turma = "1TT",
                Turno = "Teste",
                Termo = "1",
                Imagem = null,
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
