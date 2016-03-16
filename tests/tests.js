'use strict';
const test = require('tape');
const TennisMatch = require('./../tennisMatch');
const util = require('./../util');

test('Failure States', function (t) {
  t.plan(8);

  let failMatch = new TennisMatch();
  // // Failure States
  t.equal(failMatch.point('f'), false, 'Not a Number');
  // Since Errors end the game, we need to reset the state
  failMatch.init();

  t.equal(failMatch.point(2), false, 'Not a Valid Player');
  failMatch.init();

  t.equal(failMatch.point(0.12546), false, 'Between 0 and 1 Player count');
  failMatch.init();

  t.equal(failMatch.point(-1), false, '-1 Player count');
  failMatch.init();

  failMatch.score = ['B', '0'];
  t.equal(failMatch.point(0), false, 'Bad winner score data');

  t.equal(failMatch.isMatchOver(), true, 'Error Ends game');

  t.equal(failMatch.getWinner(), false, 'There is no winner');

  t.equal(failMatch.point(0), false, 'Cannot score points if the game is over');

  t.end();
});

test('Single Score Tests', function (t) {
  let testMatch = new TennisMatch();
  t.plan(14);
  // // Success Cases
  testMatch.score = ['0', '0'];
  testMatch.point(0);
  t.deepEqual(testMatch.score, ['15', '0'], 'adds a point (0->15) to the correct player');

  testMatch.score = ['0', '15'];
  testMatch.point(1);
  t.deepEqual(testMatch.score, ['0', '30'], 'adds a point (15->30) to the correct player');

  testMatch.score = ['30', '0'];
  testMatch.point(0);
  t.deepEqual(testMatch.score, ['40', '0'], 'adds a point (30->40) to the correct player');

  testMatch.score = ['0', '40'];
  testMatch.point(1);
  t.deepEqual(testMatch.score, ['0', 'WIN'], 'adds a point (40->WIN) to the correct player');
  t.equal(testMatch.isMatchOver(), true, 'Match is Over!');

  t.equal(testMatch.getWinner(), 'Player Two', 'Player Two has won');

  // Need to reset match in testing
  testMatch.init();
  t.equal(testMatch.isMatchOver(), false, 'Init has succeed');
  t.deepEqual(testMatch.score, ['0', '0'], 'Score has been properly reset');

  testMatch.score = ['40', '40'];
  testMatch.point(0);
  t.deepEqual(testMatch.score, ['A', '40'], 'takes player to advantage');

  testMatch.score = ['30', '40'];
  testMatch.point(0);
  t.deepEqual(testMatch.score, ['40', '40'], 'Going from 30-40 to Duece');

  testMatch.score = ['A', '40'];
  testMatch.point(1);
  t.deepEqual(testMatch.score, ['40', '40'], 'Going from 40-A to Duece (brings players back to deuce)');

  testMatch.score = ['A', '40'];
  testMatch.point(0);
  t.deepEqual(testMatch.score, ['WIN', '40'], 'Player One wins after advantage');

  t.equal(testMatch.getWinner(), 'Player One', 'Player One has won');

  t.equal(testMatch.isMatchOver(), true, 'Match is Over!');

  t.end();
});

test('Game Engine tests', function (t) {
  t.plan(10);

  t.equals(util.processGameLine('0020'), false, 'Error State triggered 2');
  t.equals(util.processGameLine('a'), false, 'Error State triggered (Alphanumeric)');
  t.equals(util.processGameLine(false), false, 'Error State triggered (boolean)');

  t.equals(util.processGameLine('0000'), 0, 'Player 1 won');
  t.equals(util.processGameLine('1111'), 1, 'Player 2 won');
  t.equals(util.processGameLine('00002'), 0, 'Player 1 won, before error state');
  t.equals(util.processGameLine('0010'), -1, 'Tie State');
  t.equals(util.processGameLine('01101010101010101010101010101010101010101010101010'), -1, 'Long Tie State');
  t.equals(util.processGameLine('01101010101010101010101010101010101010101010101011'), 1, 'Long Win for Player 2');
  t.equals(util.processGameLine('00011101011'), -1, 'Tie with Duece');

  t.end();
});
