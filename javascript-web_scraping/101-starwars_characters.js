#!/usr/bin/node
const request = require('request'); // Import the 'request' module for making HTTP requests.

// The Movie ID is provided as a command-line argument.
const movieId = process.argv[2]; // Get the movie ID from the command line.

// Check if a movie ID was provided as an argument. If not, display an error message and exit the script.
if (!movieId) {
  console.log('You must provide the movie ID as an argument.');
  process.exit(1);
}

// Define the API URL using interpolation to include the movie ID.
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

// Define the 'printCharacterName' function that will print character names.
function printCharacterName(characterUrls, characterCount) {
  if (characterCount < characterUrls.length) { // Check if there are more character URLs to process.
    const characterUrl = characterUrls[characterCount]; // Get the character URL to fetch.

    // Make a request to the character's URL.
    request(characterUrl, (charError, charResponse, charBody) => {
      if (!charError && charResponse.statusCode === 200) { // Check if there were no errors and the response code is 200 (OK).
        const characterData = JSON.parse(charBody); // Parse the character's data.
        console.log(characterData.name); // Print the character's name.
        printCharacterName(characterUrls, characterCount + 1); // Call the function recursively for the next character.
      } else {
        console.error('Error getting character data:', charError); // If there is an error, display an error message.
      }
    });
  }
}

// Make a request to the movie's API URL.
request(apiUrl, (error, response, body) => {
  if (!error && response.statusCode === 200) { // Check if there were no errors and the response code is 200 (OK).
    const movieData = JSON.parse(body); // Parse the movie's data.
    const characterUrls = movieData.characters; // Get character URLs from the movie's data.
    printCharacterName(characterUrls, 0); // Start the process of printing character names by calling 'printCharacterName'.
  } else {
    console.error('Error getting movie data:', error); // If there is an error in obtaining movie data, display an error message.
  }
});
