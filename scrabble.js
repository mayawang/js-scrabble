Scrabble.prototype.score = function() {
  var SCORE_CHART = {
                  "A":1,"E":1,"I":1,"O":1,"U":1,"L":1,"N":1,"R":1,"S":1,"T":1,
                  "D":2,"G":2,
                  "B":3,"C":3,"M":3,"P":3,
                  "F":4,"H":4,"V":4,"W":4,"Y":4,
                  "K":5,
                  "J":8,"X":8,
                  "Q":10,"Z":10
                }

  var score = function(word) {
    var letters = word.upcase.chars;  // return an array of letters in the word
    var scores = letters.forEach(function (value, i){
      letters[i] == this.SCORE_CHART[letter]; // return an array of integer representing letter's scores
    });

    var totalScore = 0;
    scores.forEach (function(score) {
      totalScore += score;
    });

    if ( word.length == 7 ){
      totalScore += 50;
    }
    return totalScore;
  }

  // var myScrabble = new Scrabble("Hello");
  // var myScore = myScrabble.score();
  // console.log(myScore);



  var highestScoreFrom(arrayOfWords) = function(){
    var highestScore = 0
    var highestScoreWords = []

    arrayOfWords.forEach(function (word) {
      var score = this.score(word)
      if (score > highestScore) {
        highestScore = score;
        highestScoreWords = word;
      }
      else if (score == hightest){
        highestScoreWords << word;
      }
    });

    // Here highestScoreWords contains all the word(s) (tied) for the highest score

    // if no tie, directly return the highest_score_word
    if (highestScore.length == 1){
      return highestScore[0];
    }

    //  if there is a tie or multiple ties, consider if there is a 7-letter-word
    lengthSeven = []
    highestScoreWords.forEach(function (word){
      //  if so, return the first 7-letter-word
      if (word == 7){
        lengthSeven << word;
      }
    });

    // if there is no 7-letter-word, return the minimun length word

    var lengths = highestScoreWords.map(function (word){
      word.length;
    });

    var minLength = Math.min.apply(Math, lengths);

    var minLengthWords = []
    highestScoreWords.forEach(function (word){
      word.length == minLength
    });

    return minLengthWords[0]

};













module.exports = Scrabble;
