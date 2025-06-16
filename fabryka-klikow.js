// Modal
function showModal(message, type = 'alert', onConfirm = null) {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal-window');
  const content = document.getElementById('modal-content');
  const btnOk = document.getElementById('modal-ok-button');
  const btnYes = document.getElementById('modal-confirm-yes');
  const btnNo = document.getElementById('modal-confirm-no');

  content.textContent = message;
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

// Pełny save z powiadomieniem
async function saveGameToServer() {
  try {
    const res = await fetch('http://localhost:3000/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    });
    if (!res.ok) throw new Error('Status ' + res.status);
    showModal('Stan gry zapisany na serwerze!');
  } catch (err) {
    console.error('Błąd zapisu na serwerze:', err);
    showModal('Błąd zapisu na serwerze');
  }
}

// Cicha wersja do autosave
async function saveGameSilent() {
  try {
    const res = await fetch('http://localhost:3000/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(game)
    });
    if (!res.ok) throw new Error('Status ' + res.status);
    // nie pokazujemy nic dla użytkownika
  } catch (err) {
    console.error('Błąd zapisu na serwerze (silent):', err);
    // brak modala
  }
}

// Load z serwera
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
    game.shownFloorAlerts = Array.isArray(data.shownFloorAlerts) ? data.shownFloorAlerts : [];
    game.shownMachineAlerts = Array.isArray(data.shownMachineAlerts) ? data.shownMachineAlerts : [];
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
    console.log('Stan gry wczytany z serwera.');
  } catch (err) {
    console.error('Błąd ładowania stanu gry z serwera:', err);
    showModal('Nie udało się wczytać stanu z serwera.');
    // Jeśli chcesz fallback, możesz tu wywołać lokalne loadGame()
  }
}

// Obiekt gry
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

// Reset gry
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
    checkUnlockedMachines();
    checkUnlockedFloors();
    updateClicks();
    renderMachines();
    renderBossSection();
    saveGameToServer(); // zamiast saveGame()
  });
}

// Inicjalizacja
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-ok-button').addEventListener('click', hideModal);
  loadGameFromServer();
});

// Autosave co 5s, cicho
setInterval(() => {
  collectClicksPerSecond();
  saveGameSilent();
}, 5000);
