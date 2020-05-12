import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';



//https://flutter.dev/docs/cookbook/forms/validation
class LoginWidget extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _LoginWidget();


}





class _LoginWidget extends State<LoginWidget> {

  String _email;
  
  Widget email(){
    return Padding(
      padding: const EdgeInsets.fromLTRB(0.0, 100.0, 0.0, 0.0) ,
      child: TextFormField(
        keyboardType: TextInputType.emailAddress,
        validator: EmailValidator.validate(email) ,
        onSaved: (value) => _email = value.trim(),
        
      ) ,
      
      
      );

    
  } 
  
  
  
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text("Flutter login demo"),
        ),
        body: Stack(
          children: <Widget>[
            
          ],
        ));
  }
}
