const bodyparser = require('body-parser');
const express = require('express');
const glob = require('glob');
const fs = require('fs');
const app = express();
const port = 8888;
const DEBUG = true;
global.globalDate;
global.OutputContexts;
global.temp;



app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})



const responsejson = (resp) => {
  if ( typeof global.globalDate != 'undefined'){
    console.log("-------------------------------------------------------------------------------");
    console.log(global.globalDate);
    console.log(typeof global.globalDate);
    console.log(global.globalDate.toString);
    textfulfillment = '{"parameters": "' + global.globalDate.toString() + '", "fulfillmentText": "' + resp + '", "fulfillmentMessages": [{ "text": { "text": [ "' + resp + '" ] } } ] }';  
  }
  else
  {
    textfulfillment = '{ "parameters": "' + "dosomething" + '"   , "fulfillmentText": "' + resp + '", "fulfillmentMessages": [{ "text": { "text": [ "' +       resp + '" ] } } ] }';  
  }
  return textfulfillment;
};
       
function webhook(q,action,param) {
  var date = new Date();
  global.globalDate  = { leggo: date.toJSON()};
  global.temp =  { leggo: date.toJSON()};
  return "works ";
}        
      
function webhookfollowup() {
  global.globalDate  = { leggo:global.temp["leggo"]};
  return  "date : " + Math.floor(new Date(global.temp["leggo"]));
 
}        
function dothis2(q,action,param) {
    if ( typeof global.globalDate != 'undefined'){
        global.globalDate  = { datedate: global.globalDate["datedate"]};
        return new Date(global.globalDate["datedate"]).toString();
    }
    else {
    "please try again"
    }
}   
function dothis(q,action,param) {
    var list = [];
    var answer = '';
    var date = new Date();
     for (var key in param) {
         if(key == 'otherdays' ){
             let temp  = param[key];
             if(temp  ==  'tomorow' ){
               date.setDate(date.getDate() + 1);
               
             }else if(temp == 'next week'){
                date.setDate(date.getDate() + 7);
             }
         }
         else if(key == 'days' && param[key] != ''){
           var a = 0;
           var b = param[key];
           
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
           if(param[key] < 18 && param[key] >8 ){
             date.setHours(param[key]);  
             date.setMinutes(0);  
             date.setSeconds(0);
           } 
           else if(param[key] < 5){
             date.setHours(param[key] +12);  
             date.setMinutes(0);  
             date.setSeconds(0);
           }
        }
      
      
    }
    //{ "name":"John", "age":30, "car":null }
    global.globalDate = { datedate: date.toJSON()};
    return  String(date);
}

const getResponse = (q,action,param) => {
  if ( typeof action !== 'undefined'){
     switch(action) {
        case "webhookdo": 
          return webhook(q,action,param)
          break;
        case "webhookdoagain": 
          return webhookfollowup()
          break;
        case "appointment.appointment-yes.appointment-yes-custom": 
          return 'Confirm this appointment: '+ dothis(q,action,param);
          break;
         case "finalappointment": 
          return 'great we will see you on: '+ dothis2(q,action,param);
          break;
        default: 
          return "Didn't quite get that. Please try again."
      }
    }  
  if (q == "Hello, I am Okke"){return "Hello Okke, we from Swisscom would be more than happy to help! :D";}
  else if (q == "Hello, I am Caslay"){return "Hey Caslay, how can i help you today?";}
  else if (q == "location"){return "let me calculate that for you";}
  else if (q == "closest store"){return "the closest one is...";}
  else {return "Hey there leggo!";}
};

const logreq = (r) => {
  if (typeof r !== 'undefined' && r){
    // Creating a log in the log/requests folder with the epoch time format as name of the .log file.
    let date = Math.floor(new Date());
    fs.writeFile(__dirname + `/log/requests/${date}.log`, JSON.stringify(r), function (err) {
      // Throw an error if needed, otherwise log the action in log/api-req.log
      if (err) throw err;
      else {fs.appendFile(__dirname + '/log/api-req.log', `Request ${date} is logged.`, function (err) {if (err)   throw err;});}
    });
  }
};

app.post('/webhook', (req, res) => {
  var data = req.body;
  console.log("\nRequest:");
  
  console.log(data);

  if ( typeof data !== 'undefined' && data ){
    logreq(data);
    let action = data.queryResult.action
    let question = data.queryResult.queryText;
    let param = data.queryResult.parameters;
    let outputcontexts =  data.queryResult.outputContexts;
    global.OutputContexts =  outputcontexts;
    
    
    let response = getResponse(question,action,param);
     
    console.log("\nParameters After:\n" +  JSON.stringify(global.globalDate));
    console.log("\n" +responsejson(response))
    res.send(responsejson(response))
  } else {
    res.send("{}");
  }

});


app.get('/webhook', (req, res) => {
  let newestFile = glob.sync(__dirname + '/log/requests/*')
    .map(name => ({name, ctime: fs.statSync(name).ctime}))
    .sort((a, b) => b.ctime - a.ctime)[0].name;
  fs.readFile( newestFile, 'utf8', function (err, data) {
    if (DEBUG == true){res.send(data);}
    else {res.send("Error 404.");}
   });;
});

var server = app.listen(port, () => {

  var host = server.address().address
  var port = server.address().port

  console.log("api running on " + host + ":" + port);

});



