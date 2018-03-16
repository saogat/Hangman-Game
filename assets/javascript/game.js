
                var category;
                var pickedWord;
                var missedCount;
                var wrongLetters;
                var pick;
                var pickArray;
                var missMax;
                var match;
                var miss;
                var showWord;
                var showWordArray;
                var wins = 0;
                var losses = 0;
                var remaining;
                var words = ["git", "html", "css", "javascript", "jquery", "heroku", "mern", "mongo"];
                var started = false;

                function chooseCategory() {
                    var choice = document.getElementById("mySelect").value;
                    choice == "Full-Stack"

                    switch (choice) {
                        case 'Programming':
                            
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
                    randomWord: function () {
                        return words[Math.floor(Math.random() * words.length)]
                    },
                    init: function () {
                        match = 0;
                        miss = 0;
                        pickedWord = document.getElementById("picked-word");
                        missedCount = document.getElementById("missed-count");
                        wrongLetters = document.getElementById("wrong-letters");
                        pick = this.randomWord();
                        console.log(pick);
                        pickArray = pick.toLowerCase().split("");
                        missMax = pick.length + 5;
                        showWord = "";
                        showWordArray = [];
                        wrongLetters.textContent = "";
                        missedCount.textContent = "";
                        remaining = document.getElementById("remaining");

                        for (var i = 0; i < pickArray.length; i++) {
                            showWordArray.push(" _ ");
                            showWord = showWord + " _ "
                        }

                        pickedWord.textContent = showWord;
                        remaining.textContent = missMax;

                    }
                };

                document.onkeyup = function (event) {
                    if(started) {
                    console.log(words);
                    console.log(pickArray);
                    console.log(pick);

                    var guess = event.key.toLowerCase();
                    if (pickArray.includes(guess)) {
                        showWordArray[pickArray.indexOf(guess)] = guess;
                        match++;
                        delete pickArray[pickArray.indexOf(guess)];
                    } else {
                        miss++;
                        missedCount.textContent = miss;
                        var newSpan = document.createElement("span");
                        newSpan.textContent = guess;
                        wrongLetters.appendChild(newSpan);
                    };


                    var newWord = "";
                    showWordArray.forEach(function (each) {
                        newWord = newWord.toUpperCase() + " " + each.toUpperCase() + " ";
                    });

                    pickedWord.textContent = newWord;
                    remaining.textContent = (missMax - miss);

                    if (match == pickArray.length) {
                        wins++
                        document.getElementById("wins").textContent = wins;
                        pickedWord.textContent = newWord;
                        started = false;
                    } else if (miss == missMax) {
                        losses++;
                        document.getElementById("losses").textContent = losses;
                        started = false;
                    }
                } else {
                    game.init();
                    started = true;
                }
            }
    