let diceCount1 = Math.floor(Math.random() * 6) + 1;
let diceCount2 = Math.floor(Math.random() * 6) + 1;

let dice1 = document.querySelector(".img1");
console.log(dice1);
let dice2 = document.querySelector(".img2");
console.log(dice2)

if (diceCount1 > diceCount2) {
    document.querySelector("h1").innerHTML = '<i class="far fa-flag flag-color"></i>  Player1 wins!';
} else if (diceCount2 > diceCount1) {
    document.querySelector("h1").innerHTML = 'Player2 wins!  <i class="far fa-flag flag-color"></i>';
} else {
    document.querySelector("h1").textContent = "Draw!"
}

dice1.setAttribute("src", `images/dice${diceCount1}.png`);
dice2.setAttribute("src", `images/dice${diceCount2}.png`);