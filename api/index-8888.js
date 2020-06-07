const bodyparser = require('body-parser');
const express = require('express');
const glob = require('glob');
const fs = require('fs');
const app = express();
const port = 8888;
const DEBUG = true;



global.parameters;
global.outputcontexts;
global.action;
global.fulfillmentmessages;

global.localparameters;
global.localoutputcontexts;
global.localaction;
global.localfulfillmentMessages

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
})


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
  global.parameters  = { leggo: date.toJSON()};
  global.temp  = { leggo: date.toJSON()};
  global.localparameters = global.parameters
  return "works ";
}        
      
function webhookfollowup() {
  global.fulfillmentmessages  = { datedate: new Date(global.localparameters["leggo"])};
  return  "date : " +  new Date(global.localparameters["leggo"]).toString();
 
}        
function appointmentfollowup() {
    if ( typeof global.parameters != 'undefined'){
        global.fulfillmentmessages  = { datedate: global.parameters["datedate"]};
        return new Date(global.parameters["datedate"]).toString();
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
    global.parameters = { datedate: date.toJSON()};
    return  String(date);
}

const getResponse = () => {
  if ( typeof global.action != 'undefined'){
     switch(action) {
        case "webhookdo": 
          return webhook()
          break;
        case "webhookdoagain": 
          return webhookfollowup()
          break;
        case "appointment.appointment-yes.appointment-yes-custom": 
          return 'Confirm this appointment: '+ appointment();
          break;
         case "finalappointment": 
          return 'great we will see you on: '+ appointmentfollowup();
          break;
        default: 
          return "Didn't quite get that. Please try again."
      }
    }  
  else if(typeof global.question != 'undefined'){
      q = global.question;
      if (q == "Hello, I am Okke"){return "Hello Okke, we from Swisscom would be more than happy to help! :D";}
      else if (q == "Hello, I am Caslay"){return "Hey Caslay, how can i help you today?";}
      else if (q == "location"){return "let me calculate that for you";}
      else if (q == "closest store"){return "the closest one is...";}
      else {return "Hey there leggo!";}
  }
  return "hello"
};

app.post('/webhook', (req, res) => {
  var data = req.body;
  console.log("\nRequest:");
  
  console.log(data);

  if ( typeof data !== 'undefined' && data ){
    
    global.action = data.queryResult.action
    global.question = data.queryResult.queryText;
    global.parameters = data.queryResult.parameters;
    global.outputcontexts =  data.queryResult.outputContexts;
     global.fulfillmentmessages = data.queryResult.fulfillmentmessages;
    
    let response = getResponse();
     
    console.log("\nParameters After:\n" +  JSON.stringify(global.parameters));
    console.log("\nResponse: " +responsejson(response))
    res.send(responsejson(response))
  } else {
    res.send("{}");
  }

});


var server = app.listen(port, () => {

  var host = server.address().address
  var port = server.address().port

  console.log("api running on " + host + ":" + port);

});
