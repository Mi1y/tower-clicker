let game = {
  clicks: 0,
  machines: [],
  currentFloor: 1,
  unlockedFloors: [1],
  defeatedBosses: [],
  currentBoss: null,

  showFloorAlerts:[],
  showMachineAlerts:[],
};

const clicksDisplay = document.getElementById('clicks');
const clickBtn = document.getElementById('click-btn');
const machinesDiv = document.getElementById('machines');


function checkUnlockedMachines() {
  machines.forEach(machine => {
    if (game.currentFloor >= machine.unlockedAtFloor) {
      const existingMachine = game.machines.find(m => m.id === machine.id);
      if (!existingMachine) {
        game.machines.push({
          id: machine.id,
          name: machine.name,
          baseCost: machine.baseCost,
          cost: machine.baseCost,
          baseCPS: machine.baseCPS,
          cps: machine.baseCPS,
          count: 0,
          upgradeLevel: 0
        });
        if (!game.shownMachineAlerts.includes(machine.id)) {
          alert(`🎉 Odblokowano nową maszynę: ${machine.name}`);
          game.shownMachineAlerts.push(machine.id);
          saveGame();
        }
        renderMachines();
      }
    }
  });
}

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
        // alert(`🏢 Odblokowano nowe piętro: ${floors.find(f => f.id === nextFloor).name}`);
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
    alert(`Potrzebujesz ${cost} klików, a masz tylko ${Math.floor(game.clicks)}!`);
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
        <h2>⚔️ ${game.currentBoss.floorName} ⚔️</h2>
        <div class="boss-info">
          <div class="boss-name">${game.currentBoss.name}</div>
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


