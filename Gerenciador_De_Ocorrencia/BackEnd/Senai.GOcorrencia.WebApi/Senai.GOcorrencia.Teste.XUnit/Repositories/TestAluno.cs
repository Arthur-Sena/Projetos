using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Senai.GOcorrencia.Teste.XUnit.Repositories
{
      public class TestAluno
      {
            private IAlunoRepository  AlunoRepository { get; set; }

            public TestAluno()
            {
                AlunoRepository = new AlunoRepository();
            }

            [Fact]
            public void CadsatrarAluno()
            {
                AlunoDomain aluno = new AlunoDomain()
                {
                    NumMatricula = "87654321",
                    Nome = "Teste 2",
                    Status = true,
                    Telefone = "(11)43214321",
                    Celular = "(11)943214321",
                    TipoCurso = "Curso Teste",
                    Curso = "Testando",
                    Turma = "1TT",
                    Turno = "Teste",
                    Termo = "3",
                    Imagem = null,
                    Ocorrencias = null,
                };

            var alunoCadastrado = AlunoRepository.CadastrarAluno(aluno);

            Assert.NotNull(aluno);
            }

            [Fact]
            public void EditarAluno()
            {
                AlunoDomain aluno = AlunoRepository.BuscarPorId(2);
                {
                    aluno.Nome = "Teste Dois";
                }

                var alunoEditado = AlunoRepository.EditarAluno(aluno);

                Assert.NotNull(aluno);
            }

            [Fact]
            public void BuscarPorId()
            {
                AlunoDomain aluno = AlunoRepository.BuscarPorId(1);

                Assert.NotNull(aluno);
            }
            
            [Fact]
            public void BuscarPorMatricula()
            {
                AlunoDomain aluno = AlunoRepository.BuscarPorMatricula("87654321");

                Assert.NotNull(aluno);
            }
      }
}
