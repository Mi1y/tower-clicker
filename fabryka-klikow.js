async function saveGameToServer() {
  try {
    const res = await fetch('http://localhost:3000/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    });
    if (!res.ok) throw new Error('Status ' + res.status);
    showSaveGameSuccessModal();
  } catch (err) {
    console.error('Błąd zapisu na serwerze:', err);
    showSaveGameErrorModal();
  }
}

async function saveGameSilent() {
  try {
    const res = await fetch('http://localhost:3000/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    });
    if (!res.ok) throw new Error('Status ' + res.status);
  } catch (err) {
    console.error('Błąd zapisu na serwerze (silent):', err);
  }
}

async function loadGameFromServer() {
  try {
    const res = await fetch('http://localhost:3000/api/game');
    if (!res.ok) throw new Error('Status ' + res.status);
    const data = await res.json();
    game.clicks = typeof data.clicks === 'number' ? data.clicks : 0;
    game.currentFloor = typeof data.currentFloor === 'number' ? data.currentFloor : 1;
    game.unlockedFloors = Array.isArray(data.unlockedFloors) ? data.unlockedFloors : [1];
    game.defeatedBosses = Array.isArray(data.defeatedBosses) ? data.defeatedBosses : [];
    game.currentBoss = typeof data.currentBoss === 'string' ? data.currentBoss : null;
    if (Array.isArray(data.machines)) {
      game.machines = data.machines.map(machine => ({
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
    checkUnlockedMachines();
    checkUnlockedFloors();
    updateClicks();
    renderMachines();
    renderBossSection();
    showLoadSuccessModal();
  } catch (err) {
    console.error('Błąd ładowania stanu gry z serwera:', err);
    showLoadErrorModal();
  }
}

let game = {
  clicks: 0,
  machines: [],
  currentFloor: 1,
  unlockedFloors: [1],
  defeatedBosses: [],
  currentBoss: null,
};

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
      saveGameToServer();

      showImportSuccessModal();
    } catch (error) {
      showImportErrorModal();
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
    checkUnlockedMachines();
    checkUnlockedFloors();
    updateClicks();
    renderMachines();
    renderBossSection();
    saveGameToServer(); 
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-ok-button').addEventListener('click', hideModal);
  loadGameFromServer();
});

// Zbieranie klików co sekundę
setInterval(collectClicksPerSecond, 100);

// Autosave co 5s, cicho
setInterval(saveGameSilent, 5000);