require("dotenv").config();

//require node packages
var twitter = require('twitter');
var Spotify = require('node-spotify-api');



//capture command line arguments
var inputString = process.argv;

//first string will be command type
var command = inputString[2];

//twitter
if (command === "my-tweets") {
  var tweet = inputString[3];
  //requests:
  //https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
  //parameter required: q; utf-8 url-encoded search query of 500 characters max (ex: @noradio)
  //parameter optional: count; # of tweets returned per page
  //client.get(path, params, callback);
  //example API call: GET https://api.twitter.com/1.1/search/tweets.json?q=%23freebandnames&count=4
}

//spotify
if (command === "spotify-this-song") {
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
var request = require("request");
if (command === "movie-this") {
  var movie = inputString[3];
  request("http://www.omdbapi.com/?t= + movie + &y=&plot=short&apikey=trilogy", function(error, response, body) {
  	if (!error && response.statusCode === 200) {
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);

}





//read text file
if (command === "do-what-it-says") {
  var song = inputString[3];
}
//fs.readFile


//**use Modularization for BONUS

//fs.appendFile