String tratarData(DateTime data) {
  var a = data.toString().split(" ")[0].split("-");
  return "${a[2]}/${a[1]}/${a[0]}";
}
