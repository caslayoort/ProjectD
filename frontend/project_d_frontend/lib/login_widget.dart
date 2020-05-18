// import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';

//https://flutter.dev/docs/cookbook/forms/validation
class LoginWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _LoginWidget();
}

class _LoginWidget extends State<LoginWidget> {
  String _email, _password;

  void check() {
    print('Pressed button');
  }

  Widget email() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 100.0, 0.0, 0.0),
      child: TextFormField(
        keyboardType: TextInputType.emailAddress,
        //validator:
        onSaved: (value) => _email = value.trim(),
        decoration: InputDecoration(
          hintText: 'Email',
          contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(32.0),
            borderSide: BorderSide(color: Colors.blue),
          ),
          enabledBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(32.0),
            borderSide: BorderSide(color: Colors.grey),
          ),
        ),
      ),
    );
  }

  Widget password() {
    return TextFormField(
      keyboardType: TextInputType.visiblePassword,
      //validator:
      onSaved: (value) => _password = value.trim(),
      decoration: InputDecoration(
        hintText: 'Wachtwoord',
        contentPadding: EdgeInsets.fromLTRB(20.0, 10.0, 20.0, 10.0),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(32.0),
          borderSide: BorderSide(color: Colors.blue),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(32.0),
          borderSide: BorderSide(color: Colors.grey),
        ),
      ),
    );
  }

  Widget loginbutton() {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 16.0),
      child: RaisedButton(
        onPressed: check,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        padding: EdgeInsets.all(12),
        color: Colors.blue,
        child: Text(
          'Log In',
          style: TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Login demo"),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            email(),
            SizedBox(height: 10),
            password(),
            loginbutton(),
          ],
        ));
  }
}
