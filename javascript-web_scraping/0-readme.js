#!/usr/bin/node

// Import the 'fs' module
const fs = require('fs');

// Read the content of a file passed as an argument
fs.readFile(process.argv[2], 'utf8', function(error, content) {
  // Log the error if present, otherwise log the content of the file
  console.log(error || content);
});
