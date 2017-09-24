var request = require("request");
var spotifyKeys = require("./keys");
var Spotify = require("node-spotify-api");

//Spotify Keys
var spotifyId = spotifyKeys.client_id;
var spotifySecret = spotifyKeys.client_secret;

console.log(spotifyId);
console.log(spotifySecret);



var spotify = new Spotify({
    id: spotifyId,
    secret: spotifySecret
  });

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data);
  console.log(data.tracks.href); 
  });