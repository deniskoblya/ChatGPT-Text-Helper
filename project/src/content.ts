import { generateText } from './utils/api';
import { getApiKey } from './utils/storage';
import { createModal, setupModalHandlers } from './components/modal';
import { createWrapper, createGPTButton, throttle } from './utils/dom';

// Keep track of processed textareas and their modals
const processedTextareas = new WeakSet();
const textareaModals = new WeakMap();

// Process a single textarea
function processTextarea(textarea: HTMLTextAreaElement) {
  if (processedTextareas.has(textarea)) {
    return;
  }
  
  const wrapper = createWrapper(textarea);
  const gptButton = createGPTButton();
  wrapper.appendChild(gptButton);
  
  // Create modal and store it in the WeakMap
  const modal = createModal();
  document.body.appendChild(modal);
  textareaModals.set(textarea, modal);
  
  // Set up modal handlers with the specific textarea
  setupModalHandlers(modal, async (prompt: string) => {
    try {
      const apiKey = await getApiKey();
      if (!apiKey) {
        throw new Error('Please set your OpenAI API key in the extension settings');
      }
      const response = await generateText(prompt, apiKey);
      textarea.value = response;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      return true; // Success
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred');
      return false; // Failed
    }
  });
  
  // Show modal when button is clicked
  gptButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const modal = textareaModals.get(textarea);
    if (!modal) return;

    modal.style.display = 'block';
    const promptInput = modal.querySelector('.gpt-prompt-input') as HTMLTextAreaElement;
    promptInput.value = '';
    promptInput.focus();
  });
  
  processedTextareas.add(textarea);
}

// Throttled function to process textareas
const processTextareas = throttle(() => {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach(textarea => {
    if (textarea instanceof HTMLTextAreaElement) {
      processTextarea(textarea);
    }
  });
}, 250);

// Initial processing
processTextareas();

// Observe DOM changes
const observer = new MutationObserver((mutations) => {
  let shouldProcess = false;
  
  for (const mutation of mutations) {
    if (mutation.addedNodes.length > 0) {
      shouldProcess = true;
      break;
    }
  }
  
  if (shouldProcess) {
    processTextareas();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});