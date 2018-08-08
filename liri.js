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

// If LIRI will respond if it receives one of the follow commands:
if (command === "movie-this") {
    movieThis(media);
} else if (command === "spotify-this-song") {
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
                console.log("\nTweet: " + post.text)
                console.log("Posted On: " + post.created_at);
                console.log("\n-----------------");
            }
        }
    });
}
// Spotify - Returns information about a song 
function spotifyThisSong(song_name) {
    spotify.search({ type: 'track', query: song_name , limit: 3}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var obj = data.tracks.items[0];
        console.log("\nArtist: " + obj.artists[0].name)
        console.log("Song Title: " + obj.name);
        console.log("Link: " + obj.external_urls.spotify);
        console.log("Album: " + obj.album.name);
        console.log("\n-----------------");
    });
}
// OMDB -  Returns information about a movie
function movieThis(movie_name) {
    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        if (!error && response.statusCode === 200) {
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("\n-----------------");
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
        }
    });
}

