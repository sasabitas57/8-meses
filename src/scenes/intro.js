import { content } from "../data/content.js";
import { state, setEnvelopeOpened } from "../app/state.js";
import { playSfx, registerFirstInteraction } from "../components/audio.js";
import { playFlowerBloom } from "../components/flowerBloom.js";

export function renderIntro({ goTo }) {
  const section = document.createElement("section");
  section.className = "scene scene-intro";

  section.innerHTML = `
    <div class="stars" aria-hidden="true"></div>
    <p class="intro-eyebrow">${content.intro.eyebrow}</p>
    <h1 class="intro-title">${content.intro.title}</h1>

    <div class="envelope-wrap">
      <button type="button" class="envelope ${state.envelopeOpened ? "is-open" : ""}" aria-label="Abrir el sobre">
        <span class="envelope-shadow" aria-hidden="true"></span>
        <span class="envelope-back" aria-hidden="true"></span>
        <span class="envelope-letter" aria-hidden="true">
          <span class="envelope-letter-line"></span>
          <span class="envelope-letter-line"></span>
          <span class="envelope-letter-line short"></span>
        </span>
        <span class="envelope-flap" aria-hidden="true"></span>
        <span class="envelope-front" aria-hidden="true"></span>
        <span class="envelope-seal" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path d="M12 20s-7.5-4.6-9.7-9C.7 7.3 2.4 4 5.6 4c1.9 0 3.5 1 4.4 2.6C10.9 5 12.5 4 14.4 4c3.2 0 4.9 3.3 3.3 7-2.2 4.4-9.7 9-9.7 9Z" fill="currentColor"/></svg>
        </span>
      </button>
      <p class="envelope-instruction">${content.intro.instruction}</p>
    </div>
  `;

  const envelopeBtn = section.querySelector(".envelope");

  envelopeBtn.addEventListener("click", () => {
    if (state.envelopeOpened) return;
    registerFirstInteraction();
    playSfx("openEnvelope"); // deshabilitado por config: no sonará
    envelopeBtn.classList.add("is-open");
    setEnvelopeOpened(true);
    envelopeBtn.setAttribute("aria-label", "Sobre abierto");

    window.setTimeout(() => {
      playFlowerBloom(section, {
        onCovered: () => goTo("menu"),
      });
    }, 650);
  });

  return section;
}
