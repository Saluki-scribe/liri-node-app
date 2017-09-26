//Include required modules

const request = require("request");
const fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var twitterKeys = require("./twitter-keys");
var spotifyKeys = require("./spotify-keys");
var Function = require("./functions.js");

//Liri Commands

var command = process.argv[2].toLowerCase();
var choice = 0;

//Make functions available from functions.js

var tweetIt = Function.tweetIt;
var spotifyIt = Function.spotifyIt;
var movieIt = Function.movieIt;

//COMMAND LOGIC

if(command == "my-tweets") {
    
    fs.appendFile("log.txt", `\n\nCommand: ${command}______________\n`);    
    tweetIt();

} else if (command == "spotify-this-song") {
    
    fs.appendFile("log.txt", `\n\nCommand: ${command}______________\n`);    
    choice = process.argv[3];    
    spotifyIt(choice);

} else if (command == "movie-this") {
    
    fs.appendFile("log.txt", `\n\nCommand: ${command}______________\n`);    
    choice = process.argv[3];        
    movieIt(choice);

} else if (command == "do-what-it-says") {

    fs.appendFile("log.txt", `\n\nCommand: ${command}______________\n`);    
    var contents = fs.readFile("./random.txt", "UTF-8", function(err, contents) {

        if (err) {
            console.log(err);
        }

        command = contents.substr(0, contents.indexOf(","));
        contentChoice = contents.substr(contents.indexOf(",")).replace(",", "");
        console.log(contents);   
        console.log(`Command: ${command}
        Content Choice: ${contentChoice}`);

        if(command == "my-tweets") {
            
                tweetIt();
            
            } else if (command == "spotify-this-song") {
            
                spotifyIt(contentChoice);
            
            } else if (command == "movie-this") {
                
               movieIt(contentChoice);

            }

    });

} else {
    console.log(`Not a valid command. Please use one of the following:
    
    my-tweets
    spotify-this-song "<song name>"
    movie-this "<movie name>"
    do-what-it-says`);

}; //End if-else statement for commands