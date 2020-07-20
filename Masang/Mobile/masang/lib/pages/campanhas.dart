import 'package:flutter/material.dart';
import 'package:masang/controllers/campanha_controller.dart';
import 'package:masang/models/campanha.dart';
import 'package:masang/widgets/textoEscrito.dart';
import 'package:url_launcher/url_launcher.dart';

class Campanhas extends StatefulWidget {
  @override
  _CampanhasState createState() => _CampanhasState();
}

class _CampanhasState extends State<Campanhas> {
  launchUrl(String url) async {
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  Widget buildCampanha() {
    return ListView.builder(
      scrollDirection: Axis.vertical,
      itemCount: listaCampanhas.length,
      itemBuilder: (context, index) => Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(10),
            border: Border.all(color: Colors.grey),
          ),
          height: 280,
          child: Column(children: <Widget>[
            SizedBox(height: 10),
            Image.network(
              listaCampanhas[index].urlImagem,
              height: 200,
              width: 300,
            ),
            FlatButton(
                onPressed: () {
                  launchUrl(listaCampanhas[index].urlRedirect);
                },
                child: Text("Clique aqui para saber mais "))
          ]),
        ),
      ),
    );
  }

  CampanhaController campanhaController = new CampanhaController();

  List<Campanha> listaCampanhas = List<Campanha>();

  getCampanhas() async {
    var campanhas = await campanhaController.listarCampanhas();
    listaCampanhas = campanhas;
    return campanhas;
  }

  @override
  void initState() {
    super.initState();
    getCampanhas();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: <Widget>[
          SizedBox(
            height: 20,
          ),
          textoEscrito(
            context,
            texto: "Campanhas",
            titulo: true,
          ),
          FutureBuilder(
              future: getCampanhas(),
              builder: (context, snapshot) => !snapshot.hasData
                  ? Center(child: CircularProgressIndicator())
                  : Container(height: 650, child: buildCampanha()))
          // buildCampanha(Campanha(
          //     titulo: 'Seja Solidário, Doe Sangue',
          //     urlImagem:
          //         'https://www.saude.gov.br/images/jpg/2020/June/09/Cartaz-Doa----o-de-Sangue.jpg',
          //     urlRedirect:
          //         'https://www.saude.gov.br/noticias/agencia-saude/46611-doacao-de-sangue-nao-pode-parar-com-pandemia-orienta-ministerio-da-saude'))
        ],
      ),
    );
  }
}
