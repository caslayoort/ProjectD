import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';


class HomePage extends StatelessWidget {


  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text("Voice assistant"),
      ),
      body: new Container(
        child: new Text("Hello" ),
      ),
    );
  }
}