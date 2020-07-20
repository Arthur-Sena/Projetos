import 'dart:async';
import 'dart:io';

import 'package:masang/controllers/doacao_controller.dart';
import 'package:masang/models/doacao.dart';
import 'package:mobx/mobx.dart';
import 'dart:convert';
import 'package:masang/models/user.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

part 'user_controller.g.dart';

class UserController = UserControllerBase with _$UserController;

abstract class UserControllerBase with Store {
  @observable
  User user = User();

  DoacaoController doacaoController = DoacaoController();

  @observable
  List<Doacao> doacoesPassadas = List<Doacao>();
  List<Doacao> futurasDoacoes = List<Doacao>();

  @action
  Future<int> cadastrarUser() async {
    bool hasAnyNullAttributes = user.nome == null &&
        user.email == null &&
        user.dataNascimento == null &&
        user.genero == null &&
        user.senha == null &&
        user.tipoSanguineo == null;

    bool userExists = false;

    if (!hasAnyNullAttributes && !userExists) {
      http.Response responseObjects;
      http.Response responseSingularity;
      try {
        responseObjects = await http.post(
            'https://masang.dev.objects.universum.blue/usuarios/',
            body: jsonEncode(<String, dynamic>{
              "label": "usuario",
              "nome": user.nome,
              "email": user.email,
              "sexo": user.genero,
              "dataNascimento": user.dataNascimento.toString(),
              "aptoADoar": "",
              "tipoSanguineo": user.tipoSanguineo
            }));
        print(responseObjects.statusCode);
        if (responseObjects.statusCode == 200) {
          var id = jsonDecode(responseObjects.body)["id"];
          user.id = id;
          responseSingularity = await http.post(
            'https://masang-id-dev.azurewebsites.net/api/users',
            headers: {HttpHeaders.contentTypeHeader: "application/json"},
            body: jsonEncode(<String, dynamic>{
              "id": id,
              "user": user.email,
              "password": user.senha
            }),
          );
        }
        return responseSingularity.statusCode;
      } on TimeoutException {
        return 408;
      }
    }
    return 400;
  }

  @action
  Future<String> realizarLogin() async {
    Map<String, dynamic> body = {
      'username': user.email,
      'password': user.senha,
      'scope': 'api1',
      'client_id': 'ro.client',
      'client_secret': 'secret',
      'grant_type': 'password'
    };

    http.Response responseSingularity = await http.post(
      'https://masang-id-dev.azurewebsites.net/connect/token',
      headers: {
        HttpHeaders.contentTypeHeader: "application/x-www-form-urlencoded"
      },
      body: body,
    );

    if (responseSingularity.statusCode == 200) {
      var token = jsonDecode(responseSingularity.body)["access_token"];
      user.id = jsonDecode(responseSingularity.body)["id"];

      SharedPreferences prefs = await SharedPreferences.getInstance();
      prefs.setString('token', token);
      prefs.setString('id', user.id);
      return token;
    }
    return null;
  }

  Future<void> deslogar() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    prefs.remove('token');
    prefs.remove('id');
  }

  @action
  Future<http.Response> atualizarUsuario() async {
    http.Response responseObjects;

    responseObjects = await http
        .put('https://masang.dev.objects.universum.blue/usuarios/${user.id}',
            body: jsonEncode(<String, dynamic>{
              "label": "usuario",
              "nome": user.nome,
              "email": user.email,
              "sexo": user.genero,
              "dataNascimento": user.dataNascimento.toString(),
              "aptoADoar": user.aptoADoar,
              "tipoSanguineo": user.tipoSanguineo,
              "caminhoImagem": user.caminhoImagem,
            }))
        .catchError(
      (error) {
        print(error);
      },
    );
    return responseObjects;
  }

  @action
  String setUserAttribute({
    String email,
    String senha,
    String nome,
    DateTime dataNascimento,
    bool aptoADoar,
    String genero,
    List<Doacao> doacoes,
    String tipoSanguineo,
    String caminhoImagem,
  }) {
    if (doacoes != null) {
      user.doacoes = doacoes;
    }
    if (nome != null) {
      user.nome = nome;
    }
    if (email != null) {
      user.email = email;
    }
    if (dataNascimento != null) {
      user.dataNascimento = dataNascimento;
    }
    if (aptoADoar != null) {
      user.aptoADoar = aptoADoar;
    }
    if (genero != null) {
      user.genero = genero;
    }
    if (tipoSanguineo != null) {
      user.tipoSanguineo = tipoSanguineo;
    }
    if (senha != null) {
      user.senha = senha;
    }
    if (caminhoImagem != null) {
      user.caminhoImagem = caminhoImagem;
    }
    return user.toString();
  }

  Future<void> enviarImagem(File file) async {
    http.Response response = await http.post(
        "https://masang.dev.files.universum.blue/${user.id}",
        body: file.readAsBytesSync(),
        headers: {'Content-Type': 'image/png'});

    this.setUserAttribute(caminhoImagem: jsonDecode(response.body)['Uri']);
  }

  @action
  Future<void> getUserInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var id = prefs.getString('id');

    List<Doacao> doacoes = List<Doacao>();

    http.Response response;
    try {
      response = await http
          .get('https://masang.dev.objects.universum.blue/usuarios/$id')
          .catchError((error) {
        print(error);
      });
    } on SocketException catch (e) {
      print(e.message);
    }

    var responseDoacoes = await doacaoController.getDoacoesByUser(id);

    if (responseDoacoes.length != 0) {
      doacoes = responseDoacoes;
    }

    var json = jsonDecode(response.body);
    user = User(
        id: id,
        nome: json["nome"],
        email: json["email"],
        aptoADoar: json["aptoADoar"].toString().toLowerCase() == "true",
        dataNascimento: DateTime.parse(json["dataNascimento"]),
        tipoSanguineo: json["tipoSanguineo"],
        genero: json["sexo"],
        caminhoImagem: json["caminhoImagem"],
        doacoes: doacoes);
  }
}
