const bodyparser = require('body-parser');
const express = require('express');
const glob = require('glob');
const fs = require('fs');

const app = express();
const port = 8888;
const DEBUG = true;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

const responsejson = (resp) => {
  textfulfillment = '{"fulfillmentMessages": [{ "text": { "text": [ "' + resp + '" ] } } ] }';
  return textfulfillment;
};

const getResponse = (q) => {
  if (q == "Hello, I am Okke"){return "Hello Okke, we from Swisscom would be more than happy to help! :D";}
  else if (q == "Hello, I am Caslay"){return "Hey Caslay, how can i help you today?";}
  //else {return "Hey there, where can i assist you with today?";}
  else {return "Hey there";}
};

const logreq = (r) => {
  if (typeof r !== 'undefined' && r){
    // Creating a log in the log/requests folder with the epoch time format as name of the .log file.
    let date = Math.floor(new Date() / 1000);
    fs.writeFile(__dirname + `/log/requests/${date}.log`, JSON.stringify(r), function (err) {
      // Throw an error if needed, otherwise log the action in log/api-req.log
      if (err) throw err;
      else {fs.appendFile(__dirname + '/log/api-req.log', `Request ${date} is logged.`, function (err) {if (err) throw err;});}
    });

    return date;
  }
};

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
    let response = getResponse(question);
    
    console.log("\nQuestion:\n" + question);
    console.log("\nAnswer:\n" + response);

    const timestamp = logreq(data);
    const { spawn } = require('child_process');
    
    // spawns a subproces that takes the timestamp of the request and the current directory to get the request file that is created.
    const child = spawn(__dirname + '/python/main.py', [`${timestamp}`, __dirname]);

    // create a period of time for the sub process to run to avoid returning "undefined" as our result.
    let waitForIt = sleep(1000);
    waitForIt.then(function(){
      
    if(child.error) {
      console.log(child.error);
      res.send("Something went wrong! Please try again.")
    }
    else {
      // Getting the response from the response file
      fs.readFile( __dirname + '/log/responses/' + timestamp + '.log', 'utf8', function (err, data) {
           res.send(responsejson(data));
       });
     }
    });
  } else {
    res.send(responsejson("Something went wong! please try again."));
  }

});

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

var server = app.listen(port, () => {

  var host = server.address().address
  var port = server.address().port

  console.log("api running on " + host + ":" + port);

});