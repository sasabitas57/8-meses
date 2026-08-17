import { toggleMusic, toggleMute, toggleSfx } from "./audio.js";
import { state } from "../app/state.js";

export function createAudioControls() {
  const wrap = document.createElement("div");
  wrap.className = "audio-controls";
  wrap.innerHTML = `
    <button type="button" class="audio-btn ${state.audio.musicPlaying ? "is-playing" : ""}"
      data-audio-toggle aria-pressed="${state.audio.musicPlaying}" aria-label="Reproducir o pausar la música">
      <svg viewBox="0 0 24 24" class="icon-note" aria-hidden="true">
        <path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="6" cy="18" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
        <circle cx="17" cy="16" r="3" fill="none" stroke="currentColor" stroke-width="1.6"/>
      </svg>
    </button>
    <button type="button" class="audio-btn ${state.audio.muted ? "is-muted" : ""}"
      data-mute-toggle aria-pressed="${state.audio.muted}" aria-label="Silenciar o activar el volumen">
      <svg viewBox="0 0 24 24" class="icon-speaker" aria-hidden="true">
        <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
        <path class="wave" d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      </svg>
    </button>
    <button type="button" class="audio-btn ${!state.audio.sfxEnabled ? "is-muted" : ""}"
      data-sfx-toggle aria-pressed="${!state.audio.sfxEnabled}" aria-label="Activar o desactivar los efectos de sonido">
      <span class="sfx-label">fx</span>
    </button>
  `;

  wrap.querySelector("[data-audio-toggle]").addEventListener("click", toggleMusic);
  wrap.querySelector("[data-mute-toggle]").addEventListener("click", toggleMute);
  wrap.querySelector("[data-sfx-toggle]").addEventListener("click", toggleSfx);

  return wrap;
}
