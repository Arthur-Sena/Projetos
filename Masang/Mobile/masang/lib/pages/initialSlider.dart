import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:masang/models/sliderItem.dart';

class InitialSlider extends StatefulWidget {
  @override
  _InitialSliderState createState() => _InitialSliderState();
}

class _InitialSliderState extends State<InitialSlider> {
  int _current = 0;

  @override
  Widget build(BuildContext context) {
    List<SliderItem> itens = [
      SliderItem(
          caminhoImagem: 'lib/assets/img/maps.png',
          descricao: 'Encontre hemocentros próximos a você'),
      SliderItem(
          caminhoImagem: 'lib/assets/img/notificacao.png',
          descricao: 'Receba notificações de alerta ou necessidade de doação'),
      SliderItem(
          caminhoImagem: 'lib/assets/img/4vidas.png',
          descricao: 'Saiba quantas vidas você já ajudou'),
      SliderItem(
          caminhoImagem: 'lib/assets/img/mao_celular.png',
          descricao:
              'Tenha controle dos seus status para saber quando pode doar'),
      SliderItem(
          caminhoImagem: 'lib/assets/img/icone_doacao.png',
          descricao: 'Doe sangue e salve vidas'),
    ];

    return Scaffold(
      body: Column(
        children: <Widget>[
          SizedBox(
            height: 50,
          ),
          SizedBox(
            child: Image.asset("lib/assets/img/logomasang.png"),
            width: 250,
          ),
          Builder(
            builder: (_) {
              final double height = MediaQuery.of(context).size.height;
              return Column(
                children: <Widget>[
                  CarouselSlider.builder(
                    itemCount: itens.length,
                    itemBuilder: (context, index) => Container(
                      child: Center(
                        child: Column(
                          children: <Widget>[
                            SizedBox(
                                child: Image.asset(itens[index].caminhoImagem),
                                height: 300,
                                width: 300),
                            SizedBox(
                              height: 50,
                            ),
                            Container(
                              width: MediaQuery.of(context).size.width - 50,
                              child: Text(
                                itens[index].descricao,
                                style: TextStyle(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  fontFamily: 'Helvetica',
                                ),
                                textAlign: TextAlign.center,
                              ),
                            ),
                            SizedBox(),
                          ],
                        ),
                      ),
                    ),
                    options: CarouselOptions(
                        height: height - 300,
                        enlargeCenterPage: false,
                        viewportFraction: 1.0,
                        enableInfiniteScroll: false,
                        onPageChanged: (index, reason) => setState(() {
                              print(index);
                              _current = index;
                            })),
                  ),
                  (_current == itens.length - 1)
                      ? SizedBox(width: 90)
                      : Container(),
                ],
              );
            },
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: itens.map((item) {
              int index = itens.indexOf(item);
              return Container(
                width: 30.0,
                height: 10.0,
                margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 2.0),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _current == index
                      ? Theme.of(context).accentColor
                      : Theme.of(context).primaryColor,
                ),
              );
            }).toList(),
          ),
          SizedBox(height: 30),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              Container(
                child: (_current == 4)
                    ? FlatButton(
                        onPressed: () {
                          Navigator.pop(context);
                          Navigator.pushNamed(context, '/login');
                        },
                        child: Text('Continuar',
                            style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.w500,
                                color: Theme.of(context).accentColor)),
                      )
                    : Container(),
              ),
            ],
          )
        ],
      ),
    );
  }
}
