import { content } from "../data/content.js";
import { state } from "../app/state.js";
import { assetUrl } from "../utils/paths.js";

// ----------------------------------------------------------------------
// Música de fondo
// ----------------------------------------------------------------------
const bgMusic = new Audio(assetUrl(content.music.file));
bgMusic.loop = true;
bgMusic.volume = 0.55;
bgMusic.addEventListener("error", () => {
  // El archivo de música todavía no ha sido reemplazado. No rompemos nada,
  // simplemente el control de audio quedará inactivo hasta que exista.
});

let firstInteractionDone = false;

export function registerFirstInteraction() {
  if (firstInteractionDone) return;
  firstInteractionDone = true;
  if (content.music.autoplayAfterFirstInteraction) {
    playMusic();
  }
}

export function playMusic() {
  if (state.audio.muted) return;
  bgMusic.play().then(
    () => {
      state.audio.musicPlaying = true;
      state.audio.musicStarted = true;
      syncMusicButtons();
    },
    () => {
      // El navegador bloqueó la reproducción automática, o el archivo
      // todavía no existe. El usuario puede darle play manualmente.
      state.audio.musicPlaying = false;
      syncMusicButtons();
    }
  );
}

export function pauseMusic() {
  bgMusic.pause();
  state.audio.musicPlaying = false;
  syncMusicButtons();
}

export function toggleMusic() {
  if (state.audio.musicPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

export function toggleMute() {
  state.audio.muted = !state.audio.muted;
  bgMusic.muted = state.audio.muted;
  syncMusicButtons();
}

function syncMusicButtons() {
  document.querySelectorAll("[data-audio-toggle]").forEach((btn) => {
    btn.classList.toggle("is-playing", state.audio.musicPlaying);
    btn.setAttribute("aria-pressed", String(state.audio.musicPlaying));
  });
  document.querySelectorAll("[data-mute-toggle]").forEach((btn) => {
    btn.classList.toggle("is-muted", state.audio.muted);
    btn.setAttribute("aria-pressed", String(state.audio.muted));
  });
}

// ----------------------------------------------------------------------
// Efectos de sonido
// ----------------------------------------------------------------------
const sfxCache = new Map();

export function playSfx(name) {
  if (!state.audio.sfxEnabled) return;
  if (!content.sfx.enabled[name]) return; // p. ej. openEnvelope está deshabilitado
  const file = content.sfx.files[name];
  if (!file) return;

  let audio = sfxCache.get(name);
  if (!audio) {
    audio = new Audio(assetUrl(file));
    audio.volume = 0.5;
    sfxCache.set(name, audio);
  }
  audio.currentTime = 0;
  audio.play().catch(() => {
    /* el archivo de efecto todavía no existe: se ignora silenciosamente */
  });
}

export function toggleSfx() {
  state.audio.sfxEnabled = !state.audio.sfxEnabled;
  document.querySelectorAll("[data-sfx-toggle]").forEach((btn) => {
    btn.classList.toggle("is-muted", !state.audio.sfxEnabled);
    btn.setAttribute("aria-pressed", String(!state.audio.sfxEnabled));
  });
}
