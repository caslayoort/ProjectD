import 'package:flutter/material.dart';

class LoginWidget extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => new _LoginWidget();

}


class _LoginWidget extends State<LoginWidget>{


  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Flutter login demo"),
      ),
      body: new Container(
        child: new Text("Hello World"),
      ),
    );
  }
}