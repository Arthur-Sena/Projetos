import 'dart:convert';

import 'package:geolocator/geolocator.dart';
import 'package:masang/models/doacao.dart';
import 'endereco.dart';

class Hemocentro {
  String id;
  String nome;
  String telefone;
  Position localizacao;
  Endereco endereco;
  String horarioAtendimento;
  List<String> tiposEmNecessidade;
  List<Doacao> doacoes;
  double distancia;

  Hemocentro(
      {this.id,
      this.nome,
      this.localizacao,
      this.endereco,
      this.horarioAtendimento,
      this.telefone,
      this.tiposEmNecessidade,
      this.distancia});

  factory Hemocentro.fromJson(Map<String, dynamic> json) => Hemocentro(
        endereco: new Endereco.fromJson(jsonDecode(json['endereco'])),
        id: json['id'],
        nome: json['nome'],
        tiposEmNecessidade:
            List<String>.from(jsonDecode(json['tiposEmNecessidade'])),
        localizacao: Position(latitude: 0, longitude: 0),
      );
  // @override
  // String toString() {
  //   return "Nome:$nome\nLocalizacao:$localizacao\n";
  // }
}
