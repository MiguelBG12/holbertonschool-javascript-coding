#!/usr/bin/node

const request = require('request');

// Get the movie ID from the command line arguments
const movieId = process.argv[2];

// Check if a movie ID is provided
if (!movieId) {
  console.log('You must provide the movie ID as an argument.');
  process.exit(1);
}

// Create the URL to fetch movie data
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

// Make a request to fetch movie data
request(apiUrl, (error, response, body) => {
  // Check for errors in the request
  if (!error && response.statusCode === 200) {
    const movieData = JSON.parse(body);

    // Extract character URLs from movie data
    const characterUrls = movieData.characters;
    let characterCount = 0;

    // Function to print character names
    function printCharacterName () {
      // Check if there are more character URLs to process
      if (characterCount < characterUrls.length) {
        const characterUrl = characterUrls[characterCount];

        // Request character data from the character URL
        request(characterUrl, (charError, charResponse, charBody) => {
          if (!charError && charResponse.statusCode === 200) {
            const characterData = JSON.parse(charBody);
            console.log(characterData.name);
            characterCount++;

            // Recursively call the function for the next character
            printCharacterName();
          } else {
            console.error('Error getting character data:', charError);
          }
        });
      }
    }

    // Start printing character names
    printCharacterName();
  } else {
    console.error('Error getting movie data:', error);
  }
});
