'use strict';
const fs = require('fs');
// Split is used for Reading a Stream by new line
const split = require('split'); // https://www.npmjs.com/package/split

// Allow User Defined file
const userDefinedFile = process.argv[2];

// If user supplied a file use that, otherwise use the test data
const FILE_NAME = userDefinedFile || 'sampleData/tennisinput.txt';

// Contains the utility functions extracted for unit testing
const util = require('./util');

let playerOneWins = 0;
let playerTwoWins = 0;
let numOfErrors = 0;
let gameData;

// Create a Stream of data to process the input
fs.createReadStream(FILE_NAME, 'utf-8')
  .pipe(split(null, null, { trailing: false }))
  .on('data', (line) => {
    let winner = util.processGameLine(line);

    if (winner === false) {
      numOfErrors++;
    } else if (winner === 0) {
      playerOneWins++;
    } else if (winner === 1) {
      playerTwoWins++;
    }
  })
  .on('end', () => {
    if (playerOneWins === playerTwoWins) {
      gameData = 'X0';
    } else if (playerOneWins > playerTwoWins) {
      gameData = '1' + (playerOneWins - playerTwoWins);
    } else {
      gameData = '2' + (playerTwoWins - playerOneWins);
    }

    console.log(gameData + numOfErrors);
  })
  .on('error', (error) => {
    console.error('Error Reported opening file stream: ', error);
  });
