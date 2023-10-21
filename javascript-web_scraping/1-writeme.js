#!/usr/bin/node
const fs = require('fs');

// Check if the correct number of command-line arguments is provided
if (process.argv.length !== 4) {
  console.error('Usage: node 1-writeme.js <file_path> <string_to_write>');
  process.exit(1);
}

const filePath = process.argv[2];
const stringToWrite = process.argv[3];

// Write the content to the file in UTF-8 encoding
fs.writeFile(filePath, stringToWrite, 'utf-8', (err) => {
  if (err) {
    console.error(err); // Display the error object if an error occurs
  } else {
    console.log('File has been written successfully.');
  }
});
