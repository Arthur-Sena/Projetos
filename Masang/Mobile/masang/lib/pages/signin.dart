import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:masang/controllers/user_controller.dart';

class SignIn extends StatefulWidget {
  @override
  _SignInState createState() => _SignInState();
}

class _SignInState extends State<SignIn> {
  final controller = UserController();

  String dropdownValueGenero;
  String dropdownValueTipoSanguineo;

  DateTime selectedDate = DateTime.now();
  bool dataSelecionada = false;

  Future<Null> _selectDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(1900, 1),
        lastDate: DateTime(2030));
    if (picked != null && picked != selectedDate)
      setState(() {
        selectedDate = picked;
        String a = controller.setUserAttribute(dataNascimento: selectedDate);
        print(a);
        dataSelecionada = true;
      });
  }

  bool loading = false;

  String tratarData(DateTime data) {
    var a = data.toString().split(" ")[0].split("-");
    return "${a[2]}/${a[1]}/${a[0]}";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomPadding: false,
      body: (loading)
          ? Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Theme.of(context).primaryColor,
                      Theme.of(context).accentColor,
                    ],
                    stops: [
                      0.4,
                      1
                    ]),
              ),
              child: Center(
                child: (CircularProgressIndicator()),
              ),
            )
          : (Container(
              decoration: BoxDecoration(
                  gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
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
                        height: 200,
                        color: Colors.white,
                        child: Center(
                          child: Padding(
                            padding: EdgeInsets.only(bottom: 1),
                            child: SizedBox(
                              child:
                                  Image.asset("lib/assets/img/logomasang.png"),
                              width: 300,
                            ),
                          ),
                        ),
                      ),
                    ),
                    SizedBox(height: 50),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 50),
                      child: Column(
                        children: <Widget>[
                          TextField(
                            style: TextStyle(color: Colors.white),
                            decoration: InputDecoration(
                                hintText: "Nome",
                                hintStyle: TextStyle(
                                    color: Colors.white, fontSize: 24),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide:
                                      BorderSide(width: 2, color: Colors.white),
                                ),
                                focusColor: Colors.white),
                            onChanged: (text) => {
                              setState(
                                () {
                                  controller.setUserAttribute(nome: text);
                                },
                              ),
                            },
                          ),
                          SizedBox(height: 15),
                          TextField(
                            style: TextStyle(color: Colors.white),
                            decoration: InputDecoration(
                                hintText: "Email",
                                hintStyle: TextStyle(
                                    color: Colors.white, fontSize: 24),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide:
                                      BorderSide(width: 2, color: Colors.white),
                                ),
                                focusColor: Colors.white),
                            onChanged: (text) => {
                              setState(
                                () {
                                  controller.setUserAttribute(email: text);
                                },
                              ),
                            },
                          ),
                          SizedBox(height: 15),
                          TextField(
                            style: TextStyle(color: Colors.white),
                            obscureText: true,
                            decoration: InputDecoration(
                                hintText: "Senha",
                                hintStyle: TextStyle(
                                    color: Colors.white, fontSize: 24),
                                enabledBorder: UnderlineInputBorder(
                                  borderSide:
                                      BorderSide(width: 2, color: Colors.white),
                                ),
                                focusColor: Colors.white),
                            onChanged: (text) => {
                              setState(() {
                                controller.setUserAttribute(senha: text);
                              })
                            },
                          ),
                          SizedBox(height: 15),
                          Row(children: <Widget>[
                            // Genero
                            Expanded(
                              flex: 4,
                              child: DropdownButton<String>(
                                value: dropdownValueGenero,
                                hint: Text(
                                  "Gênero",
                                  style: TextStyle(
                                      color: Colors.white, fontSize: 17),
                                ),
                                iconEnabledColor: Colors.white,
                                underline: Container(
                                  height: 2,
                                  color: Colors.white,
                                ),
                                style: TextStyle(color: Colors.black),
                                onChanged: (String newValue) {
                                  setState(() {
                                    dropdownValueGenero = newValue;
                                    print(dropdownValueGenero);
                                    controller.setUserAttribute(
                                        genero: newValue);
                                  });
                                },
                                items: [
                                  "Masculino",
                                  "Feminino"
                                ].map<DropdownMenuItem<String>>((String value) {
                                  return DropdownMenuItem<String>(
                                      value: value,
                                      child: Text(
                                        value,
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                            color: Colors.grey[300],
                                            fontSize: 17,
                                            fontWeight: FontWeight.bold),
                                      ));
                                }).toList(),
                              ),
                            ),
                            Expanded(flex: 1, child: SizedBox()),
                            // TipoSanguineo
                            Expanded(
                              flex: 5,
                              child: DropdownButton<String>(
                                value: dropdownValueTipoSanguineo,
                                hint: Text(
                                  "Tipo Sanguíneo",
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                      color: Colors.white, fontSize: 17),
                                ),
                                iconEnabledColor: Colors.white,
                                underline:
                                    Container(height: 2, color: Colors.white),
                                style: TextStyle(color: Colors.black),
                                onChanged: (String newValue) {
                                  setState(() {
                                    dropdownValueTipoSanguineo = newValue;
                                    print(dropdownValueTipoSanguineo);
                                    controller.setUserAttribute(
                                        tipoSanguineo: newValue);
                                  });
                                },
                                items: [
                                  "A+",
                                  "A-",
                                  "B+",
                                  "B-",
                                  "AB+",
                                  "AB-",
                                  "O+",
                                  "O-"
                                ].map<DropdownMenuItem<String>>((String value) {
                                  return DropdownMenuItem<String>(
                                      value: value,
                                      child: Text(
                                        value,
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                            color: Colors.grey[300],
                                            fontSize: 17,
                                            fontWeight: FontWeight.bold),
                                      ));
                                }).toList(),
                              ),
                            ),
                            //DataNascimento
                          ]),
                          SizedBox(height: 15),
                          FlatButton(
                            onPressed: () => _selectDate(context),
                            child: Column(
                              children: <Widget>[
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: <Widget>[
                                    Text(
                                      dataSelecionada
                                          ? tratarData(selectedDate)
                                          : "Data de nascimento",
                                      style: TextStyle(
                                        color: Colors.white,
                                        fontSize: 20,
                                      ),
                                    ),
                                    Icon(
                                      Icons.calendar_today,
                                      color: Colors.white,
                                    )
                                  ],
                                ),
                                SizedBox(height: 2),
                                Container(
                                    width: 400, height: 2, color: Colors.white),
                              ],
                            ),
                          ),
                          SizedBox(height: 15),
                          SizedBox(height: 80),
                          FlatButton(
                            child: Text(
                              "Cadastrar",
                              style: TextStyle(fontSize: 20),
                            ),
                            padding: EdgeInsets.symmetric(
                                vertical: 12, horizontal: 70),
                            color: Colors.orange,
                            textColor: Colors.white,
                            shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(25),
                                side:
                                    BorderSide(width: 1, color: Colors.white)),
                            onPressed: () async {
                              setState(() {
                                loading = true;
                              });
                              var status = await controller.cadastrarUser();
                              print(status);
                              Timer(Duration(seconds: 1), () {
                                setState(() {
                                  loading = false;
                                  controller.realizarLogin();
                                });
                              });
                              // print(controller.user.toString());
                            },
                          ),
                          SizedBox(height: 60),
                          Text(
                            "Já possui uma conta?",
                            style: TextStyle(color: Colors.white, fontSize: 18),
                          ),
                          FlatButton(
                            child: Text(
                              "Faça login!",
                              style:
                                  TextStyle(fontSize: 24, color: Colors.white),
                            ),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                          )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            )),
    );
  }
}
