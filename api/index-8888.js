const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 8888;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})

var responsejson = (resp) => {
  textfulfillment = '{"fulfillmentMessages": [{ "text": { "text": [ "' + resp + '" ] } } ] }';
  return textfulfillment;
};

var getResponse = (q) => {
  if (q == "Hello, I am Okke"){return "Hello Okke, we from Swisscom would be more than happy to help! :D";}
  else if (q == "Hello, I am Caslay"){return "Hey Caslay, how can i help you today?";}
  //else {return "Hey there, where can i assist you with today?";}
  else {return "Hey there";}
};

app.post('/webhook', (req, res) => {
  var data = req.body;

  console.log("\nRequest:");
  console.log(data);

  if ( typeof data !== 'undefined' && data ){
    let question = data.queryResult.queryText;
    let response = getResponse(question);
    
    console.log("\nQuestion:\n" + question);
    console.log("\nAnswer:\n" + response);
    
    res.send(responsejson(response));
  } else {
    res.send("{}");
  }

});

var server = app.listen(port, () => {

  var host = server.address().address
  var port = server.address().port

  console.log("api running on " + host + ":" + port);

});

