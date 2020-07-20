import "dart:convert";
import "package:geolocator/geolocator.dart";
import "package:masang/models/endereco.dart";
import "package:masang/models/hemocentro.dart";
import "package:mobx/mobx.dart";
import "package:http/http.dart" as http;

part "hemocentro_controller.g.dart";

class HemocentroController = HemocentroControllerBase
    with _$HemocentroController;

abstract class HemocentroControllerBase with Store {
  @observable
  Hemocentro hemocentro = new Hemocentro();

  @observable
  List<Hemocentro> listaHemocentros = new List<Hemocentro>();

  @action
  Future<void> listarHemocentros() async {
    http.Response response = await http
        .get("https://masang.dev.objects.universum.blue/hemocentros/");

    if (response.statusCode == 200) {
      List<dynamic> body = jsonDecode(response.body);
      if (listaHemocentros.length == 0) {
        body.forEach((element) {
          var hemocentro = Hemocentro(
              id: element["id"],
              nome: element["nome"],
              tiposEmNecessidade:
                  List<String>.from(jsonDecode(element["tiposEmNecessidade"])),
              localizacao: Position(
                latitude: double.parse(
                    jsonDecode(element['localizacao'])['latitude']),
                longitude: double.parse(
                    jsonDecode(element['localizacao'])['longitude']),
              ),
              telefone: element['telefone'],
              horarioAtendimento: element['horarioatendimento'],
              endereco: Endereco(
                cep: jsonDecode(element['endereco'])['cep'],
                cidade: jsonDecode(element['endereco'])['cidade'],
                complemento: jsonDecode(element['endereco'])['complemento'],
                estado: jsonDecode(element['endereco'])['estado'],
                numero: jsonDecode(element['endereco'])['numero'],
                rua: jsonDecode(element['endereco'])['rua'],
              ));
          listaHemocentros.add(hemocentro);
        });
      }
    }
  }
}
