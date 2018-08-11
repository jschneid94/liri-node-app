// Require node packages
require("dotenv").config();
const request = require("request");
const Spotify = require("node-spotify-api")
const Twitter = require("twitter")
const fs = require("fs");

// Import the key.js file and store it in a variable
var key = require("./key");

// Assign client keys to variables
var spotify = new Spotify(key.spotify);
var twitter = new Twitter(key.twitter);

// Variables to grab the command and media title arguments in the terminal line
var command = process.argv[2];
var media = process.argv[3];

// LIRI will respond if it receives one of the follow commands:
if (command === "movie-this") {
    // If there is no movie specified, search for the movie "Mr. Nobody"
    if (media === undefined) {
        media = "Mr. Nobody";
    }
    movieThis(media);
} else if (command === "spotify-this-song") {
    // If there is no song specified, search for the song "The Sign"
    if (media === undefined) {
        media = "The Sign Ace of Base";
    }
    spotifyThisSong(media);
} else if (command === "do-what-it-says") {
    doWhatItSays();
} else if (command === "my-tweets") {
    myTweets();
} else {
    console.log("I'm sorry, I don't know that command.");
}

// FUNCTIONS
//------------------

// Twitter - Returns the most recent tweets from the client account
function myTweets() {
    var params = {screen_name: 'jschneid94'};
    twitter.get('statuses/user_timeline', params, function(error, tweets) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                // If there are less than 20 tweets, stop the for loop
                if (tweets[i] === undefined) { 
                    break; 
                }
                var post = tweets[i];
                var output = "\nTweet: " 
                            + post.text 
                            + "\nPosted On: " 
                            + post.created_at 
                            + "\n-----------------";
                console.log(output);
                outputLog(output);
            }
        }
    });
}
// Spotify - Returns information about a song 
// TO DO - If no song is provided then your program will default to "The Sign" by Ace of Base.
function spotifyThisSong(song_name) {
    spotify.search({ type: 'track', query: song_name , limit: 3}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var obj = data.tracks.items[0];
        var output = "\nArtist: " + obj.artists[0].name
                    + "\nSong Title: " + obj.name
                    + "\nLink: " + obj.external_urls.spotify
                    + "\nAlbum: " + obj.album.name
                    + "\n-----------------";
        console.log(output);
        outputLog(output);
    });
}
// OMDB -  Returns information about a movie
// TO DO -If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function movieThis(movie_name) {
    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        if (!error && response.statusCode === 200) {
            var output = "\nTitle: " + JSON.parse(body).Title
                        + "\nYear: " + JSON.parse(body).Year
                        + "\nIMDB Rating: " + JSON.parse(body).imdbRating
                        + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value
                        + "\nCountry: " + JSON.parse(body).Country
                        + "\nLanguage: " + JSON.parse(body).Language
                        + "\nPlot: " + JSON.parse(body).Plot
                        + "\nActors: " + JSON.parse(body).Actors
                        + "\n-----------------";
            console.log(output);
            outputLog(output);
        }
    });
}
// Do What It Says - Performs the command written in random.txt
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        var command = dataArr[0];
        var request = dataArr[1];
        if (command === "movie-this") {
            movieThis(request);
        } else if (command === "spotify-this-song") {
            spotifyThisSong(request);
        } else if (command === "my-tweets") {
            myTweets();
        }
    });
}
// Output Log - Adds output of commands to log.txt
function outputLog(output) {
    fs.appendFile("log.txt", output, function(error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Output has been added to the log.");
        }
    });
} 
