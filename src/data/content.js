// ============================================================================
// CONTENIDO EDITABLE — este es el ÚNICO archivo que necesitas tocar
// para personalizar la página con la información real de la pareja.
//
// Reemplaza cada valor entre [CORCHETES] por el contenido real.
// No borres las comillas ni las comas.
// Ver README.md para instrucciones detalladas paso a paso.
// ============================================================================

export const content = {
  // ---- Nombres -------------------------------------------------------
  names: {
    recipient: "[Mi niña linda]",
    sender: "[Este loco enamorado]",
  },

  // ---- Fecha del cumplemes --------------------------------------------
  anniversary: {
    months: 8,
    date: "[19/08/2026]",
  },

  // ---- Pantalla de introducción (sobre) --------------------------------
  intro: {
    eyebrow: "para mi niña linda",
    title: "Felices 8 meses mi vida",
    instruction: "toca el sobrecito",
  },

  // ---- Menú principal ---------------------------------------------------
  menu: {
    instruction: "adelante mi cielito, abrelos",
  },

  // ---- Sección Mensaje ----------------------------------------------------
  message: {
    heading: "Cartica pa vos",
    signatureLine: "este loco enamorado tuyo",
    // Puedes usar varios párrafos: cada elemento del arreglo es un párrafo.
    paragraphs: [
      "Gracias por tanto que me has dado en estos hermosos meses",
      "[SI QUIERES, AGREGA UN SEGUNDO PÁRRAFO AQUÍ]",
    ],
  },

  // ---- Sección Recuerdos --------------------------------------------------
  // Agrega, quita o reordena objetos libremente. "image" debe apuntar a un
  // archivo dentro de /public/assets/images/photos/
  memories: {
    heading: "Recuerdos",
    instruction: "toca una foto para verla más grande",
    items: [
      { id: "m01", image: "/assets/images/photos/photo-01.jpg", date: "07/10/2025", caption: "Formalización de contrato" },
      { id: "m02", image: "/assets/images/photos/photo-02.jpg", date: "21/10/2025", caption: "Cita bajo arbolito en la U" },
      { id: "m03", image: "/assets/images/photos/photo-03.jpg", date: "01/11/2025", caption: "Primera cita luego de formalizar contrato" },
      { id: "m04", image: "/assets/images/photos/photo-04.jpg", date: "09/11/2025", caption: "Paisaje que teniamos durante nuestro primer te amo" },
      { id: "m05", image: "/assets/images/photos/photo-05.jpg", date: "13/11/2025", caption: "Primer ramo de flores que te dí" },
      { id: "m06", image: "/assets/images/photos/photo-06.jpg", date: "26/11/2025", caption: "Sacarte de clase a comer papitas criollas" },
      { id: "m07", image: "/assets/images/photos/photo-07.jpg", date: "19/12/2025", caption: "Dia en que decidimos ser noviecitos" },
      { id: "m08", image: "/assets/images/photos/photo-08.jpg", date: "16/02/2026", caption: "Bechito virtual" },
      { id: "m09", image: "/assets/images/photos/photo-09.jpg", date: "25/02/2026", caption: "Comiendo heladito de McDonalds" },
      { id: "m10", image: "/assets/images/photos/photo-10.jpg", date: "19/05/2026", caption: "Comiendo frisby como Diosito manda" },
      { id: "m11", image: "/assets/images/photos/photo-11.jpg", date: "16/06/2026", caption: "JMMMMMMMMMMMMMM" },
      { id: "m12", image: "/assets/images/photos/photo-12.jpg", date: "19/06/2026", caption: "Medio año junto a el amor de mi vida pero ella dice que no la hago reir" },
      { id: "m13", image: "/assets/images/photos/photo-13.jpg", date: "01/07/2026", caption: "Durmiendose en llamada, dormilona" },
      { id: "m14", image: "/assets/images/photos/photo-14.jpg", date: "09/07/2026", caption: "Tremenda cara de emoción, te amo mucho mi cielo" },
      { id: "m15", image: "/assets/images/photos/photo-15.jpg", date: "19/07/2026", caption: "Valiendo pa nada en el billar" },
    ],
  },

  // ---- Sección Regalo -------------------------------------------------------
  gift: {
    heading: "Regalo",
    note: "[FRASE CORTA SOBRE LA CANCIÓN / PLAYLIST]",
    spotify: {
      // Coloca la imagen del Spotify Code en /public/assets/spotify/
      // y reemplaza el nombre de archivo abajo. Déjalo tal cual mientras
      // no tengas el código todavía: se mostrará un placeholder visual.
      image: "/assets/spotify/spotify-code.png",
      playlistName: "[NOMBRE DE LA PLAYLIST]",
      // Si además quieres que el código sea clicable hacia Spotify,
      // pega aquí el enlace. Si lo dejas vacío, no será clicable.
      url: "",
    },
  },

  // ---- Música de fondo ------------------------------------------------------
  music: {
    // Coloca el archivo de audio en /public/assets/audio/ con este nombre,
    // o cambia el nombre aquí para que coincida con tu archivo.
    file: "/assets/audio/favorite-song.mp3",
    title: "[NOMBRE DE LA CANCIÓN]",
    // Si true, se intenta iniciar la música automáticamente después de la
    // primera interacción del usuario (abrir el sobre). Si false, el
    // usuario debe darle play manualmente con el control de audio.
    autoplayAfterFirstInteraction: true,
  },

  // ---- Efectos de sonido ------------------------------------------------------
  sfx: {
    // El sobre NO tiene sonido por decisión explícita del usuario.
    enabled: {
      openEnvelope: false,
      openLetter: true,
      turnPaper: true,
      openGift: true,
      clickObject: true,
      closeModal: true,
    },
    files: {
      openLetter: "/assets/audio/sfx/open-letter.mp3",
      turnPaper: "/assets/audio/sfx/turn-paper.mp3",
      openGift: "/assets/audio/sfx/open-gift.mp3",
      clickObject: "/assets/audio/sfx/click-object.mp3",
      closeModal: "/assets/audio/sfx/close-modal.mp3",
    },
  },
};
