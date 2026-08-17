// Estado global mínimo. Todo vive en memoria del navegador — no hay
// servidor ni base de datos, tal como pide el brief.

const listeners = new Set();

export const state = {
  scene: "intro", // intro | menu | message | memories | gift
  envelopeOpened: false,
  audio: {
    musicPlaying: false,
    musicStarted: false,
    muted: false,
    sfxEnabled: true,
  },
};

export function setScene(scene) {
  state.scene = scene;
  emit();
}

export function setEnvelopeOpened(value) {
  state.envelopeOpened = value;
  emit();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  listeners.forEach((fn) => fn(state));
}
