// Utility functions for DOM manipulation
export function createWrapper(textarea: HTMLTextAreaElement): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'gpt-wrapper';
  textarea.parentNode?.insertBefore(wrapper, textarea);
  wrapper.appendChild(textarea);
  return wrapper;
}

export function createGPTButton(): HTMLButtonElement {
  const button = document.createElement('button');
  button.className = 'gpt-button';
  button.type = 'button'; // Prevent form submission
  button.innerHTML = '🤖';
  button.title = 'Ask ChatGPT';
  return button;
}

// Throttle function to limit how often a function can be called
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}