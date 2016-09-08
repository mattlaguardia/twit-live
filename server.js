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



// twitter api call //
twitter = new Twitter ({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  token: process.env.TWITTER_TOKEN,
  token_secret: process.env.TWITTER_TOKEN_SECRET
})

app.get('/twit', function(req, res) {
  twitter.untrack(req.searchKey);
  console.log('Untracking: ' + req.searchKey);

  req.searchKey = 'San Francisco'
  twitter.track(req.searchKey);
  console.log('Tracking: ' + req.searchKey);

  // res.render(req.searchKey);
  twitter.on('tweet', function(tweet) {
    console.log('Tweet: ' + tweet.text);
  })
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Express Sever Listening on Port 3000")
})
