import AppController from '../controllers/AppController';
import StudentsController from '../controllers/StudentsController';

// Define a function 'mapRoutes' that takes an 'app' object as a parameter.
const mapRoutes = (app) => {
  // Map routes to controller methods by defining HTTP GET endpoints.
  app.get('/', AppController.getHomepage);
  app.get('/students', StudentsController.getAllStudents);
  app.get('/students/:major', StudentsController.getAllStudentsByMajor);
};

// Export the 'mapRoutes' function to be used elsewhere.
export default mapRoutes;
module.exports = mapRoutes;
