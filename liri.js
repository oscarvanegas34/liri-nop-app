// This code will read and set any environment variables with the dotenv package

require("dotenv").config();

// Calling all the packages
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

// Function that writes all the data from output to the logfile
function writeToLog(data) {
  fs.appendFile("log.txt", '\r\n\r\n', function (err) {
    if (err) {
      return console.log(err);
    }
  });

  fs.appendFile("log.txt", (data), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("log.txt was updated!");
  });
}

// This function will search any artist and return the events
// Getting the user input from the terminal
var artist = process.argv.slice(2).join(" ");

function concertThis(artist) {

  // Run the axios.get function to search in the bandsintown API
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response) {
      // If the axios was successful assign the response to the output variable 
      var output = "Name of the venue: " + response.data[1].venue.name + "\nVenue Location: " + response.data[1].venue.city + ", " + response.data[1].venue.country + "\nDate of the Event: " + moment(response.data[1].datetime).format('MMMM Do YYYY, h:mm:ss a');
      // Console logging the output to the terminal
      console.log(output);
      // Adding the output to the log file
      writeToLog(output);
    },
    // This function will return some errors information if there is not information to return
    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

// Function to search for a song in Spotify
// Getting the user input from the terminal
var songName = process.argv.slice(2).join(" ");

function spotifyThisSong(songName) {
  // Passing the credential from the .env file
  var spotify = new Spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });
  // Stament to determine if we received an user input
  if (!songName) {
    var songName = "Solita";
  }
  // Searching the songName in the spotify package 
  spotify.search({
    type: 'track',
    query: songName
  }, function (err, response) {
    if (err) {
      return console.log("Please enter a valid name for the song." + "\n" + err);
    }
    // Assigning the output to the output variable
    var output = "Song Name: " + response.tracks.items[0].name + "\nArtist Name: " + response.tracks.items[0].album.artists[0].name + "\nSong Preview: " + response.tracks.items[0].preview_url + "\nAlbum Name: " + response.tracks.items[0].album.name;
    // Console logging the output to the terminal
    console.log(output);
    // Adding the output to the log file
    writeToLog(output);
  });
};

// This function will give information about some information about any movie search
// Getting the user input from the terminal
var movieName = process.argv.slice(2).join(" ");

function movieThis(movieName) {
  // Stament to determine if we received an user input
  if (!movieName) {
    var movieName = "Mr. Nobody";
  }
  // Run the axios.get function to search in the bandsintown API
  axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=8620bafb").then(
    function (response) {
      // If the axios was successful assign to the output variable   
      var output = "Movie name: " + response.data.Title + "\nReleased date: " + response.data.Released + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten tomatoes rating: " + response.data.Ratings[1].Value + "\nCountry of production: " + response.data.Country + "\nMovie language: " + response.data.Language + "\nMovie plot: " + response.data.Plot + "\nActors in the movie: " + response.data.Actors;
      // Console logging the output to the terminal
      console.log(output);
      // Adding the output to the log file
      writeToLog(output);
    },
    // This function will return some errors information if there is not information to return
    function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
};

// LIRI will take the text inside of random.txt and then use it to call spotifyThisSong.
// fs Node package for reading and writing files
var fs = require("fs");

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {
    spotifyThisSong(data);
  });
};

var inquirer = require("inquirer");
inquirer
  .prompt([
    // Here we give the user a list to choose from.
    {
      type: "list",
      message: "What would you like to do?",
      choices: ["Spotify", "Movie", "Concert", "Do what it says"],
      name: "programs"
    },
    // Ask about the movie
    {
      type: "input",
      name: "movieChoice",
      message: "What's the name of the movie you would like to search?",
      when: function (inquirerResponse) {
        return inquirerResponse.programs == "Movie";
      }
    },
    // Ask about the song
    {
      type: "input",
      name: "songChoice",
      message: "What's the name of the song you would like to search?",
      when: function (inquirerResponse) {
        return inquirerResponse.programs == "Spotify";
      }
    },
    // Ask about the artist name
    {
      type: "input",
      name: "artistName",
      message: "What's the name of the artist you would like to search?",
      when: function (inquirerResponse) {
        return inquirerResponse.programs == "Concert";
      }
    }
  ])
  .then(function (inquirerResponse) {
    // Depending on which program the user chose to run it will do the function for that program
    switch (inquirerResponse.programs) {
      case "Spotify":
        spotifyThisSong(inquirerResponse.songChoice);
        break;
      case "Movie":
        movieThis(inquirerResponse.movieChoice);
        break;
      case "Concert":
        concertThis(inquirerResponse.artistName);
        break;
      case "Do what it says":
        doWhatItSays();
        break;
      default:
        console.log("LIRI doesn't know that");
    }
  });