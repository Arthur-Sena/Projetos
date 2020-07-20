import 'package:flutter/material.dart';
import 'package:masang/models/doacao.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/user.dart';
import 'package:masang/pages/cadastroDoacao/ultimosAvisos.dart';
import 'package:masang/widgets/appBar.dart';
import 'package:masang/widgets/botoes.dart';
import 'package:masang/widgets/utils.dart';

class SelecionarData extends StatefulWidget {
  final User usuario;
  final Hemocentro hemocentro;

  SelecionarData({Key key, this.usuario, this.hemocentro}) : super(key: key);

  @override
  _SelecionarDataState createState() => _SelecionarDataState();
}

class _SelecionarDataState extends State<SelecionarData> {
  bool dataEscolhida = false;
  DateTime data;

  Future<Null> _selectDate(BuildContext context) async {
    setState(() {
      data = widget
          .usuario.doacoes[widget.usuario.doacoes.length - 1].dataDoacao
          .add(Duration(days: widget.usuario.genero == 'Masculino' ? 60 : 90));
    });
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: data,
        firstDate: data,
        lastDate: DateTime.now().add(Duration(days: 365)));
    if (picked != null) {
      setState(() {
        data = picked;
        dataEscolhida = true;
      });
    }
  }

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
                    width: 65,
                  ),
                  Text(
                    "Selecione uma data",
                    style: TextStyle(
                        fontSize: 24,
                        fontFamily: "Helvetica",
                        fontWeight: FontWeight.w800),
                  ),
                  SizedBox(
                    width: 25,
                  ),
                  Text(
                    "3 de 5",
                    style: TextStyle(
                        fontSize: 24,
                        fontFamily: "Helvetica",
                        fontWeight: FontWeight.w800),
                  ),
                ],
              ),
              Center(
                  child: Column(
                children: <Widget>[
                  Text("Selecione a data da doação"),
                  SizedBox(height: 100),
                  FlatButton(
                    onPressed: () {
                      _selectDate(context);
                    },
                    child: Row(children: <Widget>[
                      SizedBox(width: 70),
                      Icon(Icons.calendar_today),
                      SizedBox(width: 30),
                      Text(!dataEscolhida ? 'dd/mm/aaaa' : tratarData(data))
                    ]),
                  ),
                  botoes(
                      context,
                      UltimosAvisos(
                        usuario: widget.usuario,
                        hemocentro: widget.hemocentro,
                        doacao: Doacao(
                            dataDoacao: data,
                            idHemocentro: widget.hemocentro.id,
                            idUsuario: widget.usuario.id),
                      ),
                      dataEscolhida)
                ],
              ))
            ]));
  }
}
