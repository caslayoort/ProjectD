import 'package:flutter/material.dart';
import 'chatbot.dart';

class HomePage extends StatefulWidget {
  @override
  _HomePage createState() => new _HomePage();
}

class _HomePage extends State<HomePage> {
  Widget goToChatbot() {
    return new Padding(
        padding: EdgeInsets.fromLTRB(0.0, 200.0, 0.0, 0.0),
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

  Widget image() {
    return Image(
      image: AssetImage('images/home_image1.jpg'),
      width: 325,
      height: 250,
      fit: BoxFit.cover,
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
            children: <Widget>[
              image(),
              goToChatbot(),
            ],
          ),
        ));
  }
}
