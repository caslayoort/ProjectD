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
const responsejson = (resp) => {
  textfulfillment = '{"fulfillmentMessages": [{ "text": { "text": [ "' + resp + '" ] } } ] }';
  return textfulfillment;
};

// Logs request to a file for python. Also puts it in firebase so we could see it there to make responses personal based on your past.
const logreq = (r) => {
  if (typeof r !== 'undefined' && r){
    // Creating a log in the log/requests folder with the epoch time format as name of the .log file.
    let date = Math.floor(new Date());
    fs.writeFile(__dirname + `/log/requests/${date}.log`, JSON.stringify(r), function (err) {
      // Throw an error if needed, otherwise log the action in log/api-req.log
      if (err) throw err;
      else {fs.appendFile(__dirname + '/log/api-req.log', `Request ${date} is logged.`, function (err) {if (err) throw err;});}
    });    

    // Log the request to firebase. Needs to be activated when we receive the uuid of the person that's logged in.
    if (false){
    var docData = {
      request: `${r.queryResult.queryText}`,
      uuid: "UUID"
    };
    db.collection("askedquestions").doc(`${date}`).set(docData).then(function() {
      console.log("Request saved in firebase.");
    });
  }

    return date;
  }
};

// Receives the request from google and handles it.
app.post('/webhook', (req, res) => {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  var data = req.body;

  console.log("\nRequest:");
  console.log(data);

  if ( typeof data !== 'undefined' && data ){
    let question = data.queryResult.queryText;
    
    console.log("\nQuestion:\n" + question);

    const timestamp = logreq(data);
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