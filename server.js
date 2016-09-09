var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server),
    Twitter = require('node-tweet-stream');

server.listen(3000, "127.0.0.1");

require('dotenv').load();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// twitter api call //
twitter = new Twitter ({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  token: process.env.TWITTER_TOKEN,
  token_secret: process.env.TWITTER_TOKEN_SECRET
})

// socket io connection //
io.sockets.on('connection', function(socket) {
  // socket.emit('recieve_tweet', {tweet: tweets})
  console.log('User is connected: ' + socket);
  socket.on('diconnect', function() {
    console.log('user disconnected');
  });

});
twitter.on('tweet', function(tweet) {
  console.log('Tweet: ' + tweet.text);
  io.sockets.emit('recieve_tweet', tweet);
})

app.get('/twit', function(req, res) {
  req.searchKey = 'San Francisco'
  twitter.track(req.searchKey);
  console.log('Tracking: ' + req.searchKey);


  res.render('partials/feed', {searchKey: req.searchKey})
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Sever Listening on Port 3000")
})
