'use strict';
const TennisMatch = require('./tennisMatch');

/**
 * Process Game Line 
 *   will handle an string of point winners, stopping on Win state or error state
 * 
 * Expects: line of point winners (0000, 0101010111 ...)
 *
 * Returns: 0 / 1 for who won the game, -1 for a tie, false for an error.
 */

function processGameLine (line) {
  // Create a new instance of a Match
  let thisMatch = new TennisMatch();
  let inputLength = line.length;
  let i = 0;

  // Loop until the match is ended
  while (!thisMatch.isMatchOver()) {
    let pointWinner = Number(line[i]);
    let pointResult = thisMatch.point(pointWinner);

    // If Error (game ends on error)
    if (!pointResult) {
      console.log('ERROR');
      return false;
    } else {
      if (thisMatch.isMatchOver()) {
        console.log(`WIN ${thisMatch.getWinner()} - ${i}`);
        return pointWinner;
      } else if ((i + 1) >= inputLength) {
        console.log('TIE');
        // Manually end the game (not a real world scenario)
        thisMatch.setIsMatchOver(true);
        // Tie State
        return -1;
      }
      // Otherwise its just a normal point
    }

    // Get the next point
    i++;
  }
}

module.exports = {
  processGameLine
};
