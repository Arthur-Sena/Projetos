import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:masang/controllers/user_controller.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  UserController controller = UserController();
  bool loading = false;
  bool erroAoLogar = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomPadding: false,
      body: (loading)
          ? Center(child: (CircularProgressIndicator()))
          : Stack(
              children: <Widget>[
                Container(
                  decoration: BoxDecoration(
                      gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [
                        Theme.of(context).primaryColor,
                        Theme.of(context).accentColor,
                      ],
                          stops: [
                        0.4,
                        1
                      ])),
                  child: Container(
                    child: Column(
                      children: <Widget>[
                        ClipRRect(
                          borderRadius: BorderRadius.circular(30),
                          child: Container(
                            height: 350,
                            color: Colors.white,
                            child: Center(
                              child: Padding(
                                padding: EdgeInsets.only(bottom: 100),
                                child: SizedBox(
                                  child: Image.asset(
                                      "lib/assets/img/logomasang.png"),
                                  width: 300,
                                ),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: 100),
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 50),
                          child: Column(
                            children: <Widget>[
                              TextField(
                                  style: TextStyle(color: Colors.white),
                                  decoration: InputDecoration(
                                      hintText: "Email",
                                      hintStyle: TextStyle(
                                          color: Colors.white, fontSize: 24),
                                      enabledBorder: UnderlineInputBorder(
                                        borderSide: BorderSide(
                                            width: 2, color: Colors.white),
                                      ),
                                      focusColor: Colors.white),
                                  onChanged: (text) => {
                                        print(text),
                                        setState(() {
                                          controller.setUserAttribute(
                                              email: text);
                                        })
                                      }),
                              SizedBox(height: 15),
                              TextField(
                                  style: TextStyle(color: Colors.white),
                                  decoration: InputDecoration(
                                    hintText: "Senha",
                                    hintStyle: TextStyle(
                                        color: Colors.white, fontSize: 24),
                                    enabledBorder: UnderlineInputBorder(
                                      borderSide: BorderSide(
                                          width: 2, color: Colors.white),
                                    ),
                                    focusColor: Colors.white,
                                    hoverColor: Colors.white,
                                  ),
                                  obscureText: true,
                                  onChanged: (text) => {
                                        print(text),
                                        setState(() {
                                          controller.setUserAttribute(
                                              senha: text);
                                        })
                                      }),
                              SizedBox(height: 40),
                              FlatButton(
                                child: Text(
                                  "Entrar",
                                  style: TextStyle(fontSize: 20),
                                ),
                                padding: EdgeInsets.symmetric(
                                    vertical: 12, horizontal: 70),
                                color: Colors.orange,
                                textColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(25),
                                    side: BorderSide(
                                        width: 1, color: Colors.white)),
                                onPressed: () async {
                                  setState(() {
                                    loading = true;
                                  });
                                  var token = await controller.realizarLogin();
                                  if (token != null) {
                                    Navigator.pop(context);
                                    Navigator.pushNamed(context, '/home');
                                  } else {
                                    setState(() {
                                      erroAoLogar = true;
                                    });
                                  }
                                  setState(() {
                                    loading = false;
                                  });
                                },
                              ),
                              SizedBox(height: 10),
                              erroAoLogar
                                  ? Text("Falha ao logar")
                                  : Container(),
                              SizedBox(height: 80),
                              Text(
                                "Não tem uma conta?",
                                style: TextStyle(
                                    color: Colors.white, fontSize: 18),
                              ),
                              FlatButton(
                                child: Text(
                                  "Cadastre-se",
                                  style: TextStyle(
                                      fontSize: 24, color: Colors.white),
                                ),
                                onPressed: () {
                                  Navigator.pushNamed(context, "/signin");
                                },
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ),
                Positioned(
                    child: Image.asset(
                      "lib/assets/img/banner-img.png",
                      height: 250,
                      width: 320,
                    ),
                    top: 180,
                    left: 40),
              ],
            ),
    );
  }
}
