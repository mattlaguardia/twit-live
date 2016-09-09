
(function() {

  console.log("sanity checkz");
  var socket = io.connect('http://localhost:3000');
      tweetCounter = 0;

  socket.on('connection', function(){
    console.log("connected")
  })

  socket.on('recieve_tweet', function(tweet) {
    console.log('recieved tweet: ' + tweet);
    document.getElementById('#tweets').innerHTML(tweet);
  })

})();
