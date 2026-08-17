import { content } from "../data/content.js";
import { createBackButton } from "../components/backButton.js";
import { createAudioControls } from "../components/audioControls.js";
import { createScrapbookPhoto } from "../components/scrapbookPhoto.js";
import { openMemoryModal } from "../components/modal.js";
import { playSfx } from "../components/audio.js";

export function renderMemories({ goTo }) {
  const section = document.createElement("section");
  section.className = "scene scene-memories";

  section.innerHTML = `
    <div class="corkboard" aria-hidden="true"></div>
    <h2 class="memories-heading">${content.memories.heading}</h2>
    <p class="memories-instruction">${content.memories.instruction}</p>
    <div class="memories-board"></div>
  `;

  section.appendChild(createBackButton(() => goTo("menu")));
  section.appendChild(createAudioControls());

  const board = section.querySelector(".memories-board");

  content.memories.items.forEach((item) => {
    const photo = createScrapbookPhoto(item, {
      onOpen: (m) => {
        playSfx("turnPaper");
        openMemoryModal(m);
      },
    });
    board.appendChild(photo);
  });

  return section;
}
