let drums = document.querySelectorAll(".drum");

/* Sounds */

let tom1 = new Audio("sounds/tom-1.mp3");
let tom2 = new Audio("sounds/tom-2.mp3");
let tom3 = new Audio("sounds/tom-3.mp3");
let tom4 = new Audio("sounds/tom-4.mp3");
let crash = new Audio("sounds/crash.mp3");
let snare = new Audio("sounds/snare.mp3");
let kick = new Audio("sounds/kick-bass.mp3");

drums.forEach(drum => {
    drum.addEventListener("click", () => {
        makeSound(drum.innerHTML);
        animateDrum(drum.innerHTML);
    });
});

document.addEventListener("keypress", keyPressed => {
    makeSound(keyPressed.key);
    animateDrum(keyPressed.key);
    console.log(keyPressed.key);
});

function makeSound(text) {
    switch (text) {
        case "w":
            tom1.play();
            break;
        case "a":
            tom2.play();
            break;
        case "s":
            tom3.play();
            break;
        case "d":
            tom4.play();
            break;
        case "j":
            crash.play();
            break;
        case "k":
            snare.play();
            break;
        case "l":
            kick.play();
            break;
        default:
            // console.log(text);
            break;
    }
}

function animateDrum(drumText) {
    let curDrum = document.querySelector("." + drumText);
    curDrum.classList.add("pressed");
    setTimeout(() => {
        curDrum.classList.remove("pressed");
    }, 100);
}