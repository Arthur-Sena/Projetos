import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:gradient_text/gradient_text.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/user.dart';
import 'package:masang/pages/cadastroDoacao/selecionarData.dart';
import 'package:masang/widgets/appBar.dart';
import 'package:masang/widgets/botoes.dart';
import 'package:masang/widgets/rowTextos.dart';

class ConfirmarHemocentro extends StatelessWidget {
  final User usuario;
  final Hemocentro hemocentro;

  ConfirmarHemocentro({this.hemocentro, this.usuario});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: buildAppBar(),
        body: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(height: 30),
            Row(
              children: <Widget>[
                SizedBox(
                  width: 100,
                ),
                Text(
                  "Local de doação",
                  style: TextStyle(
                      fontSize: 24,
                      fontFamily: "Helvetica",
                      fontWeight: FontWeight.w800),
                ),
                SizedBox(
                  width: 25,
                ),
                Text(
                  "2 de 5",
                  style: TextStyle(
                      fontSize: 24,
                      fontFamily: "Helvetica",
                      fontWeight: FontWeight.w800),
                ),
              ],
            ),
            SizedBox(height: 35),
            Container(
              height: 250,
              child: GoogleMap(
                initialCameraPosition: CameraPosition(
                  target: LatLng(
                    hemocentro.localizacao.latitude,
                    hemocentro.localizacao.longitude,
                  ),
                  zoom: 18.151926040649414,
                ),
                markers: Set.from([
                  Marker(
                      markerId: MarkerId(hemocentro.nome),
                      position: LatLng(hemocentro.localizacao.latitude,
                          hemocentro.localizacao.longitude))
                ]),
              ),
            ),
            SizedBox(height: 20),
            Center(
              child: Container(
                height: 40,
                width: MediaQuery.of(context).size.width / 2 + 10,
                decoration: BoxDecoration(
                    color: Color(0xE6FF0100).withOpacity(0.8),
                    borderRadius: BorderRadius.circular(10)),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: <Widget>[
                    Icon(
                      Icons.warning,
                      color: Colors.grey[200],
                    ),
                    Text(
                      "Mantenha o GPS ativo",
                      style: TextStyle(color: Colors.grey[200]),
                    )
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: GradientText(
                "Informações Gerais",
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Theme.of(context).primaryColor,
                      Theme.of(context).accentColor,
                    ]),
                style: TextStyle(fontSize: 20),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(
                      "Nome: ",
                      style:
                          TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    Container(
                      width: MediaQuery.of(context).size.width - 72,
                      child: Text("${hemocentro.nome}",
                          style: TextStyle(
                            fontSize: 15,
                          )),
                    )
                  ]),
            ),
            rowTextos(
                title: "Tipos em falta",
                content:
                    "${hemocentro.tiposEmNecessidade.toString().replaceAll('[', '').replaceAll(']', '')}"),
            rowTextos(title: "Telefone", content: "${hemocentro.telefone}"),
            rowTextos(
                title: "Horario de atendimento",
                content: "${hemocentro.horarioAtendimento}"),
            rowTextos(
                title: "Endereço",
                content:
                    "${hemocentro.endereco.rua} - ${hemocentro.endereco.numero}"),
            rowTextos(title: "CEP", content: "${hemocentro.endereco.cep}"),
            rowTextos(
                title: "Cidade", content: "${hemocentro.endereco.cidade}"),
            // botoes(context, SelectDate())
            botoes(
                context,
                SelecionarData(
                  usuario: usuario,
                  hemocentro: hemocentro,
                ),
                true),
          ],
        ));
  }
}
