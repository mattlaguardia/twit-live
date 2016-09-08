var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    Twitter = require('node-tweet-stream');

require('dotenv').load();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Sever Listening on Port 3000")
})
