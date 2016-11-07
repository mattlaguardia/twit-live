console.log("sanity checkz");
var socket = io.connect('http://localhost:3000')

socket.on('stream', function(tweet) {
  document.getElementById('tweetd').innerHTML(tweet + '<br>')
})
