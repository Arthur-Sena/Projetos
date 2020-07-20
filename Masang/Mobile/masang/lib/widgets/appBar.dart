import 'package:flutter/material.dart';

AppBar buildAppBar() => AppBar(
      backgroundColor: Colors.white,
      title: Image.asset(
        "lib/assets/img/logomasang.png",
        width: 200,
      ),
      centerTitle: true,
    );
