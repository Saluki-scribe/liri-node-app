const request = require("request");
const util = require("util");
var Keys = require("./keys");
var twitterKeys = Keys.twitterKeys;
var spotifyKeys = Keys.spotifyKeys;

var twitter = require("twitter");
var Spotify = require("node-spotify-api");

//Twitter Key Variables
var consumerKey = twitterKeys.consumer_key;
var consumerSecret = twitterKeys.consumer_secret;
var accessTokenKey = twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.access_token_secret;

console.log(twitterKeys);

//Spotify Keys
var spotifyId = spotifyKeys.client_id;
var spotifySecret = spotifyKeys.client_secret;

//Liri Commands

var command = process.argv[2].toLowerCase();
var choice = 0;

console.log(command);

//Command logic

if(command == "my-tweets") {

    console.log("my-tweets are awesome!");

//User authentification for Twitter

    var twitter = new twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessTokenKey,
        access_token_secret: accessTokenSecret
      });
      
//Search Twitter API and return recent tweets

      var params = {screen_name: '@saluki_scribe'};
      twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
        console.log("Error!");
          console.log(error);
        }
        
        if (response.statusCode === 200){
            console.log("No error!");
            //var JSONTweets = JSON.parse(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(`\n${tweets[i].created_at}:  ${tweets[i].text}\n`);
            }
            
        }
      });

} else if (command == "spotify-this-song") {

    choice = process.argv[3].toLowerCase();

//User Authentification for Spotify

    var spotify = new Spotify({
        id: spotifyId,
        secret: spotifySecret
      });

//Search Spotify API and return requested data

    spotify.search({ type: 'track', query: choice }, function(err, data) {
        
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {

        //Set variables for retrieving info from the data object 

            var artists = data.tracks.items[0].album.artists[0].name;
            var song = choice;
            var songPreview = data.tracks.items[0].preview_url;
            var album = data.tracks.items[0].album.name;
            
        //Display chosen song info
      
            console.log(`
            Artists: ${artists}
            Song Name: ${song}
            Song Preview: ${songPreview}
            Album: ${album}`);      

        } 
    }); //End Spotify search function 

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