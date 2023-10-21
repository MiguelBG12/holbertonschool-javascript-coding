#!/usr/bin/node

// Import the 'request' module for making HTTP requests
const request = require('request');

// Define the API URL to fetch JSON data
const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

// Make a GET request to the API URL
request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(`Error: ${error}`);
    process.exit(1); // Exit the script with a status code of 1 to indicate an error
  }

  if (response.statusCode === 200) {
    // Parse the response body as JSON
    const todos = JSON.parse(body);

    // Create an object to store the count of completed tasks for each user
    const completedTasksByUser = {};

    // Iterate through the tasks and count completed tasks by user
    todos.forEach((todo) => {
      if (todo.completed) {
        if (completedTasksByUser[todo.userId]) {
          completedTasksByUser[todo.userId]++;
        } else {
          completedTasksByUser[todo.userId] = 1;
        }
      }
    });

    // Print the users with completed tasks
    for (const userId in completedTasksByUser) {
      console.log(`User ${userId} has completed ${completedTasksByUser[userId]} task(s).`);
    }
  } else {
    console.error(`Error: Failed to retrieve task data. Status code: ${response.statusCode}`);
    process.exit(1); // Exit the script with a status code of 1 to indicate an error
  }
});
