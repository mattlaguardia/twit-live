var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io').listen(server),
    Twit = require('twit');

server.listen(3000, "127.0.0.1");

require('dotenv').load();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// twitter api call //
var twitter = new Twit ({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token: process.env.TWITTER_TOKEN,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET
})

// socket io connection //
io.sockets.on('connection', function(socket) {
  // socket.emit('recieve_tweet', {tweet: tweets})
  console.log('User is connected');

  var stream = twitter.stream('statuses/filter', { track: 'San Francisco' });

  stream.on('tweet', function(tweet) {
    io.sockets.emit('stream', tweet.text);
    console.log(tweet.text)
  })

  socket.on('diconnect', function() {
    console.log('user disconnected');
  });

});

app.get('/twit', function(req, res) {
  req.searchKey = 'San Francisco'
  twitter.track(req.searchKey);
  console.log('Tracking: ' + req.searchKey);


  res.render('partials/feed', {searchKey: req.searchKey})
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Server Listening on Port 3000")
})
