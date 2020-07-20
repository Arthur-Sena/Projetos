import 'package:flutter/material.dart';
import 'package:masang/models/doacao.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/user.dart';
import 'package:masang/pages/cadastroDoacao/revisaoFinal.dart';
import 'package:masang/widgets/appBar.dart';
import 'package:masang/widgets/aviso.dart';
import 'package:masang/widgets/botoes.dart';

class UltimosAvisos extends StatelessWidget {
  final User usuario;
  final Hemocentro hemocentro;
  final Doacao doacao;

  UltimosAvisos({Key key, this.usuario, this.hemocentro, this.doacao})
      : super(key: key);

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
                "Últimos Avisos",
                style: TextStyle(
                    fontSize: 24,
                    fontFamily: "Helvetica",
                    fontWeight: FontWeight.w800),
              ),
              SizedBox(
                width: 25,
              ),
              Text(
                "4 de 5",
                style: TextStyle(
                    fontSize: 24,
                    fontFamily: "Helvetica",
                    fontWeight: FontWeight.w800),
              ),
            ],
          ),
          SizedBox(height: 50),
          Center(
            child: Container(
              height: 250,
              width: 300,
              decoration: BoxDecoration(
                color: Color(0xE6FF0100).withOpacity(0.8),
                borderRadius: BorderRadius.circular(5),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Text(
                      "Avisos Gerais",
                      style: TextStyle(fontSize: 20, color: Colors.white),
                    ),
                  ),
                  aviso(
                    context: context,
                    aviso: "Não se esqueça de levar seus documentos pessoais",
                  ),
                  SizedBox(height: 10),
                  aviso(
                      context: context,
                      aviso:
                          "Comparecer não implica estar apto a doar, verifique os critérios antecipadamente"),
                  SizedBox(height: 10),
                  aviso(
                      context: context,
                      aviso: "Esteja atento aos sintomas do COVID"),
                ],
              ),
            ),
          ),
          SizedBox(height: 40),
          Center(
            child: Container(
              height: 150,
              width: 300,
              decoration: BoxDecoration(
                color: Color(0xFFEF8125).withOpacity(0.8),
                borderRadius: BorderRadius.circular(5),
              ),
              child: Column(
                children: <Widget>[
                  SizedBox(
                    height: 10,
                  ),
                  Text(
                    "Agradecemos pela contribuição",
                    style: TextStyle(color: Colors.white, fontSize: 20),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 15),
                  Text(
                    "Sua doação salva vidas, após a doação você estará inapto a doar durante alguns dias",
                    style: TextStyle(color: Colors.white, fontSize: 18),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            ),
          ),
          SizedBox(height: 80),
          Row(
            children: <Widget>[
              SizedBox(width: 50),
              botoes(
                  context,
                  RevisaoFinal(
                    usuario: usuario,
                    doacao: doacao,
                    hemocentro: hemocentro,
                  ),
                  true)
            ],
          )
        ],
      ),
    );
  }
}
