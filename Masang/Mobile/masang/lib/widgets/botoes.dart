import 'package:flutter/material.dart';
import 'package:gradient_text/gradient_text.dart';

Widget botoes(BuildContext context, Widget widget, bool enabled) {
  return Row(children: <Widget>[
    SizedBox(
      width: 100,
    ),
    Padding(
      padding: const EdgeInsets.symmetric(horizontal: 5.0, vertical: 2.0),
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
            child: (enabled)
                ? FlatButton(
                    onPressed: () {
                      Navigator.push(context,
                          MaterialPageRoute(builder: (context) => widget));
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
  ]);
}
