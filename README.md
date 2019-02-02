# liri-bot

We are using the following packages to retrieve the data that will power this app.

*Node-Spotify-API
*Axios: We will use it to grab data from OMDB API and the Bands In Town API
*Dotenv: This is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
*Moment: A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.

### Intructions 

1. Run `npm init -y` &mdash; in the root of your project this will initialize a `package.json`

2. Make a `.gitignore` file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

node_modules
.DS_Store
.env

3. Make a JavaScript file named `keys.js` and add the following lines of code:

console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

4. Next, create a file named `.env`, add the following to it, replacing the values with your API keys

# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github &mdash; keeping our API key information private.

* If someone wanted to clone your app from github and run it themselves, they would need to supply their own `.env` file for it to work.

5. Make a file called `random.txt`.

* Inside of `random.txt` put the following in with no extra characters or white space:

     * spotify-this-song,"I Want it That Way"

6. Make a JavaScript file named `liri.js`.

7. At the top of the `liri.js` file, add code to read and set any environment variables with the dotenv package:

require("dotenv").config();

8. Add the code required to import the `keys.js` file and store it in a variable.

* You should then be able to access your keys information like so

  var spotify = new Spotify(keys.spotify);

9. Making liri.js to take the following commands:

 * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`