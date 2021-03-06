import 'package:flutter/material.dart';
import 'package:flutter_dialogflow/dialogflow_v2.dart';
import 'package:url_launcher/url_launcher.dart';
import 'library.dart' as globals;



class HomePageDialogflow extends StatefulWidget {
  HomePageDialogflow({Key key, this.title}) : super(key: key);

  final String title;  

  @override
  _HomePageDialogflow createState() => new _HomePageDialogflow();
}

class _HomePageDialogflow extends State<HomePageDialogflow> {
  final List<ChatMessage> _messages = <ChatMessage>[];
  final TextEditingController _textController = new TextEditingController();

  

  Widget _buildTextComposer() {
    return new IconTheme(
      data: new IconThemeData(color: Theme.of(context).accentColor),
      child: new Container(
        margin: const EdgeInsets.symmetric(horizontal: 8.0),
        child: new Row(
          children: <Widget>[
            new Flexible(
              child: new TextField(
                controller: _textController,
                onSubmitted: _handleSubmitted,
                decoration:
                new InputDecoration.collapsed(hintText: "Send a message"),
              ),
            ),
            new Container(
              margin: new EdgeInsets.symmetric(horizontal: 4.0),
              child: new IconButton(
                  icon: new Icon(Icons.send),
                  onPressed: () => _handleSubmitted(_textController.text)),
            ),
          ],
        ),
      ),
    );
  }

  void Response(query) async {
    String userid=globals.userid;
    _textController.clear();
    AuthGoogle authGoogle =
    await   AuthGoogle(fileJson: "assets/credentials.json", sessionId: userid).build();
    Dialogflow dialogflow = Dialogflow(authGoogle: authGoogle,language: Language.ENGLISH);

    AIResponse response = await dialogflow.detectIntent(query);


    ChatMessage message = new ChatMessage(

      text: response.getMessage() ??
          new CardDialogflow(response.getListMessage()[0]).title,
      name: "Bot",
      type: false,
    );
    setState(() {
      _messages.insert(0, message);
    });
    if(message.text == 'let me calculate that for you'){
      _launchURL();
    }

    if(message.text.contains("great we will see you on: ") ) {
      var temp = message.text.replaceAll("great we will see you on:", "");

      var temp2 = temp.split(" ");
      var answerday = temp2[3];

      String month = temp2[2];
      var answermonth;
      switch(month) {
        case "Jan": {answermonth = "01";} break;
        case "Feb": {answermonth = "02";} break;
        case "Mar": {answermonth = "03";}  break;
        case "Apr": {answermonth = "04";}  break;
        case "May": {answermonth = "05";}  break;
        case "Jun": {answermonth = "06";}  break;
        default: {answermonth = 0;}break;
      }
      var year = temp2[4];
      String hour = temp2[5];
      hour = hour.replaceAll(":", "");

      //"2012-02-27 13:27:00"

      String hour2 =hour.substring(0, 2);
      var hour3 = int.parse(hour2) ;
      hour3= hour3+1;
      if(hour3 <10){
        hour2 ="0" +hour3.toString() + "0000";
      }else {
        hour2 =hour3.toString() + "0000";
      }


      String date = year  +answermonth  + answerday + "T" + hour;
      String date2 = year  +answermonth  + answerday+ "T" + hour2;


      String help  = "text=A+Meeting+With+Swisscom&dates=" +date+"/" +date2 + '&details=A+Meeting+with+swisscom';


      var link = "https://calendar.google.com/calendar/r/eventedit?"+ help;
      _launchURL2(link);

    }
  }
  _launchURL2(date) async {
    String url = date;

    if (await canLaunch(url)) {
      await launch(url);
      throw 'Could not launch $url';
    }
  }


  _launchURL() async {
    const url = 'https://www.google.nl/maps/place/Swisscom+Devops+Center+Bv/@49.1888097,4.9123263,7z/data=!4m8!1m2!2m1!1sswiscom!3m4!1s0x47c434a63ea7acc5:0x8a47e91395cfd9a4!8m2!3d51.9251!4d4.473785';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  void _handleSubmitted(String text) {
    _textController.clear();
    ChatMessage message = new ChatMessage(
      text: text,
      name: "You",
      type: true,
    );
    setState(() {
      _messages.insert(0, message);
    });
    Response(text);
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        backgroundColor: Colors.blue[900],
        centerTitle: true,
        title: new Text("Chatbot"),
      ),
      body: new Column(children: <Widget>[
        new Flexible(
            child: new ListView.builder(
              padding: new EdgeInsets.all(8.0),
              reverse: true,
              itemBuilder: (_, int index) => _messages[index],
              itemCount: _messages.length,
            )),
        new Divider(height: 1.0),
        new Container(
          decoration: new BoxDecoration(color: Theme.of(context).cardColor),
          child: _buildTextComposer(),
        ),
      ]),
    );
  }

}

class ChatMessage extends StatelessWidget {
  ChatMessage({this.text, this.name, this.type});

  final String text;
  final String name;
  final bool type;


  List<Widget> otherMessage(context) {
    return <Widget>[
      new Container(
        margin: const EdgeInsets.only(right: 16.0),
        child: new CircleAvatar(child: new Text('B')),
      ),
      new Expanded(
        child: new Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            new Text(this.name,
                style: new TextStyle(fontWeight: FontWeight.bold)),
            new Container(
              margin: const EdgeInsets.only(top: 5.0),
              child: new Text(text),
            ),
          ],
        ),
      ),
    ];
  }

  List<Widget> myMessage(context) {
    return <Widget>[
      new Expanded(
        child: new Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: <Widget>[
            new Text(this.name, style: Theme.of(context).textTheme.subhead),
            new Container(
              margin: const EdgeInsets.only(top: 5.0),
              child: new Text(text),
            ),
          ],
        ),
      ),
      new Container(
        margin: const EdgeInsets.only(left: 16.0),
        child: new CircleAvatar(
            child: new Text(
              this.name[0],
              style: new TextStyle(fontWeight: FontWeight.bold),
            )),
      ),
    ];
  }


  @override
  Widget build(BuildContext context) {
    return new Container(
      margin: const EdgeInsets.symmetric(vertical: 10.0),
      child: new Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: this.type ? myMessage(context) : otherMessage(context),
      ),
    );
  }

}