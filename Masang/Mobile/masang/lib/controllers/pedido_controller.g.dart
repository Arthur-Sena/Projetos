// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'pedido_controller.dart';

// **************************************************************************
// StoreGenerator
// **************************************************************************

// ignore_for_file: non_constant_identifier_names, unnecessary_brace_in_string_interps, unnecessary_lambdas, prefer_expression_function_bodies, lines_longer_than_80_chars, avoid_as, avoid_annotating_with_dynamic

mixin _$PedidoController on PedidoControllerBase, Store {
  final _$pedidosAtom = Atom(name: 'PedidoControllerBase.pedidos');

  @override
  List<Pedido> get pedidos {
    _$pedidosAtom.reportRead();
    return super.pedidos;
  }

  @override
  set pedidos(List<Pedido> value) {
    _$pedidosAtom.reportWrite(value, super.pedidos, () {
      super.pedidos = value;
    });
  }

  final _$cadastrarNovoPedidoAsyncAction =
      AsyncAction('PedidoControllerBase.cadastrarNovoPedido');

  @override
  Future<void> cadastrarNovoPedido(Pedido pedido) {
    return _$cadastrarNovoPedidoAsyncAction
        .run(() => super.cadastrarNovoPedido(pedido));
  }

  final _$confirmarMatchAsyncAction =
      AsyncAction('PedidoControllerBase.confirmarMatch');

  @override
  Future<void> confirmarMatch(Pedido pedido, User usuarioDoador) {
    return _$confirmarMatchAsyncAction
        .run(() => super.confirmarMatch(pedido, usuarioDoador));
  }

  final _$listarPedidosAsyncAction =
      AsyncAction('PedidoControllerBase.listarPedidos');

  @override
  Future<void> listarPedidos() {
    return _$listarPedidosAsyncAction.run(() => super.listarPedidos());
  }

  @override
  String toString() {
    return '''
pedidos: ${pedidos}
    ''';
  }
}
