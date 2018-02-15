//require module for storing config 
require("dotenv").config();

//require node package variables
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var fs = require("fs");

//key access
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


//capture command line arguments
var inputString = process.argv;

//api variables
var song = "";
var movie = "";
var executeVar = "";


//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////  sort command  /////////////////////////////////////////////////

// direct corresponding function
switch (inputString[2]) {
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
///////////////////////////////////  api function calls  /////////////////////////////////////////////
//read text file
function executeFile() {
  	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
		    return console.log(error);
		}
		//text file array and capture song
		var executeVar = data.split(",");
		console.log(executeVar);
		spotifyAPI(executeVar[1]);
	});
}


//twitter
//https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline
function twitterAPI() {
	//output should give 20 last tweets & the date stamp
	var params = {
		screen_name: 'kodewall', count: 20
	};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log("The requested tweets are:");
			//return tweet text & when they were created
			for (var i = 0; i < tweets.length; i++) {
				console.log("Tweet no. " + (i+1) + "\r\n" + "Tweet: " + tweets[i].text + "\r\n" + "Created: " + tweets[i].created_at + "\r\n" +
					"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
			}
		}
		else {
			return console.log('Error occurred: ' + err);
		}
	});
}


//spotify
function spotifyAPI() {
	var song = "";
	//executeFile call
	if (executeVar != null) {
		song = executeVar;
	}
	//input[3] as song
	else {
		for (i = 3; i < inputString.length; i++) {
			song = song + inputString[i];
		}}
	
	//default spotify search
	if (song === "") {
		song = "The Sign"
	};
	console.log(song);
	//results
	spotify.search({ type: 'track', query: song, limit: '5'}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	var data = data.tracks.items;
    console.log("Artist: " + data[0].artists[0].name + "\nSong Title: " + data[0].name + "\nPreview: " + data[0].preview_url + "\nAlbum: " + data[0].album.name);
	});
}


//OMDB
function omdbAPI() {
	//input[3] as movie
		var movie = "";
			for (i = 3; i < inputString.length; i++) {
				movie = movie + inputString[i];
			}
		//default omdb search
		if (movie === "") {
			movie = "Mr. Nobody"
		};

	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  	if (!error && response.statusCode === 200) {
  		//return title, year, IMDB rating, rotten tomatoes rating, country of production, language, plot, actors
	    var movieRequest = JSON.parse(body);
		//prettify results...
	}
	console.log("Title: " + movieRequest.Title);
	console.log("Released in: "+ movieRequest.Year);
    console.log("IMDB Rating: "+ movieRequest.imdbRating);
    console.log("Rotten Tomatoes Rating: "+ movieRequest.rottentomatoesRating);
    console.log("Filmed in " + movieRequest.Country);
    console.log("Language: " + movieRequest.Language);
    console.log("Plot summary: " + movieRequest.Plot);
    console.log("Actors: " + movieRequest.Actors);
	});
}



//**use Modularization for BONUS

//fs.appendFile