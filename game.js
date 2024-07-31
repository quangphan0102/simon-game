let userClickedPattern = [];

let gamePattern = [];

let gameStart = false;

let level = 0;

let buttonColours = ["red", "blue", "yellow", "green"];

$(document).keypress(function() {

    if (!gameStart) {

        gameStart = true;

        nextSequence();
    
    }
})

function nextSequence() {
    const randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColours = buttonColours[randomNumber];

    gamePattern.push(randomChosenColours);

    let btn = $('#' + randomChosenColours);

    btn.fadeOut().fadeIn();

    let btnSound = new Audio("./sounds/" + randomChosenColours + ".mp3");
    btnSound.play();

    ++level;

    $('#level-title').html("Level " + level);
}

function makeSound(color) {
    let buttonSound = new Audio("./sounds/" + color + ".mp3");
    buttonSound.play();
}

function btnIsPressed(btn) {
    btn.classList.add("pressed");

    setTimeout(function() {
        btn.classList.remove("pressed");
    }, 100)
}

const btns = $('.btn');

btns.click(function() {

    makeSound(this.id);

    btnIsPressed(this);

    let userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

function gameOver() {
    //Reset all play round:
    gameStart = false;

    level = 0;

    gamePattern = [];

    userClickedPattern = [];

    //Body get wrong answer:
    let getBody = $("body");

    getBody.addClass("game-over");

    setTimeout(function() {
        getBody.removeClass("game-over");
    }, 100)
}

function checkAnswer(curentLevel) {

    if (gamePattern[curentLevel] === userClickedPattern[curentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);

        }
    }
    else {
        //Sound when pick wrong
        let wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();

        //Title for wrong answer:
        $("#level-title").html("Game Over, Press Any Key To Restart");

        //reseting all game:
        gameOver();
    }
}