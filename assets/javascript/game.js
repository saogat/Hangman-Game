$(document).ready(function() {
var category;
var words = ["git", "html", "css", "javascript", "jquery", "heroku", "mern", "mongo"];

function chooseCategory() {
    var choice = document.getElementById("mySelect").value;
    switch (choice) {
        case 'Programming':
            words = ["git", "html", "css", "javascript", "jquery", "heroku", "mern", "mongo"];
            break;
        case 'Atlanta Attractions':
            words = ["high museum", "aquarium", "botanical park", "atlanta zoo"];
            break;
        case 'GA Cities':
            words = ["atlanta", "macon", "savannah", "augusta"];
            break;
        default:
            words = ["programming", "software", "debugging", "designing"];
    }
}

var game = {
    started: false,
    match: 0,
    miss: 0,
    missMax: 0,
    tempWord: "",
    showWordArray: [],
    wins: 0,
    losses: 0,
    sound: document.getElementById("myAudio"),
    randomPick: function () {
        return words[Math.floor(Math.random() * words.length)]
    },
    pick: "",
    pickedWord: document.getElementById("picked-word"),
    missedCount: document.getElementById("missed-count"),
    wrongLetters: document.getElementById("wrong-letters"),
    remaining: document.getElementById("remaining"),
    pickArray: [],
    start: function () {
        this.started = true;
        this.sound.play();
    },
    stop: function () {
        this.started = false;
        this.sound.pause();
    },
    incrementMatch: function () {
        this.match++;
    },
    incrementMiss: function () {
        this.miss++;
    },
    deleteLetter: function (letter) {
        delete this.pickArray[this.pickArray.indexOf(letter)];
    },
    showWord: function (index, letter) {
        this.showWordArray[index] = letter;
    },
    displayTempWord: function () {
        for (var i = 0; i < this.pickArray.length; i++) {
            this.showWordArray.push(" _ ");
            this.tempWord = this.tempWord + " _ ";
        };
        this.pickedWord.textContent = this.tempWord;
    },
    displayMissed: function () {
        this.missedCount.textContent = this.miss;
    },
    displayGuess: function (letter) {
        var newSpan = document.createElement("span");
        newSpan.textContent = this.guess;
        this.wrongLetters.appendChild(newSpan);
    },
    displayWins: function (word) {
        document.getElementById("wins").textContent = this.wins;
        this.pickedWord.textContent = word;
    },
    displayLosses: function () {
        document.getElementById("losses").textContent = this.losses;
    },
    displayWord: function () {
        var newWord = "";
        this.showWordArray.forEach(function (each) {
            newWord = newWord + " " + each.toUpperCase() + " ";
        });
        this.pickedWord.textContent = newWord;
        return newWord;
    },
    displayRemaining: function () {
        this.remaining.textContent = (this.missMax - this.miss);
        console.log("miss: " + this.miss);
        console.log("missMax: " + this.missMax);
    },
    displayResults: function () {
        var word = this.displayWord();
        this.displayRemaining();
        if (this.match == this.pickArray.length) {
            this.wins++;
            this.displayWins(word);
            this.stop();
        } else if (this.miss == this.missMax) {
            this.losses++;
            this.displayLosses();
            this.stop();
        }
    },
    includes: function (index, letter) {
        return this.pickArray[index] == letter;
    },
    init: function () {
        this.start();
        this.match = 0;
        this.miss = 0;
        this.tempWord = "";
        this.showWordArray = [];
        this.wrongLetters.textContent = "";
        this.missedCount.textContent = "";
        this.pick = this.randomPick();
        this.pickArray = this.pick.toLowerCase().split("");
        this.missMax = this.pick.length + 5;
        this.displayTempWord();
        this.displayRemaining();
    }
};

document.onkeyup = function (event) {
    if (game.started) {
        var guess = event.key.toLowerCase();
        var isMatch = false;
        console.log(guess);
        console.log(game.pick);
        for (var i = 0; i < game.pick.length; i++) {
            if (game.includes(i, guess)) {
                // good guess
                game.showWord(i, guess);
                game.incrementMatch();
                isMatch = true;
            } else {
                // miss
                game.displayMissed();
                game.displayGuess(guess);
            };
        };
        if (!isMatch) {
            game.incrementMiss();
        };
        game.displayResults();
    } else {
        game.init();
        console.log(game.pick);
    };

}
})