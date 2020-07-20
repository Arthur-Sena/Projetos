import 'package:flutter/material.dart';
import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/user.dart';
import 'package:masang/pages/cadastroDoacao/confirmarUser.dart';
import 'package:masang/widgets/appBar.dart';

class MarcarDoacao extends StatelessWidget {
  final Hemocentro hemocentro;
  final User usuario;

  MarcarDoacao({this.hemocentro, this.usuario});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: buildAppBar(),
        body: ConfirmarUser(
          usuario: usuario,
          hemocentro: hemocentro,
        ));
  }
}
