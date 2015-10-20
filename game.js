var content = $("#content"),           //select relevant elements
    gameWordContainer = $("#gameword"),
    guessedContainer = $("#guessed"),
    letterContainer =  $("#letter"),
    gallowsContainer =  $("#gallows"),
    feedbackContainer =  $("#feedback"),
    submitBtn = $("#submit");




var gameWord = "ruby";
displayBlanks();

var wrongLetters = [];
var correctLetters = [];
var strikes = 0;


function displayBlanks(){
var blanks = [];
for(var i = 0;i < gameWord.length; i++){
    blanks.push("-");
  }
for(var letter in correctLetters){
  if(gameWord.indexOf(correctLetters[letter]) > -1){
    blanks[gameWord.indexOf(correctLetters[letter])] = correctLetters[letter];
  }
  }
gameWordContainer.text(blanks.join(""));
}


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

function getGameResults(){
  if(correctLetters.length === gameWord.length){
    feedbackContainer.css({"color":"teal"});
    feedbackContainer.text("YOU WIN! The word is : " + gameWord);
  }
  else if(strikes > 5){
    feedbackContainer.css({"color":"maroon"});
    feedbackContainer.text("YOU LOSE! The word was: " + gameWord);
  }
}


submitBtn.on('click', function(){
  guess(letterContainer.val().toLowerCase(), gameWord);
  getGameResults();
});

