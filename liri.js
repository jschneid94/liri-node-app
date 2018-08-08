require("dotenv").config();

const request = require("request");
const Spotify = require("node-spotify-api")

// TODO: Add the code required to import the keys.js file and store it in a variable
key = require("./key");

var spotify = new Spotify(key.spotify);
// var client_Twitter = new Twitter(keys.twitter);

var command = process.argv[2];
var movie = process.argv[3];
var song = process.argv[3];

// TODO: Make it so liri.js can take in one of the following commands:
    // my-tweets
    // spotify-this-song
    // movie-this
    // do-what-it-says
if (command === "movie-this") {
    movieThis(movie);
} else if (command === "spotify-this-song") {
    spotifyThisSong(song);
}

// FUNCTIONS
// 'my-tweets`
function myTweets() {
    // This will show your last 20 tweets and when they were created at in your terminal/bash window
}
// 'spotify-this-song`
function spotifyThisSong(song_name) {
    // This will show the following information about the song in your terminal/bash window
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from

    spotify.search({ type: 'track', query: song_name , limit: 3}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var obj = data.tracks.items[0];
        
        console.log("Artist: " + obj.artists[0].name)
        console.log("Song Title: " + obj.name);
        console.log("Link: " + obj.external_urls.spotify);
        console.log("Album: " + obj.album.name);
    });
}

function movieThis(movie_name) {

    request("http://www.omdbapi.com/?t=" + movie_name + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
    
}

// 'do-what-it-says`
function doWhatItSays() {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
}

