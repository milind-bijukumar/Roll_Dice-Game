'use strict';

//Storing Element in variable
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const current0El = document.getElementById('current-0');
const current1El = document.getElementById('current-1');
const score0El = document.getElementById('score-0');
const score1El = document.getElementById('score-1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

//function for Switch Player
const togglePlayer = function () {
  document.querySelector(`#current-${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
};

//Declaring Variable and setting up initial value
let activePlayer, score, currentScore, wonFlag;

//Function to Reset Values and view
const resetScreen = function () {
  currentScore = 0;
  activePlayer = 0;
  wonFlag = false;
  score = [0, 0];
  score0El.textContent = score[0];
  score1El.textContent = score[1];
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player-active');
  diceEl.classList.add('hidden');
};

resetScreen();

//When User Click on Roll dice
btnRoll.addEventListener('click', function () {
  if (!wonFlag) {
    //Generating the dice
    let dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //Displaying the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //Checking if dice roll != 1
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current-${activePlayer}`).textContent =
        currentScore;
    } else {
      togglePlayer();
    }
  }
});

//When User click on hold button
btnHold.addEventListener('click', function () {
  if (!wonFlag) {
    //Add Current Score to Total Score of Current Player
    score[activePlayer] += currentScore;
    document.querySelector(`#score-${activePlayer}`).textContent =
      score[activePlayer];

    //Checking score >=50 (winning criteria)
    if (score[activePlayer] >= 50) {
      wonFlag = true;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
      diceEl.classList.add('hidden');
    } else {
      togglePlayer();
    }
  }
});

//When User click on New Game button
btnNew.addEventListener('click', function () {
  if (wonFlag) {
    console.log(`active player: ${activePlayer}`);
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.remove('player-winner');
  }
  //resetting screeen
  resetScreen();
});
