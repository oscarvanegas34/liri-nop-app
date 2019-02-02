// This code will read and set any environment variables with the dotenv package

require("dotenv").config();

// Calling all our packages
var axios = require("axios");
var moment = require('moment');
var Spotify = require('node-spotify-api');

// This code will make liri.js to take the following commandsa:
// * `concert-this`
// * `spotify-this-song`
// * `movie-this`
// * `do-what-it-says`


// Run API to give you information about that artist

function concertThis() {
 // Getting the user input from the terminal
  var artist = process.argv.slice(2).join(" ");
  // Run the axios.get function to search in the bandsintown API
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
    function (response) {
      // If the axios was successful...
      // Then log the body from the site! 
      console.log("Name of the venue: " + response.data[1].venue.name + "\nVenue Location: " + response.data[1].venue.city + ", " + response.data[1].venue.country + "\nDate of the Event: " + moment(response.data[1].datetime).format('MMMM Do YYYY, h:mm:ss a'));
    },

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

function spotifyThisSong(songName) {
  // Getting the user input from the terminal
  var songName = process.argv.slice(2).join(" ");
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
    console.log("Song Name: " + response.tracks.items[0].name + "\nArtist Name: " + response.tracks.items[0].album.artists[0].name + "\nSong Preview: " + response.tracks.items[0].preview_url + "\nAlbum Name: " + response.tracks.items[0].album.name);
  });
};

// Calling the functions for testing

// spotifyThisSong();
concertThis();