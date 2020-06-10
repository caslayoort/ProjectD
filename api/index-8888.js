const bodyparser = require('body-parser');
const express = require('express');
const glob = require('glob');
const fs = require('fs');
const firebaseadmin = require("firebase-admin");
var serviceAccount = require("./firebase.json");

const app = express();
const port = 8888;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

global.parameters;
global.outputcontexts;
global.action;
global.fulfillmentmessages;

global.localparameters;
global.localoutputcontexts;
global.localaction;
global.localfulfillmentMessages

// Caslay code

// Make sure Google is able to access it. Basicly setting permissions.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

// Initialise firebase.
firebaseadmin.initializeApp({
  credential: firebaseadmin.credential.cert(serviceAccount),
  databaseURL: "https://mobile-accounts-weqiub.firebaseio.com"
});

const db = firebaseadmin.firestore();


// Response function. Makes a valid json to send to firebase.
const responsejsonCaslay = (resp) => {
  textfulfillment = '{"fulfillmentMessages": [{ "text": { "text": [ "' + resp + '" ] } } ] }';
  return textfulfillment;
};

// Logs request to a file for python. Also puts it in firebase so we could see it there to make responses personal based on your past.
const logreq = (r, uuid) => {
  if (typeof r !== 'undefined' && r){
    // Creating a log in the log/requests folder with the epoch time format as name of the .log file.
    let date = Math.floor(new Date());
    fs.writeFile(__dirname + `/log/requests/${date}.log`, JSON.stringify(r), function (err) {
      // Throw an error if needed, otherwise log the action in log/api-req.log
      if (err) throw err;
      else {fs.appendFile(__dirname + '/log/api-req.log', `Request ${date} is logged.`, function (err) {if (err) throw err;});}
    });    

    // Log the request to firebase. Needs to be activated when we receive the uuid of the person that's logged in.
    if (typeof uuid !== 'undefined' && uuid){
    var docData = {
      request: `${r.queryResult.queryText}`,
      uuid: `${uuid}`
    };
    db.collection("askedquestions").doc(`${date}`).set(docData).then(function() {
      console.log("Request saved in firebase.");
    });
  } else {console.log("not saving request for " + uuid);}

    return date;
  }
};

// Laurens code

const responsejson = (resp) => {
  let textfulfillment = '{"fulfillmentText": "' + resp + '"'
  if ( typeof global.parameters != 'undefined'){
      textfulfillment = textfulfillment+ ', "parameters": ['
      textfulfillment = textfulfillment + JSON.stringify(global.parameters);
      textfulfillment = textfulfillment + ']';
  }
  if ( typeof global.fulfillmentmessages != 'undefined'){
      textfulfillment = textfulfillment+ ', "fulfillmentMessages": ['
      textfulfillment = textfulfillment + JSON.stringify(global.fulfillmentmessages);
      textfulfillment = textfulfillment + ']';
  }
  
  textfulfillment =textfulfillment + ', "queryText": "' + "lukt" + '"' + '}';
  return textfulfillment;
};
       
function webhook() {
  var date = new Date();
  global.localparameters = { leggo: date.toJSON() };
  return "works ";
}        
      
function webhookfollowup() {
  return  "date : " +  new Date(global.localparameters["leggo"]).toString();
 
}        
function appointmentfollowup() {
    if (typeof global.localaction != 'undefined'){
        return new Date(global.localaction["datedate"]).toString();
    }
    else {
    return "please try again"
    }
}   
function appointment() {
    var list = [];
    var answer = '';
    var date = new Date();
     for (var key in global.parameters) {
         if(key == 'otherdays' ){
             let temp  = global.parameters[key];
             if(temp  ==  'tomorow' ){
               date.setDate(date.getDate() + 1);
               
             }else if(temp == 'next week'){
                date.setDate(date.getDate() + 7);
             }
         }
         else if(key == 'days' && global.parameters[key] != ''){
           var a = 0;
           var b = global.parameters[key];
           
           switch(b) {
                case "monday" || "Monday": 
                  a=1
                  break;
                 case "tuesday" || "Tuesday": 
                  a=2
                  break;
                 case "wednesday" || "Wednesday": 
                  a=3
                  break;
                 case "thursday" || "Thursday": 
                  a=4
                  break;
                  case "friday" || "Friday": 
                  a=5
                  break;
                   case "saturday" || "Saturday": 
                  a=6
                  break;
                  case "sunday" ||"Sunday":  
                  a=7
                  break;
                default: 
                  return "try again?";
            }
                        
            var n = date.getDay();
            if(n > a){
               date.setDate(date.getDate() + 7-n+a);
            }else if(n < a){
              date.setDate(date.getDate() + 7-a);
            }
            else if(n == a){
              date.setDate(date.getDate() + 7);
            }
         }
         else if(key = 'time'){
           if(global.parameters[key] < 18 && global.parameters[key] >8 ){
             date.setHours(global.parameters[key]);  
             date.setMinutes(0);  
             date.setSeconds(0);
           } 
           else if(global.parameters[key] < 5){
             date.setHours(global.parameters[key] +12);  
             date.setMinutes(0);  
             date.setSeconds(0);
           }
        }
      
      
    }
    //{ "name":"John", "age":30, "car":null }
    global.localaction = { datedate: date.toJSON() };
    console.log(global.localaction)
    return  String(date);
}

