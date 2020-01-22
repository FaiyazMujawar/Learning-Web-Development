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
    animatePress(userChosenColor)
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor)
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

function checkAnswer(currentLevel) {

}