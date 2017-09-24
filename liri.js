var twitterKeys = require("./keys");

//Twitter Keys
var consumerKey = twitterKeys.consumer_key;
var consumerSecret = twitterKeys.consumer_secret;
var accessTokenKey = twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.access_token_secret;

//Liri Commands

var command = process.argv[2].toLowerCase();
console.log(command);

//Command logic

if(command == "my-tweets") {

    console.log("my-tweets are awesome!");

} else if (command == "spotify-this-song") {

    console.log("Woooo, Spotify!");

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