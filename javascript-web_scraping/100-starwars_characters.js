#!/usr/bin/node

// Import the 'request' module to make HTTP requests
const request = require('request');

// Get the Movie ID from the command line arguments
const movieId = process.argv[2];

// Check if a Movie ID was provided as a command line argument
if (!movieId) {
  console.log('Please provide a valid Movie ID as the first argument.');
  process.exit(1);
}

// Construct the API URL for the specified Movie ID
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

// Make an HTTP request to the provided API URL
request(apiUrl, (error, response, body) => {
  if (error) {
    // Handle any errors that occur during the request
    console.error(error);
  } else {
    // Parse the response body as JSON to get movie data
    const movie = JSON.parse(body);

    // Extract the character URLs from the movie data
    const characters = movie.characters;

    // Create an array of promises for character data retrieval
    const characterPromises = characters.map((characterUrl) => {
      return new Promise((resolve, reject) => {
        // Make an HTTP request to each character URL
        request(characterUrl, (charError, charResponse, charBody) => {
          if (charError) {
            reject(charError); // Handle errors for individual character requests
          } else {
            // Parse the character data response as JSON
            const character = JSON.parse(charBody);
            resolve(character.name); // Resolve the promise with the character's name
          }
        });
      });
    });

    // Wait for all character promises to resolve
    Promise.all(characterPromises)
      .then((characterNames) => {
        // After all promises have resolved, print the character names
        characterNames.forEach((name) => console.log(name));
      })
      .catch((err) => {
        // Handle any errors that occur during character data retrieval
        console.error('Error:', err.message);
        process.exit(1);
      });
  }
});