const getResponse = () => {
    if (typeof global.action != 'undefined') {
        switch (action) {
            case "webhookdo":
                return webhook()
                break;
            case "webhookdoagain":
                return webhookfollowup()
                break;
            case "appointment.appointment-yes.appointment-yes-custom":
                return 'Confirm this appointment: ' + appointment();
                break;
            case "finalappointment":
                return 'great we will see you on: ' + appointmentfollowup();
                break;
            case "wantstolocation":
                return "let me calculate that for you"
                break;
        }
    }
    else {
        return "hello"
    }
};




// Receives the request from google and handles it.
app.post('/webhook', (req, res) => {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  function getUserID(session) {
    let sessionID = session.split("/")[4];
    // The user is logged in if there is no - inside the sessionID
    if (sessionID.indexOf("-") == -1) {
      return sessionID;
    } else {return false;}
  }

  var data = req.body;

  console.log("\nRequest:");
  console.log(data);

  if ( typeof data !== 'undefined' && data ){
    let question = data.queryResult.queryText;
    let userID = getUserID(data.session);
    const timestamp = logreq(data, userID);
    console.log("\nQuestion:\n" + question);

    global.action = data.queryResult.action;

    // Laurens request
    if (typeof global.action !== 'undefined' && global.action && global.action !== "input.unknown"){
      global.question = data.queryResult.queryText;
      global.parameters = data.queryResult.parameters;
      global.outputcontexts =  data.queryResult.outputContexts;
      global.fulfillmentmessages = data.queryResult.fulfillmentmessages;
      let response = getResponse();
     
      console.log("\nParameters After:\n" +  JSON.stringify(global.parameters));
      console.log("\nResponse: " +responsejson(response))
      res.send(responsejson(response))
    }

    // Caslay request
    else {
      const { spawn } = require('child_process');
      
      // spawns a subproces that takes the timestamp of the request and the current directory to get the request file that is created.
      const child = spawn(__dirname + '/python/main.py', [`${timestamp}`, __dirname]);

      // create a period of time for the sub process to run to avoid returning "undefined" as our result.
      let waitForIt = sleep(3000);
      waitForIt.then(function(){
        
      if(child.error) {
        console.log(child.error);
        res.send("Something went wrong! Please try again.")
      }
      else {
        // Getting the response from the response file
        fs.readFile( __dirname + '/log/responses/' + timestamp + '.log', 'utf8', function (err, data) {
            console.log("\nAnswer:\n" + data);
            res.send(responsejson(data));
        });
      }
      });
    }
  } else {
    res.send(responsejson("Something went wong! please try again."));
  }

});

// Shows the last request in the browser window at the /webhook page. You need to enable this in the setting below. If it's disabled you return error 404.
// const DEBUG = false; // Debug disabled
const DEBUG = true; // Debug enabled

app.get('/webhook', (req, res) => {
  let newestFile = glob.sync(__dirname + '/log/requests/*')
    .map(name => ({name, ctime: fs.statSync(name).ctime}))
    .sort((a, b) => b.ctime - a.ctime)[0].name;
  fs.readFile( newestFile, 'utf8', function (err, data) {
    if (DEBUG == true){
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.parse(data));
    }
    else {res.send("Error 404.");}
   });
});

// Maked the api listen on the port defined in the port variable. Default at port 8888.
var server = app.listen(port, () => {

  var host = server.address().address
  var port = server.address().port

  console.log("api running on " + host + ":" + port);

});

app.post('/api/firebase', (req, res) => {
  var data = req.body;
  var collection = data.collection;
  var docname = data.entryName;
  var context = data.context;

  console.log(data);

  if (collection == "phones"){
    res.send("Submitted!");
    if (collection == "phones"){
      db.collection("phones").doc(`${docname}`).set(context).then(function() {
        res.send("Submitted!");
      }).catch(function(){
      res.send("Something went wrong!");});
    }

  }
  if (collection == "subscriptions"){
    var docData = {
      datasize: `${context.datasize}`,
      price: `${context.price}`
    };
    db.collection("subscriptions").doc(`${docname}`).set(docData).then(function() {
      res.send("Submitted!");
    }).catch(function(){
      res.send("Something went wrong!");});
  }
  else {res.send("Error: collection does not exists.")}
});
