import 'dart:convert';

import 'package:masang/models/campanha.dart';
import 'package:mobx/mobx.dart';
import 'package:http/http.dart' as http;

part 'campanha_controller.g.dart';

class CampanhaController = CampanhaControllerBase with _$CampanhaController;

abstract class CampanhaControllerBase with Store {
  @action
  Future<List<Campanha>> listarCampanhas() async {
    var response =
        await http.get('https://masang.dev.objects.universum.blue/campanhas');
    List<Campanha> campanhas = List<Campanha>();
    if (response.statusCode == 200) {
      var body = jsonDecode(response.body);

      for (int i = 0; i < body.length; i++) {
        var campanha = Campanha.fromJson(body[i]);
        campanhas.add(campanha);
      }
    }
    return campanhas;
  }
}
