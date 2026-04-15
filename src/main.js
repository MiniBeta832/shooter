import "./style.css";
import { Game } from "./game/Game.js";

const root = document.getElementById("app");

if (!root) {
  throw new Error("No se encontro el contenedor principal.");
}

new Game(root);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Si falla en algun navegador/entorno, el juego sigue funcionando normal.
    });
  });
}
