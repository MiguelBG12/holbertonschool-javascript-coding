#!/usr/bin/node

// Import the 'request' module to make HTTP requests
const request = require('request');

// Get the API URL as a command-line argument
const url = process.argv[2];

// Make an HTTP request to the provided URL
request(url, (error, res, body) => {
  if (error) {
    console.error(error); // Print an error message if the request fails
  } else {
    // Parse the response body as JSON
    const data = JSON.parse(body);

    let i = 0;
    let count = 0;

    // Iterate through the list of results in the JSON response
    while (data.results[i]) {
      // Iterate through the characters in each film
      data.results[i].characters.forEach((characterUrl) => {
        // Check if the character URL ends with '/18/' (character ID for Wedge Antilles)
        if (characterUrl.endsWith('/18/')) {
          count++; // Increment the count if Wedge Antilles is present
        }
      });
      i++;
    }

    // Print the total count of films where Wedge Antilles is present
    console.log(count);
  }
});
