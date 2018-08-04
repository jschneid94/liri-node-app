require("dotenv").config();

// TODO: Add the code required to import the keys.js file and store it in a variable

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

// TODO: Make it so liri.js can take in one of the following commands:
    // my-tweets
    // spotify-this-song
    // movie-this
    // do-what-it-says
if (command === "movie-this") {
    console.log(command);
    movieThis();
}
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
}
// 'movie-this`
function movieThis(movie_name) {
    // Title of the movie.
        // Year the movie came out.
        // IMDB Rating of the movie.
        // Rotten Tomatoes Rating of the movie.
        // Country where the movie was produced.
        // Language of the movie.
        // Plot of the movie.
        // Actors in the movie.
    
}
// 'do-what-it-says`
function doWhatItSays() {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
}

