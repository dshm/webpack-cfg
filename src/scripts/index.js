import "../styles/index.scss";
import Cursor from "./cursor";

document.addEventListener("DOMContentLoaded", () => {
  // initialize custom cursor
  new Cursor(document.querySelector(".cursor"));
});
