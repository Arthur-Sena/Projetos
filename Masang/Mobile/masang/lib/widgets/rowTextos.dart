import 'package:flutter/material.dart';

Widget rowTextos({String title, String content}) {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
    child: Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          "$title: ",
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        Text("$content",
            style: TextStyle(
              fontSize: 14,
            ))
      ],
    ),
  );
}
