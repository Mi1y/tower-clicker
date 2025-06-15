let game = {
  clicks: 0,
  machines: [],
  currentFloor: 1,
  unlockedFloors: [1],
  defeatedBosses: [],
  currentBoss: null,
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
  showExportSuccessModal();
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

      showImportSuccessModal();
    } catch (error) {
      showImportErrorModal(error.message);
      console.error('Import error:', error);
    }
  };

  reader.onerror = () => {
    showFileReadErrorModal();
  };

  reader.readAsText(file);

  // wyczysc input po uzyciu importu
  event.target.value = '';
}

function resetGame() {
  showResetConfirmModal(() => {
    game = {
      clicks: 0,
      machines: [],
      currentFloor: 1,
      unlockedFloors: [1],
      defeatedBosses: [],
      currentBoss: null,
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


