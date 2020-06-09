import 'dart:async';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:project_d_frontend/home_page.dart';

abstract class BaseAuth {
  Future<String> signIn(String email, String password);
  Future<String> signUp(String email, String password);
  //Future<String> getUid();
  Future<FirebaseUser> getUser();
  Future<void> signOut(); 
  Future<void> passwordResetEmail(String email);
  
}

class Auth implements BaseAuth {
  final FirebaseAuth _firebaseAuth = FirebaseAuth.instance;

  Future<String> signIn(String email, String password) async {
    AuthResult res = await _firebaseAuth.signInWithEmailAndPassword(
        email: email, password: password);
    FirebaseUser user = res.user;
    return user.uid;
  }

  Future<String> signUp(String email, String password) async {
    AuthResult res = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email, password: password);
    FirebaseUser user = res.user;
    return user.uid;
  }

  // made it to pass the uid to dialog flow, but this was not possible 
  // Future<String> getUid() async {
  //   FirebaseUser user = await _firebaseAuth.currentUser();
  //   return user.uid;
  // }

  Future<FirebaseUser> getUser() async {
    FirebaseUser user = await _firebaseAuth.currentUser();
    return user;
  }

  Future<void> signOut() {
    return _firebaseAuth.signOut();
  }

  Future<void> passwordResetEmail(String email) async {
    return (await _firebaseAuth.sendPasswordResetEmail(email: email));
  }

  



  
}