#!/usr/bin/node

const request = require('request');

// Define the API URL for the JSON data
const apiUrl = process.argv[2]; // Get the API URL from the command line argument

// Make a GET request to the API URL
request(apiUrl, (error, response, body) => {
  if (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }

  if (response.statusCode === 200) {
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

    // Print the completed tasks object
    console.log(completedTasksByUser);
  } else {
    console.error(`Error: Failed to retrieve task data. Status code: ${response.statusCode}`);
    process.exit(1);
  }
});
