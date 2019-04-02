require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require("node-spotify-api");
var fs = require("fs");


var term = process.argv[2];
var search = process.argv.slice(3).join(" ");
switch (term) {
    case 'concert':
        console.log(findConcert());
        break;
    case 'spotify':
        console.log(findSong())
        break;
    case 'movie':
        console.log(findMovie());
        break;
    case 'do-what-it-says':
    console.log(doSomething());
    
}

function findSong() {
    var spotify = new Spotify(keys.spotify);

    spotify
  .search({ type: 'track', query: search })
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(err) {
    console.log(err);
  });
}
function findConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(function (response) {
        var jsonData = response.data[0];
        convertedDate = moment(jsonData.datetime).format("MM/DD/YYYY");
        console.log(`Name of the venue: ${jsonData.venue.name}
Venue Location: ${jsonData.venue.city}
Date of the Event: ${convertedDate}
        `);
    })

}
function findMovie() {
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var info = response.data;
            console.log(`Title: ${info.Title}
Year: ${info.Year}
IMDB Rating: ${info.imdbRating}
Rotten Tomatoes Rating: ${info.Ratings[1].Value}
Country: ${info.Country}
Language: ${info.Language}
Plot: ${info.Plot}
Actors ${info.Actors} `
            );
        }
    );

}

function doSomething() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
        console.log(data);
        
      
      });
      
}