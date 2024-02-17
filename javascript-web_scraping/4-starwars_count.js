#!/usr/bin/node

// Importing the 'request' module for making HTTP requests.
const request = require('request');

// Making a request to the URL provided as a command-line argument.
request(process.argv[2], function (error, response, body) {
  // Check if there is no error in the request.
  if (!error) {
    // Parse the response body as JSON and access the 'results' array.
    const results = JSON.parse(body).results;
    // Count the number of movies where a character ID ends with '/18/' (Luke Skywalker).
    console.log(results.reduce((count, movie) => {
      return movie.characters.find((character) => character.endsWith('/18/'))
        ? count + 1
        : count;
    }, 0));
  }
});
