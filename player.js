var scrabble = require('./scrabble')

function Player(playName) {
  this.name = playName;
  this.plays = [];

  this.totalScore = function() {
    var total = 0;

    this.plays.forEach(function(word){
      total += scrabble.score(word)
    });

    return total;
  };

  this.hasWon = function() {
    return this.totalScore() > 100;
  };

  this.highestScoringWord = function() {
    return scrabble.highestScoreFrom(this.plays);
  };

  this.highestWordScore = function() {
    return scrabble.score(this.highestScoringWord());
  };
}

Player.prototype.play = function(word) {
  this.plays.push(word);
};

module.export = Player;

// only run test cases if this file is directly invoked by NodeJS
if (require.main === module) {
  var player1 = new Player('p1');

  [
    'all',
    'your',
    'bases',
    'are',
    'belongs',
    'to',
    'us',
    'rinse',
    'repeat',
    'and',
    'follows',
    'again'
  ].forEach(function(word) {
    console.log('============ Player ' + player1.name + ' ================');
    player1.play(word);
    console.log('Played word ' + word);
    console.log('All played words so far ' + player1.plays);
    console.log('Total score ' + player1.totalScore());
    console.log('Highest Scoring Word ' +  player1.highestScoringWord());
    console.log('Highest Word Score ' +  player1.highestWordScore());

    if (player1.hasWon()) {
      console.log('Player ' + player1.name + ' has won');
    }
  });
}