function updateClicks() {
  clicksDisplay.textContent = `Kliksy: ${Math.floor(game.clicks)}`;
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

function getBuyCost(machine) {
  // Koszt rośnie o 15% za każdą sztukę
  return Math.ceil(machine.baseCost * Math.pow(1.15, machine.count));
}
// koszt ulepszenia - rośnie o 50% za każdy level
function getUpgradeCost(machine) {
  return Math.ceil(machine.baseCost * Math.pow(2, machine.upgradeLevel));
}

function renderMachines() {
  // czyści poprzednie maszyny przed upgrade
  machinesDiv.innerHTML = '';

    game.machines.forEach(machine => {
    const machineDiv = document.createElement('div');
    machineDiv.className = 'machine';

    machineDiv.innerHTML = `
      <div class="machine-info">
        <div class="machine-name">${machine.name}</div>
        <div class="machine-stats">
          Ilość: ${machine.count} <br/>
          Produkcja: ${(machine.cps * machine.count).toFixed(1)} klików/sek <br/>
          Ulepszenia: ${machine.upgradeLevel} (x${(1 + 0.5 * machine.upgradeLevel).toFixed(2)} produkcji)
        </div>
      </div>
      <div class="buttons-group">
        <button id="buy-${machine.id}">Kup (${getBuyCost(machine)})</button>
        <button id="upgrade-${machine.id}" ${game.clicks < getUpgradeCost(machine) ? 'disabled' : ''}>
          Ulepsz (${getUpgradeCost(machine)})
        </button>
      </div>
    `;
    machinesDiv.appendChild(machineDiv);

    // debug
    // console.log('Kliksy:', game.clicks, 'Koszt ulepszenia:', getUpgradeCost(machine), 'Ilość:', machine.count, 'Poziom:', machine.upgradeLevel);

    document.getElementById(`buy-${machine.id}`).onclick = () => {
      const buyCost = getBuyCost(machine);
      if (game.clicks >= buyCost) {
        game.clicks -= buyCost;
        machine.count++;
        updateClicks();
        renderMachines();
        saveGame();
      } else {
        alert('Masz za mało klików!');
      }
    };

    document.getElementById(`upgrade-${machine.id}`).onclick = () => {
      const upgradeCost = getUpgradeCost(machine);
      if (game.clicks >= upgradeCost) {
        game.clicks -= upgradeCost;
        machine.upgradeLevel++;
        // Zwiększamy produkcję o 50% na poziom
        machine.cps = machine.baseCPS * (1 + 0.5 * machine.upgradeLevel);
        updateClicks();
        renderMachines();
        saveGame();
      }
    };
  });
}

function updateMachineButtons() {
  game.machines.forEach(machine => {
    const buyBtn = document.getElementById(`buy-${machine.id}`);
    const upgradeBtn = document.getElementById(`upgrade-${machine.id}`);
    if (buyBtn) buyBtn.disabled = game.clicks < getBuyCost(machine);
    if (upgradeBtn) upgradeBtn.disabled = game.clicks < getUpgradeCost(machine);
  });
}
setInterval(updateMachineButtons, 100);

function collectClicksPerSecond() {
  let totalCPS = 0;
  game.machines.forEach(machine => {
    totalCPS += machine.cps * machine.count;
  });
  game.clicks += totalCPS / 10;
  updateClicks();
}

function saveGame() {
  localStorage.setItem('idleClickerGame', JSON.stringify(game));
}

function loadGame() {
  const saved = localStorage.getItem('idleClickerGame');
  if (saved) {
    const loaded = JSON.parse(saved);
    game.clicks = loaded.clicks || 0;
    game.currentFloor = loaded.currentFloor || 1;
    game.unlockedFloors = loaded.unlockedFloors || [1];
    game.defeatedBosses = loaded.defeatedBosses || [];
    game.currentBoss = loaded.currentBoss || null;
    game.shownFloorAlerts = loaded.shownFloorAlerts || [];
    game.shownMachineAlerts = loaded.shownMachineAlerts || [];
    if (loaded.machines && loaded.machines.length > 0) {
      game.machines = loaded.machines.map(machine => ({
        id: machine.id,
        name: machine.name,
        baseCost: machine.baseCost,
        cost: machine.cost,
        baseCPS: machine.baseCPS,
        cps: machine.baseCPS * (1 + 0.5 * (machine.upgradeLevel || 0)),
        count: machine.count,
        upgradeLevel: machine.upgradeLevel || 0
      }));
    } else {
      game.machines = [];
    }
  }
  checkUnlockedMachines();
  checkUnlockedFloors();
}

function exportJson() {
  const json = JSON.stringify(game, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'fabryka-klikow-save.json';
  a.click();

  URL.revokeObjectURL(url);
  alert('Gra została wyeksportowana!');
}

function importJson(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedGame = JSON.parse(e.target.result);
      
      if (!importedGame.hasOwnProperty('clicks') || 
          !importedGame.hasOwnProperty('machines') ||
          !Array.isArray(importedGame.machines)) {
        throw new Error('Nieprawidłowy format pliku!');
      }

      game.clicks = importedGame.clicks || 0;
      game.currentFloor = importedGame.currentFloor || 1;
      game.unlockedFloors = importedGame.unlockedFloors || [1];
      game.defeatedBosses = importedGame.defeatedBosses || [];
      game.currentBoss = importedGame.currentBoss || null;
      
      if (importedGame.machines && importedGame.machines.length > 0) {
        game.machines = importedGame.machines.map(machine => ({
          id: machine.id || 'robot',
          name: machine.name || '🤖 Robot Kliker',
          baseCost: machine.baseCost || 15,
          cost: machine.cost || machine.baseCost || 15,
          baseCPS: machine.baseCPS || 1,
          cps: machine.cps || machine.baseCPS || 1,
          count: machine.count || 0,
          upgradeLevel: machine.upgradeLevel || 0
        }));
        
        game.machines.forEach(machine => {
          machine.cps = machine.baseCPS * (1 + 0.5 * machine.upgradeLevel);
        });
      }

      checkUnlockedMachines();
      
      updateClicks();
      renderMachines();
      renderBossSection();
      saveGame();
      
      alert('Gra została pomyślnie zaimportowana!');
      
    } catch (error) {
      alert('Błąd podczas importu: ' + error.message);
      console.error('Import error:', error);
    }
  };
  
  reader.onerror = () => {
    alert('Błąd podczas czytania pliku!');
  };
  
  reader.readAsText(file);
  
  // wyczysc input po uzyciu importu
  event.target.value = '';
}

function resetGame() {
  if (confirm('Czy na pewno chcesz zresetować grę?')) {
    game = {
      clicks: 0,
      machines: [],
      currentFloor: 1,
      unlockedFloors: [1],
      defeatedBosses: [],
      currentBoss: null,

      shownFloorAlerts: [],
      shownMachineAlerts: []
    };
    saveGame();
    updateClicks();
    checkUnlockedFloors();
    checkUnlockedMachines();
    renderMachines();
    renderBossSection();
  }
}

loadGame();
updateClicks();
renderMachines();
renderBossSection();

setInterval(() => {
  collectClicksPerSecond();
  saveGame();
}, 100);
