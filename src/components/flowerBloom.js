// Efecto de transición: al abrir el sobre, un ramillete denso de flores
// (margaritas, claveles y lirios — sin girasoles ni rosas) florece hasta
// cubrir toda la pantalla, y al terminar dispara la navegación al menú.
// Todo vectorial (SVG generado en código), sin imágenes externas.

const DAISY_COLORS = ["var(--cream-ink)", "var(--paper)"];
const CARNATION_COLORS = ["var(--rose)", "var(--carnation-deep)"];
const LILY_COLORS = ["var(--burgundy-soft)", "var(--gold-thread)"];

// PRNG determinista (mulberry32) — mismo "azar" en cada carga, para que el
// efecto se sienta diseñado y no parpadee distinto cada vez.
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildFlowerField() {
  const rand = mulberry32(20260817);
  const cols = 9;
  const rows = 13;
  const flowers = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      // Posición base en cuadrícula + jitter orgánico, en porcentaje.
      const baseX = ((col + 0.5) / cols) * 100;
      const baseY = ((row + 0.5) / rows) * 100;
      const x = Math.min(98, Math.max(2, baseX + (rand() - 0.5) * 11));
      const y = Math.min(98, Math.max(2, baseY + (rand() - 0.5) * 8));

      const kindRoll = rand();
      const kind = kindRoll < 0.34 ? "daisy" : kindRoll < 0.67 ? "carnation" : "lily";
      const size = 30 + rand() * 46;
      const rotate = (rand() - 0.5) * 50;

      // Ola radial desde el centro del sobre: lo cercano florece primero.
      const dx = x - 50;
      const dy = y - 60;
      const dist = Math.sqrt(dx * dx + dy * dy) / 70; // normalizado ~0..1
      const delay = Math.round(dist * 420 + rand() * 90);

      flowers.push({ x, y, size, delay, rotate, kind, colorIndex: Math.floor(rand() * 2) });
    }
  }
  return flowers;
}

const FLOWERS = buildFlowerField();

function daisySvg(color) {
  let petals = "";
  const count = 14;
  for (let i = 0; i < count; i += 1) {
    const angle = (360 / count) * i;
    petals += `<ellipse cx="20" cy="8.5" rx="2.6" ry="9.5" fill="${color}" opacity="0.96" transform="rotate(${angle} 20 20)"/>`;
  }
  return `
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      ${petals}
      <circle cx="20" cy="20" r="5.4" fill="var(--gold-thread)"/>
      <circle cx="20" cy="20" r="5.4" fill="none" stroke="var(--brown-heart-deep)" stroke-width="0.6" opacity="0.4"/>
    </svg>
  `;
}

function carnationSvg(color, shade) {
  let outer = "";
  const outerCount = 11;
  for (let i = 0; i < outerCount; i += 1) {
    const angle = (360 / outerCount) * i * (Math.PI / 180);
    const cx = 20 + Math.cos(angle) * 9.5;
    const cy = 20 + Math.sin(angle) * 9.5;
    outer += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="6.4" fill="${color}" opacity="0.92"/>`;
  }
  let inner = "";
  const innerCount = 7;
  for (let i = 0; i < innerCount; i += 1) {
    const angle = (360 / innerCount) * i * (Math.PI / 180) + 0.4;
    const cx = 20 + Math.cos(angle) * 4.6;
    const cy = 20 + Math.sin(angle) * 4.6;
    inner += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="4.6" fill="${shade}" opacity="0.95"/>`;
  }
  return `
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      ${outer}
      ${inner}
      <circle cx="20" cy="20" r="2.6" fill="var(--cream-ink)" opacity="0.9"/>
    </svg>
  `;
}

function lilySvg(color) {
  let petals = "";
  const count = 6;
  for (let i = 0; i < count; i += 1) {
    const angle = (360 / count) * i;
    petals += `<path d="M20 20 C 16.5 13, 16 5, 20 0.5 C 24 5, 23.5 13, 20 20 Z" fill="${color}" opacity="0.95" transform="rotate(${angle} 20 20)"/>`;
  }
  let stamens = "";
  for (let i = 0; i < 4; i += 1) {
    const angle = 40 + i * 24;
    const rad = (angle * Math.PI) / 180;
    const tx = 20 + Math.cos(rad) * 11;
    const ty = 20 + Math.sin(rad) * 11 - 8;
    stamens += `<line x1="20" y1="18" x2="${tx.toFixed(2)}" y2="${ty.toFixed(2)}" stroke="var(--gold-thread)" stroke-width="0.7"/>`;
    stamens += `<circle cx="${tx.toFixed(2)}" cy="${ty.toFixed(2)}" r="1" fill="var(--gold-thread)"/>`;
  }
  return `
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      ${petals}
      ${stamens}
      <circle cx="20" cy="20" r="2.2" fill="var(--brown-heart-deep)"/>
    </svg>
  `;
}

function flowerSvg(kind, colorIndex) {
  if (kind === "daisy") return daisySvg(DAISY_COLORS[colorIndex % DAISY_COLORS.length]);
  if (kind === "carnation") {
    return carnationSvg(
      CARNATION_COLORS[colorIndex % CARNATION_COLORS.length],
      CARNATION_COLORS[(colorIndex + 1) % CARNATION_COLORS.length]
    );
  }
  return lilySvg(LILY_COLORS[colorIndex % LILY_COLORS.length]);
}

export function playFlowerBloom({ onCovered, onDone } = {}) {
  const overlay = document.createElement("div");
  overlay.className = "flower-bloom";
  overlay.setAttribute("aria-hidden", "true");

  FLOWERS.forEach((f) => {
    const el = document.createElement("span");
    el.className = "flower";
    el.style.setProperty("--x", `${f.x}%`);
    el.style.setProperty("--y", `${f.y}%`);
    el.style.setProperty("--size", `${f.size}px`);
    el.style.setProperty("--delay", `${f.delay}ms`);
    el.style.setProperty("--rot", `${f.rotate}deg`);
    el.innerHTML = flowerSvg(f.kind, f.colorIndex);
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
  const bloomDuration = lastDelay + 560; // duración de la última flor en aparecer
  const holdTime = 200;
  const washTime = 380;

  window.setTimeout(() => {
    overlay.classList.add("is-covering");
    window.setTimeout(() => {
      onCovered?.(); // aquí se cambia de escena, ya tapado por las flores
      overlay.classList.add("is-leaving");
      window.setTimeout(() => {
        overlay.remove();
        onDone?.();
      }, 380);
    }, washTime);
  }, bloomDuration + holdTime);

  return overlay;
}
