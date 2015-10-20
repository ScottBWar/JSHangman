var content = $("#content"),           //select relevant elements
    gameWordContainer = $("#gameword"),
    guessedContainer = $("#guessed"),
    letterContainer =  $("#letter"),
    gallowsContainer =  $("#gallows"),
    feedbackContainer =  $("#feedback"),
    submitBtn = $("#submit");




var gameWord = "ruby";


function guess(letter, word){
  if(word.indexOf(letter) > -1){
    feedbackContainer.css({"color":"blue"});
    feedbackContainer.text("You got it:  " + letter);
  }
  else{
    feedbackContainer.css({"color":"red"});
    feedbackContainer.text("Nope, not:  " + letter);
  }
}


submitBtn.on('click', function(){
  guess(letterContainer.val().toLowerCase(), gameWord);

});

