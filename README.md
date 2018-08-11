# liri-node-app

LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data. LIRI specializes in finding song and movie information, displaying my 20 most recent tweets, and reading/writing to text files.

Try LIRI out using one of the following commands:
  
  1. node liri.js my-tweets
      Displays the last 20 tweets from user @jschneid94 in the terminal/bash window, including its content and created timestamp.
      
  2. node liri.js spotify-this-song '<song name here>'
      Displays the artist(s), song's name, preview link, and album. *Note* If there is no song name specified, LIRI will automatically search for "The Sign" by Ace of Base.
  
  3. node liri.js movie-this '<movie name here>'
      Displays various information about the searched movie title, including year of release, IMDB & Rotten Tomatoes rating, country, language, and plot summary. *Note* If there is no movie title specified, LIRI will automatically search for "Mr. Nobody" by starring Jared Leto.
  
  4. node liri.js do-what-it-says
      Performs the command written out in the random.txt file.
      
LIRI will also keep a log of every command run and will store the results in the log.txt file.

LIRI uses Node.js to run in the terminal, and uses several package modules to run its commands and retrieved data from their respectice APIs. These npm's include fs, request, Spotify, Twitter, and dotnev. LIRI also uses the Spotify, OMDB, and Twitter APIs for its data.

