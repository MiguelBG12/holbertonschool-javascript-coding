// Import the 'readline' module to work with input and output.
const readline = require('readline');

// Create an instance of 'readline.Interface' to interact with the user via stdin and stdout.
const rl = readline.createInterface({
  input: process.stdin, // Specify input as stdin (standard input).
  output: process.stdout, // Specify output as stdout (standard output).
});

// Display the welcome message.
console.log('Welcome to Holberton School, what is your name?');screen

// Use 'rl.question' to wait for user input.
rl.question('', (name) => {
  // After receiving input, display the user's name.
  console.log(`Your name is: ${name}`);
  console.log('This important software is now closing');
  rl.close(); // Close the 'readline' interface.
});

// Listen for the 'close' event and exit the program when it occurs.
rl.on('close', () => {
  process.exit(0);
});
