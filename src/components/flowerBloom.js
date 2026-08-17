// Efecto de transición: al abrir el sobre, un ramillete de flores dibujadas
// en SVG "florece" cubriendo la pantalla, y al terminar dispara la
// navegación al menú. Todo vectorial, sin imágenes externas.

const PETAL_COLORS = ["var(--burgundy-soft)", "var(--rose)", "var(--gold-thread)"];

// Posiciones dispersas pero deterministas (no aleatorias en cada carga),
// para que el efecto se sienta diseñado y no errático.
const FLOWERS = [
  { x: 50, y: 62, size: 92, delay: 0, rotate: -8 },
  { x: 30, y: 55, size: 60, delay: 60, rotate: 12 },
  { x: 70, y: 55, size: 60, delay: 60, rotate: -14 },
  { x: 40, y: 72, size: 50, delay: 120, rotate: 20 },
  { x: 60, y: 72, size: 50, delay: 120, rotate: -18 },
  { x: 18, y: 68, size: 46, delay: 190, rotate: -10 },
  { x: 82, y: 68, size: 46, delay: 190, rotate: 15 },
  { x: 50, y: 38, size: 44, delay: 240, rotate: 6 },
  { x: 30, y: 30, size: 40, delay: 320, rotate: -22 },
  { x: 70, y: 30, size: 40, delay: 320, rotate: 22 },
  { x: 12, y: 40, size: 36, delay: 380, rotate: 10 },
  { x: 88, y: 40, size: 36, delay: 380, rotate: -10 },
  { x: 50, y: 16, size: 34, delay: 440, rotate: -6 },
  { x: 22, y: 14, size: 30, delay: 500, rotate: 16 },
  { x: 78, y: 14, size: 30, delay: 500, rotate: -16 },
  { x: 10, y: 88, size: 34, delay: 500, rotate: 8 },
  { x: 90, y: 88, size: 34, delay: 500, rotate: -8 },
  { x: 50, y: 90, size: 40, delay: 440, rotate: 0 },
];

function flowerSvg(colorIndex) {
  const petalColor = PETAL_COLORS[colorIndex % PETAL_COLORS.length];
  let petals = "";
  for (let i = 0; i < 6; i += 1) {
    const angle = i * 60;
    petals += `<ellipse cx="20" cy="9" rx="6.5" ry="10" fill="${petalColor}" opacity="0.94" transform="rotate(${angle} 20 20)"/>`;
  }
  return `
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      ${petals}
      <circle cx="20" cy="20" r="5.5" fill="var(--cream-ink)"/>
      <circle cx="20" cy="20" r="5.5" fill="none" stroke="var(--gold-thread)" stroke-width="1"/>
    </svg>
  `;
}

export function playFlowerBloom(hostSection, { onCovered, onDone }) {
  const overlay = document.createElement("div");
  overlay.className = "flower-bloom";
  overlay.setAttribute("aria-hidden", "true");

  FLOWERS.forEach((f, i) => {
    const el = document.createElement("span");
    el.className = "flower";
    el.style.setProperty("--x", `${f.x}%`);
    el.style.setProperty("--y", `${f.y}%`);
    el.style.setProperty("--size", `${f.size}px`);
    el.style.setProperty("--delay", `${f.delay}ms`);
    el.style.setProperty("--rot", `${f.rotate}deg`);
    el.innerHTML = flowerSvg(i);
    overlay.appendChild(el);
  });

  const wash = document.createElement("div");
  wash.className = "flower-wash";
  overlay.appendChild(wash);

  // Se ancla a document.body (no a la sección/escena) para sobrevivir el
  // cambio de escena, que limpia por completo el contenedor de la app.
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("is-blooming"));

  const lastDelay = Math.max(...FLOWERS.map((f) => f.delay));
  const bloomDuration = lastDelay + 700; // duración de la última flor
  const holdTime = 260;
  const washTime = 420;

  window.setTimeout(() => {
    overlay.classList.add("is-covering");
    window.setTimeout(() => {
      onCovered?.(); // aquí se cambia de escena, ya tapado por la flores
      overlay.classList.add("is-leaving");
      window.setTimeout(() => {
        overlay.remove();
        onDone?.();
      }, 380);
    }, washTime);
  }, bloomDuration + holdTime);

  return overlay;
}
