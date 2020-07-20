import 'package:flutter/material.dart';

Widget textoEscrito(BuildContext context ,{String texto, bool titulo = false}) {
  return Center(
    child: Container(
      width: MediaQuery.of(context).size.width / 4 * 3,
      child: Text(
        "$texto",
        style: TextStyle(
          fontFamily: "Teko",
          fontSize: titulo ? 24 : 19,
          fontWeight: FontWeight.w200,
          color: titulo ? Theme.of(context).accentColor : Colors.black,
        ),
      ),
    ),
  );
}
