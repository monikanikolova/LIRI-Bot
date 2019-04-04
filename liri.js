require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require('moment');
var Spotify = require("node-spotify-api");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var term = process.argv[2];
var search = process.argv.slice(3).join(" ");

function start() {
    switch (term) {
        case "concert-this":
            findConcert();
            break;
        case "spotify-this-song":
            findSong();
            break;
        case "movie-this":
            findMovie();
            break;
        case "do-what-it-says":
            doSomething();
            break;
        default:
            console.log("Please input command!");
    }
};

function findSong() {
    search = search || "The Sign Ace of Base";
    spotify
        .search({ type: "track", query: search })
        .then(function (response) {
            var jsonData = response.tracks.items[0]
            var songInfo = `
            Artist: ${jsonData.artists[0].name}
            Song Name: ${jsonData.name}
            Preview Link: ${jsonData.preview_url}
            Album Name: ${jsonData.album.name}
            `;
            logData(songInfo);
            console.log(songInfo);
        })
        .catch(function (err) {
            console.log(err);
        });
}

function findConcert() {
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp").then(function (response) {
        var jsonData = response.data[0];
        convertedDate = moment(jsonData.datetime).format("MM/DD/YYYY");
        var concertInfo = `
        Name of the venue: ${jsonData.venue.name}
        Venue Location: ${jsonData.venue.city}
        Date of the Event: ${convertedDate}
        `;
        logData(concertInfo);
        console.log(cocertInfo);
    })
}

function findMovie() {
    search = search || "Mr.Nobody";
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            var info = response.data;
            var movieInfo = `
            Title: ${info.Title}
            Year: ${info.Year}
            IMDB Rating: ${info.imdbRating}
            Rotten Tomatoes Rating: ${info.Ratings[1] ? info.Ratings[1].Value : "Not available"}
            Country: ${info.Country}
            Language: ${info.Language}
            Plot: ${info.Plot}
            Actors ${info.Actors} 
            `;
            logData(movieInfo);
            console.log(movieInfo);
        }
    );
}

function doSomething() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) return console.log(err);
        var newData = data.split(",");
        term = newData[0];
        search = newData[1];
        start();
    });
}

function logData(data) {
    fs.appendFile('log.txt', data, (err) => {
        if (err) return console.log(err);
        console.log('The "data to append" was appended to file!');
    });
}

start();