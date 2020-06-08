import 'package:flutter/material.dart';
import 'package:project_d_frontend/Setup/auth.dart';
import 'package:project_d_frontend/home_page.dart';

class LoginWidget extends StatefulWidget {
  LoginWidget({this.auth});

  final BaseAuth auth;

  @override
  _LoginWidget createState() => new _LoginWidget();
}

class _LoginWidget extends State<LoginWidget> {
  final _formKey = new GlobalKey<FormState>();

  String _email;
  String _password;
  bool signin;
  bool _obscureText;

  bool validateInput() {
    final form = _formKey.currentState;
    if (form.validate()) {
      form.save();
      return true;
    }
    return false;
  }

  void submit() async {
    if (validateInput()) {
      String uId = "";
      try {
        if (signin) {
          uId = await widget.auth.signIn(_email, _password);
          print('Signed in: $uId');
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => HomePage()));
        } else {
          uId = await widget.auth.signUp(_email, _password);
          print('Signed up user: $uId');
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => HomePage()));
        }
      } catch (e) {
        print('Error: $e');
        setState(() {
          _formKey.currentState.reset();
        });
      }
    }
  }

  @override
  void initState() {
    signin = true;
    _obscureText = true;
    super.initState();
  }
 
  void changeform() {
    setState(() {
      signin = !signin;
    });
  }

  void changeVisibility() {
    setState(() {
      _obscureText = !_obscureText;
    });
  }

  Widget login() {
    return new Padding(
        padding: EdgeInsets.fromLTRB(0.0, 45.0, 0.0, 0.0),
        child: SizedBox(
            height: 45.0,
            child: new RaisedButton(
              elevation: 5.0,
              shape: new RoundedRectangleBorder(
                  borderRadius: new BorderRadius.circular(30.0)),
              color: Colors.red[800],
              child: new Text(signin ? 'Login' : 'Create account',
                  style: new TextStyle(fontSize: 22.0, color: Colors.white)),
              onPressed: submit,
            )));
  }

  Widget createAccount() {
    return new FlatButton(
        child: new Text(
            signin ? 'Create an account' : 'Have an account? Sign in',
            style: new TextStyle(fontSize: 20.0, fontWeight: FontWeight.w300)),
        onPressed: changeform);
  }

  @override
  Widget build(BuildContext context) {
    final image = Image(
      image: AssetImage('images/logo.png'),
      width: 325,
      height: 250,
      fit: BoxFit.cover,
    );

    final email = Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 75.0, 0.0, 0.0),
      child: new TextFormField(
        validator: (value) => value.isEmpty ? 'Email can\'t be empty' : null,
        onSaved: (value) => _email = value.trim(),
        keyboardType: TextInputType.emailAddress,
        autofocus: false,
        decoration: InputDecoration(
          hintText: 'Email',
          icon: new Icon(
            Icons.mail,
            color: Colors.blue[900],
          ),
        ),
      ),
    );

    final password = Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 15.0, 0.0, 0.0),
      child: new TextFormField(
        validator: (value) => value.isEmpty ? 'Password can\'t be empty' : null,
        onSaved: (value) => _password = value.trim(),
        keyboardType: TextInputType.visiblePassword,
        obscureText: _obscureText,
        autofocus: false,
        decoration: new InputDecoration(
          hintText: 'Password',
          icon: new Icon(
            Icons.lock,
            color: Colors.red[900],
          ),
          suffixIcon: IconButton(
          icon: Icon(
            _obscureText ? Icons.visibility : Icons.visibility_off,
            color: Colors.blue[900],
          ),
          onPressed: changeVisibility,
        ),
        ),
      ),
    );

    return new Scaffold(
        body: new Container(
            padding: EdgeInsets.all(15.0),
            child: new Form(
              key: _formKey,
              child: new ListView(
                shrinkWrap: true,
                children: <Widget>[
                  SizedBox(height: 10),
                  image,
                  email,
                  password,
                  login(),
                  createAccount(),
                ],
              ),
            )));
  }
}
