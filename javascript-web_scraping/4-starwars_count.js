#!/usr/bin/node

const request = require('request'); // Import the 'request' module to make HTTP requests

// Check if the correct number of arguments (2) is provided in the command line
if (process.argv.length !== 3) {
  console.error('Usage: node 4-starwars_count.js <API_URL>');
  process.exit(1); // Exit with a status code of 1 to indicate an error
}

const apiUrl = process.argv[2]; // Get the API URL from the command line arguments

// Make a GET request to the provided API URL
request.get(apiUrl, (error, response, body) => {
  // Check if an error occurred during the request
  if (error) {
    console.error(error); // Print the error message
    process.exit(1); // Exit with a status code of 1 to indicate an error
  }

  if (response.statusCode === 200) { // Check if the response status code is 200 (OK)
    const filmsData = JSON.parse(body); // Parse the JSON response

    // Ensure that "results" is an array before trying to filter it
    if (Array.isArray(filmsData.results)) {
      const characterUrl = 'https://swapi-api.hbtn.io/api/people/18/';

      // Count the number of films where "Wedge Antilles" is present
      const numFilmsWithWedgeAntilles = filmsData.results.reduce((count, film) => {
        if (film.characters.includes(characterUrl)) {
          return count + 1;
        }
        return count;
      }, 0);

      // Print the number of films where "Wedge Antilles" is present
      console.log(numFilmsWithWedgeAntilles);
    } else {
      console.error('Error: Unexpected response format. "results" is not an array.');
      process.exit(1);
    }
  } else {
    // Print an error message for unsuccessful requests
    console.error(`Error: Failed to retrieve films data. Status code: ${response.statusCode}`);
    process.exit(1); // Exit with a status code of 1 to indicate an error
  }
});
