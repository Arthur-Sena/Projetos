import 'package:flutter/material.dart';
import 'package:masang/pages/navegador.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:splashscreen/splashscreen.dart';

import 'initialSlider.dart';

class Splashscreen extends StatefulWidget {
  @override
  _SplashscreenState createState() => _SplashscreenState();
}

class _SplashscreenState extends State<Splashscreen> {
  bool logged;

  Future<void> getLoggedInfo() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var token = prefs.getString('token');
    setState(() {
      logged = token != null ? true : false;
    });
  }

  @override
  void initState() {
    super.initState();
    getLoggedInfo();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        SplashScreen(
          seconds: 3,
          gradientBackground: LinearGradient(
            begin: Alignment.topRight,
            end: Alignment.bottomLeft,
            colors: [Color(0xfff2f2f2), Color(0xfff2f2f2)],
          ),
          navigateAfterSeconds: logged ? Navegador() : InitialSlider(),
          loaderColor: Colors.transparent,
        ),
        Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage("lib/assets/img/logomasang.png"),
              fit: BoxFit.contain,
            ),
          ),
        ),
      ],
    );
  }
}
