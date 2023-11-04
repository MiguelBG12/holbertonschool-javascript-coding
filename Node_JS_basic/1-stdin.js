// Print a welcome message to the console.
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for the 'readable' event on the standard input (stdin).
process.stdin.on('readable', () => {
  // Read the data that the user has entered.
  const chunk = process.stdin.read();

  // Check if there is data (the user has entered something).
  if (chunk) {
    // Print the user's name.
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

// Listen for the 'end' event on the standard input (stdin).
process.stdin.on('end', () => {
  // When the user finishes interacting, display a closing message.
  process.stdout.write('This important software is now closing\n');
});
