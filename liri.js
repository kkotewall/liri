//require module for storing config 
require("dotenv").config();

//require node package variables
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");


//capture command line arguments
var inputString = process.argv;
var song = "";
var movie = "";

//first string will be command type
var command = inputString[2];


//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////  sort command  /////////////////////////////////////////////////
//previous if-then to call corresponding function
// if (command === "my-tweets") {
// 	twitterAPI();
// }
// else if (command === "spotify-this-song") {
// 	spotifyAPI();
// }
// else if (command === "movie-this") {
// 	omdbapi();
// }
// else if (command === "do-what-it-says") {
// 	executeFile();
// }


//direct corresponding function
switch (command) {
	case "my-tweets":
		twitterAPI();
		break;
	case "spotify-this-song":
		var song = inputString[3]
		spotifyAPI();
		break;
	case "movie-this":
		var movie = inputString[3];
		omdbAPI();
		break;
	case "do-what-it-says":
		executeFile();
		break;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////  api function calls  /////////////////////////////////////////////
//twitter
//https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
function twitterAPI {
	//access hidden api keys
	var client = new Twitter({
		consumer_key: process.env.TWITTER_CONSUMER_KEY,
		consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
		access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
		access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
	});
	//output should give 20 last tweets & the date stamp
	client.get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=kodewall&count=20", 
		function(error, response, text) {
		if (!error && response.statusCode === 200) {
			//return tweet text & when they were created
			console.log("The requested tweets are: " + JSON.parse(text));
	//prettify results...
		}
	});
}


//spotify
function spotifyAPI {
	//default spotify search
	if (song = "") {
		song = "The Sign"
	};
	//access hidden api keys
	var spotify = new Spotify({
		id: process.env.SPOTIFY_ID,
		secret: process.env.SPOTIFY_SECRET
	});
	//results
	spotify.search({ type: 'track', query: name, limit: '10'}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	}
	//return artist(s), song's name, preview link, album
	console.log(data); 
	//prettify results...
	});
}


//OMDB
function omdbAPI {
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  	if (!error && response.statusCode === 200) {
  		//return title, year, IMDB rating, rotten tomatoes rating, country of production, language, plot, actors
	    var movieRequest = JSON.parse(body);
		//prettify results...
	}}
	console.log("Title: "+movieRequest.Title);
	console.log("Released: "+movieRequest.Year);
    console.log("IMDB Rating: "+movieRequest.imdbRating);
    console.log("Rotten Tomatoes Rating: "+movieRequest.rottentomatoesRating);
    console.log(movieResponse.Country);
    console.log(movieResponse.Language);
    console.log(movieResponse.Plot);
    console.log(movieResponse.Actors);
};



//read text file
function executeFile {
  	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
		    return console.log(error);
		  }
		//text file array and capture song
		console.log(data);
		var fileText = data.split(",");
		var song = inputString[1];
		console.log(inputString[1])
		spotifyAPI();
	}
}




//**use Modularization for BONUS

//fs.appendFile