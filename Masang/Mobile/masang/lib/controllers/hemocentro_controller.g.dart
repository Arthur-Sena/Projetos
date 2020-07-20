// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'hemocentro_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$HemocentroController on HemocentroControllerBase, Store {
  final _$hemocentroAtom = Atom(name: 'HemocentroControllerBase.hemocentro');

  @override
  Hemocentro get hemocentro {
    _$hemocentroAtom.reportRead();
    return super.hemocentro;
  }

  @override
  set hemocentro(Hemocentro value) {
    _$hemocentroAtom.reportWrite(value, super.hemocentro, () {
      super.hemocentro = value;
    });
  }

  final _$listaHemocentrosAtom =
      Atom(name: 'HemocentroControllerBase.listaHemocentros');

  @override
  List<Hemocentro> get listaHemocentros {
    _$listaHemocentrosAtom.reportRead();
    return super.listaHemocentros;
  }

  @override
  set listaHemocentros(List<Hemocentro> value) {
    _$listaHemocentrosAtom.reportWrite(value, super.listaHemocentros, () {
      super.listaHemocentros = value;
    });
  }

  final _$listarHemocentrosAsyncAction =
      AsyncAction('HemocentroControllerBase.listarHemocentros');

  @override
  Future<void> listarHemocentros() {
    return _$listarHemocentrosAsyncAction.run(() => super.listarHemocentros());
  }

  @override
  String toString() {
    return '''
hemocentro: ${hemocentro},
listaHemocentros: ${listaHemocentros}
    ''';
  }
}
