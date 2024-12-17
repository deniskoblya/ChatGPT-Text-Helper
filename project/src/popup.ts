function initializePopup() {
  const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
  const saveButton = document.getElementById('saveButton') as HTMLButtonElement;
  const statusDiv = document.getElementById('status') as HTMLDivElement;
  
  // Load saved API key on popup open
  loadSavedApiKey();
  
  // Prevent form submission
  document.querySelector('form')?.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  
  // Save API key on button click
  saveButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      showStatus('Please enter an API key', 'error');
      return;
    }
    
    if (!apiKey.startsWith('sk-')) {
      showStatus('Invalid API key format', 'error');
      return;
    }
    
    await saveApiKey(apiKey).then(() => {
      showStatus('API key saved successfully!', 'success');
    });
  });
  
  function showStatus(message: string, type: 'success' | 'error') {
    statusDiv.textContent = message;
    statusDiv.className = `status ${type}`;
    
    setTimeout(() => {
      statusDiv.textContent = '';
      statusDiv.className = 'status';
    }, 3000);
  }
}

async function loadSavedApiKey() {
  try {
    const result = await chrome.storage.sync.get(['openaiApiKey']);
    const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
    if (result.openaiApiKey) {
      apiKeyInput.value = result.openaiApiKey;
    }
  } catch (error) {
    console.error('Error loading API key:', error);
  }
}

async function saveApiKey(apiKey: string): Promise<void> {
  return chrome.storage.sync.set({ openaiApiKey: apiKey });
}

document.addEventListener('DOMContentLoaded', () => {
  initializePopup();
});