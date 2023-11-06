// Import the 'readDatabase' function from the 'utils' module.
import readDatabase from '../utils';

// Define an array of valid major values.
const VALID_MAJORS = ['CS', 'SWE'];

// Define the 'StudentsController' class containing methods for handling students.
class StudentsController {
  // Static method to get all students.
  static getAllStudents(request, response) {
    // Determine the path to the data file based on the command-line arguments.
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';

    // Read the database using the 'readDatabase' function.
    readDatabase(dataPath)
      .then((studentGroups) => {
        // Initialize an array to store response parts.
        const responseParts = ['This is the list of our students'];

        // Define a comparison function to sort groups by field name.
        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        // Iterate through student groups and construct the response.
        for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)) {
          responseParts.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }

        // Send a 200 status response with the joined response parts.
        response.status(200).send(responseParts.join('\n'));
      })
      .catch((err) => {
        // Handle any errors and send an appropriate response.
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }

  // Static method to get students by major.
  static getAllStudentsByMajor(request, response) {
    // Determine the path to the data file based on the command-line arguments.
    const dataPath = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = request.params;

    // Check if the provided major is valid.
    if (!VALID_MAJORS.includes(major)) {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    // Read the database using the 'readDatabase' function.
    readDatabase(dataPath)
      .then((studentGroups) => {
        let responseText = '';

        // Check if the major is present in the student groups.
        if (Object.keys(studentGroups).includes(major)) {
          const group = studentGroups[major];
          responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
        }

        // Send a 200 status response with the response text.
        response.status(200).send(responseText);
      })
      .catch((err) => {
        // Handle any errors and send an appropriate response.
        response
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }
}

// Export the 'StudentsController' class for use in other modules.
export default StudentsController;
module.exports = StudentsController;
