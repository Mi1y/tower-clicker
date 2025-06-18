function showModal(message, type = 'alert', onConfirm = null) {
  const backdrop = document.getElementById('modal-backdrop');
  const modal = document.getElementById('modal-window');
  const content = document.getElementById('modal-content');

  // Buttons
  const btnOk = document.getElementById('modal-ok-button');
  const btnYes = document.getElementById('modal-confirm-yes');
  const btnNo = document.getElementById('modal-confirm-no');

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

// helpers
function showFloorUnlockedModal(floorName, newMachines = []) {
  const message = newMachines.length > 0 
    ? `${t('floor-unlocked')} ${floorName}<br>${t('machine-unlocked')} ${newMachines.join(', ')}`
    : `${t('floor-unlocked')} ${floorName}`;
  
  showModal(message);
}

function showMachineUnlockedModal(machineName) {
  showModal(t('machine-unlocked') + ' ' + machineName);
}

function showBossAttackErrorModal(cost, clicks) {
  showModal(t('insufficient-clicks', {cost, current: Math.floor(clicks)}));
}

function showExportSuccessModal() {
  showModal(t('game-exported'));
}

function showImportSuccessModal() {
  showModal(t('game-imported'));
}

function showImportErrorModal() {
  showModal(t('import-error'));
}

function showFileReadErrorModal() {
  showModal(t('file-read-error'));
}

function showResetConfirmModal(onConfirm) {
  showModal(t('reset-confirm'), 'confirm', onConfirm);
}

function showInsufficientClicksModal() {
  showModal(t('not-enough-clicks'));
}

function showSaveGameSuccessModal() {
  showModal(t('game-saved'));
}

function showSaveGameErrorModal() {
  showModal(t('save-error'));
}

function showLoadSuccessModal() {
  showModal(t('game-loaded'));
}

function showLoadErrorModal() {
  showModal(t('load-error'));
}