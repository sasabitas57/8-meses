import { state, setScene } from "./state.js";
import { renderIntro } from "../scenes/intro.js";
import { renderPaywall } from "../scenes/paywall.js";
import { renderMenu } from "../scenes/menu.js";
import { renderMessage } from "../scenes/message.js";
import { renderMemories } from "../scenes/memories.js";
import { renderGift } from "../scenes/gift.js";

const sceneRenderers = {
  intro: renderIntro,
  paywall: renderPaywall,
  menu: renderMenu,
  message: renderMessage,
  memories: renderMemories,
  gift: renderGift,
};

let root = null;
let currentSceneName = null;

export function initNavigation(rootEl) {
  root = rootEl;
  paint(state.scene, { instant: true });
}

export function goTo(sceneName) {
  if (sceneName === currentSceneName) return;
  paint(sceneName);
}

function paint(sceneName, { instant = false } = {}) {
  const renderer = sceneRenderers[sceneName];
  if (!renderer) return;

  const doSwap = () => {
    root.innerHTML = "";
    const el = renderer({ goTo });
    root.appendChild(el);
    currentSceneName = sceneName;
    setScene(sceneName);
    requestAnimationFrame(() => root.classList.add("scene-in"));
  };

  if (instant) {
    doSwap();
    return;
  }

  root.classList.remove("scene-in");
  root.classList.add("scene-out");
  window.setTimeout(() => {
    root.classList.remove("scene-out");
    doSwap();
  }, 260);
}
