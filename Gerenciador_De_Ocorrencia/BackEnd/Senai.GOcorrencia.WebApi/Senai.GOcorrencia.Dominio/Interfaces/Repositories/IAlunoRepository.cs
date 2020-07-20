using Senai.GOcorrencia.Dominio.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Senai.GOcorrencia.Dominio.Interfaces.Repositories
{
    public interface IAlunoRepository
    {
        List<AlunoDomain> ListarAlunos();

        AlunoDomain BuscarPorId(int id);

        AlunoDomain BuscarPorMatricula(string matricula);

        AlunoDomain CadastrarAluno(AlunoDomain aluno);

        AlunoDomain EditarAluno(AlunoDomain aluno);

    }
}
