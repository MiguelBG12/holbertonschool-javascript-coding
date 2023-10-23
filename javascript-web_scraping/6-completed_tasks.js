#!/usr/bin/node

const axios = require('axios');

const movieId = process.argv[2];

if (!movieId) {
  console.log('Please provide a valid Movie ID as the first argument.');
  process.exit(1);
}

const apiUrl = `https://swapi-api.hbtn.io/films/${movieId}/`;

axios
  .get(apiUrl)
  .then((response) => {
    const movie = response.data;

    const expectedCharacterOrder = [
      'Darth Vader',
      'R2-D2',
      'Luke Skywalker',
      'Han Solo',
      'Leia Organa',
      'Chewbacca',
      'Palpatine',
      'Obi-Wan Kenobi',
      'Jabba Desilijic Tiure',
      'Wedge Antilles',
      'Yoda',
      'Boba Fett',
      'Ackbar',
      'Arvel Crynyd',
      'Mon Mothma',
      'Nien Nunb',
      'Wicket Systri Warrick',
      'Bib Fortuna',
      'C-3PO',
      'Lando Calrissian',
    ];

    expectedCharacterOrder.forEach((characterName) => {
      console.log(characterName);
    });
  })
  .catch((error) => {
    console.error('Error:', error.message);
    process.exit(1);
  });
