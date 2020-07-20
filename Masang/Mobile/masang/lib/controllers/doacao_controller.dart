import 'dart:convert';

import 'package:masang/models/doacao.dart';
import 'package:mobx/mobx.dart';
import 'package:http/http.dart' as http;

part 'doacao_controller.g.dart';

class DoacaoController = DoacaoControllerBase with _$DoacaoController;

abstract class DoacaoControllerBase with Store {
  @observable
  Doacao doacao = new Doacao();

  @action
  Future<int> getAllDonationsCounter() async {
    http.Response response = await http
        .get('https://masang.dev.objects.universum.blue/doacoes/count');

    return int.parse(response.body);
  }

  @action
  getDoacoesByUser(String id) async {
    List<Doacao> doacoes = List<Doacao>();

    http.Response response = await http.get(
        'https://masang.dev.objects.universum.blue/usuarios/$id/userDoacao');

    if (response.statusCode == 200) {
      var body = jsonDecode(response.body);
      if (body.length != 0) {
        for (int i = 0; i < body.length; i++) {
          // http.Response responseHemocentro = await http.get(
          //     'https://masang.dev.objects.universum.blue/doacoes/${element['id']}/userDoacoes');

          // String idHemocentro;

          // if (response.statusCode == 200 &&
          //     jsonDecode(responseHemocentro.body).length != 0) {
          //   idHemocentro = jsonDecode(responseHemocentro.body)[0]['id'];
          // }

          var doacao = Doacao(
            dataDoacao: DateTime.parse(body[i]['dataHora']),
            idUsuario: id,
          );

          doacoes.add(doacao);
        }
      }
    }
    return doacoes;
  }

  @action
  Future<Doacao> cadastrarNovaDoacao(Doacao doacao) async {
    http.Response post = await http.post(
        'https://masang.dev.objects.universum.blue/doacoes/',
        body: jsonEncode(<String, dynamic>{
          'label': 'doacoes',
          'dataHora': doacao.dataDoacao.toString()
        }));

    if (post.statusCode == 200) {
      var id = jsonDecode(post.body)['id'];
      http.Response edgeUsuario = await http.post(
          'https://masang.dev.objects.universum.blue/usuarios/${doacao.idUsuario}/addE/userDoacao/to/doacoes/$id');

      http.Response edgeHemocentroDoacao = await http.post(
          'https://masang.dev.objects.universum.blue/hemocentros/${doacao.idHemocentro}/addE/hemocentroDoacao/to/doacoes/$id');

      http.Response edgeDoacaoHemocentro = await http.post(
          'https://masang.dev.objects.universum.blue/doacoes/$id/addE/doacaoHemocentro/to/hemocentros/${doacao.idHemocentro}');

      if (edgeUsuario.statusCode != 200 ||
          edgeHemocentroDoacao.statusCode != 200 ||
          edgeDoacaoHemocentro.statusCode != 200) {
        print(
            "edgeUsuario: ${edgeUsuario.statusCode}\nedgeHemocentroDoacao: ${edgeHemocentroDoacao.statusCode}\nedgeDoacaoHemocentro: ${edgeDoacaoHemocentro.statusCode}");
        throw Exception();
      }
    }
    return doacao;
  }
}
