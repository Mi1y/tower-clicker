  let game = {
    clicks: 0,
    machines: [
      { 
        id: 'robot', 
        name: 'Robot', 
        baseCost: 10, 
        cost: 10, 
        baseCPS: 1, 
        cps: 1, 
        count: 0, 
        upgradeLevel: 0 
        },
      { 
        id: 'automat', 
        name: 'Automat', 
        baseCost: 100, 
        cost: 100, 
        baseCPS: 10, 
        cps: 10, 
        count: 0, 
        upgradeLevel: 0 
        }
    ]
  };

  const clicksDisplay = document.getElementById('clicks');
  const clickBtn = document.getElementById('click-btn');
  const machinesDiv = document.getElementById('machines');

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
    saveGame();
  });

  // koszt ulepszenia - rośnie o 50% za każdy level
  function getUpgradeCost(machine) {
    return Math.ceil(machine.baseCost * Math.pow(2, machine.upgradeLevel));
  }

  function renderMachines() {
    machinesDiv.innerHTML = '<h2>Maszyny</h2>';
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
          <button id="buy-${machine.id}">Kup (${machine.cost})</button>
          <button id="upgrade-${machine.id}" ${game.clicks < getUpgradeCost(machine) ? 'disabled' : ''}>
            Ulepsz (${getUpgradeCost(machine)})
          </button>
        </div>
      `;
      machinesDiv.appendChild(machineDiv);

      document.getElementById(`buy-${machine.id}`).onclick = () => {
        if (game.clicks >= machine.cost) {
          game.clicks -= machine.cost;
          machine.count++;
          // koszt rośnie o 15% za każdą sztukę
          machine.cost = Math.ceil(machine.cost * 1.15);
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
      game.machines.forEach((m, i) => {
        if (loaded.machines && loaded.machines[i]) {
          m.count = loaded.machines[i].count || 0;
          m.cost = loaded.machines[i].cost || m.cost;
          m.upgradeLevel = loaded.machines[i].upgradeLevel || 0;
          m.cps = m.baseCPS * (1 + 0.5 * m.upgradeLevel);
        }
      });
    }
  }

  function exportJson() {
    const json = JSON.stringify(game, null, 2)
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'idle-clicker-game.json';
    a.click();

    URL.revokeObjectURL(url);
  }

  function importJson(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        game = JSON.parse(e.target.result);
        updateClicks();
        renderMachines();
        saveGame();
    };
    reader.readAsText(file);
  }

  function resetGame() {
    if (confirm('Czy na pewno chcesz zresetować grę?')) {
      game = {
        clicks: 0,
        machines: [
          { 
            id: 'robot', 
            name: 'Robot', 
            baseCost: 10, 
            cost: 10, 
            baseCPS: 1, 
            cps: 1, 
            count: 0, 
            upgradeLevel: 0 
          },
          { 
            id: 'automat', 
            name: 'Automat', 
            baseCost: 100, 
            cost: 100, 
            baseCPS: 10, 
            cps: 10, 
            count: 0, 
            upgradeLevel: 0 
          }
        ]
      };
      saveGame();
      updateClicks();
      renderMachines();
    }
  }

  loadGame();
  updateClicks();
  renderMachines();

  // co 100ms dodajemy kliksy z maszyn (płynniej)
  setInterval(() => {
    collectClicksPerSecond();
    saveGame();
  }, 100);
