function showModal(message, type = 'alert', onConfirm = null) {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal-window');
  const content = document.getElementById('modal-content');

  // Przyciski
  const btnOk = document.getElementById('modal-ok-button');
  const btnYes = document.getElementById('modal-confirm-yes');
  const btnNo = document.getElementById('modal-confirm-no');

  content.textContent = message;

  // Reset visibility
  btnOk.classList.add('hidden');
  btnYes.classList.add('hidden');
  btnNo.classList.add('hidden');

  if (type === 'alert') {
    btnOk.classList.remove('hidden');
    btnOk.onclick = hideModal;
  } else if (type === 'confirm') {
    btnYes.classList.remove('hidden');
    btnNo.classList.remove('hidden');
    btnYes.onclick = () => {
      hideModal();
      if (onConfirm) onConfirm();
    };
    btnNo.onclick = hideModal;
  }

  backdrop.classList.remove('hidden');
  modal.classList.remove('hidden');
}

function hideModal() {
  document.getElementById('modal-backdrop').classList.add('hidden');
  document.getElementById('modal-window').classList.add('hidden');
}

document.getElementById('modal-ok-button').addEventListener('click', hideModal);

function checkUnlockedFloors() {

  const floor = floors.find(f => f.id === game.currentFloor);
  if (
    floor &&
    !game.defeatedBosses.includes(game.currentFloor) &&
    !game.currentBoss
  ) {
    game.currentBoss = {
      floorId: floor.id,
      floorName: floor.name,
      name: floor.boss.name,
      hp: floor.boss.hp,
      maxHp: floor.boss.hp,
      reward: floor.boss.reward
    };
    renderBossSection();
  }

  const currentFloorObj = floors.find(f => f.id === game.currentFloor);
  if (
    currentFloorObj &&
    game.defeatedBosses.includes(game.currentFloor) &&
    game.currentFloor < floors.length
  ) {
    const nextFloor = game.currentFloor + 1;
    if (!game.unlockedFloors.includes(nextFloor)) {
      game.unlockedFloors.push(nextFloor);
      if (!game.shownFloorAlerts.includes(nextFloor)) {
        showModal(`🏢 Odblokowano nowe piętro: ${floors.find(f => f.id === nextFloor).name}`);
        game.shownFloorAlerts.push(nextFloor);
        saveGame();
      }
    }
    game.currentFloor = nextFloor;
    // alert(`⬆️ Przeniesiono na ${floors.find(f => f.id === nextFloor).name}`);
    checkUnlockedMachines();
    checkUnlockedFloors();
  }
}

function startBossFight(floorId) {
  const floor = floors.find(f => f.id === floorId);
  if (floor && !game.defeatedBosses.includes(floorId)) {
    game.currentBoss = {
      floorId: floor.id,
      name: floor.boss.name,
      hp: floor.boss.hp,
      maxHp: floor.boss.hp,
      reward: floor.boss.reward
    };
    renderBossSection();
  }
}

function attackBoss() {
  if (!game.currentBoss) return;

  const cost = game.currentBoss.hp;

  if (game.clicks >= cost) {
    game.clicks -= cost;
    game.clicks += game.currentBoss.reward;

    // alert(`🎊 Pokonano ${game.currentBoss.name}! Nagroda: ${game.currentBoss.reward} klików`);

    game.defeatedBosses.push(game.currentBoss.floorId);
    game.currentBoss = null;

    updateClicks();
    checkUnlockedFloors();
    renderBossSection();
  } else {
    showModal(`Potrzebujesz ${cost} klików, a masz tylko ${Math.floor(game.clicks)}!`);
  }
  saveGame();
}

function renderBossSection() {
  let bossDiv = document.getElementById('floors');

  if (!bossDiv) {
    bossDiv = document.createElement('div');
    bossDiv.id = 'floors';
    document.getElementById('content').insertBefore(bossDiv, document.getElementById('machines'));
  }

  if (game.currentBoss) {
    const hpPercent = (game.currentBoss.hp / game.currentBoss.maxHp) * 100;
    bossDiv.innerHTML = `
      <div class="boss-fight">
        <h2>${game.currentBoss.floorName}</h2>
        <div class="boss-info">
          <div class="boss-name">⚔️ ${game.currentBoss.name} ⚔️</div>
          <div class="boss-hp-bar">
            <div class="hp-fill" style="width: ${hpPercent}%"></div>
          </div>
        </div>
        <button onclick="attackBoss()" class="attack-btn" ${game.clicks < game.currentBoss.hp ? 'disabled' : ''}>
          Pokonaj za ${game.currentBoss.hp} klików
        </button>
      </div>
    `;
  } else {
    bossDiv.innerHTML = '';
  }
}

function updateBossButton() {
  if (!game.currentBoss) return;
  const btn = document.querySelector('.attack-btn');
  if (btn) {
    btn.disabled = game.clicks < game.currentBoss.hp;
    btn.textContent = `Pokonaj za ${game.currentBoss.hp} klików`;
  }
}

setInterval(updateBossButton, 100);
