import express from 'express';
import mapRoutes from './routes';

// Create an instance of the Express application.
const app = express();

// Define the port where the server will listen for incoming requests.
const PORT = 1245;

// Call the 'mapRoutes' function to configure the application's routes.
mapRoutes(app);

// Start the server and make it listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

// Export the Express application so it can be used in other modules.
export default app;
module.exports = app;
