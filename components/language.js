let currentLanguage = localStorage.getItem('gameLanguage') || 'pl';
let machines = [];
let floors = [];

function loadLanguageData() {
  const scriptMachines = document.createElement('script');
  const scriptFloors = document.createElement('script');
  
  scriptMachines.src = `data/${currentLanguage}/machines-${currentLanguage}.js`;
  scriptFloors.src = `data/${currentLanguage}/floors-${currentLanguage}.js`;
  
  scriptMachines.onload = () => {
    if (currentLanguage === 'pl') {
      machines = machinesPl;
    } else {
      machines = machinesEn;
    }
  };
  
  scriptFloors.onload = () => {
    if (currentLanguage === 'pl') {
      floors = floorsPl || [];
    } else {
      floors = floorsEn || [];
    }
  };
  
  document.head.appendChild(scriptMachines);
  document.head.appendChild(scriptFloors);
}

function t(key, placeholders = {}) {
  let text = translations[currentLanguage][key] || key;
  
  Object.keys(placeholders).forEach(placeholder => {
    text = text.replace(`{${placeholder}}`, placeholders[placeholder]);
  });
  
  return text;
}

function updateLanguage() {
  document.documentElement.lang = currentLanguage;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    
    if (element.tagName === 'INPUT' && element.type === 'button') {
      element.value = t(key);
    } else if (element.tagName === 'BUTTON') {
      element.textContent = t(key);
    } else if (key === 'clicks') {
      element.textContent = `${t('clicks')} ${Math.floor(game.clicks)}`;
    } else {
      element.textContent = t(key);
    }
  });
  
  document.title = t('page-title');
  
  if (typeof refreshMachineNames === 'function') {
    refreshMachineNames();
  }
  if (typeof refreshBossData === 'function') {
    refreshBossData();
  }

  if (typeof renderMachines === 'function') renderMachines();
  if (typeof renderBossSection === 'function') renderBossSection();
}

function initLanguage() {
  loadLanguageData();
  
  const selector = document.getElementById('language-select');
  if (selector) {
    selector.value = currentLanguage;
    
    selector.addEventListener('change', (e) => {
      currentLanguage = e.target.value;
      localStorage.setItem('gameLanguage', currentLanguage);
      
      // Reload data files
      loadLanguageData();
      
      setTimeout(() => {
        updateLanguage();
      }, 100);
    });
  }
  
  setTimeout(() => {
    updateLanguage();
  }, 100);
}

document.addEventListener('DOMContentLoaded', initLanguage);