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




function guess(letter, word){
  if(word.indexOf(letter) > -1){
    feedbackContainer.css({"color":"blue"});
    feedbackContainer.text("You got it:  " + letter);
    correctLetters.push(letter);
    gameWordContainer.text(correctLetters);
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

