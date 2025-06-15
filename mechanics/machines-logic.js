const machinesDiv = document.getElementById('machines');

function checkUnlockedMachines() {
  let newMachines = [];

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
        // push new machines into new floors and show modal
          newMachines.push(machine.name);
          // game.shownMachineAlerts.push(machine.id);
          saveGame();
        renderMachines();
      }
    }
  });
  // return information with new machines to floors
  return newMachines;
}



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
        showInsufficientClicksModal();
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

