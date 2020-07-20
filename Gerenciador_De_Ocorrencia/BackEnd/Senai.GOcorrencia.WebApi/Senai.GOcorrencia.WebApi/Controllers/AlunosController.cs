using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using Senai.GOcorrencia.Dominio.Entities;
using Senai.GOcorrencia.Dominio.Interfaces.Repositories;
using Senai.GOcorrencia.Infra.Data.Repositories;

namespace Senai.GOcorrencia.WebApi.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private IAlunoRepository AlunoRepository { get; set; }

        public AlunosController()
        {
            AlunoRepository = new AlunoRepository();
        }

        [HttpGet("listar")]
        public IActionResult ListarAlunos()
        {
            return Ok(AlunoRepository.ListarAlunos());
        }

        [HttpPost]
        public IActionResult CadastrarAluno(AlunoDomain aluno)
        {
            try
            {
                return Ok(AlunoRepository.CadastrarAluno(aluno));
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Infeizmente algo deu errado!" + ex.Message });
            }
        }

        [HttpGet("buscarmatricula/{matricula}")]
        public IActionResult BuscarAlunoPorMatricula(string matricula)
        {
            AlunoDomain alunoBuscado = AlunoRepository.BuscarPorMatricula(matricula);

            if (alunoBuscado == null)
            {
                return NotFound();
            }
            return Ok(alunoBuscado);
        }

        [HttpPut]
        public IActionResult EditarAluno(AlunoDomain aluno)
        {
            try
            {
                AlunoDomain alunoBuscado = AlunoRepository.BuscarPorId(aluno.Id);

                if (alunoBuscado == null)
                {
                    return NotFound();
                }


                AlunoRepository.EditarAluno(aluno);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Infeizmente algo deu errado!" + ex.Message });
            }
        }

        [HttpPost("turma"), DisableRequestSizeLimit]

        public async Task<IActionResult> CadastrarTurma(IFormFile arquivo)
        {
            
            if (arquivo == null || arquivo.Length == 0)
                return BadRequest();

            using (var memoryStream = new MemoryStream())
            {
                await arquivo.CopyToAsync(memoryStream).ConfigureAwait(false);

                using (var package = new ExcelPackage(memoryStream))
                {
                    for (int i = 1; i <= package.Workbook.Worksheets.Count; i++)
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets[1];
                        int totalRows = worksheet.Dimension.End.Column;
                        int totalCollumns = worksheet.Dimension.End.Row;
                        for (int j = 2; j <= totalRows; j++)
                        {
                            AlunoDomain aluno = new AlunoDomain();

                            aluno.NumMatricula = package.Workbook.Worksheets[i].Cells[j, 1].Value.ToString();
                            aluno.Nome = package.Workbook.Worksheets[i].Cells[j, 2].Value.ToString();
                            aluno.Telefone = package.Workbook.Worksheets[i].Cells[j, 3].Value.ToString();
                            aluno.Celular = package.Workbook.Worksheets[i].Cells[j, 4].Value.ToString();
                            aluno.TipoCurso = package.Workbook.Worksheets[i].Cells[j, 5].Value.ToString();
                            aluno.Curso = package.Workbook.Worksheets[i].Cells[j, 6].Value.ToString();
                            aluno.Turma = package.Workbook.Worksheets[i].Cells[j, 7].Value.ToString();
                            aluno.Turno = package.Workbook.Worksheets[i].Cells[j, 8].Value.ToString();
                            aluno.Termo = package.Workbook.Worksheets[i].Cells[j, 9].Value.ToString();
                            aluno.Status = true; 

                            AlunoRepository.CadastrarAluno(aluno);
                            
                        }
                    }
                }
            }
            return Ok();
        }
    }
}