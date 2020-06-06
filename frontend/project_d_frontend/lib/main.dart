import 'package:flutter/material.dart';
import 'package:project_d_frontend/login_widget.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Voice assistant',
      theme: new ThemeData(
        primarySwatch: Colors.red
      ),
      home: new LoginWidget()
    );
  }
}