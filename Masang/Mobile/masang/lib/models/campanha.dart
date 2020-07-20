class Campanha {
  String titulo;
  String urlImagem;
  String urlRedirect;

  Campanha({this.titulo, this.urlImagem, this.urlRedirect});

  factory Campanha.fromJson(Map<String, dynamic> json) {
    return Campanha(
        titulo: json['titulo'],
        urlImagem: json['urlImagem'],
        urlRedirect: json['urlRedirect']);
  }
}
