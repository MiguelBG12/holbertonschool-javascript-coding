#!/usr/bin/node

// Import the 'fs' module to work with the file system
const fs = require('fs');

// Check if the correct number of arguments are provided in the command line
if (process.argv.length !== 4) {
  console.error('Usage: node 1-writeme.js <file_path> <string_to_write>');
  process.exit(1);
}

// Get the file path and the string to write from the command line arguments
const filePath = process.argv[2];
const stringToWrite = process.argv[3];

// Use 'fs.promises.writeFile' to write the file in utf-8 format
fs.promises.writeFile(filePath, stringToWrite, 'utf-8')
  .then(() => {
    console.log(`Data written to ${filePath}`);
  })
  .catch((error) => {
    // Handle any errors that may occur during writing and print the error object
    console.error(error);
  });
