import 'package:flutter/material.dart';
import 'package:gradient_text/gradient_text.dart';
import 'package:masang/controllers/doacao_controller.dart';
import 'package:masang/controllers/user_controller.dart';
import 'package:masang/models/doacao.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/user.dart';
import 'package:masang/widgets/appBar.dart';
import 'package:masang/widgets/rowTextos.dart';
import 'package:masang/widgets/utils.dart';

class RevisaoFinal extends StatelessWidget {
  final User usuario;
  final Hemocentro hemocentro;
  final Doacao doacao;
  final DoacaoController _doacaoController = DoacaoController();
  final UserController userController = UserController();

  RevisaoFinal({Key key, this.usuario, this.hemocentro, this.doacao})
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
                "Revisão Final",
                style: TextStyle(
                    fontSize: 24,
                    fontFamily: "Helvetica",
                    fontWeight: FontWeight.w800),
              ),
              SizedBox(
                width: 25,
              ),
              Text(
                "5 de 5",
                style: TextStyle(
                    fontSize: 24,
                    fontFamily: "Helvetica",
                    fontWeight: FontWeight.w800),
              ),
            ],
          ),
          SizedBox(height: 10),
          Center(
            child: Container(
              height: 200,
              width: 350,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(5),
                  gradient: LinearGradient(colors: [
                    Theme.of(context).primaryColor,
                    Theme.of(context).accentColor
                  ], stops: [
                    0.2,
                    1
                  ])),
              child: Padding(
                padding: const EdgeInsets.all(1.3),
                child: Container(
                  height: 400,
                  width: 350,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(5),
                  ),
                  child: Column(
                    children: <Widget>[
                      GradientText(
                        "Dados pessoais",
                        gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Theme.of(context).primaryColor,
                              Theme.of(context).accentColor,
                            ]),
                      ),
                      rowTextos(title: "Nome", content: usuario.nome),
                      rowTextos(title: "Email", content: usuario.email),
                      rowTextos(
                          title: "Data Nascimento",
                          content: tratarData(usuario.dataNascimento)),
                      rowTextos(
                          title: "Tipo Sanguíneo",
                          content: usuario.tipoSanguineo),
                    ],
                  ),
                ),
              ),
            ),
          ),
          SizedBox(height: 20),
          Center(
            child: Container(
              height: 250,
              width: 350,
              decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(5),
                  gradient: LinearGradient(colors: [
                    Theme.of(context).primaryColor,
                    Theme.of(context).accentColor
                  ], stops: [
                    0.2,
                    1
                  ])),
              child: Padding(
                padding: const EdgeInsets.all(1.3),
                child: Container(
                  height: 60,
                  width: 350,
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(5),
                  ),
                  child: Column(
                    children: <Widget>[
                      GradientText(
                        "Hemocentro",
                        style: TextStyle(fontSize: 20),
                        gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              Theme.of(context).primaryColor,
                              Theme.of(context).accentColor,
                            ]),
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 10, vertical: 5),
                        child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: <Widget>[
                            Text(
                              "Nome: ",
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                            Container(
                              width: 250,
                              child: Text("${hemocentro.nome}",
                                  style: TextStyle(
                                    fontSize: 15,
                                  )),
                            )
                          ],
                        ),
                      ),
                      rowTextos(
                          title: "Tipos em falta",
                          content: hemocentro.tiposEmNecessidade
                              .toString()
                              .replaceAll('[', '')
                              .replaceAll(']', '')),
                      rowTextos(
                          title: "Telefone", content: hemocentro.telefone),
                      rowTextos(
                          title: "Horário de atendimento",
                          content: hemocentro.horarioAtendimento),
                      rowTextos(
                          title: "Endereço",
                          content:
                              "${hemocentro.endereco.rua}, ${hemocentro.endereco.numero}"),
                      rowTextos(
                          title: "CEP", content: "${hemocentro.endereco.cep}"),
                    ],
                  ),
                ),
              ),
            ),
          ),
          SizedBox(height: 50),
          Row(
            children: <Widget>[
              SizedBox(width: 100),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 5.0, vertical: 2.0),
                child: FlatButton(
                  onPressed: () {
                    Navigator.popAndPushNamed(context, '/home');
                  },
                  child: GradientText(
                    "Cancelar",
                    style: TextStyle(fontSize: 20),
                    gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Theme.of(context).primaryColor,
                          Theme.of(context).accentColor,
                        ]),
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(1.3),
                child: Container(
                  decoration: BoxDecoration(
                    color: Color(0xAAE23433).withOpacity(0.8),
                    borderRadius: BorderRadius.circular(5),
                  ),
                  child: FlatButton(
                    onPressed: () async {
                      await _doacaoController.cadastrarNovaDoacao(doacao);

                      Navigator.popAndPushNamed(context, '/home')
                          .then((_) => userController.getUserInfo());
                    },
                    child: Text("Confirmar",
                        style: TextStyle(color: Colors.white)),
                  ),
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
