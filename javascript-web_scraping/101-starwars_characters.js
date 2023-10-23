#!/usr/bin/node

// Import the 'request' module for making HTTP requests
const request = require('request');

// Get the Movie ID from the command line arguments
const movieId = process.argv[2];

// Check if a valid Movie ID is provided
if (!movieId) {
  console.log('You must provide the movie ID as an argument.');
  process.exit(1);
}

// Define the API URL for the selected movie
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

// Send an HTTP GET request to the API
request(apiUrl, (error, response, body) => {
  // Check if there are no errors and the status code is 200 (OK)
  if (!error && response.statusCode === 200) {
    // Parse the JSON response into an object
    const movieData = JSON.parse(body);

    // Extract the array of character URLs from the movie data
    const characterUrls = movieData.characters;
    let characterCount = 0;

    // Define a function to print character names
    function printCharacterName () {
      // Check if there are more characters to print
      if (characterCount < characterUrls.length) {
        // Get the URL of the next character
        const characterUrl = characterUrls[characterCount];

        // Send an HTTP GET request to the character URL
        request(characterUrl, (charError, charResponse, charBody) => {
          // Check if there are no errors and the status code is 200 (OK)
          if (!charError && charResponse.statusCode === 200) {
            // Parse the JSON response into an object
            const characterData = JSON.parse(charBody);

            // Print the character's name
            console.log(characterData.name);

            // Move to the next character
            characterCount++;

            // Call the function recursively to print the next character
            printCharacterName();
          } else {
            // Handle errors when retrieving character data
            console.error('Error getting character data:', charError);
          }
        });
      }
    }

    // Start the process of printing character names
    printCharacterName();
  } else {
    // Handle errors when retrieving movie data
    console.error('Error getting movie data:', error);
  }
});
