import "@fontsource/caveat/latin-400.css";
import "@fontsource/caveat/latin-600.css";
import "@fontsource/caveat/latin-700.css";
import "@fontsource/eb-garamond/latin-400.css";
import "@fontsource/eb-garamond/latin-400-italic.css";
import "@fontsource/eb-garamond/latin-600.css";
import "@fontsource/quicksand/latin-500.css";
import "@fontsource/quicksand/latin-600.css";

import "./style.css";
import { initNavigation } from "./app/navigation.js";

const root = document.querySelector("#app");
initNavigation(root);
