import { triggerWinEffect, triggerLoseEffect, triggerTieEffect } from './effects.js';

let score = JSON.parse(localStorage.getItem('score')) || {
  player: { wins: 0, losses: 0, ties: 0 },
  computer: { wins: 0, losses: 0, ties: 0 }
};

updateScoreElement();

let isAutoPlaying = false;

let intervalId;

function autoPlay () {
  const autoPlayButton = document.querySelector('.js-autoplay-button');

  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 3000 );
    isAutoPlaying = true;
    autoPlayButton.textContent = 'Stop Auto Play';
    autoPlayButton.classList.add('auto-play-active');
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false
    autoPlayButton.textContent = 'Auto Play';
    autoPlayButton.classList.remove('auto-play-active');
  }
}

document.querySelector('.js-alexa-button').addEventListener('click', () => {
  playGame('alexa');
});

document.querySelector('.js-kobe-button').addEventListener('click', () => {
  playGame('kobe');
});

document.querySelector('.js-sebastian-twin-button').addEventListener('click', () => {
  playGame('sebastiantwin');
});

function resetEventListener () {
  if (confirm('Are you sure you want to reset the score?')) {

    score = {
      player: { wins: 0, losses: 0, ties: 0 },
      computer: { wins: 0, losses: 0, ties: 0 }
    };

    localStorage.removeItem('score');

    updateScoreElement();
  }
}

document.querySelector('.js-reset-button').addEventListener('click', 
  () => {
      resetEventListener(); 
  }
);

document.querySelector('.js-autoplay-button').addEventListener(
  'click', () => { 
    autoPlay();
  }
);

document.body.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  switch(key) {
    case 'a':
      playGame('alexa');
      break;
    case 'k':
      playGame('kobe');
      break;
    case 's':
      playGame('sebastiantwin');
      break;
    case 'd':
      resetEventListener();
      break;
    case 'g':
      autoPlay();
      break;
    default:
      break;
  }
});


const winSound = new Audio('sounds/win.mp3');
const loseSound = new Audio('sounds/lose.wav');
const tieSound = new Audio('sounds/tie.mp3');

function stopAllSounds() {
  winSound.pause();
  winSound.currentTime = 0; 

  loseSound.pause();
  loseSound.currentTime = 0; 

  tieSound.pause();
  tieSound.currentTime = 0;
}

function playGame (playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === 'alexa') {
      if (computerMove === 'alexa'){
      result = 'You win.'
    } else if (computerMove === 'kobe') {
      result = 'You lose.';
    } else if (computerMove === 'sebastiantwin'){
      result = 'Tie.';
    }
  } else if (playerMove === 'kobe'){
        if (computerMove === 'alexa'){
        result = 'You lose.'
      } else if (computerMove === 'kobe') {
        result = 'You win.';
      } else if (computerMove === 'sebastiantwin'){
        result = 'Tie.';
      }
  } else if(playerMove === 'sebastiantwin') {
        if (computerMove === 'alexa'){
        result = 'You lose.'
      } else if (computerMove === 'kobe') {
        result = 'Tie.';
      } else if (computerMove === 'sebastiantwin'){
        result = 'You win.';
      }
  }

  stopAllSounds();

  if(result === 'You win.') {
    score.player.wins += 1;
    score.computer.losses += 1;
    winSound.play();
    triggerWinEffect();
    
 
  } else if (result === 'You lose.'){
    score.player.losses += 1;
    score.computer.wins += 1;
    loseSound.play();
    triggerLoseEffect();

  } else if(result === 'Tie.') {
    score.player.ties += 1;
    score.computer.ties += 1;
    tieSound.play();
    triggerTieEffect();
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
  You picked 
  <img src="images/${playerMove}.jpg" class="move-icon"> My mom picked
  <img src="images/${computerMove}.jpg" class="move-icon">
`;
} 


function updateScoreElement() {
  if (!score.player || !score.computer) {
    score = {
      player: { wins: 0, losses: 0, ties: 0 },
      computer: { wins: 0, losses: 0, ties: 0 }
    };
  }
  
  document.querySelector('.js-score').innerHTML = `
    You - Wins: ${score.player.wins}, Losses: ${score.player.losses}, Ties: ${score.player.ties} <br>
    Mom - Wins: ${score.computer.wins}, Losses: ${score.computer.losses}, Ties: ${score.computer.ties}
  `;
  }
function pickComputerMove (){
  const randomNumber = Math.random();
  let computerMove = '';
    if (randomNumber >= 0 && randomNumber < 1 / 3){
      computerMove = 'alexa';
    } else if (randomNumber >= 1 /3 && randomNumber < 2 / 3) {
      computerMove = 'kobe';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1){ 
      computerMove = 'sebastiantwin';
    }
    return computerMove;

 }
