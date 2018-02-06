//require module for storing config 
require("dotenv").config();

//require node packages for api calls
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//capture command line arguments
var inputString = process.argv;

//first string will be command type
var command = inputString[2];

//arg[2] corresponding function call
if (command === "my-tweets") {
	twitterAPI();
}
	else if (command === "spotify-this-song") {
		spotifyAPI();
	}
	else if (command === "movie-this") {
		omdbapi();
	}
	else if (command === "do-what-it-says") {
		executeFile();
	}


//twitter
function twitterAPI {
  var tweet = inputString[3];
  //requests:
  //https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
  //parameter required: q; utf-8 url-encoded search query of 500 characters max (ex: @noradio)
  //parameter optional: count; # of tweets returned per page
  //client.get(path, params, callback);
  //example API call: GET https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&count=4
}

//spotify
function spotifyAPI {
  var song = inputString[3];
  //.search
  //search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);
  //Example:
	  // var spotify = new Spotify({
	  // id: <your spotify client id>,
	  // secret: <your spotify client secret>
	// });
	//spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  		//if (err) {
    		//return console.log('Error occurred: ' + err);
  		//}
 	//console.log(data); 
	//});
}

//OMDB
// Include the request npm package (Don't forget to run "npm install request" in this folder first!)
function omdbAPI {
  var movie = inputString[3];
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
  	if (!error && response.statusCode === 200) {
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);

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
  var song = inputString[3];
}
//fs.readFile


//**use Modularization for BONUS

//fs.appendFile