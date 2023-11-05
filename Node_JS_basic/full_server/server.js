import express from 'express';
import routes from './routes';

const app = express();
const PORT = 1245;

// Use the defined routes for the Express app.
app.use('/', routes);

// Start the server and listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

export default app;
