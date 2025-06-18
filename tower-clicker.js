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
    const data = JSON.parse(saved);
    game.clicks = typeof data.clicks === 'number' ? data.clicks : 0;
    game.currentFloor = typeof data.currentFloor === 'number' ? data.currentFloor : 1;
    game.unlockedFloors = Array.isArray(data.unlockedFloors) ? data.unlockedFloors : [1];
    game.defeatedBosses = Array.isArray(data.defeatedBosses) ? data.defeatedBosses : [];
    game.currentBoss = typeof data.currentBoss === 'string' ? data.currentBoss : null;
    
    if (Array.isArray(data.machines)) {
      game.machines = data.machines.map(savedMachine => {
        const languageMachine = machines.find(m => m.id === savedMachine.id);
        
        if (languageMachine) {
          return {
            id: savedMachine.id,
            name: languageMachine.name,
            baseCost: languageMachine.baseCost,
            cost: savedMachine.cost,
            baseCPS: languageMachine.baseCPS,
            cps: languageMachine.baseCPS * (1 + 0.5 * (savedMachine.upgradeLevel || 0)),
            count: savedMachine.count,
            upgradeLevel: savedMachine.upgradeLevel || 0,
            unlockedAtFloor: languageMachine.unlockedAtFloor
          };
        } else {
          return savedMachine;
        }
      });
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
        game.machines = importedGame.machines.map(importedMachine => {
          const languageMachine = machines.find(m => m.id === importedMachine.id);
          
          if (languageMachine) {
            return {
              id: importedMachine.id,
              name: languageMachine.name,
              baseCost: languageMachine.baseCost,
              cost: importedMachine.cost || languageMachine.baseCost,
              baseCPS: languageMachine.baseCPS,
              cps: languageMachine.baseCPS * (1 + 0.5 * (importedMachine.upgradeLevel || 0)),
              count: importedMachine.count || 0,
              upgradeLevel: importedMachine.upgradeLevel || 0,
              unlockedAtFloor: languageMachine.unlockedAtFloor
            };
          } else {
            return importedMachine;
          }
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


