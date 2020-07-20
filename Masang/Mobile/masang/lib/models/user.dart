import 'doacao.dart';

class User {
  String id;
  String nome;
  String email;
  String senha;
  String genero;
  bool aptoADoar;
  DateTime dataNascimento;
  String tipoSanguineo;
  String caminhoImagem;
  List<Doacao> doacoes;

  User({
    this.nome,
    this.email,
    this.senha,
    this.genero,
    this.dataNascimento,
    this.tipoSanguineo,
    this.id,
    this.aptoADoar,
    this.caminhoImagem,
    this.doacoes,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["id"],
        email: json["email"],
        genero: json["sexo"],
        aptoADoar: json["aptoADoar"].toString().toLowerCase() == "true",
        dataNascimento: DateTime.parse(json["dataNascimento"]),
        tipoSanguineo: json["tipoSanguineo"],
        nome: json["nome"],
        caminhoImagem: json['caminhoImagem'],
      );

  @override
  String toString() {
    return "Nome:$nome\nEmail:$email\nSenha:$senha\nGenero:$genero\nDataNascimento:$dataNascimento\nTipoSanguineo:$tipoSanguineo\nAptidão:$aptoADoar";
  }
}
