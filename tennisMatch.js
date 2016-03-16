'use strict';
const PLAYER_MAP = {
  '0': 'Player One',
  '1': 'Player Two'
};

/**
 * Tennis Match Object
 * This will handle the state of the match, incrementing scores, determining end states, dealing with errors
 *
 * Expects: nothing
 */
function TennisMatch () {
  // isOver and winner are private, editable through provided getters and setters below
  let isOver, winner;
  this.score = null;

  this.isMatchOver = () => isOver;
  this.setIsMatchOver = (status) => isOver = status;

  this.getWinner = () => {
    if (winner === 0 || winner === 1) {
      return PLAYER_MAP[winner];
    } else {
      return false;
    }
  };
  this.setWinner = (pointWinner) => winner = pointWinner;

  this.init();
}

/**
 * Initialize the game state
 *
 * Expects: nothing
 * Returns: nothing
 */
TennisMatch.prototype.init = function () {
  this.score = ['0', '0'];
  this.setIsMatchOver(false);
  this.setWinner(null);
};

/**
 * Point method is what drives the game it determines the
 * next game score and checks for errors
 *
 * Expects: a numeric 0 or 1, representing the player who scored the point
 *
 * Returns: True if execution was successful, game state is managed through isOver and winner
 */
TennisMatch.prototype.point = function (pointWinner) {
  if (this.isMatchOver()) {
    return false;
  }

  // Check that the scoring index is either 0 or 1
  if (pointWinner !== 0 && pointWinner !== 1) {
    // Error States end the game
    this.setIsMatchOver(true);
    return false;
  }

  // Move the score to the next state, we are making the score update in-place of the scoring array
  let result = _nextScore(this.score, pointWinner);

  // Bad Result
  if (!result) {
    this.setIsMatchOver(true);
    return false;
  }

  // Win Scenario
  if (result === 'WIN') {
    this.setIsMatchOver(true);
    this.setWinner(pointWinner);
    return true;
  }

  // Normal Score situation
  return true;
};

/**
 * Private Method _nextScore determines the next score state
 *
 * Expects: Score array and who won the point
 * Returns: The Resulting score (15, 30, ... WIN), False if there is an error
 */
function _nextScore (score, pointWinner) {
  // loser index is the inverse of playerIndex
  let pointLoser = 1 - pointWinner;
  // Get both the point winner's and loser's current score
  let winner = score[pointWinner];

  // Mostly Simple score lookup map
  const SCORE_MAP = {
    '0': '15',
    '15': '30',
    '30': '40',
    'A': 'WIN',
    // Handle all 3 use cases for the point after 40 with an IIFE
    '40': ((pointLoser) => {
      let loser = score[pointLoser];
      if (loser !== '40' && loser !== 'A') {
        return 'WIN';
      } else if (loser === '40') {
        return 'A';
      } else {
        // Edge case reset loser to 40
        score[pointLoser] = '40';
        return '40';
      }
    })(pointLoser)
  };
  let result = SCORE_MAP[winner];

  if (!result) {
    return false;
  }

  // Set the point winner's score to the result
  score[pointWinner] = result;

  return result;
}

module.exports = TennisMatch;
