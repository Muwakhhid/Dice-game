'use strict';
//1.slecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const currentscore0 = document.getElementById('current--0');
const currentscore1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const restart = document.querySelector('.btn--new');
let scores, currentScore, activePlayer, isPlaying;

//2.start condition
const start = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;
  currentScore = 0;
  scores = [0, 0];
  dice.classList.add('hidden');
  roll.classList.remove('hidden');
  hold.classList.remove('hidden');
  player0.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--winner');
  player1.classList.remove('player--active');
  activePlayer = 0;
  isPlaying = true;
};
start();
//3.rolling dice and switchingPlayer
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}
roll.addEventListener('click', function () {
  if (isPlaying) {
    const random = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${random}.png`;
    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
//4.holding score
hold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      isPlaying = false;
      dice.classList.add('hidden');
      roll.classList.add('hidden');
      hold.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});
//restart
restart.addEventListener('click', start);
