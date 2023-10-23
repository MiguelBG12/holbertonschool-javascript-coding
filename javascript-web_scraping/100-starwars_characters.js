#!/usr/bin/node

const axios = require('axios');

const movieId = process.argv[2];

if (!movieId) {
  console.log('Please provide a valid Movie ID as the first argument.');
  process.exit(1);
}

const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

axios
  .get(apiUrl)
  .then((response) => {
    const movie = response.data;
    const characters = movie.characters;

    const characterPromises = characters.map(characterUrl =>
      axios.get(characterUrl).then(charResponse => charResponse.data.name)
    );

    Promise.all(characterPromises)
      .then((characterNames) => {
        characterNames.forEach(name => console.log(name));
      })
      .catch((err) => {
        console.error('Error:', err.message);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
