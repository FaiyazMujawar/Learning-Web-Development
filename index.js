let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];

let blue = new Audio("sounds/blue.mp3");
let green = new Audio("sounds/green.mp3");
let red = new Audio("sounds/red.mp3");

let randomColor;
function nextSequence() {
    randomColor = Math.floor(Math.random() * 3) + 1;
    gamePattern.push(randomColor);
}

$("#" + buttonColors[randomColor]).click(() => {
    $("#" + buttonColors[randomColor]).toggle("pressed");
    setTimeout(() => {
        $("#" + buttonColors[randomColor]).toggle("pressed");
    }, 100);
});