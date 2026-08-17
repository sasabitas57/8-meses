import { content } from "../data/content.js";
import { createAudioControls } from "../components/audioControls.js";
import { playSfx } from "../components/audio.js";

const OBJECTS = [
  {
    id: "message",
    label: "Mensaje",
    scene: "message",
    render: () => `
      <svg viewBox="0 0 100 100" class="obj-art">
        <rect x="14" y="20" width="72" height="58" rx="2" fill="var(--paper)" stroke="var(--ink)" stroke-width="2"/>
        <path d="M14 24 50 54 86 24" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round"/>
        <path class="wax" d="M50 46c-6-8-20-4-16 6 3 7 16 13 16 13s13-6 16-13c4-10-10-14-16-6Z" fill="var(--burgundy)"/>
      </svg>
    `,
  },
  {
    id: "memories",
    label: "Recuerdos",
    scene: "memories",
    render: () => `
      <svg viewBox="0 0 100 100" class="obj-art">
        <rect x="18" y="30" width="46" height="52" rx="2" fill="var(--paper)" stroke="var(--ink)" stroke-width="2" transform="rotate(-8 41 56)"/>
        <rect x="30" y="20" width="46" height="52" rx="2" fill="var(--paper)" stroke="var(--ink)" stroke-width="2" transform="rotate(6 53 46)"/>
        <rect x="38" y="26" width="30" height="30" fill="var(--burgundy-soft)" opacity="0.35" transform="rotate(6 53 41)"/>
      </svg>
    `,
  },
  {
    id: "gift",
    label: "Regalo",
    scene: "gift",
    render: () => `
      <svg viewBox="0 0 100 100" class="obj-art">
        <rect x="18" y="42" width="64" height="40" fill="var(--brown-heart)" stroke="var(--ink)" stroke-width="2"/>
        <rect x="18" y="42" width="64" height="10" fill="var(--burgundy)" stroke="var(--ink)" stroke-width="2"/>
        <rect x="46" y="20" width="8" height="62" fill="var(--gold-thread)"/>
        <path d="M34 20c0-8 8-12 16-6 8-6 16-2 16 6" fill="none" stroke="var(--gold-thread)" stroke-width="4" stroke-linecap="round"/>
      </svg>
    `,
  },
];

export function renderMenu({ goTo }) {
  const section = document.createElement("section");
  section.className = "scene scene-menu";

  section.innerHTML = `
    <div class="desk-cloth" aria-hidden="true"></div>
    <p class="menu-instruction">${content.menu.instruction}</p>
    <div class="menu-objects"></div>
  `;

  const objectsWrap = section.querySelector(".menu-objects");

  OBJECTS.forEach((obj, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `menu-object rot-${i % 3}`;
    btn.setAttribute("aria-label", obj.label);
    btn.innerHTML = `
      ${obj.render()}
      <span class="menu-object-label">${obj.label}</span>
    `;
    btn.addEventListener("click", () => {
      playSfx("clickObject");
      goTo(obj.scene);
    });
    objectsWrap.appendChild(btn);
  });

  section.appendChild(createAudioControls());

  return section;
}
