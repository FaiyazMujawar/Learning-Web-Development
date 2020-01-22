let buttonColor = ["red", "blue", "green", "yellow"];

let level = 0;

let isGameStarted = false;

$(document).on("keypress", (event) => {
    if (!isGameStarted) {
        isGameStarted = true;
        nextSequence();
    }
})

let gamePattern = [];
let userClickedPattern = [];

function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("h1").text(`Level ${level}`);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
}

let userChosenColor;

$(".btn").click(function () {
    userChosenColor = $(this).attr("id");
    // $(this).fadeOut(100).fadeIn(100);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).toggleClass("pressed");
    setTimeout(() => {
        $(`#${currentColor}`).toggleClass("pressed");
    }, 100);
}

// Didn't understand this function at all

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
