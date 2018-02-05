require("dotenv").config();
var twitter = require('twitter');



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