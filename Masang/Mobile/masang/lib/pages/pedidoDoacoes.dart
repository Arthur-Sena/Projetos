import 'package:flutter/material.dart';
import 'package:masang/controllers/pedido_controller.dart';
import 'package:masang/controllers/user_controller.dart';
import 'package:masang/models/pedido.dart';
import 'package:masang/widgets/drawer.dart';
import 'package:masang/widgets/rowTextos.dart';
import 'package:share/share.dart';

class PedidosDoacoes extends StatefulWidget {
  @override
  _PedidosDoacoesState createState() => _PedidosDoacoesState();
}

class _PedidosDoacoesState extends State<PedidosDoacoes> {
  Widget title({String titulo}) {
    return Center(
      child: Text(
        "$titulo",
        style: TextStyle(
          fontWeight: FontWeight.w100,
          fontFamily: "Teko",
          color: Theme.of(context).accentColor,
          fontSize: 30,
        ),
      ),
    );
  }

  PedidoController pedidoController = new PedidoController();
  UserController userController = new UserController();

  String getCorrespondentType(String tipo) {
    switch (tipo.toUpperCase()) {
      case 'AB+':
        return 'A+, B+, AB+, AB-, B+, B-, O+, O-';
        break;
      case 'AB-':
        return 'A-, B-, AB-, O-';
        break;
      case 'A+':
        return 'A+, A-, O+, O-';
        break;
      case 'A-':
        return 'A-, O-';
        break;
      case 'B+':
        return 'B+, B-, O+, O-';
        break;
      case 'B-':
        return 'B- , O-';
        break;
      case 'O+':
        return 'O+, O-';
        break;
      case 'O-':
        return 'O-';
        break;
    }
    return '';
  }

  Widget tilePedido({Pedido pedido}) {
    var a = getCorrespondentType(pedido.user.tipoSanguineo);
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 25, vertical: 20),
      child: Stack(
        overflow: Overflow.visible,
        children: <Widget>[
          Container(
            height: 130,
            width: 350,
            decoration: BoxDecoration(
              border:
                  Border.all(color: Theme.of(context).primaryColor, width: 1),
              borderRadius: BorderRadius.circular(5),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 2, vertical: 1),
              child: Container(
                width: 350,
                child: Column(
                  children: <Widget>[
                    rowTextos(
                        title: "Paciente", content: '${pedido.user.nome}'),
                    SizedBox(height: 10),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 10, vertical: 5),
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: <Widget>[
                          Text(
                            "Tipo Sanguineo: ",
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          Text('$a',
                              style: TextStyle(
                                fontSize: 14,
                              ))
                        ],
                      ),
                    ),
                    SizedBox(height: 10),
                    rowTextos(
                        title: "Local de doação",
                        content:
                            '${pedido.hemocentro.endereco.rua}, ${pedido.hemocentro.endereco.numero}')
                  ],
                ),
              ),
            ),
          ),
          Positioned(
            top: 105,
            child: Row(
              children: <Widget>[
                SizedBox(
                  width: 80,
                ),
                FlatButton(
                  onPressed: () async {
                    await pedidoController.confirmarMatch(
                        pedido, controller.user);
                  },
                  child: Container(
                    height: 40,
                    width: 40,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(color: Theme.of(context).accentColor),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Icon(Icons.check),
                  ),
                ),
                FlatButton(
                  onPressed: () {
                    final RenderBox render = context.findRenderObject();
                    Share.share(
                        "${pedido.user.nome} necessita de uma doação do(s) tipo(s) $a ! Ajude-a doando em ${pedido.hemocentro.endereco.rua}\n\nReceba essas informações diretamente baixando Masang e saiba quem você está ajudando",
                        subject: "Ajude ${pedido.user.nome}",
                        sharePositionOrigin:
                            render.localToGlobal(Offset.zero) & render.size);
                  },
                  child: Container(
                    height: 40,
                    width: 40,
                    decoration: BoxDecoration(
                      color: Colors.white,
                      border: Border.all(color: Theme.of(context).accentColor),
                      borderRadius: BorderRadius.circular(50),
                    ),
                    child: Icon(Icons.share),
                  ),
                ),
                SizedBox(
                  width: 40,
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget buildList(List<Pedido> pedidos) {
    return ListView.builder(
      itemCount: pedidos.length,
      itemBuilder: (context, index) => tilePedido(pedido: pedidos[index]),
    );
  }

  Future future() async {
    await controller.getUserInfo();
    return await pedidoController.listarPedidos();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: () {
          Navigator.pushNamed(context, '/addPedido');
        },
      ),
      body: FutureBuilder(
          future: future(),
          builder: (context, snapshot) {
            return snapshot.connectionState == ConnectionState.done &&
                    snapshot.hasData
                ? Column(
                    children: <Widget>[
                      SizedBox(height: 10),
                      title(titulo: "Pedidos de doação de sangue"),
                      (snapshot.data.length == 0)
                          ? Text("Não há pedidos de doação")
                          : Container(
                              height: 650, child: buildList(snapshot.data)),
                    ],
                  )
                : Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        CircularProgressIndicator(),
                        Text("Procurando pedidos de doação...")
                      ],
                    ),
                  );
          }),
    );
  }
}
