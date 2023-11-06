// Import the 'fs' (file system) module to work with file operations.
import fs from 'fs';

// Define a function named 'readDatabase' that accepts a 'dataPath' as an argument.
const readDatabase = (dataPath) => new Promise((resolve, reject) => {
  // Check if 'dataPath' is not provided, and if so, reject the promise.
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }

  // If 'dataPath' is provided, attempt to read the file.
  if (dataPath) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        // If there's an error reading the file, reject the promise.
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        // Convert the file data into an array of lines.
        const fileLines = data
          .toString('utf-8')
          .trim()
          .split('\n');

        // Initialize an object to store student data grouped by field.
        const studentGroups = {};

        // Extract field names from the first line of the file.
        const dbFieldNames = fileLines[0].split(',');

        // Extract property names from the field names.
        const studentPropNames = dbFieldNames
          .slice(0, dbFieldNames.length - 1);

        // Iterate through each line (excluding the first line) and parse the data.
        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentPropValues = studentRecord
            .slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];

          // If the field does not exist in 'studentGroups', initialize it.
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }

          // Create an array of student property entries.
          const studentEntries = studentPropNames
            .map((propName, idx) => [propName, studentPropValues[idx]]);

          // Push the student data as an object into the corresponding field group.
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        // Resolve the promise with the grouped student data.
        resolve(studentGroups);
      }
    });
  }
});

// Export the 'readDatabase' function to make it available for other modules.
export default readDatabase;
module.exports = readDatabase;
