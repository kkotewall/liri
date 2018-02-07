//require module for storing config 
require("dotenv").config();

//require node package variables
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");


//capture command line arguments
var inputString = process.argv;

//first string will be command type
var command = inputString[2];


//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////  sort input[2]  /////////////////////////////////////////////////
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
		spotifyAPI();
		break;
	case "movie-this":
		omdbAPI();
		break;
	case "do-what-it-says":
		executeFile();
		break;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////  function call  //////////////////////////////////////////////////
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
			console.log("The requested tweets are: " + JSON.parse(text));
	//prettify results...
		}
	});
}


//spotify
function spotifyAPI {
	//default spotify search
	if (!inputString[3]) {
		var query = "The Sign Ace of Base"
	}
	//keyword search input[3]
	else if {
		var query = inputString[3]
	}

	//access hidden api keys
	var spotify = new Spotify({
		id: process.env.SPOTIFY_ID,
		secret: process.env.SPOTIFY_SECRET
	});
	//results
	spotify.request("https://api.spotify.com/v1/search/" + query, function(err, data) {
		if (err) {
		    return console.log('Error occurred: ' + err);
		}
	console.log(data); 
	});
}


//OMDB
function omdbAPI {
  var movie = inputString[3];
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  	if (!error && response.statusCode === 200) {
    console.log("Your movie results are: " + JSON.parse(body).imdbRating);

}

//require example:
	// request('http://www.google.com', function (error, response, body) {
	  // console.log('error:', error); // Print the error if one occurred
	  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  // console.log('body:', body); // Print the HTML for the Google homepage.
	// });

//OMDB search parameter:
	//s: search movie title
//OMDB result parameters:
	// t: title of movie
	//y: year of release
	//.imdbRating: IMDB Rating of the movie.
	//Rotten Tomatoes Rating of the movie.
	//Country where the movie was produced.
	//Language of the movie.
	//plot: Plot of the movie.
	//Actors in the movie.


//read text file
function executeFile {
  	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
		    return console.log(error);
		  }
		//text file array and capture song
		console.log(data);
		var fileSong = data.split(",");
		var query = inputString[1];
		console.log(inputString[1])
		spotifyAPI();
	}
}




//**use Modularization for BONUS

//fs.appendFile