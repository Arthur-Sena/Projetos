import 'package:flutter/material.dart';
import 'package:masang/pages/criterios.dart';
import 'package:masang/pages/criteriosCovid.dart';
import 'package:masang/pages/initialSlider.dart';
import 'package:masang/pages/login.dart';
import 'package:masang/pages/navegador.dart';
import 'package:masang/pages/novoPedido.dart';
import 'package:masang/pages/signin.dart';
import 'package:masang/pages/editUser.dart';
import 'package:masang/pages/splashscreen.dart';


void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(MaterialApp(
      debugShowCheckedModeBanner: false,
      initialRoute: '/splashscreen',
      theme: ThemeData(
        primaryColor: Color(0xfff28123),
        accentColor: Color(0xffb90404),
      ),
      routes: {
        "/": (context) => Login(),
        "/signin": (context) => SignIn(),
        "/criterios": (context) => Criterios(),
        '/home': (context) => Navegador(),
        '/editUser': (context) => EditUser(),
        '/criterios_covid': (context) => CriteriosCovid(),
        '/slider': (context) => InitialSlider(),
        '/splashscreen': (context) => Splashscreen(),
        '/addPedido' : (context) => NovoPedido(),
      }));
}
