import { defineConfig } from "vite";

// Cambia REPO_NAME por el nombre exacto de tu repositorio de GitHub
// solo si vas a publicar en https://tu-usuario.github.io/REPO_NAME/
// Si vas a publicar en https://tu-usuario.github.io/ (repo especial
// "tu-usuario.github.io") o con dominio propio, deja base en "/".
const REPO_NAME = "8-meses";

export default defineConfig({
  base: process.env.GITHUB_PAGES ? `/${REPO_NAME}/` : "/",
});
