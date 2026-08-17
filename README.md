# 8 meses 💌

Un pequeño regalo digital tipo scrapbook: un sobre que se abre, un menú de
tres objetos (Mensaje, Recuerdos, Regalo) y una experiencia que se puede
explorar libremente, en el celular o en el computador.

Este README está escrito para que puedas personalizar la página **sin
necesidad de programar**. Solo vas a editar un archivo de texto y a
reemplazar algunas fotos/audios.

---

## 1. Lo único que necesitas tocar: `src/data/content.js`

Todo el contenido de la página (nombres, fecha, mensaje, fotos, música,
Spotify Code) vive en un solo archivo:

```
src/data/content.js
```

Ábrelo con cualquier editor de texto (recomendado: [VS Code](https://code.visualstudio.com/),
gratis). Vas a ver bloques como este:

```js
intro: {
  title: "[TEXTO DE INTRODUCCIÓN]",
  ...
}
```

Cada cosa entre corchetes `[ASÍ]` es un placeholder: bórralo y escribe el
contenido real, **sin borrar las comillas `"..."`**. Por ejemplo:

```js
intro: {
  title: "[TEXTO DE INTRODUCCIÓN]",
}
```

se convierte en:

```js
intro: {
  title: "Feliz cumplemes, amor",
}
```

Guarda el archivo (Ctrl+S / Cmd+S) y listo.

### 1.1 Cambiar el mensaje

Busca `message.paragraphs` y reemplaza cada línea por un párrafo real.
Puedes agregar o quitar párrafos (cada uno entre comillas, separado por
comas):

```js
message: {
  heading: "Mensaje",
  signatureLine: "Juan Sebastián",
  paragraphs: [
    "Primer párrafo de tu carta...",
    "Segundo párrafo...",
  ],
},
```

### 1.2 Cambiar los recuerdos

Busca `memories.items`. Hay 15 espacios ya preparados. Para cada uno,
cambia la fecha y la frase. Si quieres menos de 15, borra los objetos
sobrantes (cada uno es un bloque `{ ... }`); si quieres más, copia y pega
un bloque nuevo con un `id` distinto (`m16`, `m17`, ...).

### 1.3 Cambiar el nombre de la playlist y el enlace de Spotify

Busca `gift.spotify`. Si además del código quieres que sea clicable,
pega el enlace de tu playlist en `url`.

---

## 2. Reemplazar fotos

1. Prepara tus fotos (recomendado: formato `.jpg` o `.webp`, no
   demasiado pesadas — idealmente menos de 1 MB cada una).
2. Nómbralas exactamente como se indica en `content.js`:
   `photo-01.jpg`, `photo-02.jpg`, ... hasta `photo-15.jpg`
   (o el nombre que tú hayas puesto si lo cambiaste).
3. Colócalas dentro de la carpeta:
   ```
   public/assets/images/photos/
   ```
4. Si usaste un nombre distinto, actualiza ese nombre en
   `content.js` dentro de `memories.items`.

Mientras una foto no exista, la página muestra automáticamente un marco
con el nombre del archivo que falta — nunca se rompe.

---

## 3. Cambiar la canción de fondo

1. Coloca tu archivo de audio (formato `.mp3` recomendado) en:
   ```
   public/assets/audio/favorite-song.mp3
   ```
   (reemplaza el archivo que esté ahí, o usa otro nombre y actualízalo
   en `content.js` → `music.file`).
2. Cambia `music.title` en `content.js` por el nombre real de la canción.

---

## 4. Poner el código de Spotify (Spotify Code)

1. En Spotify, abre la playlist → los tres puntos (`•••`) → "Compartir" →
   "Código de Spotify" (o descarga la imagen del código desde la app).
2. Guarda esa imagen como:
   ```
   public/assets/spotify/spotify-code.png
   ```
3. Cambia `gift.spotify.playlistName` en `content.js` por el nombre real
   de la playlist.

---

## 5. Efectos de sonido (opcional)

Si quieres agregar los efectos de sonido (abrir carta, pasar papel, abrir
regalo, etc.), coloca los archivos `.mp3` en:

```
public/assets/audio/sfx/
```

con estos nombres exactos:

```
open-letter.mp3
turn-paper.mp3
open-gift.mp3
click-object.mp3
close-modal.mp3
```

El sobre inicial **nunca** tendrá sonido — así quedó decidido a propósito.
Si algún efecto no existe todavía, simplemente no suena; nada se rompe.

---

## 6. Ver los cambios en tu computador (antes de publicar)

Necesitas tener [Node.js](https://nodejs.org/) instalado (versión 18 o
más reciente). Luego, en una terminal, dentro de la carpeta del proyecto:

```bash
npm install
npm run dev
```

Esto te dará una dirección como `http://localhost:5173`. Ábrela en tu
navegador para ver la página en vivo. Cada vez que guardes un cambio en
`content.js` o en cualquier archivo, la página se actualiza sola.

Para probar exactamente la versión que se va a publicar:

```bash
npm run build
npm run preview
```

---

## 7. Publicar la página de forma permanente (GitHub Pages)

Esta es la parte "técnica", pero está pensada para alguien que **nunca**
ha usado GitHub. Sigue los pasos en orden.

### 7.1 Crear una cuenta de GitHub

1. Ve a [github.com](https://github.com) → "Sign up".
2. Sigue los pasos (correo, contraseña, nombre de usuario).

### 7.2 Crear un repositorio nuevo

1. Ya con sesión iniciada, haz clic en el botón verde **"New"** (o el
   ícono `+` arriba a la derecha → "New repository").
2. En "Repository name" escribe: `8-meses`
3. Déjalo en **Public**.
4. No marques ninguna casilla adicional ("Add a README", etc.).
5. Haz clic en **"Create repository"**.

### 7.3 Subir el proyecto

GitHub te va a mostrar una página con comandos. En tu computador, abre
una terminal **dentro de la carpeta del proyecto** (`8-meses/`) y
ejecuta, reemplazando `TU-USUARIO` por tu nombre de usuario de GitHub:

```bash
git init
git add .
git commit -m "Primera versión"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/8-meses.git
git push -u origin main
```

Si es la primera vez que usas Git, es posible que te pida iniciar sesión
o generar un token — GitHub te guía en pantalla si eso pasa.

> Si el nombre de tu repositorio es distinto a `8-meses`, abre
> `vite.config.js` y cambia la línea `const REPO_NAME = "8-meses";` por
> el nombre exacto de tu repositorio.

### 7.4 Activar GitHub Pages

1. En tu repositorio en GitHub, ve a **Settings** (pestaña arriba).
2. En el menú de la izquierda, busca **Pages**.
3. En "Build and deployment" → "Source", elige **"GitHub Actions"**.
4. No necesitas hacer nada más: el proyecto ya incluye un flujo
   automático (`.github/workflows/deploy.yml`) que compila y publica la
   página cada vez que subas cambios a la rama `main`.

### 7.5 Obtener el enlace

1. Ve a la pestaña **Actions** de tu repositorio y espera a que el
   proceso termine (ícono verde ✓).
2. Vuelve a **Settings → Pages**: ahí verás el enlace público, algo como:
   ```
   https://TU-USUARIO.github.io/8-meses/
   ```
3. ¡Ese es el enlace que le compartes a tu novia!

---

## 8. Actualizar la página después de publicada

Cada vez que quieras cambiar algo (una foto, el mensaje, lo que sea):

1. Edita los archivos como en los pasos anteriores.
2. En la terminal, dentro de la carpeta del proyecto:
   ```bash
   git add .
   git commit -m "Actualizo contenido"
   git push
   ```
3. Espera 1–2 minutos: GitHub Actions vuelve a publicar automáticamente.

---

## 9. Estructura del proyecto (referencia rápida)

```
8-meses/
├── index.html
├── vite.config.js          ← configuración de publicación
├── public/assets/
│   ├── images/photos/      ← tus 15 fotos van aquí
│   ├── audio/               ← la canción de fondo
│   ├── audio/sfx/           ← efectos de sonido opcionales
│   └── spotify/              ← imagen del Spotify Code
├── src/
│   ├── data/content.js      ← ÚNICO archivo de contenido a editar
│   ├── scenes/               ← lógica de cada pantalla
│   ├── components/           ← piezas reutilizables (audio, modal, etc.)
│   └── style.css             ← estética scrapbook (colores, tipografías)
└── .github/workflows/deploy.yml ← publica automáticamente en GitHub Pages
```

---

## 10. Privacidad

Este sitio es **estático y público**: cualquier persona con el enlace
puede verlo, igual que cualquier otra página web. No incluye contraseñas
ni protección por defecto. Si más adelante quieres agregar una
contraseña simple de acceso, es algo que se puede añadir como paso
aparte — solo pídelo.
