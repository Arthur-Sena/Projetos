import 'package:flutter/material.dart';

class Criterios extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget listaCriterios({String titulo, List<String> requisitos}) {
      return Padding(
        padding: const EdgeInsets.fromLTRB(10, 0, 0, 0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.max,
          children: <Widget>[
            Container(
              decoration: BoxDecoration(
                color: Theme.of(context).primaryColor,
                borderRadius: BorderRadius.circular(5),
              ),
              padding: EdgeInsets.symmetric(horizontal: 20, vertical: 2),
              child: Text(
                "$titulo",
                style: TextStyle(
                  fontFamily: "Teko",
                  fontSize: 25,
                  fontWeight: FontWeight.w100,
                ),
                textAlign: TextAlign.center,
              ),
            ),
            SizedBox(height: 10),
            Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: requisitos
                  .map(
                    (element) => Column(
                      children: <Widget>[
                        SizedBox(height: 5),
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisSize: MainAxisSize.max,
                          children: <Widget>[
                            Image.asset(
                              "lib/assets/img/drops.png",
                              width: 25,
                            ),
                            SizedBox(
                              width: 5,
                            ),
                            SizedBox(
                              width: 340,
                              child: Text(
                                "$element;",
                                style: TextStyle(
                                  fontFamily: "Teko",
                                  fontSize: 23,
                                  fontWeight: FontWeight.w100,
                                ),
                                textAlign: TextAlign.justify,
                              ),
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 15,
                        ),
                      ],
                    ),
                  )
                  .toList(),
            )
          ],
        ),
      );
    }

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          mainAxisSize: MainAxisSize.max,
          children: <Widget>[
            Container(
              width: MediaQuery.of(context).size.width,
              height: 60,
              color: Colors.white.withOpacity(0.8),
              child: FlatButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/criterios_covid');
                },
                child: Container(
                  width: 280,
                  decoration: BoxDecoration(
                      border: Border.all(
                    color: Colors.grey[400],
                  )),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        "COVID-19",
                        style: TextStyle(
                          fontFamily: "Teko",
                          fontWeight: FontWeight.w200,
                          fontSize: 20,
                          color: Theme.of(context).accentColor,
                        ),
                      ),
                      Text(
                        " - ",
                        style: TextStyle(
                            fontFamily: "Teko",
                            fontWeight: FontWeight.w200,
                            fontSize: 20,
                            color: Colors.black),
                      ),
                      Text(
                        "Confira os critérios de doação",
                        style: TextStyle(
                            fontFamily: "Teko",
                            fontWeight: FontWeight.w200,
                            fontSize: 20,
                            color: Colors.black),
                      ),
                    ],
                  ),
                ),
              ),
            ),
            SizedBox(
              height: 10,
            ),
            Center(
              child: Text(
                "Critérios para doação",
                style: TextStyle(
                  fontFamily: "Teko",
                  fontSize: 52,
                  fontWeight: FontWeight.w300,
                  color: Theme.of(context).accentColor,
                ),
              ),
            ),
            Center(
              child: SizedBox(
                width: 270,
                child: Text(
                  "Será que você está pronto para doar?",
                  style: TextStyle(
                    fontFamily: "Teko",
                    fontSize: 30,
                    fontWeight: FontWeight.w100,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
            ),
            SizedBox(
              height: 25,
            ),
            listaCriterios(titulo: "Requisitos básicos", requisitos: [
              "Ter entre 16 e 69 anos",
              "Pesar mais de 50Kg",
              "Ter dormido pelo menos 6 horas nas últimas 24h horas",
              "Caso a doação seja após o almoço, aguardar 2 horas",
              "Estar alimentado. Evite alimentos gordurosos nas 3 horas anteriores à doação",
            ]),
            SizedBox(
              height: 25,
            ),
            listaCriterios(titulo: "Requisitos temporários", requisitos: [
              "Gripe, resfriado e febre: aguardar 7 dias após o desaparecimento dos sintomas",
              "Período gestional",
              "Período pós-gravidez: 90 dias para o parto normal e 180 dias para cesariana",
              "Amamentação: até 12 meses após o parto",
              "Ingestão de bebida alcoólica nas 12 horas que antecedem a doação",
              "Tatuagem e/ou piercing nos últimos 12 meses (piercing em cavidade oral ou região genital impedem a doação)"
            ]),
            SizedBox(
              height: 25,
            ),
            listaCriterios(titulo: "Requisitos permanentes", requisitos: [
              "Ter passado por um quadro de hepatite após os 11 anos de idade",
              "Evidências clínica ou laboritarial das seguintes doenças transmissíveis pelo sangue: Hepatite B e C, AIDS (Vírus HIV),doenças associadas ao vírus HTLV I e II e Doença de Chagas",
              "Uso de drogas ilícitas injetáveis",
              "Malária",
            ]),
            SizedBox(
              height: 25,
            ),
            listaCriterios(
              titulo: "Intervalo das Doações",
              requisitos: [
                "Homens: de 2 em 2 meses, sendo, no máximo, 4 vezes ao ano",
                "Mulheres: de 3 em 3 meses, sendo, no máximo, 3 vezes ao ano"
              ],
            ),
            SizedBox(
              height: 25,
            ),
            listaCriterios(
              titulo: "Cuidados pós doação",
              requisitos: [
                "Evite esforços físicos exagerados por pelo menos 12 horas",
                "Aumente a ingestão de líquidos (água)",
                "Não fume por 2 horas",
                "Evite bebidas alcoólicas por 12 horas",
                "Mantenha o curativo no local da punção por, pelo menos, quatro horas",
                "Não dirija veículos de grande porte, não trabalhe em andaimes e não pratique paraquedismo ou mergulho",
                "Faça um pequeno lanche e hidrate-se. É importante que o doador continue se sentindo bem durante o dia em que efetuou a doação de sangue"
              ],
            ),
          ],
        ),
      ),
    );
  }
}
