#!/usr/bin/node

// Import the 'request' module for making HTTP requests
const request = require('request');

// Import the 'fs' module for working with the file system
const fs = require('fs');

// Check if the correct number of arguments (2) is provided in the command line
if (process.argv.length !== 4) {
  console.error('Usage: node 5-request_store.js <URL> <file_path>');
  process.exit(1); // Exit with a status code of 1 to indicate an error
}

const url = process.argv[2];
const filePath = process.argv[3];

// Make a GET request to the provided URL
request(url, (error, response, body) => {
  if (error) {
    console.error(`Error: ${error}`);
    process.exit(1); // Exit with a status code of 1 to indicate an error
  }

  if (response.statusCode === 200) {
    // Write the body response to the specified file
    fs.writeFile(filePath, body, 'utf-8', (err) => {
      if (err) {
        console.error(`Error writing to the file: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.error(`Error: Failed to retrieve webpage content. Status code: ${response.statusCode}`);
    process.exit(1); // Exit with a status code of 1 to indicate an error
  }
});
