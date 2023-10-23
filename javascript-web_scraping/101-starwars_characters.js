#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];

if (!movieId) {
  console.log('You must provide the movie ID as an argument.');
  process.exit(1);
}

const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
  if (!error && response.statusCode === 200) {
    const movieData = JSON.parse(body);

    const characterUrls = movieData.characters;
    let characterCount = 0;

    function printCharacterName() {
      if (characterCount < characterUrls.length) {
        const characterUrl = characterUrls[characterCount];
        request(characterUrl, (charError, charResponse, charBody) => {
          if (!charError && charResponse.statusCode === 200) {
            const characterData = JSON.parse(charBody);
            console.log(characterData.name);
            characterCount++;
            printCharacterName();
          } else {
            console.error('Error getting character data:', charError);
          }
        });
      }
    }

    printCharacterName();
  } else {
    console.error('Error getting movie data:', error);
  }
});
