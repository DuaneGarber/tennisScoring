# Instructions
1) read tennisinput.txt

2) treat each line as a game starting with score [0, 0]

3) progress until a winner is determined, an error is encountered, or the end of line is read. Treat each character read as the player that scored the point

4) if there is a winner, on a new line,

print "WIN " + the player number + " " + the point that the person won in (starting with 0)

5) if there is an error, on a new line, print "ERROR"

6) if there is no winner by the end of the line, on a new line, print "TIE"

7) on the final line, print the player number with the most wins, followed by the number of wins more than their opponent, followed by the number of errors. For example, if player 0 won 5 games and player 1 won 7 games, and there were no errors, print "120". If the match is a tie print "X" for the player number, for example, "X01".

# To Run
Execute `npm install`
Execute `node app.js` (Requires Node 4.3 or greater)

## A user defined file may be supplied defining the path as the second arg `node app.js myTestFile.txt`

# To Test
Execute `npm test` (Requires Node 4.3 or greater)

# Dependencies

## split -- https://www.npmjs.com/package/split