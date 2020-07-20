import 'package:flutter/material.dart';
import 'package:gradient_text/gradient_text.dart';
import 'package:masang/pages/home.dart';
import 'package:masang/pages/pedidoDoacoes.dart';
import 'package:masang/widgets/appBar.dart';
import 'package:masang/widgets/drawer.dart';

import 'campanhas.dart';
import 'criterios.dart';

class Navegador extends StatefulWidget {
  @override
  _NavegadorState createState() => _NavegadorState();
}

class _NavegadorState extends State<Navegador> {
  int _currentIndex = 0;
  List<Widget> _children = [
    Home(),
    Campanhas(),
    Criterios(),
    PedidosDoacoes(),
  ];

  void onTabTapped(int index) {
    setState(() {
      _currentIndex = index;
    });
  }

  @override
  void initState() {
    super.initState();
    controller.getUserInfo();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(),
      drawer: buildDrawer(context),
      body: _children[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        type: BottomNavigationBarType.fixed,
        onTap: onTabTapped,
        currentIndex: _currentIndex,
        items: [
          BottomNavigationBarItem(
            icon: ImageIcon(
              AssetImage('lib/assets/icons/home.png'),
              size: 25,
            ),
            title: GradientText(
              "Home",
              gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Theme.of(context).primaryColor,
                    Theme.of(context).accentColor,
                  ]),
            ),
          ),
          BottomNavigationBarItem(
            icon: ImageIcon(
              AssetImage('lib/assets/icons/two_drop.png'),
              size: 25,
            ),
            title: GradientText(
              "Campanhas",
              gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Theme.of(context).primaryColor,
                    Theme.of(context).accentColor,
                  ]),
            ),
          ),
          BottomNavigationBarItem(
            icon: ImageIcon(
              AssetImage('lib/assets/icons/images.png'),
              size: 25,
            ),
            title: GradientText(
              "Critérios",
              gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Theme.of(context).primaryColor,
                    Theme.of(context).accentColor,
                  ]),
            ),
          ),
          BottomNavigationBarItem(
            icon: ImageIcon(
              AssetImage('lib/assets/icons/warning.png'),
              size: 25,
            ),
            title: GradientText(
              "Pedidos",
              gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Theme.of(context).primaryColor,
                    Theme.of(context).accentColor,
                  ]),
            ),
          ),
        ],
      ),
    );
  }
}
