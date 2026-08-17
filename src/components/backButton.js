export function createBackButton(onBack) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "back-tag";
  btn.setAttribute("aria-label", "Volver al menú");
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <span>volver</span>
  `;
  btn.addEventListener("click", onBack);
  return btn;
}
