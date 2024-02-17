#!/usr/bin/node

// Importing the 'request' module for making HTTP requests.
const request = require('request');

// Sending a GET request to the URL provided as the first command-line argument,
// then processing the response using a callback function.
request(process.argv[2], function (error, response, body) {
  // Checking if there's no error in the request.
  if (!error) {
    // Parsing the response body as JSON.
    const todos = JSON.parse(body);

    // Object to store the count of completed todos per user.
    const completed = {};

    // Iterating over each todo.
    todos.forEach((todo) => {
      // Checking if the todo is completed and if the user ID is already present in the 'completed' object.
      if (todo.completed && completed[todo.userId] === undefined) {
        completed[todo.userId] = 1; // Initialize count to 1.
      } else if (todo.completed) {
        completed[todo.userId] += 1; // Increment count.
      }
    });

    // Outputting the 'completed' object which contains the count of completed todos per user.
    console.log(completed);
  }
});
