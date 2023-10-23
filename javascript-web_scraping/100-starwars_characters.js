const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.log('Please provide a valid Movie ID as the first argument.');
  process.exit(1);
}

const apiUrl = `https://swapi-api.hbtn.io/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (error) {
    console.error('Error:', error);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Status Code: ${response.statusCode}`);
    process.exit(1);
  }

  const movie = JSON.parse(body);
  console.log(`Characters in ${movie.title}:`);

  function getCharacter(characterUrl) {
    request(characterUrl, (charError, charResponse, charBody) => {
      if (charError) {
        console.error('Error:', charError);
      } else if (charResponse.statusCode !== 200) {
        console.error(`Status Code: ${charResponse.statusCode}`);
      } else {
        const character = JSON.parse(charBody);
        console.log(character.name);
      }
    });
  }

  // Iterate through the characters in the movie and get their names
  movie.characters.forEach(getCharacter);
});
