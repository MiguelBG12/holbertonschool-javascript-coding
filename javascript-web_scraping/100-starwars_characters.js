#!/usr/bin/node

// Importing the 'request' module for making HTTP requests.
const request = require('request');

// Get movie ID from command line argument.
const movieId = process.argv[2];

// Check if movie ID is provided.
if (!movieId) {
  console.log('You must provide the movie ID as an argument.');
  process.exit(1); // Exit with error code 1.
}

// Construct the API URL using the provided movie ID.
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

// Send a GET request to the API URL.
request(apiUrl, (error, response, body) => {
  // Check if there's no error and the status code is 200 (OK).
  if (!error && response.statusCode === 200) {
    // Parse the response body as JSON.
    const movieData = JSON.parse(body);

    // Iterate over each character URL in the movie data.
    movieData.characters.forEach((characterUrl) => {
      // Send a GET request to each character URL.
      request(characterUrl, (charError, charResponse, charBody) => {
        // Check if there's no error and the status code is 200 (OK).
        if (!charError && charResponse.statusCode === 200) {
          // Parse the character data as JSON.
          const characterData = JSON.parse(charBody);
          // Output the name of the character.
          console.log(characterData.name);
        } else {
          console.error('Error getting character data:', charError);
        }
      });
    });
  } else {
    console.error('Error getting movie data:', error);
  }
});
