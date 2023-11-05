class AppController {
  // Define a static method named getHomepage that accepts request and response.
  static getHomepage(req, res) {
    // Return a 200 status and the message "Hello Holberton School!" as the response.
    res.status(200).send('Hello Holberton School!');
  }
}

export default AppController;
