var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
const WebSocket = require('ws')
 
const wss = new WebSocket.Server({ port: 8080 })
 
wss.on('connection', ws => {
  ws.on('message', message => {
      
    
    // code for converting byte to audio or speech to text
    fs.writeFile('./audio.wav',message,{encoding: 'base64'},function(err){
        console.log(err);
    });

    console.log(`Received message => ${message}`);
    ws.send('Hello! Message From Server!!');
})
 
})


app.get('/', function (req, res) {
   res.send('Hello World');
})


app.get('/stream', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
 })
 

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   
  console.log("Started server @ %s",port);
})