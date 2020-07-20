import 'dart:io';
import 'package:async/async.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:masang/controllers/user_controller.dart';
import 'package:masang/widgets/appBar.dart';

class EditUser extends StatefulWidget {
  @override
  _EditUserState createState() => _EditUserState();
}

class _EditUserState extends State<EditUser> {
  UserController controller = UserController();
  final AsyncMemoizer _memoizer = AsyncMemoizer();

  DateTime selectedDate = DateTime.now();
  bool dataSelecionada = false;

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

  Widget campoEscolhas({
    String text,
    String initialValue,
    void callback(String value),
    List<String> valores,
  }) {
    return SizedBox(
      width: 142,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
              height: 28,
              child: Text("$text:",
                  style: TextStyle(fontFamily: "Teko", fontSize: 24))),
          DropdownButton<String>(
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

  @override
  void initState() {
    super.initState();
    future = _fetchData();
  }

  _fetchData() {
    return this._memoizer.runOnce(() async {
      await controller.getUserInfo();
      return controller.user;
    });
  }

  Future future;

  var imageIsPicked = false;
  PickedFile file;

  void _openGallery() async {
    var picker = ImagePicker();
    var img = await picker.getImage(
      source: ImageSource.gallery,
      imageQuality: 10,
    );
    setState(() {
      file = img;
      imageIsPicked = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    bool sendingRequest = false;
    bool aptidao =
        controller.user.aptoADoar == null ? false : controller.user.aptoADoar;

    return Scaffold(
        resizeToAvoidBottomPadding: false,
        appBar: buildAppBar(),
        body: FutureBuilder(
            future: future,
            builder: (BuildContext context, AsyncSnapshot snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                return sendingRequest
                    ? CircularProgressIndicator()
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: <Widget>[
                          SizedBox(
                            height: 20,
                          ),
                          Center(
                            child: FlatButton(
                              onPressed: () {
                                _openGallery();
                              },
                              child: Stack(
                                children: <Widget>[
                                  CircleAvatar(
                                    backgroundColor: Colors.black,
                                    radius: 62.0,
                                    child: CircleAvatar(
                                      backgroundImage: imageIsPicked &&
                                              file != null
                                          ? FileImage(File(file.path))
                                          : NetworkImage(controller
                                                          .user.caminhoImagem ==
                                                      null ||
                                                  controller
                                                          .user.caminhoImagem ==
                                                      ""
                                              ? 'https://static.thenounproject.com/png/363639-200.png'
                                              : controller.user.caminhoImagem),
                                      radius: 60.0,
                                    ),
                                  ),
                                  Positioned(
                                    right: 1,
                                    bottom: 5,
                                    child: Icon(Icons.edit),
                                  )
                                ],
                              ),
                            ),
                          ),
                          Text(
                            "Editar Perfil",
                            style: TextStyle(
                              fontWeight: FontWeight.w100,
                              fontFamily: "Teko",
                              color: Theme.of(context).accentColor,
                              fontSize: 30,
                            ),
                          ),
                          SizedBox(height: 20),
                          campoEntrada(
                            text: "Nome",
                            callback: (value) {
                              controller.setUserAttribute(nome: value);
                            },
                            initialValue: "${controller.user.nome}",
                          ),
                          SizedBox(height: 10),
                          campoEntrada(
                            text: "Email",
                            callback: (value) {
                              controller.setUserAttribute(email: value);
                            },
                            initialValue: "${controller.user.email}",
                          ),
                          SizedBox(height: 10),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            children: <Widget>[
                              campoEscolhas(
                                  text: "Gênero",
                                  initialValue: controller.user.genero,
                                  valores: ["Masculino", "Feminino"],
                                  callback: (valor) {
                                    controller.setUserAttribute(genero: valor);
                                  }),
                              campoEscolhas(
                                  text: "Tipo Sanguineo",
                                  initialValue: controller.user.tipoSanguineo,
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
                                  callback: (valor) {
                                    controller.setUserAttribute(
                                        tipoSanguineo: valor);
                                  }),
                            ],
                          ),
                          SizedBox(height: 10),
                          Row(
                            children: <Widget>[
                              Center(
                                child: Checkbox(
                                    value: aptidao,
                                    onChanged: (value) => {
                                          setState(() {
                                            aptidao = value;
                                          }),
                                          controller.setUserAttribute(
                                              aptoADoar: value)
                                        }),
                              ),
                              Container(
                                width: 300,
                                child: Text(
                                    "Estou apto a doar - Para saber mais acesse a aba de critérios",
                                    style: TextStyle(fontSize: 17)),
                              ),
                            ],
                          ),
                          SizedBox(height: 40),
                          FlatButton(
                            onPressed: () async {
                              setState(() {
                                sendingRequest = true;
                              });
                              if (file != null) {
                                await controller.enviarImagem(File(file.path));
                              }
                              print(controller.user);
                              var response =
                                  await controller.atualizarUsuario();
                              setState(() {
                                sendingRequest = false;
                              });
                              if (response.statusCode == 200) {
                                Scaffold.of(context).showSnackBar(
                                  SnackBar(
                                    content:
                                        Text("Usuario atualizado com sucesso!"),
                                    duration: Duration(seconds: 3),
                                  ),
                                );
                              } else {
                                Scaffold.of(context).showSnackBar(SnackBar(
                                  content: Text("Erro ao atualizar!"),
                                  duration: Duration(seconds: 3),
                                ));
                              }
                              Navigator.popAndPushNamed(context, '/home')
                                  .then((_) {
                                controller.getUserInfo();
                              });
                            },
                            child: Text(
                              "Salvar",
                              style: TextStyle(
                                fontSize: 30,
                                fontFamily: 'Teko',
                                color: Theme.of(context).primaryColor,
                                fontWeight: FontWeight.w200,
                              ),
                            ),
                          )
                        ],
                      );
              } else {
                return Center(
                  child: CircularProgressIndicator(),
                );
              }
            }));
  }
}
