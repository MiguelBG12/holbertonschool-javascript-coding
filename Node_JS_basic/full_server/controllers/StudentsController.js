import readDatabase from '../utils';

class StudentsController {
  // Static method to get all students.
  static getAllStudents = (req, res) => {
    readDatabase(process.argv[2])
      .then((data) => {
        const students = data
          .reduce((acc, curr) => {
            const [firstname, , , field] = curr;
            if (!acc[field]) {
              acc[field] = [];
            }
            acc[field].push(firstname);
            return acc;
          }, {});

        res.status(200).send('This is the list of our students\n' +
          Object.keys(students).map((key) =>`Number of students in ${key}: ${
            students[key].length}. List: ${students[key].join(', ')}`).join('\n'));
      })
      .catch(() => {
        res.status(500).send('Cannot load the database');
      });
  }

  // Static method to get students by major.
  static getAllStudentsByMajor = (req, res) => {
    const { major } = req.params;

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
    } else {
      readDatabase(process.argv[2])
        .then((data) => {
          const students = data
            .filter((student) => student[3] === major)
            .map((student) => student[0]);

          res.status(200).send(`List: ${students.join(', ')}`);
        })
        .catch(() => {
          res.status(500).send('Cannot load the database');
        });
    }
  }
}

export default StudentsController;
