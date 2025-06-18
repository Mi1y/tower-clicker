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
          saveGameToServer();
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

    const quantityText = typeof t === 'function' ? t('quantity') : 'Quantity:';
    const productionText = typeof t === 'function' ? t('production') : 'Production:';
    const clicksPerSecText = typeof t === 'function' ? t('clicks-per-sec') : 'clicks/sec';
    const upgradesText = typeof t === 'function' ? t('upgrades') : 'Upgrades:';
    const productionMultiplierText = typeof t === 'function' ? t('production-multiplier') : 'production';
    const buyText = typeof t === 'function' ? t('buy-cost', { cost: getBuyCost(machine) }) : `Buy (${getBuyCost(machine)})`;
    const upgradeText = typeof t === 'function' ? t('upgrade-cost', { cost: getUpgradeCost(machine) }) : `Upgrade (${getUpgradeCost(machine)})`;

    machineDiv.innerHTML = `
      <div class="machine-info">
        <div class="machine-name">${machine.name}</div>
        <div class="machine-stats">
          ${quantityText} ${machine.count} <br/>
          ${productionText} ${(machine.cps * machine.count).toFixed(1)} ${clicksPerSecText} <br/>
          ${upgradesText} ${machine.upgradeLevel} (x${(1 + 0.5 * machine.upgradeLevel).toFixed(2)} ${productionMultiplierText})
        </div>
      </div>
      <div class="buttons-group">
        <button id="buy-${machine.id}">${buyText}</button>
        <button id="upgrade-${machine.id}" ${game.clicks < getUpgradeCost(machine) ? 'disabled' : ''}">
          ${upgradeText}
        </button>
      </div>
    `;
    machinesDiv.appendChild(machineDiv);

    document.getElementById(`buy-${machine.id}`).onclick = () => {
      const buyCost = getBuyCost(machine);
      if (game.clicks >= buyCost) {
        game.clicks -= buyCost;
        machine.count++;
        updateClicks();
        renderMachines();
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

function refreshMachineNames() {
  game.machines.forEach(gameMachine => {
    const languageMachine = machines.find(m => m.id === gameMachine.id);
    if (languageMachine) {
      gameMachine.name = languageMachine.name;
    }
  });
}


setInterval(updateMachineButtons, 100);

