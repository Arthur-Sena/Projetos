// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$UserController on UserControllerBase, Store {
  final _$userAtom = Atom(name: 'UserControllerBase.user');

  @override
  User get user {
    _$userAtom.reportRead();
    return super.user;
  }

  @override
  set user(User value) {
    _$userAtom.reportWrite(value, super.user, () {
      super.user = value;
    });
  }

  final _$doacoesPassadasAtom =
      Atom(name: 'UserControllerBase.doacoesPassadas');

  @override
  List<Doacao> get doacoesPassadas {
    _$doacoesPassadasAtom.reportRead();
    return super.doacoesPassadas;
  }

  @override
  set doacoesPassadas(List<Doacao> value) {
    _$doacoesPassadasAtom.reportWrite(value, super.doacoesPassadas, () {
      super.doacoesPassadas = value;
    });
  }

  final _$cadastrarUserAsyncAction =
      AsyncAction('UserControllerBase.cadastrarUser');

  @override
  Future<int> cadastrarUser() {
    return _$cadastrarUserAsyncAction.run(() => super.cadastrarUser());
  }

  final _$realizarLoginAsyncAction =
      AsyncAction('UserControllerBase.realizarLogin');

  @override
  Future<String> realizarLogin() {
    return _$realizarLoginAsyncAction.run(() => super.realizarLogin());
  }

  final _$atualizarUsuarioAsyncAction =
      AsyncAction('UserControllerBase.atualizarUsuario');

  @override
  Future<http.Response> atualizarUsuario() {
    return _$atualizarUsuarioAsyncAction.run(() => super.atualizarUsuario());
  }

  final _$getUserInfoAsyncAction =
      AsyncAction('UserControllerBase.getUserInfo');

  @override
  Future<void> getUserInfo() {
    return _$getUserInfoAsyncAction.run(() => super.getUserInfo());
  }

  final _$UserControllerBaseActionController =
      ActionController(name: 'UserControllerBase');

  @override
  String setUserAttribute(
      {String email,
      String senha,
      String nome,
      DateTime dataNascimento,
      bool aptoADoar,
      String genero,
      List<Doacao> doacoes,
      String tipoSanguineo,
      String caminhoImagem}) {
    final _$actionInfo = _$UserControllerBaseActionController.startAction(
        name: 'UserControllerBase.setUserAttribute');
    try {
      return super.setUserAttribute(
          email: email,
          senha: senha,
          nome: nome,
          dataNascimento: dataNascimento,
          aptoADoar: aptoADoar,
          genero: genero,
          doacoes: doacoes,
          tipoSanguineo: tipoSanguineo,
          caminhoImagem: caminhoImagem);
    } finally {
      _$UserControllerBaseActionController.endAction(_$actionInfo);
    }
  }

  @override
  String toString() {
    return '''
user: ${user},
doacoesPassadas: ${doacoesPassadas}
    ''';
  }
}
