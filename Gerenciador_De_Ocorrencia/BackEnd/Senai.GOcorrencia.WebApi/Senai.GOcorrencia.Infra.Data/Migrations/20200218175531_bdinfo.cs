using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Senai.GOcorrencia.Infra.Data.Migrations
{
    public partial class bdinfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    NumeroMatricula = table.Column<string>(type: "varchar(100)", nullable: false),
                    Nome = table.Column<string>(type: "varchar(100)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    Telefone = table.Column<string>(type: "varchar(100)", nullable: false),
                    Celular = table.Column<string>(type: "varchar(100)", nullable: false),
                    TipoCurso = table.Column<string>(type: "varchar(100)", nullable: false),
                    Curso = table.Column<string>(type: "varchar(100)", nullable: false),
                    Turma = table.Column<string>(type: "varchar(100)", nullable: false),
                    Turno = table.Column<string>(type: "varchar(100)", nullable: false),
                    Termo = table.Column<string>(type: "varchar(100)", nullable: false),
                    Imagem = table.Column<string>(type: "varchar(3000)", nullable: true),
                    Ocorrencias = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Nome = table.Column<string>(type: "varchar(100)", nullable: false),
                    NIF = table.Column<string>(type: "varchar(100)", nullable: false),
                    Senha = table.Column<string>(type: "varchar(100)", nullable: false),
                    Tipo = table.Column<string>(type: "varchar(30)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Alunos",
                columns: new[] { "Id", "Celular", "Curso", "Imagem", "Nome", "NumeroMatricula", "Ocorrencias", "Status", "Telefone", "Termo", "TipoCurso", "Turma", "Turno" },
                values: new object[] { 1, "(11)912341234", "Testando", null, "Teste", "12345678", null, true, "(11)12341234", "1", "Curso Teste", "1TT", "Teste" });

            migrationBuilder.InsertData(
                table: "Usuarios",
                columns: new[] { "Id", "NIF", "Nome", "Senha", "Tipo" },
                values: new object[] { 1, "123456789", "Teste", "123456", "ADMINISTRADOR" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Alunos");

            migrationBuilder.DropTable(
                name: "Usuarios");
        }
    }
}
