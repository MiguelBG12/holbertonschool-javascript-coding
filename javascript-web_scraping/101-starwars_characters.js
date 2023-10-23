#!/usr/bin/node

// Import the 'request' module for making HTTP requests
const request = require('request');

// Get the movie ID from the command line arguments
const movieId = process.argv[2];

// Check if a movie ID is provided as a command line argument
if (!movieId) {
  console.log('You must provide the movie ID as an argument.');
  process.exit(1);
}

// Define the URL to fetch movie data based on the provided movie ID
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

// Make an HTTP request to the specified URL
request(apiUrl, (error, response, body) => {
  // Check if the request was successful (no error) and the status code is 200 (OK)
  if (!error && response.statusCode === 200) {
    // Parse the JSON response body to get movie data
    const movieData = JSON.parse(body);

    // Extract character URLs from the movie data
    const characterUrls = movieData.characters;
    let characterCount = 0;

    // Define a function to print character names recursively
    function printCharacterName () {
      // Check if there are more character URLs to process
      if (characterCount < characterUrls.length) {
        // Get the URL of the next character
        const characterUrl = characterUrls[characterCount];

        // Make a request to the character URL to fetch character data
        request(characterUrl, (charError, charResponse, charBody) => {
          // Check if the character request was successful
          if (!charError && charResponse.statusCode === 200) {
            // Parse the JSON response body to get character data
            const characterData = JSON.parse(charBody);

            // Print the character's name
            console.log(characterData.name);

            // Move on to the next character
            characterCount++;

            // Recursively call the function for the next character
            printCharacterName();
          } else {
            // Handle errors when fetching character data
            console.error('Error getting character data:', charError);
          }
        });
      }
    }

    // Start the process of printing character names
    printCharacterName();
  } else {
    // Handle errors when fetching movie data
    console.error('Error getting movie data:', error);
  }
});
