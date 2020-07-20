// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'doacao_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$DoacaoController on DoacaoControllerBase, Store {
  final _$doacaoAtom = Atom(name: 'DoacaoControllerBase.doacao');

  @override
  Doacao get doacao {
    _$doacaoAtom.reportRead();
    return super.doacao;
  }

  @override
  set doacao(Doacao value) {
    _$doacaoAtom.reportWrite(value, super.doacao, () {
      super.doacao = value;
    });
  }

  final _$getAllDonationsCounterAsyncAction =
      AsyncAction('DoacaoControllerBase.getAllDonationsCounter');

  @override
  Future<int> getAllDonationsCounter() {
    return _$getAllDonationsCounterAsyncAction
        .run(() => super.getAllDonationsCounter());
  }

  final _$getDoacoesByUserAsyncAction =
      AsyncAction('DoacaoControllerBase.getDoacoesByUser');

  @override
  Future getDoacoesByUser(String id) {
    return _$getDoacoesByUserAsyncAction.run(() => super.getDoacoesByUser(id));
  }

  final _$cadastrarNovaDoacaoAsyncAction =
      AsyncAction('DoacaoControllerBase.cadastrarNovaDoacao');

  @override
  Future<Doacao> cadastrarNovaDoacao(Doacao doacao) {
    return _$cadastrarNovaDoacaoAsyncAction
        .run(() => super.cadastrarNovaDoacao(doacao));
  }

  @override
  String toString() {
    return '''
doacao: ${doacao}
    ''';
  }
}
