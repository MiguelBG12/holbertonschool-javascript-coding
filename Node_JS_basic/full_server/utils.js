const fs = require('fs');

// Define a function named readDatabase that reads the database asynchronously.
const readDatabase = (filePath) => new Promise((resolve, reject) => {
  // Read the file from the specified path.
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      // If there's an error reading the file, reject the promise.
      reject(new Error('Cannot load the database'));
    } else {
      // Split the data into lines and process it.
      const lines = data.trim().split('\n');
      const studentData = {};

      // Parse each line to extract student information and group them by field.
      lines.slice(1).forEach((line) => {
        const [firstname, , , field] = line.split(',');
        if (field) {
          if (!studentData[field]) {
            studentData[field] = [];
          }
          studentData[field].push(firstname);
        }
      });

      // Resolve the promise with the grouped student data.
      resolve(studentData);
    }
  });
});

module.exports = readDatabase;
