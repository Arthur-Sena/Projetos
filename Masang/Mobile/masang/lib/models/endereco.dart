class Endereco {
  String estado;
  String cidade;
  String rua;
  String cep;
  String numero;
  String complemento;

  Endereco({this.estado, this.cidade, this.rua, this.cep, this.numero, this.complemento});

  factory Endereco.fromJson(Map<String, dynamic> json) {
    return Endereco(
      numero: json['numero'],
      cep: json['cep'],
      cidade: json['cidade'],
      complemento: json['complemento'],
      estado: json['estado'],
      rua: json['rua'],
    );
  }
}
