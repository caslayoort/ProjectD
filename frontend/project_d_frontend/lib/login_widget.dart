import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';

//https://flutter.dev/docs/cookbook/forms/validation
class LoginWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _LoginWidget();
}

class _LoginWidget extends State<LoginWidget> {
  String _email, _password;

  Widget email() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 100.0, 0.0, 0.0),
      child: TextFormField(
        keyboardType: TextInputType.emailAddress,
        //validator:
        onSaved: (value) => _email = value.trim(),
        decoration: InputDecoration(
          hintText: 'Email',
        ),
      ),
    );
  }

    Widget password() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 100.0, 0.0, 0.0),
      child: TextFormField(
        keyboardType: TextInputType.visiblePassword,
        //validator:
        onSaved: (value) => _password = value.trim(),
        decoration: InputDecoration(
          hintText: 'Wachtwoord',
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Flutter login demo"),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            email(),
            password(),
          ],
          
        ));
  }
}
