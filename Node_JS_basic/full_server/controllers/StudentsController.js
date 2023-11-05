// Import the `readDatabase` function from the '../utils' module.
import readDatabase from '../utils';

// Define the StudentsController class, which contains methods for handling students.
class StudentsController {
  // Static method to get all students.
  static getAllStudents(req, res) {
    // Read the database using the third command line argument (process.argv[2).
    readDatabase(process.argv[2])
      .then((data) => {
        // Process the data to get the list of students by field of study.
        const students = data
          .reduce((acc, curr) => {
            const firstname = curr[0];
            const field = curr[3];
            if (!acc[field]) {
              acc[field] = [];
            }
            acc[field].push(firstname);
            return acc;
          }, {});

        // Send a response with the list of students by field of study.
        res.status(200).send(`This is the list of our students\n${
          Object.keys(students).map((key) => `Number of students in ${key}: ${students[key].length}. List: ${students[key].join(', ')}`).join('\n')}`);
      })
      .catch(() => {
        // If there's an error loading the database, send an error response.
        res.status(500).send('Cannot load the database');
      });
  }

  // Static method to get students by major.
  static getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    // Check if the specified major is valid.
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
    } else {
      // Read the database using the third command line argument (process.argv[2).
      readDatabase(process.argv[2])
        .then((data) => {
          // Filter students with the specified major.
          const students = data
            .filter((student) => student[3] === major)
            .map((student) => student[0]);

          // Send a response with the list of students with the specified major.
          res.status(200).send(`List: ${students.join(', ')}`);
        })
        .catch(() => {
          // If there's an error loading the database, send an error response.
          res.status(500).send('Cannot load the database');
        });
    }
  }
}

// Export the StudentsController class so it can be used in other modules.
export default StudentsController;
