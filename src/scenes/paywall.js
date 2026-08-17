import { createAudioControls } from "../components/audioControls.js";
import { playSfx } from "../components/audio.js";

const PLANS = [
  { id: "monthly", label: "Plan mensual", price: "50 besos / mes" },
  { id: "annual", label: "Plan anual", price: "40 besos / mes", badge: "ahorra besos" },
];

export function renderPaywall({ goTo }) {
  const section = document.createElement("section");
  section.className = "scene scene-paywall";

  section.innerHTML = `
    <div class="paywall-card">
      <p class="paywall-eyebrow">oferta por tiempo limitado</p>
      <h2 class="paywall-title">¿Quieres seguir recibiendo este amor?</h2>
      <p class="paywall-subtitle">Suscríbete para no perderte ni un abrazo más.</p>
      <div class="paywall-plans"></div>
      <button type="button" class="paywall-decline">No, gracias</button>
    </div>
  `;

  section.appendChild(createAudioControls());

  const card = section.querySelector(".paywall-card");
  const plansWrap = section.querySelector(".paywall-plans");

  PLANS.forEach((plan) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "paywall-plan";
    btn.innerHTML = `
      <span class="paywall-plan-label">${plan.label}</span>
      <span class="paywall-plan-price">${plan.price}</span>
      ${plan.badge ? `<span class="paywall-plan-badge">${plan.badge}</span>` : ""}
    `;
    btn.addEventListener("click", () => showResult(true));
    plansWrap.appendChild(btn);
  });

  section.querySelector(".paywall-decline").addEventListener("click", () => showResult(false));

  function showResult(subscribed) {
    playSfx("clickObject");
    card.classList.add("is-leaving");
    window.setTimeout(() => {
      card.innerHTML = subscribed
        ? `
          <p class="paywall-result-emoji">🎉</p>
          <h2 class="paywall-title">¡Felicidades por tu compra!</h2>
          <p class="paywall-subtitle">Ahora te aguantas más tiempo a este hombre.</p>
          <button type="button" class="paywall-continue">Continuar</button>
        `
        : `
          <p class="paywall-result-emoji">😏</p>
          <h2 class="paywall-title">Paila mija, te encartaste conmigo.</h2>
          <button type="button" class="paywall-continue">Continuar</button>
        `;
      card.classList.remove("is-leaving");
      requestAnimationFrame(() => card.classList.add("is-entering"));
      card.querySelector(".paywall-continue").addEventListener("click", () => goTo("menu"));
    }, 260);
  }

  return section;
}
