import 'package:flutter/material.dart';
import 'package:project_d_frontend/Setup/auth.dart';
import 'package:project_d_frontend/home_page.dart';
import 'package:project_d_frontend/login_widget.dart';



void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      home: new HomePageDialogflow()
      //new LoginWidget(auth: new Auth(),)
    );
  }
}