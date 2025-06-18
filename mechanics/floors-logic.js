function checkUnlockedFloors() {
  const floor = floors.find(f => f.id === game.currentFloor);
  if (!floor) return;

  // Spawn boss if not defeated and no current boss
  if (!game.defeatedBosses.includes(game.currentFloor) && !game.currentBoss) {
    game.currentBoss = {
      floorId: floor.id,
      floorName: floor.name,
      name: floor.boss.name,
      hp: floor.boss.hp,
      maxHp: floor.boss.hp,
      reward: floor.boss.reward
    };
    renderBossSection();
    return;
  }

  if (game.defeatedBosses.includes(game.currentFloor) && game.currentFloor < floors.length) {
    const nextFloor = game.currentFloor + 1;
    const nextFloorData = floors.find(f => f.id === nextFloor);
    
    // modal shows new mechanines if there is any
    if (!game.unlockedFloors.includes(nextFloor)) {
      const newMachines = checkUnlockedMachines();
      
      showFloorUnlockedModal(nextFloorData.name, newMachines);
      
      game.unlockedFloors.push(nextFloor);
      saveGame();
    }
    
    game.currentFloor = nextFloor;
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

    game.defeatedBosses.push(game.currentBoss.floorId);
    game.currentBoss = null;

    updateClicks();
    checkUnlockedFloors();
    renderBossSection();
  } else {
    showBossAttackErrorModal(cost, game.clicks);
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
    const defeatText = typeof t === 'function' ? t('defeat-boss', { cost: game.currentBoss.hp }) : `Defeat for ${game.currentBoss.hp} clicks`;
    const bossText = typeof t === 'function' ? t('boss-fight', { name: game.currentBoss.name }) : `⚔️ ${game.currentBoss.name} ⚔️`;
    
    bossDiv.innerHTML = `
      <div class="boss-fight">
        <h2>${game.currentBoss.floorName}</h2>
        <div class="boss-info">
          <div class="boss-name">${bossText}</div>
          <div class="boss-hp-bar">
            <div class="hp-fill" style="width: ${hpPercent}%"></div>
          </div>
        </div>
        <button onclick="attackBoss()" class="attack-btn" ${game.clicks < game.currentBoss.hp ? 'disabled' : ''}>
          ${defeatText}
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
    const defeatText = typeof t === 'function' ? t('defeat-boss', { cost: game.currentBoss.hp }) : `Defeat for ${game.currentBoss.hp} clicks`;
    btn.textContent = defeatText;
  }
}

function refreshBossData() {
  if (game.currentBoss) {
    const currentFloor = floors.find(f => f.id === game.currentBoss.floorId);
    if (currentFloor) {
      game.currentBoss.floorName = currentFloor.name;
      game.currentBoss.name = currentFloor.boss.name;
      renderBossSection();
    }
  }
}

setInterval(updateBossButton, 100);
