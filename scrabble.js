var SCORE_CHART = {
  "A":1,"E":1,"I":1,"O":1,"U":1,"L":1,"N":1,"R":1,"S":1,"T":1,
  "D":2,"G":2,
  "B":3,"C":3,"M":3,"P":3,
  "F":4,"H":4,"V":4,"W":4,"Y":4,
  "K":5,
  "J":8,"X":8,
  "Q":10,"Z":10
}

var Scrabble = {};

Scrabble.score = function(word) {
  var letters = word.toUpperCase().split("");  // return an array of letters in the word

  var totalScore = 0;
  letters.forEach(function (letter){
    totalScore += SCORE_CHART[letter];
  });

  if ( word.length == 7 ) {
    totalScore += 50;
  }

  return totalScore;
}

Scrabble.highestScoreFrom = function(arrayOfWords) {
  var highestScore = 0;
  var highestScoreWords = [];

  arrayOfWords.forEach(function (word) {
    var score = Scrabble.score(word)

    if (score > highestScore) {
      highestScore = score;
      highestScoreWords = [];
      highestScoreWords.push(word);
    }
    else if (score === highestScore) {
      highestScoreWords.push(word);
    }
  });

  // Here highestScoreWords contains all the word(s) (tied) for the highest score

  // if no tie, directly return the highest_score_word
  if (highestScore.length === 1) {
    return highestScore[0];
  }

  //  if there is a tie or multiple ties, consider if there is a 7-letter-word
  lengthSevenWords = []
  // console.log("highestScoreWords " + highestScoreWords)
  highestScoreWords.forEach(function (word) {
    //  if so, return the first 7-letter-word
    if (word.length === 7){
      lengthSevenWords.push(word);
    }
  });

  // console.log("lengthSevenWords " + lengthSevenWords)
  if (lengthSevenWords.length > 0) {
    return lengthSevenWords[0];
  }

  // if there is no 7-letter-word, return the minimun length word
  var lengths = []
  highestScoreWords.forEach(function (word) {
    lengths.push(word.length);
  });

  var minLength = Math.min(...lengths);

  var minLengthWords = []
  highestScoreWords.forEach(function (word) {
    if ( word.length === minLength ) {
      minLengthWords.push(word)
    }
  });

  return minLengthWords[0]
};

module.exports = Scrabble;

// only run test cases if this file is directly invoked by NodeJS
if (require.main === module) {
  // manual testing
  // Testing score method
  [
    ["all", 3],
    ["your", 7],
    ["bases", 7],
    ["are", 3],
    ["belongs", 60],
    ["to", 2],
    ["us", 2],
  ].forEach(function(testCase) {
    var word = testCase[0];
    var expectedScore = testCase[1];
    var actualScore = Scrabble.score(word);

    if (expectedScore !== actualScore ) {
      console.warn("wrong score for " + word);
    }

    console.log("score for word " + word + " is " + actualScore + " expected score is " + expectedScore);
  });

  // Testing highestScoreWords methods
  [
    // highest score word wins
    [["bc", "dg"], "bc"],
    // same score, shorter word wins
    [["all", "ad"], "ad"],
    // same score, same length, first word wins
    [["all", "alo"], "all"],
    // given a tie, 7 letter word wins
    [["qzqzqz", "belongs"], "belongs"],

    // given a tie, an more than one 7 letter words, first
    // 7 letter word wins
    [["qzqzqz", "belongs", "balongs"], "belongs"],
  ].forEach(function(testCase) {
    var words = testCase[0];
    var expectedWord = testCase[1];
    var actualWord = Scrabble.highestScoreFrom(words);

    if (expectedWord !== actualWord ) {
      console.warn("wrong word for " + words);
    }

    console.log("highest score word among " + words + " is " + actualWord);
  });
}
