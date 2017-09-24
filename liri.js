const request = require("request");
const util = require("util");
var twitterKeys = require("./keys");
var spotifyKeys = require("./keys");

var twitter = require("twitter");
var Spotify = require("node-spotify-api");

//Twitter Keys
var consumerKey = twitterKeys.consumer_key;
var consumerSecret = twitterKeys.consumer_secret;
var accessTokenKey = twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.access_token_secret;

//Spotify Keys
var spotifyId = spotifyKeys.client_id;
var spotifySecret = spotifyKeys.client_secret;

//Liri Commands

var command = process.argv[2].toLowerCase();
var choice = process.argv[3].toLowerCase();

console.log(command);

//Command logic

if(command == "my-tweets") {

    console.log("my-tweets are awesome!");

} else if (command == "spotify-this-song") {

    console.log("Woooo, Spotify!");

    var spotify = new Spotify({
        id: spotifyId,
        secret: spotifySecret
      });

    spotify.search({ type: 'track', query: choice }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log("\n\n\n\n")
      console.log(data.tracks.items);
      var artists = data.tracks.items[1].album.artists[0].name;
      var song = choice;
      var songPreview = data.tracks.items[1].preview_url;
      var album = data.tracks.items[1].album.name;
      //console.log(data.tracks.items);       
      
      console.log(`
      Artists: ${artists}
      Song Name: ${song}
      Song Preview: ${songPreview}
      Album: ${album}`);      

    });

} else if (command == "movie-this") {
    
    console.log("Woohoo, movie-this!");

} else if (command == "do-what-it-says") {
    console.log("This logs do-what-it-says");
} else {
    console.log(`Not a valid command. Please use one of the following:
    
    my-tweets
    spotify-this-song
    movie-this
    do-what-it-says`);

}; //End if-else statement for commands