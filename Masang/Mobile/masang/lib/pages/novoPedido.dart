import 'package:async/async.dart';
import 'package:flutter/material.dart';
import 'package:masang/controllers/hemocentro_controller.dart';
import 'package:masang/controllers/pedido_controller.dart';
import 'package:masang/controllers/user_controller.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/pedido.dart';
import 'package:masang/models/user.dart';
import 'package:masang/widgets/appBar.dart';

class NovoPedido extends StatefulWidget {
  @override
  _NovoPedidoState createState() => _NovoPedidoState();
}

class _NovoPedidoState extends State<NovoPedido> {
  Widget campoEntrada(
      {String text, String initialValue, void callback(String value)}) {
    return SizedBox(
        width: 320,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
                height: 28,
                child: Text("$text:",
                    style: TextStyle(fontFamily: "Teko", fontSize: 24))),
            TextFormField(
              enabled: false,
              style: TextStyle(
                color: Colors.black,
              ),
              initialValue: initialValue,
              decoration: InputDecoration(
                  enabledBorder: UnderlineInputBorder(
                    borderSide: BorderSide(
                        width: 1, color: Theme.of(context).primaryColor),
                  ),
                  focusColor: Colors.black),
              onChanged: (text) => {
                setState(
                  () {
                    callback(text);
                  },
                ),
              },
            ),
          ],
        ));
  }

  User user = User();
  UserController controller = UserController();
  HemocentroController hemocentroController = HemocentroController();
  PedidoController pedidoController = PedidoController();

  final AsyncMemoizer _memoizer = AsyncMemoizer();

  Widget campoEscolhas({
    String text,
    String initialValue,
    void callback(String value),
    List<String> valores,
  }) {
    return SizedBox(
      width: 320,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
              height: 28,
              width: 320,
              child: Text("$text:",
                  style: TextStyle(fontFamily: "Teko", fontSize: 24))),
          DropdownButton<String>(
            isExpanded: true,
            value: initialValue,
            hint: Text(
              "$text",
              style: TextStyle(color: Colors.black, fontSize: 17),
            ),
            iconEnabledColor: Colors.black,
            underline: Container(
              height: 1,
              color: Theme.of(context).primaryColor,
            ),
            style: TextStyle(color: Colors.black),
            onChanged: (String newValue) {
              setState(() {
                callback(newValue);
              });
            },
            items: valores.map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                  value: value,
                  child: Text(
                    value,
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 17,
                    ),
                  ));
            }).toList(),
          ),
        ],
      ),
    );
  }

  Hemocentro hemocentro;
  Future future() async {
    return this._memoizer.runOnce(() async {
      if (hemocentroController.listaHemocentros.length == 0) {
        await hemocentroController.listarHemocentros();
        hemocentro = hemocentroController.listaHemocentros[0];
      }
      await controller.getUserInfo();
      user = controller.user;
    });
  }

  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomPadding: false,
      appBar: buildAppBar(),
      body: FutureBuilder(
          future: future(),
          builder: (context, snapshot) =>
              snapshot.connectionState != ConnectionState.done || loading
                  ? Center(child: CircularProgressIndicator())
                  : Center(
                      child: Column(
                        children: <Widget>[
                          SizedBox(height: 100),
                          Container(
                            width: 300,
                            child: Text(
                              "Cadastre seu pedido!",
                              style: TextStyle(
                                fontFamily: 'Helvetica',
                                color: Theme.of(context).accentColor,
                                fontSize: 28,
                              ),
                              textAlign: TextAlign.center,
                            ),
                          ),
                          SizedBox(height: 20),
                          Text(
                            "Você está precisando de uma doação?\n Peça ajuda!",
                            style: TextStyle(
                              fontFamily: 'Helvetica',
                              fontSize: 20,
                            ),
                            textAlign: TextAlign.center,
                          ),
                          SizedBox(height: 30),
                          campoEntrada(
                            text: "Nome",
                            initialValue: "${user.nome}",
                            callback: (value) {
                              user.nome = value;
                            },
                          ),
                          SizedBox(height: 30),
                          campoEscolhas(
                              text: "Tipo Sanguíneo",
                              callback: (value) {
                                user.tipoSanguineo = value;
                              },
                              valores: [
                                "A+",
                                "A-",
                                "B+",
                                "B-",
                                "AB+",
                                "AB-",
                                "O+",
                                "O-"
                              ],
                              initialValue: "${user.tipoSanguineo}"),
                          SizedBox(height: 30),
                          SizedBox(
                            width: 320,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Container(
                                    height: 28,
                                    width: 320,
                                    child: Text("Hemocentro desejado:",
                                        style: TextStyle(
                                            fontFamily: "Teko", fontSize: 24))),
                                DropdownButton<Hemocentro>(
                                  isExpanded: true,
                                  value: hemocentro,
                                  hint: Text(
                                    "Hemocentro desejado",
                                    style: TextStyle(
                                        color: Colors.black, fontSize: 17),
                                  ),
                                  iconEnabledColor: Colors.black,
                                  underline: Container(
                                    height: 1,
                                    color: Theme.of(context).primaryColor,
                                  ),
                                  style: TextStyle(color: Colors.black),
                                  onChanged: (Hemocentro newValue) {
                                    hemocentro = newValue;
                                  },
                                  items: hemocentroController.listaHemocentros
                                      .map<DropdownMenuItem<Hemocentro>>(
                                          (Hemocentro value) {
                                    return DropdownMenuItem<Hemocentro>(
                                        value: value,
                                        child: Text(
                                          "${value.nome} - ${value.endereco.cidade}",
                                          textAlign: TextAlign.center,
                                          style: TextStyle(
                                            color: Colors.black,
                                            fontSize: 17,
                                          ),
                                        ));
                                  }).toList(),
                                ),
                              ],
                            ),
                          ),
                          SizedBox(height: 30),
                          FlatButton(
                            onPressed: () async {
                              await pedidoController.cadastrarNovoPedido(Pedido(
                                user: user,
                                hemocentro: hemocentro,
                                matchRealizado: false,
                              ));
                              Navigator.pushNamed(context, '/home');
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                  border: Border.all(
                                      color: Theme.of(context).accentColor),
                                  borderRadius: BorderRadius.circular(5)),
                              child: Padding(
                                padding: const EdgeInsets.symmetric(
                                    vertical: 10, horizontal: 20),
                                child: Text(
                                  "Cadastrar",
                                  style: TextStyle(fontSize: 20),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ),
                          )
                        ],
                      ),
                    )),
    );
  }
}
