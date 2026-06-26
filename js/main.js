const menuButton = document.querySelector('[data-menu-toggle]');
const sidebar = document.querySelector('#sidebar');
const overlay = document.querySelector('[data-overlay]');

function setMenu(open) {
  sidebar.classList.toggle('is-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  if (overlay) overlay.hidden = !open;
}

menuButton?.addEventListener('click', () => setMenu(!sidebar.classList.contains('is-open')));
overlay?.addEventListener('click', () => setMenu(false));
sidebar?.addEventListener('click', (event) => {
  if (event.target instanceof HTMLAnchorElement) setMenu(false);
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const block = button.closest('[data-code-block]')?.querySelector('code');
    if (!block) return;
    await navigator.clipboard.writeText(block.textContent || '');
    const original = button.textContent;
    button.textContent = 'Copied';
    setTimeout(() => { button.textContent = original; }, 1200);
  });
});

document.querySelectorAll('[data-accordion] button').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = button.nextElementSibling;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    if (panel) panel.hidden = expanded;
  });
});

const readingProgress = document.querySelector('[data-reading-progress]');
function updateReadingProgress() {
  if (!readingProgress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  readingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}
updateReadingProgress();
window.addEventListener('scroll', updateReadingProgress, { passive: true });
