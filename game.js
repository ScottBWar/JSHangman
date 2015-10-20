var content = $("#content"),           //select relevant elements
    gameWordContainer = $("#gameword"),
    guessedContainer = $("#guessed"),
    letterContainer =  $("#letter"),
    gallowsContainer =  $("#gallows"),
    feedbackContainer =  $("#feedback"),
    submitBtn = $("#submit");




var gameWord = "ruby";
var wrongLetters = [];
var correctLetters = [];
var strikes = 0;

function displayBlanks(){
var blanks = [];
for(var i = 0;i < gameWord.length; i++){
    blanks.push("-");
  }

console.log(gameWord);
console.log(blanks);

for(var i in correctLetters){
  if(gameWord.indexOf(correctLetters[i]) > -1){
    blanks[gameWord.indexOf(correctLetters[i])] = correctLetters[i];
  }
  }
console.log(blanks);
gameWordContainer.text(blanks);
};





function guess(letter, word){
  if(word.indexOf(letter) > -1){
    feedbackContainer.css({"color":"blue"});
    feedbackContainer.text("You got it:  " + letter);
    correctLetters.push(letter);
    displayBlanks();
  }
  else{
    feedbackContainer.css({"color":"red"});
    feedbackContainer.text("Nope, not:  " + letter);
    wrongLetters.push(letter);
    strikes += 1;
    gallowsContainer.text(strikes);
    guessedContainer.text(wrongLetters);
  }
}


submitBtn.on('click', function(){
  guess(letterContainer.val().toLowerCase(), gameWord);

});

