using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Context;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Senai.GOcorrencia.Infra.Data.Repositories
{
    public class AlunoRepository : IAlunoRepository
    {
        GOcorrenciaContext ctx = new GOcorrenciaContext();

        public AlunoDomain CadastrarAluno(AlunoDomain aluno)
        {
            try
            {
                ctx.Alunos.Add(aluno);
                ctx.SaveChanges();

                return aluno;
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }

        public List<AlunoDomain> ListarAlunos()
        {
            return ctx.Alunos.ToList(); 
        }

        public AlunoDomain EditarAluno(AlunoDomain aluno)
        { 
            AlunoDomain EditarAluno = ctx.Alunos.FirstOrDefault(x => x.Id == aluno.Id);
            EditarAluno.NumMatricula = aluno.NumMatricula;
            EditarAluno.Nome = aluno.Nome;
            EditarAluno.Status = aluno.Status;
            EditarAluno.Telefone = aluno.Telefone;
            EditarAluno.Celular = aluno.Celular;
            EditarAluno.TipoCurso = aluno.TipoCurso;
            EditarAluno.Curso = aluno.Curso;
            EditarAluno.Turma = aluno.Turma;
            EditarAluno.Turno = aluno.Turno;
            EditarAluno.Termo = aluno.Termo;

            ctx.Alunos.Update(EditarAluno);
            ctx.SaveChanges();

            return aluno;
        }

        public AlunoDomain BuscarPorId(int id)
        {
            AlunoDomain alunoBuscado = ctx.Alunos.FirstOrDefault(x => x.Id == id);
            return alunoBuscado;
        }

        public AlunoDomain BuscarPorMatricula(string matricula)
        {
            AlunoDomain alunoBuscado = ctx.Alunos.FirstOrDefault(x => x.NumMatricula == matricula);
            return alunoBuscado;
        }
    }
}
