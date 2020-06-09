import 'package:flutter/material.dart';
import 'chatbot.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:project_d_frontend/Setup/auth.dart';
import 'package:project_d_frontend/login_widget.dart';

class HomePage extends StatefulWidget {
  HomePage({this.auth});

  final BaseAuth auth;

  @override
  _HomePage createState() => new _HomePage();
}

class _HomePage extends State<HomePage> {
  Widget goToChatbot() {
    return new Padding(
        padding: EdgeInsets.fromLTRB(0.0, 10.0, 0.0, 0.0),
        child: SizedBox(
            height: 45.0,
            child: new RaisedButton(
                elevation: 5.0,
                shape: new RoundedRectangleBorder(
                    borderRadius: new BorderRadius.circular(30.0)),
                color: Colors.red[800],
                child: new Text('Go to chatbot',
                    style: new TextStyle(fontSize: 22.0, color: Colors.white)),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => HomePageDialogflow()),
                  );
                })));
  }

  void signOut() async {
    try {
      await widget.auth.signOut();
      print("Succesful logout");
    } catch (e) {
      print(e);
    }
  }

  Widget logOut() {
    return new Padding(
        padding: EdgeInsets.fromLTRB(0.0, 10.0, 0.0, 0.0),
        child: SizedBox(
            height: 45.0,
            child: new RaisedButton(
                elevation: 5.0,
                shape: new RoundedRectangleBorder(
                    borderRadius: new BorderRadius.circular(30.0)),
                color: Colors.red[800],
                child: new Text('Log out',
                    style: new TextStyle(fontSize: 22.0, color: Colors.white)),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => LoginWidget()),
                  );
                })));
  }

  Widget image() {
    return Container(
      width: 325,
      height: 250,
      decoration: BoxDecoration(
        image: DecorationImage(
          image: new ExactAssetImage('images/home_image1.jpg'),
          fit: BoxFit.cover,
        ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: Colors.red[800],
          width: 5.0,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          backgroundColor: Colors.blue[900],
          centerTitle: true,
          title: new Text("Welom to Swisscom"),
        ),
        body: new Container(
          padding: EdgeInsets.all(15.0),
          child: new ListView(
            shrinkWrap: true,
            children: <Widget>[image(), goToChatbot(), logOut()],
          ),
        ));
  }
}
