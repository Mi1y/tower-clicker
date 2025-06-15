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


let game = {
  clicks: 0,
  machines: [],
  currentFloor: 1,
  unlockedFloors: [1],
  defeatedBosses: [],
  currentBoss: null,

  shownFloorAlerts: [],
  shownMachineAlerts: [],
};


function saveGame() {
  localStorage.setItem('clickFactoryIdleGame', JSON.stringify(game));
}

function loadGame() {
  const saved = localStorage.getItem('clickFactoryIdleGame');
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
  showModal('Gra została wyeksportowana!');
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

      // initialize
      checkUnlockedMachines();
      updateClicks();
      renderMachines();
      renderBossSection();
      saveGame();

      showModal('Gra została pomyślnie zaimportowana!');

    } catch (error) {
      showModal('Błąd podczas importu: ' + error.message);
      console.error('Import error:', error);
    }
  };

  reader.onerror = () => {
    showModal('Błąd podczas czytania pliku!');
  };

  reader.readAsText(file);

  // wyczysc input po uzyciu importu
  event.target.value = '';
}



function resetGame() {
  showModal('Czy na pewno chcesz zresetować grę?', 'confirm', () => {
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
  });
}


// initialize
loadGame();
updateClicks();
renderMachines();
renderBossSection();


setInterval(() => {
  collectClicksPerSecond();
  saveGame();
}, 100);


