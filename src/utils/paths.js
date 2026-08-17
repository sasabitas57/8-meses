// Convierte una ruta como "/assets/audio/favorite-song.mp3" en la ruta
// real del sitio publicado, sin importar si vive en la raíz del dominio
// (ej. localhost) o en un subdirectorio (ej. GitHub Pages en
// usuario.github.io/8-meses/). Todas las rutas de contenido en
// data/content.js deben pasar por aquí antes de usarse en <img>, <audio>, etc.

export function assetUrl(path) {
  if (!path) return path;
  const base = import.meta.env.BASE_URL || "/";
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}
