import { playSfx } from "./audio.js";
import { assetUrl } from "../utils/paths.js";

export function openMemoryModal(item) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Recuerdo ampliado");

  const fileName = item.image.split("/").pop();

  overlay.innerHTML = `
    <div class="modal-card">
      <button type="button" class="modal-close" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <div class="modal-photo">
        <img src="${assetUrl(item.image)}" alt="${item.caption}" />
        <span class="modal-fallback" aria-hidden="true">
          <svg viewBox="0 0 48 48"><path d="M6 36 18 22l7 8 8-11 9 17H6Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="15" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>
          <em>${fileName}</em>
        </span>
      </div>
      <p class="modal-date">${item.date ?? ""}</p>
      <p class="modal-caption">${item.caption ?? ""}</p>
    </div>
  `;

  const img = overlay.querySelector("img");
  const fallback = overlay.querySelector(".modal-fallback");
  img.addEventListener("error", () => {
    img.style.display = "none";
    fallback.style.display = "flex";
  });

  function close() {
    playSfx("closeModal");
    overlay.classList.remove("is-open");
    window.setTimeout(() => overlay.remove(), 200);
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) {
    if (e.key === "Escape") close();
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector(".modal-close").addEventListener("click", close);
  document.addEventListener("keydown", onKey);

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("is-open"));
  overlay.querySelector(".modal-close").focus();
}
