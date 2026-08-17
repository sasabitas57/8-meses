// Crea una "foto física" tipo polaroid. Si la imagen todavía no existe
// (porque el usuario no la ha reemplazado), se muestra un marco vacío
// con el nombre del archivo esperado, para que la página nunca se rompa.

import { assetUrl } from "../utils/paths.js";

let counter = 0;

export function createScrapbookPhoto(item, { onOpen } = {}) {
  counter += 1;
  const rotation = ((counter * 37) % 13) - 6; // ligera rotación pseudo-aleatoria y estable
  const tapeSide = counter % 2 === 0 ? "tape-right" : "tape-left";

  const card = document.createElement("button");
  card.type = "button";
  card.className = `polaroid ${tapeSide}`;
  card.style.setProperty("--rot", `${rotation}deg`);
  card.setAttribute("aria-label", `Ver recuerdo: ${item.caption}`);

  const fileName = item.image.split("/").pop();

  card.innerHTML = `
    <span class="washi" aria-hidden="true"></span>
    <span class="polaroid-frame">
      <img src="${assetUrl(item.image)}" alt="${item.caption}" loading="lazy" />
      <span class="polaroid-fallback" aria-hidden="true">
        <svg viewBox="0 0 48 48"><path d="M6 36 18 22l7 8 8-11 9 17H6Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="15" cy="15" r="3" fill="none" stroke="currentColor" stroke-width="2"/></svg>
        <em>${fileName}</em>
      </span>
    </span>
    <span class="polaroid-caption">${item.date ?? ""}</span>
  `;

  const img = card.querySelector("img");
  const fallback = card.querySelector(".polaroid-fallback");
  img.addEventListener("error", () => {
    img.style.display = "none";
    fallback.style.display = "flex";
  });

  card.addEventListener("click", () => onOpen?.(item));

  return card;
}
