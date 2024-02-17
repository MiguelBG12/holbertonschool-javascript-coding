#!/usr/bin/node

const fs = require('fs');

// Write content to file passed as argument
fs.writeFile(process.argv[2], process.argv[3], (error) => {
  if (error) console.log(error);
});
