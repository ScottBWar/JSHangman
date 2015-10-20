var content = $("#content"), //select relevant elements
    gameWordContainer = $("#gameword"),
    guessedContainer = $("#guessed"),
    letterContainer = $("#letter"),
    gallowsContainer = $("#gallows"),
    feedbackContainer = $("#feedback"),
    submitBtn = $("#submit");

wrongLetters = [];
correctLetters = [];
strikes = 0;
alreadyGuessed = [];


function Game(gameWord) {
    this.gameWord = gameWord.toLowerCase();

    var displayBlanks = function(word) {
        var blanks = [];
        for (var i = 0; i < word.length; i++) {
            blanks.push("-");
        }
        for (var letter in correctLetters) { //YIKES! This works for now, but I'll need to refactor later
            for (var cha in word) {
                if (word[cha] == correctLetters[letter]) {
                    blanks[cha] = correctLetters[letter];
                }
            }
        }
        gameWordContainer.text(blanks.join(""));
    };

    this.init = function() {
        wrongLetters = [];
        correctLetters = [];
        strikes = 0;
        alreadyGuessed = [];
        console.log("starting new game, word is:" + gameWord);
        displayBlanks(gameWord);
    };

    this.guess = function(letter, word) {
        if (alreadyGuessed.indexOf(letter) > -1) {
            feedbackContainer.text("Try something you haven't guessed yet!");
        } else {
            if (word.indexOf(letter) > -1) {
                feedbackContainer.css({
                    "color": "blue"
                });
                feedbackContainer.text("You got it:  " + letter);
                for (var i = 0; i < word.length; i++) {
                    if (word[i] == letter) {
                        correctLetters.push(letter);
                        alreadyGuessed.push(letter);
                    }
                }
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
                alreadyGuessed.push(letter);
            }
        }
    };
    this.getResults = function() {
        if (correctLetters.length === gameWord.length) {
            feedbackContainer.css({
                "color": "teal"
            });
            feedbackContainer.text("YOU WIN! The word is : " + gameWord);
            currentGame = games[Math.floor(Math.random() * games.length)];
            currentGame.init();
        } else if (strikes > 4) {
            feedbackContainer.css({
                "color": "maroon"
            });
            feedbackContainer.text("YOU LOSE! The word was: " + gameWord);
            currentGame = games[Math.floor(Math.random() * games.length)];
            currentGame.init();
        }
    };
}


var game1 = new Game("Haskell");
var game2 = new Game("JavaScript");
var game3 = new Game("Ruby");
var game4 = new Game("Python");
var game5 = new Game("Clojure");

games = [game1, game2, game3, game4, game5];

currentGame = games[Math.floor(Math.random() * games.length)];
currentGame.init();

submitBtn.on('click', function() {
    currentGame.guess(letterContainer.val().toLowerCase(), currentGame.gameWord);
    currentGame.getResults();
});