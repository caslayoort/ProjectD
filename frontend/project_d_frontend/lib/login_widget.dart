// import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';

//https://flutter.dev/docs/cookbook/forms/validation
class LoginWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _LoginWidget();
}

// class EmailValidator {
//   static String validate(String value) {
//     if (value.isEmpty){
//       return "dit veld mag niet leeg zijn";
//     }
//     return null;
//   }

class _LoginWidget extends State<LoginWidget> {
  String _email, _password;
  bool _isLoginForm = true;

  void check() {
    print('Pressed button');
  }

  Widget email() {
    return Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 100.0, 0.0, 0.0),
      child: TextFormField(
        keyboardType: TextInputType.emailAddress,
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
        validator: (value) => value.isEmpty ? "Email can/'t be empty" : null,
        onSaved: (value) => _email = value.trim(),
      ),
    );
  }

  Widget password() {
    return TextFormField(
      keyboardType: TextInputType.visiblePassword,
      obscureText: true,
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
      validator: (value) => value.isEmpty ? "Password can/'t be empty" : null,
      onSaved: (value) => _password = value.trim(),
    );
  }

  Widget loginbutton() {
    return new Padding(
        padding: EdgeInsets.fromLTRB(0.0, 45.0, 0.0, 0.0),
        child: SizedBox(
          height: 40.0,
          child: new RaisedButton(
            elevation: 5.0,
            shape: new RoundedRectangleBorder(
                borderRadius: new BorderRadius.circular(30.0)),
            color: Colors.blue,
            child: new Text(_isLoginForm ? 'Login' : 'Create account',
                style: new TextStyle(fontSize: 20.0, color: Colors.white)),
            onPressed: check, //validateAndSubmit
          ),
        ));
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
