#!/usr/bin/node
const fs = require('fs');
// Import the 'fs' module to work with the file system.

if (process.argv.length !== 4) {
  // Check if the correct number of command line arguments is provided (should be 4, including the script name, file path, and string to write).
  console.error('Usage: node 1-writeme.js <file_path> <string_to_write>');
  // If the correct number of arguments is not provided, display an error message in the console.
  process.exit(1);
  // Exit the program with an error code.
}

const filePath = process.argv[2];
const stringToWrite = process.argv[3];
// Get the file path and the string to write from the command line arguments.

fs.writeFile(filePath, stringToWrite, 'utf-8', (err) => {
  // Write the content to the file in UTF-8 encoding using the 'fs.writeFile' method and handle errors in a callback function.
  if (err) {
    // If an error occurs during the writing, this block of code is executed.
    console.error(err); // Display the error object in the console if an error occurs.
  } else {
    // If there are no errors, this block of code is executed.
    console.log('File has been written successfully.');
    // Display a success message in the console.
  }
});
