import 'package:flutter/material.dart';
import 'package:gradient_text/gradient_text.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/user.dart';
import 'package:masang/pages/cadastroDoacao/confirmarHemocentro.dart';
import 'package:masang/widgets/utils.dart';

class ConfirmarUser extends StatelessWidget {
  final User usuario;
  final Hemocentro hemocentro;

  ConfirmarUser({this.usuario, this.hemocentro});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        SizedBox(height: 30),
        Row(
          children: <Widget>[
            SizedBox(
              width: 100,
            ),
            Text(
              "Dados Pessoais",
              style: TextStyle(
                  fontSize: 24,
                  fontFamily: "Helvetica",
                  fontWeight: FontWeight.w800),
            ),
            SizedBox(
              width: 25,
            ),
            Text(
              "1 de 5",
              style: TextStyle(
                  fontSize: 24,
                  fontFamily: "Helvetica",
                  fontWeight: FontWeight.w800),
            ),
          ],
        ),
        SizedBox(
          height: 55,
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30.0),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: <
                  Widget>[
            Text("Nome:", style: TextStyle(fontSize: 20)),
            SizedBox(height: 5),
            Container(
              width: MediaQuery.of(context).size.width / 5 * 4,
              child: Text(
                "${usuario.nome}",
                style: TextStyle(fontSize: 18, color: Colors.grey[700]),
              ),
              decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(color: Colors.grey[700]))),
            ),
            SizedBox(height: 30),
            Text("Email:", style: TextStyle(fontSize: 20)),
            SizedBox(height: 5),
            Container(
              width: MediaQuery.of(context).size.width / 5 * 4,
              child: Text(
                "${usuario.email}",
                style: TextStyle(fontSize: 18, color: Colors.grey[700]),
              ),
              decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(color: Colors.grey[700]))),
            ),
            SizedBox(height: 30),
            Text("Data de Nascimento:", style: TextStyle(fontSize: 20)),
            SizedBox(height: 5),
            Container(
              width: MediaQuery.of(context).size.width / 5 * 4,
              child: Text(
                "${tratarData(usuario.dataNascimento)}",
                style: TextStyle(fontSize: 18, color: Colors.grey[700]),
              ),
              decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(color: Colors.grey[700]))),
            ),
            SizedBox(height: 30),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: <Widget>[
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text("Tipo Sanguíneo:", style: TextStyle(fontSize: 20)),
                    SizedBox(height: 10),
                    Container(
                      width: MediaQuery.of(context).size.width / 5 * 1.7,
                      child: Text(
                        "${usuario.tipoSanguineo.length == 3 ? usuario.tipoSanguineo[0] + usuario.tipoSanguineo[1] : usuario.tipoSanguineo[0]}",
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 18, color: Colors.grey[700]),
                      ),
                      decoration: BoxDecoration(
                          border: Border(
                              bottom: BorderSide(color: Colors.grey[700]))),
                    )
                  ],
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text("Fator RH:", style: TextStyle(fontSize: 20)),
                    SizedBox(height: 10),
                    Container(
                      width: MediaQuery.of(context).size.width / 5 * 1.7,
                      child: Text(
                        "${usuario.tipoSanguineo.length == 3 ? usuario.tipoSanguineo[2] : usuario.tipoSanguineo[1]}",
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 18, color: Colors.grey[700]),
                      ),
                      decoration: BoxDecoration(
                          border: Border(
                              bottom: BorderSide(color: Colors.grey[700]))),
                    )
                  ],
                ),
              ],
            ),
            SizedBox(height: 30),
            Text("Aptidão:", style: TextStyle(fontSize: 20)),
            SizedBox(height: 5),
            Container(
              width: MediaQuery.of(context).size.width / 5 * 4,
              child: Text(
                "${usuario.aptoADoar ? "Você está apto a doar" : "Algum fator te impede de doar, verifique os requisitos novamente"}",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 19, color: Colors.grey[700]),
              ),
              decoration: BoxDecoration(
                  border: Border(bottom: BorderSide(color: Colors.grey[700]))),
            ),
            SizedBox(
              height: 50,
            ),
            Row(
              children: <Widget>[
                SizedBox(
                  width: 100,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(
                      horizontal: 5.0, vertical: 2.0),
                  child: FlatButton(
                    onPressed: () {
                      Navigator.popAndPushNamed(context, '/home');
                    },
                    child: GradientText(
                      "Cancelar",
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
                Container(
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
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: usuario.aptoADoar
                            ? FlatButton(
                                onPressed: () {
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              ConfirmarHemocentro(
                                                usuario: usuario,
                                                hemocentro: hemocentro,
                                              )));
                                },
                                child: GradientText(
                                  "Confirmar",
                                  gradient: LinearGradient(
                                      begin: Alignment.topCenter,
                                      end: Alignment.bottomCenter,
                                      colors: [
                                        Theme.of(context).primaryColor,
                                        Theme.of(context).accentColor,
                                      ]),
                                ),
                              )
                            : Container()),
                  ),
                ),
              ],
            )
          ]),
        ),
      ],
    );
  }
}
