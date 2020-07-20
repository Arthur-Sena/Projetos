import 'dart:convert';

import 'package:geolocator/geolocator.dart';
import 'package:masang/models/endereco.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/pedido.dart';
import 'package:masang/models/user.dart';
import 'package:mobx/mobx.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

part 'pedido_controller.g.dart';

class PedidoController = PedidoControllerBase with _$PedidoController;

abstract class PedidoControllerBase with Store {
  @observable
  List<Pedido> pedidos = List<Pedido>();

  @action
  Future<void> cadastrarNovoPedido(Pedido pedido) async {
    http.Response response =
        await http.post('https://masang.dev.objects.universum.blue/pedidos/',
            body: jsonEncode(<String, dynamic>{
              'label': 'pedidos',
              'efetuadoMatch': pedido.matchRealizado.toString(),
              'dataSolicitacao': DateTime.now().toString(),
              'tipoSanguineo': pedido.user.tipoSanguineo,
            }));

    if (response.statusCode == 200) {
      var body = jsonDecode(response.body);
      await Future.wait([
        http.post(
            'https://masang.dev.objects.universum.blue/pedidos/${body['id']}/addE/pedidoToUsuarioNecessitado/to/usuarios/${pedido.user.id}'),
        http.post(
            'https://masang.dev.objects.universum.blue/pedidos/${body['id']}/addE/pedidoDoacao/to/hemocentros/${pedido.hemocentro.id}'),
      ]);
    }
  }

  String getCorrespondentType(String tipo) {
    switch (tipo.toUpperCase()) {
      case 'AB+':
        return 'A+, B+, AB+, AB-, B+, B-, O+, O-';
        break;
      case 'AB-':
        return 'A-, B-, AB-, O-';
        break;
      case 'A+':
        return 'A+, A-, O+, O-';
        break;
      case 'A-':
        return 'A-, O-';
        break;
      case 'B+':
        return 'B+, B-, O+, O-';
        break;
      case 'B-':
        return 'B- , O-';
        break;
      case 'O+':
        return 'O+, O-';
        break;
      case 'O-':
        return 'O-';
        break;
    }
    return '';
  }

  @action
  Future<void> confirmarMatch(Pedido pedido, User usuarioDoador) async {
    var response = await http.put(
        'https://masang.dev.objects.universum.blue/pedidos/${pedido.id}',
        body: jsonEncode(<String, dynamic>{
          'efetuadoMatch': true,
          'dataMatch': DateTime.now().toString(),
        }));

    if (response.statusCode == 200) {
      Future.wait([
        http.post(
            'https://masang.dev.objects.universum.blue/pedidos/${pedido.id}/addE/pedidoToUsuarioDoador/to/usuarios/${usuarioDoador.id}'),
        http.post(
            'https://masang.dev.objects.universum.blue/usuarios/${usuarioDoador.id}/addE/userDoadorToPedido/to/pedidos/${pedido.id}')
      ]);
    }
  }

  @action
  Future<void> listarPedidos() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    var idUsuario = prefs.getString('id');

    http.Response responsePedidos =
        await http.get('https://masang.dev.objects.universum.blue/pedidos/');

    var body = jsonDecode(responsePedidos.body);
    for (int i = 0; i < body.length; i++) {
      if (body[i]['efetuadoMatch'].toString().toLowerCase() != 'true') {
        var a = await Future.wait([
          http.get(
              'https://masang.dev.objects.universum.blue/pedidos/${body[i]['id']}/pedidoToUsuarioNecessitado'),
          http.get(
              'https://masang.dev.objects.universum.blue/pedidos/${body[i]['id']}/pedidoDoacao'),
        ]);

        var responseUser = jsonDecode(a[0].body);
        var responseHemocentro = jsonDecode(a[1].body);

        if (responseUser.length != 0) {
          var pedido = Pedido(
            id: body[i]["id"],
            matchRealizado:
                body[i]['efetuadoMatch'].toString().toLowerCase() == 'true',
            user: User(
                id: idUsuario,
                nome: responseUser[0]["nome"],
                email: responseUser[0]["email"],
                aptoADoar:
                    responseUser[0]["aptoADoar"].toString().toLowerCase() ==
                        "true",
                dataNascimento:
                    DateTime.parse(responseUser[0]["dataNascimento"]),
                tipoSanguineo: body[i]["tipoSanguineo"],
                genero: responseUser[0]["sexo"],
                caminhoImagem: responseUser[0]["caminhoImagem"]),
            hemocentro: Hemocentro(
              id: responseHemocentro[0]["id"],
              nome: responseHemocentro[0]["nome"],
              tiposEmNecessidade: List<String>.from(
                  jsonDecode(responseHemocentro[0]["tiposEmNecessidade"])),
              localizacao: Position(
                latitude: double.parse(jsonDecode(
                    responseHemocentro[0]['localizacao'])['latitude']),
                longitude: double.parse(jsonDecode(
                    responseHemocentro[0]['localizacao'])['longitude']),
              ),
              telefone: responseHemocentro[0]['telefone'],
              horarioAtendimento: responseHemocentro[0]['horarioatendimento'],
              endereco: Endereco(
                cep: jsonDecode(responseHemocentro[0]['endereco'])['cep'],
                cidade: jsonDecode(responseHemocentro[0]['endereco'])['cidade'],
                complemento: jsonDecode(
                    responseHemocentro[0]['endereco'])['complemento'],
                estado: jsonDecode(responseHemocentro[0]['endereco'])['estado'],
                numero: jsonDecode(responseHemocentro[0]['endereco'])['numero'],
                rua: jsonDecode(responseHemocentro[0]['endereco'])['rua'],
              ),
            ),
          );

          pedidos.add(pedido);
        }
      }
    }

    return pedidos;
  }
}
