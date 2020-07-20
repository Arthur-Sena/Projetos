import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:masang/controllers/doacao_controller.dart';
import 'package:masang/controllers/user_controller.dart';
import 'package:masang/models/doacao.dart';
import 'package:masang/widgets/utils.dart';

UserController controller = UserController();
DoacaoController doacaoController = DoacaoController();

Widget buildDrawer(BuildContext context) {
  TextStyle numberTitleStyle() {
    return TextStyle(
        fontFamily: "Teko", color: Theme.of(context).accentColor, fontSize: 30);
  }

  var doacoes;

  List<Doacao> futurasDoacoes = List<Doacao>();
  List<Doacao> doacoesPassadas = List<Doacao>();

  Future<void> getDonationCounter() async {
    doacoes = await doacaoController.getDoacoesByUser(controller.user.id);

    controller.setUserAttribute(doacoes: doacoes);

    if (controller.user != null && doacoes != null) {
      for (int i = 0; i < doacoes.length; i++)
        if (doacoes[i].dataDoacao.isAfter(DateTime.now())) {
          futurasDoacoes.add(doacoes[i]);
        } else {
          doacoesPassadas.add(doacoes[i]);
        }
    }
  }

  TextStyle textTitleStyle() {
    return TextStyle(
        fontFamily: "Teko",
        color: Colors.black,
        fontSize: 24,
        fontWeight: FontWeight.w200);
  }

  TextStyle infoTextStyle() {
    return TextStyle(
      fontFamily: "Teko",
      color: Colors.black,
      fontSize: 25,
      fontWeight: FontWeight.w200,
      letterSpacing: 1.2,
    );
  }

  int counter = 0;
  Future future() async {
    await controller.getUserInfo();
    await getDonationCounter();
    counter = await doacaoController.getAllDonationsCounter();
  }

  Divider myDivider() => Divider(
        indent: 20,
        endIndent: 20,
        thickness: 1,
        height: 10,
        color: Theme.of(context).primaryColor,
      );

  return FutureBuilder(
    future: future(),
    builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
      if (snapshot.connectionState == ConnectionState.done) {
        return Drawer(
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: <Widget>[
              SizedBox(height: 50),
              Center(
                child: Observer(
                  builder: (_) => CircleAvatar(
                    backgroundImage: NetworkImage(controller
                                    .user.caminhoImagem ==
                                null ||
                            controller.user.caminhoImagem == ""
                        ? 'https://static.thenounproject.com/png/363639-200.png'
                        : controller.user.caminhoImagem),
                    radius: 60.0,
                  ),
                ),
              ),
              SizedBox(height: 5),
              Observer(
                builder: (_) => Text(
                  "${controller.user.nome}",
                  style: TextStyle(
                      fontFamily: "Teko",
                      color: Colors.black,
                      fontSize: 30,
                      fontWeight: FontWeight.w200),
                ),
              ),
              SizedBox(height: 5),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Column(
                    children: <Widget>[
                      Observer(
                        builder: (_) => Text(
                          '${doacoesPassadas.length * 4} ',
                          style: numberTitleStyle(),
                        ),
                      ),
                      Text("Vidas salvas", style: textTitleStyle())
                    ],
                  ),
                  Column(
                    children: <Widget>[
                      Observer(
                        builder: (_) => Text('${doacoesPassadas.length}',
                            style: numberTitleStyle()),
                      ),
                      Text(
                          "Doaç${doacoesPassadas.length == 1 ? "ão" : "ões"} realizada${doacoesPassadas.length == 1 ? "" : "s"}",
                          style: textTitleStyle())
                    ],
                  ),
                ],
              ),
              myDivider(),
              SizedBox(height: 60),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Observer(
                    builder: (_) => Text(
                        "Meu tipo sanguineo: ${controller.user.tipoSanguineo}",
                        style: infoTextStyle()),
                  ),
                  SizedBox(height: 5),
                  Observer(
                      builder: (_) => Text(
                          controller.user.doacoes.length == 0
                              ? ""
                              : "Última doação: ${tratarData(doacoesPassadas[0].dataDoacao)}",
                          style: infoTextStyle())),
                  SizedBox(height: 5),
                  Text(
                      futurasDoacoes.length == 0
                          ? "Próxima doação: não marcada"
                          : "Próxima doação: ${tratarData(futurasDoacoes[0].dataDoacao)}",
                      style: infoTextStyle()),
                ],
              ),
              myDivider(),
              SizedBox(
                height: 20,
              ),
              Text('${counter * 4}', style: numberTitleStyle()),
              Text("Vidas salvas por todos os usuários",
                  style: infoTextStyle()),
              SizedBox(height: 20),
              myDivider(),
              FlatButton(
                onPressed: () {
                  Navigator.pushNamed(context, "/editUser");
                },
                child: Row(
                  children: <Widget>[
                    SizedBox(width: 15),
                    Icon(Icons.edit),
                    SizedBox(width: 5),
                    Text("Editar perfil")
                  ],
                ),
              ),
              FlatButton(
                child: Row(
                  children: <Widget>[
                    SizedBox(width: 15),
                    Icon(Icons.exit_to_app),
                    SizedBox(width: 5),
                    Text("Deslogar")
                  ],
                ),
                onPressed: () async {
                  await controller.deslogar();
                  Navigator.popAndPushNamed(context, '/');
                },
              ),
            ],
          ),
        );
      } else {
        return Drawer(
          child: Center(
            child: CircularProgressIndicator(),
          ),
        );
      }
    },
  );
}
