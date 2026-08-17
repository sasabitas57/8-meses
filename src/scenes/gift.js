import { content } from "../data/content.js";
import { createBackButton } from "../components/backButton.js";
import { createAudioControls } from "../components/audioControls.js";
import { playSfx } from "../components/audio.js";
import { assetUrl } from "../utils/paths.js";

export function renderGift({ goTo }) {
  const section = document.createElement("section");
  section.className = "scene scene-gift";

  const spotify = content.gift.spotify;
  const fileName = spotify.image.split("/").pop();

  section.innerHTML = `
    <h2 class="gift-heading">${content.gift.heading}</h2>

    <div class="gift-box-wrap">
      <button type="button" class="gift-box" aria-label="Abrir la caja de regalo">
        <span class="gift-lid" aria-hidden="true"></span>
        <span class="gift-ribbon-v" aria-hidden="true"></span>
        <span class="gift-ribbon-h" aria-hidden="true"></span>
        <span class="gift-bow" aria-hidden="true">
          <svg viewBox="0 0 60 40"><path d="M30 20c-6-16-28-14-28 0s22 16 28 0Zm0 0c6-16 28-14 28 0s-22 16-28 0Z" fill="none" stroke="var(--gold-thread)" stroke-width="3"/><circle cx="30" cy="20" r="4" fill="var(--gold-thread)"/></svg>
        </span>
        <span class="gift-inside" aria-hidden="true">
          <span class="gift-card">
            <span class="gift-card-label">código de nuestra playlist</span>
            <span class="spotify-slot">
              <img src="${assetUrl(spotify.image)}" alt="Código de Spotify de la playlist ${spotify.playlistName}" />
              <span class="spotify-fallback" aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M7 15c3-1.5 7-1.5 10 0M7 12c3.5-1.7 7.5-1.7 11 0M7.5 9c3-1.3 6.5-1.3 9.5 0" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                <em>${fileName}</em>
              </span>
            </span>
            <span class="gift-card-playlist">${spotify.playlistName}</span>
          </span>
        </span>
      </button>
      <p class="gift-instruction">toca la caja para abrirla</p>
    </div>
  `;

  section.appendChild(createBackButton(() => goTo("menu")));
  section.appendChild(createAudioControls());

  const box = section.querySelector(".gift-box");
  const instruction = section.querySelector(".gift-instruction");
  const img = section.querySelector(".spotify-slot img");
  const fallback = section.querySelector(".spotify-fallback");

  img.addEventListener("error", () => {
    img.style.display = "none";
    fallback.style.display = "flex";
  });

  if (spotify.url) {
    const link = document.createElement("a");
    link.href = spotify.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "spotify-link-hint";
    link.textContent = "abrir en Spotify";
    section.querySelector(".gift-card").appendChild(link);
  }

  box.addEventListener("click", () => {
    if (box.classList.contains("is-open")) return;
    playSfx("openGift");
    box.classList.add("is-open");
    instruction.textContent = "";
  });

  return section;
}
