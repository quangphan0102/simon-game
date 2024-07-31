let colorArray = ['red', 'blue', 'yellow', 'green'];

let gamePattern = [];

let userChosenPattern = [];

let start = false;

let level = 0;

function nextSequence() {

    userChosenPattern = [];

    let randomColor = Math.floor(Math.random() * 4);

    let pickedColor = colorArray[randomColor];

    let soundWhenPick = new Audio("./sounds/" + pickedColor + ".mp3");
    soundWhenPick.play();

    $("#" + pickedColor).fadeOut(100).fadeIn(100);

    gamePattern.push(pickedColor);

    ++level;

    $("#level-title").html("Level " + level);
}

function makeSound(btn) {
    let colorSound = new Audio("./sounds/" + btn + ".mp3");
    colorSound.play();
}

function animationBtn(btn) {
    // btn.fadeOut(100).fadeIn(100);

    btn.addClass('pressed');

    setTimeout(function() {
        btn.removeClass('pressed');
    }, 100);
}

$(document).keypress(function() {
    if (!start) {

        start = true;

        nextSequence();
    }
});

function gameStart(pos) {
    if (gamePattern[pos] === userChosenPattern[pos]) {
        if (userChosenPattern.length === gamePattern.length) {
            
            setTimeout(function() {
                nextSequence();
            }, 1000)

        }
    }
    else {
        gameOver();
    }
}

function gameOver() {
    let wrongSound = new Audio("./sounds/wrong.mp3");
    wrongSound.play();

    level = 0;

    start = false;
    
    gamePattern = [];

    userChosenPattern = [];

    $("body").addClass("game-over");

    setTimeout(function() {
        $("body").removeClass('game-over');
    }, 100)

    $("#level-title").html("Game over, Press Any Key to Restart.");
}

$(".btn").click(function() {

    let color = $(this).attr("id");

    makeSound(color);

    animationBtn($(this))

    userChosenPattern.push(color);

    gameStart(userChosenPattern.length - 1);
});