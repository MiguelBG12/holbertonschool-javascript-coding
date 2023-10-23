#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

// Check if the movie ID is provided as a command line argument
if (!movieId) {
  console.log('You must provide the movie ID as an argument.');
  process.exit(1);
}

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  // Check if there are no errors and the response status code is 200 (OK)
  if (!error && response.statusCode === 200) {
    const movieData = JSON.parse(body);

    const characterUrls = movieData.characters;
    let characterCount = 0;

    // Define the function to print character names
    function printCharacterName () {
      // Check if there are more characters to print
      if (characterCount < characterUrls.length) {
        const characterUrl = characterUrls[characterCount];
        request(characterUrl, (charError, charResponse, charBody) => {
          // Check if there are no errors and the response status code is 200
          if (!charError && charResponse.statusCode === 200) {
            const characterData = JSON.parse(charBody);
            console.log(characterData.name);
            characterCount++;
            // Call the function recursively for the next character
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
