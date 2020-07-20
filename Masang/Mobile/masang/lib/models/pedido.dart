import 'package:masang/models/hemocentro.dart';
import 'package:masang/models/user.dart';

class Pedido {
  String id;
  bool matchRealizado;
  User user;
  Hemocentro hemocentro;

  Pedido({this.id, this.matchRealizado, this.user, this.hemocentro});
}
