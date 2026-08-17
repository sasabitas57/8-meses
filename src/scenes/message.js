import { content } from "../data/content.js";
import { createBackButton } from "../components/backButton.js";
import { createAudioControls } from "../components/audioControls.js";
import { playSfx } from "../components/audio.js";

const CHAR_DELAY = 22; // ms entre caracteres — legible, no demasiado lento

export function renderMessage({ goTo }) {
  const section = document.createElement("section");
  section.className = "scene scene-message";

  const fullText = content.message.paragraphs.join("\n\n");

  section.innerHTML = `
    <div class="paper-sheet">
      <h2 class="message-heading">${content.message.heading}</h2>
      <div class="message-text" aria-live="polite"></div>
      <p class="message-signature">— ${content.message.signatureLine}</p>
      <button type="button" class="skip-btn">revelar todo</button>
    </div>
  `;

  section.appendChild(createBackButton(() => goTo("menu")));
  section.appendChild(createAudioControls());

  const textEl = section.querySelector(".message-text");
  const skipBtn = section.querySelector(".skip-btn");

  let index = 0;
  let paused = false;
  let finished = false;
  let timer = null;

  playSfx("openLetter");

  function renderChar() {
    if (finished) return;
    if (paused) return;
    if (index >= fullText.length) {
      finish();
      return;
    }
    textEl.textContent = fullText.slice(0, index + 1);
    index += 1;
    timer = window.setTimeout(renderChar, CHAR_DELAY);
  }

  function finish() {
    finished = true;
    window.clearTimeout(timer);
    textEl.textContent = fullText;
    skipBtn.textContent = "✓ mensaje completo";
    skipBtn.disabled = true;
  }

  textEl.addEventListener("click", () => {
    if (finished) return;
    paused = !paused;
    if (!paused) renderChar();
  });

  skipBtn.addEventListener("click", finish);

  timer = window.setTimeout(renderChar, CHAR_DELAY);

  return section;
}
