import 'package:flutter/material.dart';
import 'package:project_d_frontend/Setup/auth.dart';
import 'package:project_d_frontend/login_widget.dart';

import 'home_page.dart';



void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Example Dialogflow Flutter',
      theme: new ThemeData(
        primarySwatch: Colors.deepOrange,
      ),
      debugShowCheckedModeBanner: false,
      home: new HomePageDialogflow(),
    );
  }
}