#!/usr/bin/node

// Import the 'request' module to make HTTP requests
const request = require('request');

// Check if the correct number of arguments (3) is provided in the command line
if (process.argv.length !== 3) {
  console.error('Usage: node 2-statuscode.js <URL>');
  process.exit(1);
}

// Get the URL to make the GET request from the command line arguments
const url = process.argv[2];

// Make a GET request to the provided URL using the 'request' module
request.get(url, (error, response) => {
  if (error) {
    // If an error occurs during the request, print the error and exit with a status code of 1
    console.error(error);
    process.exit(1);
  }

  // If the request is successful, print the status code from the response
  console.log(`code: ${response.statusCode}`);
});
