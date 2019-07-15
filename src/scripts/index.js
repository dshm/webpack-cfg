import "../styles/index.scss";

document.addEventListener("DOMContentLoaded", () => {
  const block = document.createElement("div");
  block.innerHTML = "DOM Loaded...";
  document.body.appendChild(block);
});
