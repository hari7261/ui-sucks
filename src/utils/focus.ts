const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function isFocusable(element: HTMLElement) {
  if (element.hidden || element.getAttribute('aria-hidden') === 'true') {
    return false;
  }

  const tabIndex = element.getAttribute('tabindex');

  if (tabIndex !== null && Number(tabIndex) < 0) {
    return false;
  }

  return true;
}

export function getFocusableElements(container: HTMLElement) {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isFocusable);
}

export function getFirstFocusableElement(container: HTMLElement) {
  return getFocusableElements(container)[0] ?? null;
}
