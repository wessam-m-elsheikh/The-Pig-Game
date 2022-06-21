"use strict";

// -------- SELECT ITEMS -------------
const resetBtn = document.querySelector(".reset-btn");
const playerOneSection = document.querySelector(".player1");
const playerTwoSection = document.querySelector(".player2");
const totalScore1 = document.querySelector("#player-1-score");
const totalScore2 = document.querySelector("#player-2-score");
const imageOne = document.querySelector("#img-1");
const imageTwo = document.querySelector("#img-2");
const current1 = document.querySelector("#player1-current p");
const current2 = document.querySelector("#player2-current p");
const rollDice1 = document.querySelector("#roll-dice1");
const rollDice2 = document.querySelector("#roll-dice2");
const hold1 = document.querySelector("#hold1");
const hold2 = document.querySelector("#hold2");

// ------------- DECLARATIONS ------------------
let diceCount = 0;
let playerOneScore = 0;
let playerTwoScore = 0;

const dice = [
  {
    image: "dice-1.png",
    num: 1,
  },
  {
    image: "dice-2.png",
    num: 2,
  },
  {
    image: "dice-3.png",
    num: 3,
  },
  {
    image: "dice-4.png",
    num: 4,
  },
  {
    image: "dice-5.png",
    num: 5,
  },
  {
    image: "dice-6.png",
    num: 6,
  },
];

// ---------- GAME ----------------
game();
resetBtn.addEventListener("click", game);

// -------------------- FUNCTIONS -------------------

// PLAYER 1 FUNCTIONS
function rollDiceOne() {
  win();
  imageTwo.src = "";
  let randomNum = Math.trunc(Math.random() * dice.length);
  imageOne.src = dice[randomNum].image;
  if (randomNum !== 0) {
    diceCount += dice[randomNum].num;
    current1.textContent = diceCount;
  } else {
    diceCount = 0;
    current1.textContent = diceCount;
    rollDice1.removeEventListener("click", rollDiceOne);
    rollDice2.addEventListener("click", rollDiceTwo);
    holdOne();
    imageOne.src = dice[randomNum].image;
  }
}

function holdOne() {
  playerOneScore += diceCount;
  totalScore1.textContent = playerOneScore;
  diceCount = 0;
  current1.textContent = diceCount;
  toggleActive();
  rollDice1.removeEventListener("click", rollDiceOne);
  rollDice2.addEventListener("click", rollDiceTwo);
  if (playerOneScore >= 100) {
    document.querySelector("#player1-current h3").textContent = "🎉You win!";
    current1.textContent = "";
    toggleActive();
  }
}

// PLAYER 2 FUNCTIONS
function rollDiceTwo() {
  win();
  imageOne.src = "";
  let randomNum = Math.trunc(Math.random() * dice.length);
  imageTwo.src = dice[randomNum].image;
  if (randomNum !== 0) {
    diceCount += dice[randomNum].num;
    current2.textContent = diceCount;
  } else {
    diceCount = 0;
    current2.textContent = diceCount;
    rollDice2.removeEventListener("click", rollDiceTwo);
    rollDice1.addEventListener("click", rollDiceOne);
    holdTwo();
    imageTwo.src = dice[randomNum].image;
  }
}

function holdTwo() {
  playerTwoScore += diceCount;
  totalScore2.textContent = playerTwoScore;
  diceCount = 0;
  current2.textContent = 0;
  toggleActive();
  rollDice2.removeEventListener("click", rollDiceTwo);
  rollDice1.addEventListener("click", rollDiceOne);
  if (playerTwoScore >= 100) {
    document.querySelector("#player2-current h3").textContent = "🎉You win!";
    current2.textContent = "";
    toggleActive();
  }
}

// -------- GENERAL FUNCTIONS ----------
function toggleActive() {
  playerOneSection.classList.toggle("active-player");
  playerTwoSection.classList.toggle("active-player");
}

function win() {
  if (playerOneScore >= 100 || playerTwoScore >= 100) {
    rollDice1.removeEventListener("click", rollDiceOne);
    rollDice2.removeEventListener("click", rollDiceTwo);
    hold1.removEventListener("click", holdOne);
    hold2.removeEventListener("click", holdTwo);
  }
}

function game() {
  diceCount = 0;
  playerOneScore = 0;
  playerTwoScore = 0;
  totalScore1.textContent = playerOneScore;
  totalScore2.textContent = playerTwoScore;
  imageOne.src = "";
  imageTwo.src = "";
  document.querySelector("#player1-current h3").textContent = "current";
  current1.textContent = "0";
  document.querySelector("#player2-current h3").textContent = "current";
  current2.textContent = "0";
  playerOneSection.classList.add("active-player");
  playerTwoSection.classList.remove("active-player");
  if (playerOneSection.classList.contains("active-player")) {
    rollDice1.addEventListener("click", rollDiceOne);
  } else {
    rollDice2.addEventListener("click", rollDiceTwo);
  }
  hold1.addEventListener("click", holdOne);
  hold2.addEventListener("click", holdTwo);
}
