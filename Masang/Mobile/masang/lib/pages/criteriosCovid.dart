import 'package:flutter/material.dart';
import 'package:masang/widgets/appBar.dart';
import 'package:masang/widgets/textoEscrito.dart';

class CriteriosCovid extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Divider myDivider() => Divider(
          indent: 20,
          endIndent: 20,
          thickness: 1,
          height: 10,
          color: Theme.of(context).primaryColor,
        );

    return Scaffold(
        appBar: buildAppBar(),
        body: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              SizedBox(
                height: 10,
              ),
              textoEscrito(context,
                  texto:
                      "Devido à nova pandemia de COVID-19 alguns critérios a respeito de doação de sangue foram adicionados",
                  titulo: true),
              SizedBox(height: 40),
              textoEscrito(context,
                  texto:
                      "Os doadores que viajaram ou que sejam procedentes de países com transmissão local e casos confirmados da doença serão considerados inaptos para a doação, por um período de 14 dias após a chegada da viagem."),
              SizedBox(
                height: 10,
              ),
              myDivider(),
              SizedBox(
                height: 10,
              ),
              textoEscrito(context,
                  texto:
                      "As pessoas que tiveram diagnóstico clínico ou laboratorial de infecção pelo novo coronavírus serão consideradas inaptas por um período de 30 dias após a completa recuperação da doença - isto é, quando estiverem sem nenhum sintoma ou sequelas que possam contraindicar a doação"),
              SizedBox(
                height: 10,
              ),
              myDivider(),
              SizedBox(
                height: 10,
              ),
              textoEscrito(context,
                  texto:
                      "Os doadores que tiveram contato, nos últimos 30 dias, com pessoa com diagnóstico clínico ou laboratorial do novo coronavírus, o período de inaptidão será de 14 dias após o último contato."),
              SizedBox(
                height: 10,
              ),
              myDivider(),
              SizedBox(
                height: 10,
              ),
              textoEscrito(context,
                  texto:
                      "Os doadores de sangue que estejam em isolamento voluntário ou indicado por equipe médica, devido a sintomas de possível infecção pelo Covid, serão considerados inaptos pelo período que durar o isolamento (no mínimo 14 dias), caso não apresentem sintomas.")
            ],
          ),
        ));
  }
}
