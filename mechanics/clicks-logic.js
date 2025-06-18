const clicksDisplay = document.getElementById('clicks');
const clickBtn = document.getElementById('click-btn');


function updateClicks() {
  const clicksText = typeof t === 'function' ? t('clicks') : 'Kliksy:';
  clicksDisplay.textContent = `${clicksText} ${Math.floor(game.clicks)}`;
}

function animateClicks() {
  clicksDisplay.classList.add('animate');
  setTimeout(() => clicksDisplay.classList.remove('animate'), 200);
}

clickBtn.addEventListener('click', () => {
  game.clicks += 1;
  updateClicks();
  animateClicks();
  checkUnlockedFloors();
  renderBossSection();
  saveGame();
});


function collectClicksPerSecond() {
  let totalCPS = 0;
  game.machines.forEach(machine => {
    totalCPS += machine.cps * machine.count;
  });
  game.clicks += totalCPS / 10;
  updateClicks();
}