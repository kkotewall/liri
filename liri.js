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

//Spotify & OMDB variables
var song = "";
var movie = "";


//////////////////////////////////////////////////////////////////////////////////////////
///////////////////////  sort command  /////////////////////////////////////////////////
//previous if-then to call corresponding function
// if (inputString[2] === "my-tweets") {
// 	twitterAPI();
// }
// else if (inputString[2] === "spotify-this-song") {
// 	spotifyAPI();
// }
// else if (inputString[2] === "movie-this") {
// 	omdbapi();
// }
// else if (inputString[2] === "do-what-it-says") {
// 	executeFile();
// }

// else {
//   console.log("Not a recognized command");
// }




// direct corresponding function
switch (inputString[2]) {
	case "my-tweets":
		twitterAPI();
		break;
	case "spotify-this-song":
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
	//input[3] as song
	var song = "";
		for (i = 3; i < inputString.length; i++) {
			song = song + inputString[i];
		}
	
	//default spotify search
	if (song === "") {
		song = "The Sign"
	};
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
	request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  	if (!error && response.statusCode === 200) {
  		//return title, year, IMDB rating, rotten tomatoes rating, country of production, language, plot, actors
	    var movieRequest = JSON.parse(body);
		//prettify results...
	}
	console.log("Title: "+movieRequest.Title);
	console.log("Released: "+movieRequest.Year);
    console.log("IMDB Rating: "+movieRequest.imdbRating);
    console.log("Rotten Tomatoes Rating: "+movieRequest.rottentomatoesRating);
    console.log(movieResponse.Country);
    console.log(movieResponse.Language);
    console.log(movieResponse.Plot);
    console.log(movieResponse.Actors);
	});
}


//read text file
function executeFile() {
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
	});
}




//**use Modularization for BONUS

//fs.appendFile