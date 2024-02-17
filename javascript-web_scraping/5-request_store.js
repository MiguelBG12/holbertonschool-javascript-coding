#!/usr/bin/node

// Importing the 'fs' module for file system operations.
const fs = require('fs');

// Importing the 'request' module for making HTTP requests.
const request = require('request');

// Sending a GET request to the URL provided as the first command-line argument,
// then piping the response to create a writable stream to the file specified as the second command-line argument.
request(process.argv[2]).pipe(fs.createWriteStream(process.argv[3]));
