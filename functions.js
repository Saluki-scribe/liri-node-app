//Include required modules

const request = require("request");
const fs = require("fs");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var twitterKeys = require("./twitter-keys");
var spotifyKeys = require("./spotify-keys");

//Liri Commands

var command = process.argv[2].toLowerCase();
var choice = 0;

//Twitter Key Variables

var consumerKey = twitterKeys.consumer_key;
var consumerSecret = twitterKeys.consumer_secret;
var accessTokenKey = twitterKeys.access_token_key;
var accessTokenSecret = twitterKeys.access_token_secret;

//Spotify Key Variables

var spotifyId = spotifyKeys.client_id;
var spotifySecret = spotifyKeys.client_secret;

//COMMAND FUNCTIONS

//*****my-tweets Calls This Function*****

function tweetIt () {
    console.log("You called the twitter function");

    //User authentication object for Twitter

    twitter = new twitter({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        access_token_key: accessTokenKey,
        access_token_secret: accessTokenSecret
      });
      
//Search Twitter API and return recent tweets

      var params = {screen_name: '@saluki_scribe'};
      twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
          console.log("error: " + error);
        }
        
        if (response.statusCode === 200){
            
            for (var i = 0; i < tweets.length; i++) {
                console.log(`\n${tweets[i].created_at}: ${tweets[i].text}\n`);

                //Add tweets to log.txt

                fs.appendFile("log.txt", `\n${tweets[i].created_at}:  ${tweets[i].text}\n`);
            }; //End for loop
        };
      });
}; //End Twitter Function


//*****spotify-this-song Calls This Function*****

function spotifyIt(choice) {

//Set "The Sign" as default search if user doesn't type a song

    if (typeof choice == "undefined") {
        choice = "The Sign"
    }

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
        
        //Append data to log.txt

            fs.appendFile("log.txt", `
            Artists: ${artists}
            Song Name: ${song}
            Song Preview: ${songPreview}
            Album: ${album}`)

        } 
    }); //End Spotify search function 
}; // End SpotifyIt function


//*****movie-this Calls This Function*****

function movieIt(choice) {
    
//Set "Mr. Nobody" as default search if user doesn't type a song
    if (typeof choice == "undefined") {
        choice = "Mr. Nobody"
    }

    request("http://www.omdbapi.com/?t=" + choice + "&plot=short&apikey=40e9cece", function(error, response, body) {
        
          if (error) {
            throw error;
          }
        // If the request is successful (i.e. if the response status code is 200)
          if (response.statusCode === 200) {

            var JSONBody = JSON.parse(body);
            //console.log(JSONBody);
            console.log(`
            Title: ${JSONBody.Title}
            Release Year: ${JSONBody.Released}
            IMDB Rating: ${JSONBody.imdbRating}
            Rotten Tomatoes Rating: ${JSONBody.Ratings[1].Value}
            Country Produced In: ${JSONBody.Country}
            Language: ${JSONBody.Language}
            Plot: ${JSONBody.Plot}
            Actors: ${JSONBody.Actors}
            `);

        //Append movie data to log.txt

            fs.appendFile("log.txt", `
            Title: ${JSONBody.Title}
            Release Year: ${JSONBody.Released}
            IMDB Rating: ${JSONBody.imdbRating}
            Rotten Tomatoes Rating: ${JSONBody.Ratings[1].Value}
            Country Produced In: ${JSONBody.Country}
            Language: ${JSONBody.Language}
            Plot: ${JSONBody.Plot}
            Actors: ${JSONBody.Actors}
            `);
          }
        }); //End OMDB search function
}; //End movieIt function



module.exports = {
    tweetIt: tweetIt,
    spotifyIt: spotifyIt,
    movieIt: movieIt
}