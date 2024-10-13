
function triggerWinEffect() {
  const duration = 1000; 
  const interval = 100; 

  const endTime = Date.now() + duration;

  const confettiInterval = setInterval(() => {
    if (Date.now() < endTime) {
      confetti({
        particleCount: 300,
        spread: 150,
        colors: ['#FF0', '#00F', '#F00'],
        origin: { y: 0.6 }
      });
    } else {
      clearInterval(confettiInterval);
    }
  }, interval);
}

function triggerLoseEffect() {
  const body = document.querySelector('body');
  const raindropCount = 50; 

  for (let i = 0; i < raindropCount; i++) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');

    raindrop.style.left = Math.random() * 100 + 'vw';
    
    raindrop.style.top = Math.random() * -100 + 'px'; 

    body.appendChild(raindrop);

    raindrop.addEventListener('animationend', () => {
      raindrop.remove();
    });
  }

  body.classList.add('lose-effect');

  setTimeout(() => {
    body.classList.remove('lose-effect');
  }, 3000); 
}

function triggerTieEffect() {
  const body = document.querySelector('body');
  body.classList.add('tie-effect');
  setTimeout(() => {
    body.classList.remove('tie-effect');
  }, 3000); 
}

export { triggerWinEffect, triggerLoseEffect, triggerTieEffect };