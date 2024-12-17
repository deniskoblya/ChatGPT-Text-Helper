// Modal component for prompt input
export function createModal(): HTMLDivElement {
  const modal = document.createElement('div');
  modal.className = 'gpt-modal';
  modal.innerHTML = `
    <div class="gpt-modal-content">
      <span class="gpt-close">&times;</span>
      <h2>Ask ChatGPT</h2>
      <form class="gpt-form">
        <textarea class="gpt-prompt-input" placeholder="Enter your prompt here..."></textarea>
        <button type="button" class="gpt-submit">Generate</button>
      </form>
      <div class="gpt-loading" style="display: none;">Generating...</div>
    </div>
  `;
  return modal;
}

export function setupModalHandlers(
  modal: HTMLDivElement, 
  generateCallback: (prompt: string) => Promise<boolean>
): void {
  const closeBtn = modal.querySelector('.gpt-close');
  const submitBtn = modal.querySelector('.gpt-submit') as HTMLButtonElement;
  const promptInput = modal.querySelector('.gpt-prompt-input') as HTMLTextAreaElement;
  const loadingDiv = modal.querySelector('.gpt-loading') as HTMLDivElement;
  const form = modal.querySelector('.gpt-form') as HTMLFormElement;

  // Close button handler
  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'none';
  });

  // Close on outside click
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Submit button handler
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  submitBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (promptInput.value.trim()) {
      loadingDiv.style.display = 'block';
      submitBtn.disabled = true;

      try {
        const success = await generateCallback(promptInput.value);
        if (success) {
          modal.style.display = 'none';
        }
      } catch (error) {
        alert('Error generating text: ' + (error as Error).message);
      } finally {
        loadingDiv.style.display = 'none';
        submitBtn.disabled = false;
      }
    }
  });

  // Handle Enter key
  promptInput?.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !submitBtn.disabled) {
      event.preventDefault();
      submitBtn.click();
    }
  });
}