var category;
var words = ["git", "html", "css", "javascript", "jquery", "heroku", "mern", "mongo"];

function chooseCategory() {
    var choice = document.getElementById("mySelect").value;
    choice == "Full-Stack"

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
    },
    stop: function () {
        this.started = false;
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
    showWord: function (letter) {
        this.showWordArray[this.pickArray.indexOf(letter)] = letter;
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
            newWord = newWord.toUpperCase() + " " + each.toUpperCase() + " ";
        });
        this.pickedWord.textContent = newWord;
        return newWord;
    },
    displayRemaining: function () {
        this.remaining.textContent = (this.missMax - this.miss);
    },
    displayResults: function () {
        var word = this.displayWord();
        this.displayRemaining();
        if (this.match == this.pickArray.length) {
            this.wins++;
            this.displayWins(word);
            this.started = false;
        } else if (this.miss == this.missMax) {
            this.losses++;
            this.displayLosses();
            this.started = false;
        }
    },
    displayRemaining: function () {
        this.remaining.textContent = (this.missMax - this.miss);
    },
    includes: function (letter) {
        return this.pickArray.includes(letter);
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
        console.log(this.pick);

        for (var i = 0; i < this.pickArray.length; i++) {
            this.showWordArray.push(" _ ");
            this.tempWord = this.tempWord + " _ ";
        }

        this.pickedWord.textContent = this.tempWord;
        this.remaining.textContent = this.missMax;
    }
};

document.onkeyup = function (event) {
    if (game.started) {
        console.log("in game: " + game.pick);
        var guess = event.key.toLowerCase();
        if (game.includes(guess)) {
            // good guess
            game.showWord(guess);
            game.incrementMatch();
            game.deleteLetter(guess);
        } else {
            // miss
            game.incrementMiss();
            game.displayMissed();
            game.displayGuess(guess);
        };
        game.displayRemaining();
        game.displayResults();
    } else {
       
        game.init();
        console.log("started: " + game.pick);
    };

}