 import 'package:flutter/material.dart';

Widget aviso({String aviso, BuildContext context}) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Icon(
              Icons.warning,
              color: Colors.white,
            ),
          ),
          Container(
            height: 30,
            width: 225,
            child: Container(
                width: MediaQuery.of(context).size.width - 50,
                child: Text("$aviso", style: TextStyle(color: Colors.white))),
          )
        ],
      ),
    );
  }
