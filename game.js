var content = $("#content"), //select relevant elements
    gameWordContainer = $("#gameword"),
    guessedContainer = $("#guessed"),
    letterContainer = $("#letter"),
    gallowsContainer = $("#gallows"),
    feedbackContainer = $("#feedback"),
    submitBtn = $("#submit");


function Game(gameWord) {
    this.gameWord = gameWord;
    var wrongLetters = [];
    var correctLetters = [];
    var strikes = 0;
    var displayBlanks = function(word) {
        var blanks = [];
        for (var i = 0; i < word.length; i++) {
            blanks.push("-");
        }
        for (var letter in correctLetters) {   //YIKES! This works for now, but I'll need to refactor later
          for (var cha in word){
            if (word[cha] == correctLetters[letter]){
              blanks[cha] = correctLetters[letter];
            }
          }
        }
        gameWordContainer.text(blanks.join(""));
    };

    this.guess = function(letter, word) {
        if (word.indexOf(letter) > -1) {
            feedbackContainer.css({
                "color": "blue"
            });
            feedbackContainer.text("You got it:  " + letter);

            for(var i = 0;i < word.length; i++){
              if(word[i] == letter){
                  correctLetters.push(letter);
              }
            }
            console.log(correctLetters);
            displayBlanks(word);

        } else {
            feedbackContainer.css({
                "color": "red"
            });
            feedbackContainer.text("Nope, not:  " + letter);
            wrongLetters.push(letter);
            strikes += 1;
            gallowsContainer.text(strikes);
            guessedContainer.text(wrongLetters);
        }
    };
    this.getResults = function() {
        if (correctLetters.length === gameWord.length) {
            feedbackContainer.css({
                "color": "teal"
            });
            feedbackContainer.text("YOU WIN! The word is : " + gameWord);
        } else if (strikes > 5) {
            feedbackContainer.css({
                "color": "maroon"
            });
            feedbackContainer.text("YOU LOSE! The word was: " + gameWord);
        }
    };
}


game1 = new Game("aabbcc");


submitBtn.on('click', function() {
    game1.guess(letterContainer.val().toLowerCase(), game1.gameWord);
    game1.getResults();
});