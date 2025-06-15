function showModal(message, type = 'alert', onConfirm = null) {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal-window');
  const content = document.getElementById('modal-content');

  // Przyciski
  const btnOk = document.getElementById('modal-ok-button');
  const btnYes = document.getElementById('modal-confirm-yes');
  const btnNo = document.getElementById('modal-confirm-no');

  // content.textContent = message;
  content.innerHTML = message.replace(/\n/g, '<br>');
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


// helpers

function showFloorUnlockedModal(floorName, newMachines = []) {
  const message = newMachines.length > 0 
    ? `🏢 Odblokowano nowe piętro: ${floorName}<br>🎉 Nowe maszyny: ${newMachines.join(', ')}`
    : `🏢 Odblokowano nowe piętro: ${floorName}`;
  
  showModal(message);
}

function showMachineUnlockedModal(machineName) {
  showModal(`🎉 Odblokowano nową maszynę: ${machineName}`);
}

function showBossAttackErrorModal(cost, clicks) {
  showModal(`Potrzebujesz ${cost} klików, a masz tylko ${Math.floor(clicks)}!`);
}

function showExportSuccessModal() {
  showModal('Gra została wyeksportowana!');
}

function showImportSuccessModal() {
  showModal('Gra została pomyślnie zaimportowana!');
}

function showImportErrorModal(errorMessage) {
  showModal('Błąd podczas importu: ' + errorMessage);
}

function showFileReadErrorModal() {
  showModal('Błąd podczas czytania pliku!');
}

function showResetConfirmModal(onConfirm) {
  showModal('Czy na pewno chcesz zresetować grę?', 'confirm', onConfirm);
}

function showInsufficientClicksModal() {
  showModal('Masz za mało klików!');
}